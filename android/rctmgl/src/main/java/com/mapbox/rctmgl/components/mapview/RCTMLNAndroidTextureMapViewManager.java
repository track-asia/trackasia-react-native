package com.mapbox.rctmgl.components.mapview;

import com.facebook.react.bridge.ReactApplicationContext;
import com.trackasia.android.maps.TrackasiaMapOptions;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by hernanmateo on 12/11/18.
 */

public class RCTMLNAndroidTextureMapViewManager extends RCTMLNMapViewManager {
    public static final String LOG_TAG = "RCTMLNAndroidTextureMapViewManager";
    public static final String REACT_CLASS = "RCTMLNAndroidTextureMapView";

    public RCTMLNAndroidTextureMapViewManager(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected RCTMLNAndroidTextureMapView createViewInstance(ThemedReactContext themedReactContext) {
        TrackasiaMapOptions options = new TrackasiaMapOptions();
        options.textureMode(true);
        return new RCTMLNAndroidTextureMapView(themedReactContext, this, options);
    }
}
