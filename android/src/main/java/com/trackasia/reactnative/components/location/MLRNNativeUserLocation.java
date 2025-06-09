package com.trackasia.reactnative.components.location;

import android.annotation.SuppressLint;
import android.content.Context;
import androidx.annotation.NonNull;

import com.trackasia.android.location.permissions.PermissionsManager;
import com.trackasia.android.location.modes.RenderMode;
import com.trackasia.android.maps.TrackAsiaMap;
import com.trackasia.android.maps.OnMapReadyCallback;
import com.trackasia.android.maps.Style;
import com.trackasia.reactnative.components.AbstractMapFeature;
import com.trackasia.reactnative.components.mapview.MLRNMapView;

public class MLRNNativeUserLocation extends AbstractMapFeature implements OnMapReadyCallback, Style.OnStyleLoaded {
    private boolean mEnabled = true;
    private TrackAsiaMap mMap;
    private MLRNMapView mMapView;
    private @RenderMode.Mode int mRenderMode = RenderMode.COMPASS;
    private int mPreferredFramesPerSecond;

    public MLRNNativeUserLocation(Context context) {
        super(context);
    }

    @Override
    public void addToMap(MLRNMapView mapView) {
        mEnabled = true;
        mMapView = mapView;
        mapView.getMapAsync(this);
        setRenderMode(mRenderMode);
        setPreferredFramesPerSecond(mPreferredFramesPerSecond);
    }

    @Override
    public void removeFromMap(MLRNMapView mapView) {
        mEnabled = false;
        if (mMap != null) mMap.getStyle(this);
    }

    @SuppressLint("MissingPermission")
    @Override
    public void onMapReady(@NonNull TrackAsiaMap mapboxMap) {
        mMap = mapboxMap;
        mapboxMap.getStyle(this);
    }

    @SuppressLint("MissingPermission")
    @Override
    public void onStyleLoaded(@NonNull Style style) {
        Context context = getContext();
        if (!PermissionsManager.areLocationPermissionsGranted(context)) {
            return;
        }

        LocationComponentManager locationComponent = mMapView.getLocationComponentManager();
        locationComponent.update(style);
        locationComponent.showUserLocation(mEnabled);
    }

    public void setRenderMode(@RenderMode.Mode int renderMode) {
        mRenderMode = renderMode;
        if (mMapView != null) {
            LocationComponentManager locationComponent = mMapView.getLocationComponentManager();
            locationComponent.setRenderMode(renderMode);
        }
    }

    public void setPreferredFramesPerSecond(int framesPerSecond) {
        mPreferredFramesPerSecond = framesPerSecond;
        if (mMapView != null) {
            LocationComponentManager locationComponent = mMapView.getLocationComponentManager();
            locationComponent.setPreferredFramesPerSecond(framesPerSecond);
        }
    }
}
