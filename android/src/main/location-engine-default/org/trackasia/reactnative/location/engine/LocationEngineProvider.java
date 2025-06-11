package com.trackasia.reactnative.location.engine;

import android.content.Context;

import com.trackasia.android.location.engine.LocationEngine;

public class LocationEngineProvider implements LocationEngineProvidable {
    @Override
    public LocationEngine getLocationEngine(Context context) {
        return new DefaultLocationEngineProvider().getLocationEngine(context);
    }
}
