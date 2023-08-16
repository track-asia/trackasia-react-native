package com.mapbox.rctmgl.components.styles.light;

import android.content.Context;

import com.facebook.react.bridge.ReadableMap;
import com.trackasia.android.maps.TrackasiaMap;
import com.trackasia.android.maps.Style;
import com.trackasia.android.style.layers.TransitionOptions;
import com.trackasia.android.style.light.Light;
import com.trackasia.android.style.light.Position;
import com.mapbox.rctmgl.components.AbstractMapFeature;
import com.mapbox.rctmgl.components.mapview.RCTMLNMapView;
import com.mapbox.rctmgl.components.styles.RCTMLNStyle;
import com.mapbox.rctmgl.components.styles.RCTMLNStyleFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by nickitaliano on 9/26/17.
 */

public class RCTMLNLight extends AbstractMapFeature {
    private TrackasiaMap mMap;
    private ReadableMap mReactStyle;

    public RCTMLNLight(Context context) {
        super(context);
    }

    @Override
    public void addToMap(RCTMLNMapView mapView) {
        mMap = mapView.getMapboxMap();
        setLight();
    }

    @Override
    public void removeFromMap(RCTMLNMapView mapView) {
        // ignore there's nothing to remove just update the light style
    }

    public void setReactStyle(ReadableMap reactStyle) {
        mReactStyle = reactStyle;

        setLight();
    }

    private void setLight(Light light) {
        RCTMLNStyleFactory.setLightLayerStyle(light, new RCTMLNStyle(getContext(), mReactStyle, mMap));
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
