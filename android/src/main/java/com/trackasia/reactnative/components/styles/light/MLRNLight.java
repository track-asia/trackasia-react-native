package com.trackasia.reactnative.components.styles.light;

import android.content.Context;

import com.facebook.react.bridge.ReadableMap;
import com.trackasia.android.maps.TrackAsiaMap;
import com.trackasia.android.maps.Style;
import com.trackasia.android.style.layers.TransitionOptions;
import com.trackasia.android.style.light.Light;
import com.trackasia.android.style.light.Position;
import com.trackasia.reactnative.components.AbstractMapFeature;
import com.trackasia.reactnative.components.mapview.MLRNMapView;
import com.trackasia.reactnative.components.styles.MLRNStyle;
import com.trackasia.reactnative.components.styles.MLRNStyleFactory;

import java.util.HashMap;
import java.util.Map;

public class MLRNLight extends AbstractMapFeature {
    private TrackAsiaMap mMap;
    private ReadableMap mReactStyle;

    public MLRNLight(Context context) {
        super(context);
    }

    @Override
    public void addToMap(MLRNMapView mapView) {
        mMap = mapView.getMapboxMap();
        setLight();
    }

    @Override
    public void removeFromMap(MLRNMapView mapView) {
        // ignore there's nothing to remove just update the light style
    }

    public void setReactStyle(ReadableMap reactStyle) {
        mReactStyle = reactStyle;

        setLight();
    }

    private void setLight(Light light) {
        MLRNStyleFactory.setLightLayerStyle(light, new MLRNStyle(getContext(), mReactStyle, mMap));
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
