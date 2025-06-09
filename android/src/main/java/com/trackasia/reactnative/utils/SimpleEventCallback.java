package com.trackasia.reactnative.utils;

import com.trackasia.android.maps.TrackAsiaMap;

import com.trackasia.reactnative.components.AbstractEventEmitter;
import com.trackasia.reactnative.events.IEvent;

public class SimpleEventCallback implements TrackAsiaMap.CancelableCallback {
    private AbstractEventEmitter mEventEmitter;
    private IEvent mEvent;

    public SimpleEventCallback(AbstractEventEmitter eventEmitter, IEvent event) {
        mEventEmitter = eventEmitter;
        mEvent = event;
    }

    @Override
    public void onCancel() {
        mEventEmitter.handleEvent(mEvent);
    }

    @Override
    public void onFinish() {
        mEventEmitter.handleEvent(mEvent);
    }
}
