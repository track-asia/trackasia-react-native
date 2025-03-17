package com.trackasia.reactnative.location.engine;

import android.content.Context;

import com.trackasia.android.location.engine.LocationEngine;

public interface LocationEngineProvidable {
    LocationEngine getLocationEngine(Context context);
}