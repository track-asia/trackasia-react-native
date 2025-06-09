package com.trackasia.reactnative.components.camera;

import androidx.annotation.NonNull;

import com.trackasia.android.camera.CameraUpdate;
import com.trackasia.android.constants.TrackAsiaConstants;
import com.trackasia.android.maps.TrackAsiaMap;
import com.trackasia.reactnative.components.camera.constants.CameraMode;

import java.lang.ref.WeakReference;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.FutureTask;
import java.util.concurrent.RunnableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CameraUpdateItem implements RunnableFuture<Void> {
    private int mDuration;
    private TrackAsiaMap.CancelableCallback mCallback;
    private CameraUpdate mCameraUpdate;
    private int mCameraMode;

    private boolean isCameraActionFinished;
    private boolean isCameraActionCancelled;

    private WeakReference<TrackAsiaMap> mMap;

    public CameraUpdateItem(TrackAsiaMap map, CameraUpdate update, int duration, TrackAsiaMap.CancelableCallback callback, @CameraMode.Mode int cameraMode) {
        mCameraUpdate = update;
        mDuration = duration;
        mCallback = callback;
        mCameraMode = cameraMode;
        mMap = new WeakReference<>(map);
    }

    public int getDuration() {
        return mDuration;
    }

    @Override
    public void run() {
        final TrackAsiaMap.CancelableCallback callback = new TrackAsiaMap.CancelableCallback() {
            @Override
            public void onCancel() {
                handleCallbackResponse(true);
            }

            @Override
            public void onFinish() {
                handleCallbackResponse(false);
            }
        };

        TrackAsiaMap map = mMap.get();
        if (map == null) {
            isCameraActionCancelled = true;
            return;
        }

        // animateCamera / easeCamera only allows positive duration
        if (mDuration == 0 || mCameraMode == CameraMode.NONE) {
            map.moveCamera(mCameraUpdate, callback);
            return;
        }

        // On iOS a duration of -1 means default or dynamic duration (based on flight-path length)
        // On Android we can fallback to TrackAsia's default duration as there is no such API
        int duration = mDuration < 0 ? TrackAsiaConstants.ANIMATION_DURATION : mDuration;

        if (mCameraMode == CameraMode.FLIGHT) {
            map.animateCamera(mCameraUpdate, duration, callback);
        } else if (mCameraMode == CameraMode.LINEAR) {
            map.easeCamera(mCameraUpdate, duration, false, callback);
        } else if (mCameraMode == CameraMode.EASE) {
            map.easeCamera(mCameraUpdate, duration, true, callback);
        }
    }

    @Override
    public boolean cancel(boolean mayInterruptIfRunning) {
        return false;
    }

    @Override
    public boolean isCancelled() {
        return isCameraActionCancelled;
    }

    @Override
    public boolean isDone() {
        return isCameraActionFinished;
    }

    @Override
    public Void get() throws InterruptedException, ExecutionException {
        return null;
    }

    @Override
    public Void get(long timeout, @NonNull TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException {
        return null;
    }

    private void handleCallbackResponse(boolean isCancel) {
        if (mCallback == null) {
            return;
        }

        isCameraActionCancelled = isCancel;
        isCameraActionFinished = !isCancel;

        if (isCancel) {
            mCallback.onCancel();
        } else {
            mCallback.onFinish();
        }
    }
}
