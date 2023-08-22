package com.mapbox.rctmgl.components.styles.light;

import android.content.Context;

import com.facebook.react.bridge.ReadableMap;
import com.trackasia.android.maps.TrackasiaMap;
import com.trackasia.android.maps.Style;
import com.trackasia.android.style.layers.TransitionOptions;
import com.trackasia.android.style.light.Light;
import com.trackasia.android.style.light.Position;
import com.mapbox.rctmgl.components.AbstractMapFeature;
import com.mapbox.rctmgl.components.mapview.RCTMGLMapView;
import com.mapbox.rctmgl.components.styles.RCTMGLStyle;
import com.mapbox.rctmgl.components.styles.RCTMGLStyleFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by nickitaliano on 9/26/17.
 */

public class RCTMGLLight extends AbstractMapFeature {
    private TrackasiaMap mMap;
    private ReadableMap mReactStyle;

    public RCTMGLLight(Context context) {
        super(context);
    }

    @Override
    public void addToMap(RCTMGLMapView mapView) {
        mMap = mapView.getTrackasiaMap();
        setLight();
    }

    @Override
    public void removeFromMap(RCTMGLMapView mapView) {
        // ignore there's nothing to remove just update the light style
    }

    public void setReactStyle(ReadableMap reactStyle) {
        mReactStyle = reactStyle;

        setLight();
    }

    private void setLight(Light light) {
        RCTMGLStyleFactory.setLightLayerStyle(light, new RCTMGLStyle(getContext(), mReactStyle, mMap));
    }

    private void setLight() {
        Style style = getStyle();
        if (style != null) {
            setLight(style.getLight());
        }
    }

    private Style getStyle() {
        if (mMap == null) {
            return null;
        }
        return mMap.getStyle();
    }
}
