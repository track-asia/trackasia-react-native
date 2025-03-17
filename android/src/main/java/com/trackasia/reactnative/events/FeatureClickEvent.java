package com.trackasia.reactnative.events;

import android.graphics.PointF;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.trackasia.geojson.Feature;
import com.trackasia.android.geometry.LatLng;
import com.trackasia.reactnative.components.styles.sources.MLRNSource;
import com.trackasia.reactnative.events.constants.EventKeys;
import com.trackasia.reactnative.events.constants.EventTypes;
import com.trackasia.reactnative.utils.ConvertUtils;
import com.trackasia.reactnative.utils.GeoJSONUtils;

import java.util.List;

public class FeatureClickEvent extends AbstractEvent {
    private String mEventKey;
    private List<Feature> mFeatures;
    private LatLng mLatLng;
    private PointF mPoint;

    public FeatureClickEvent(View view, String eventKey, String eventType, List<Feature> features, LatLng latLng, PointF point) {
        super(view, eventType);
        mFeatures = features;
        mEventKey = eventKey;
        mLatLng = latLng;
        mPoint = point;
    }

    @Override
    public String getKey() {
        return mEventKey;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap map = Arguments.createMap();
        WritableArray features = Arguments.createArray();

        for(Feature feature : mFeatures) {
            features.pushMap(GeoJSONUtils.fromFeature(feature));
        }
        map.putArray("features", features);

        WritableMap coordinates = Arguments.createMap();
        coordinates.putDouble("latitude", mLatLng.getLatitude());
        coordinates.putDouble("longitude", mLatLng.getLongitude());
        map.putMap("coordinates", coordinates);

        WritableMap point = Arguments.createMap();
        point.putDouble("x", mPoint.x);
        point.putDouble("y", mPoint.y);
        map.putMap("point", point);

        return map;
    }

    public static FeatureClickEvent makeShapeSourceEvent(View view, MLRNSource.OnPressEvent event) {
        return new FeatureClickEvent(view, EventKeys.SHAPE_SOURCE_LAYER_CLICK,
                EventTypes.SHAPE_SOURCE_LAYER_CLICK, event.features, event.latLng, event.screenPoint);
    }

    public static FeatureClickEvent makeVectorSourceEvent(View view, MLRNSource.OnPressEvent event) {
        return new FeatureClickEvent(view, EventKeys.VECTOR_SOURCE_LAYER_CLICK,
                EventTypes.VECTOR_SOURCE_LAYER_CLICK, event.features, event.latLng, event.screenPoint);
    }

    public static FeatureClickEvent makeRasterSourceEvent(View view, MLRNSource.OnPressEvent event) {
        return new FeatureClickEvent(view, EventKeys.RASTER_SOURCE_LAYER_CLICK,
                EventTypes.RASTER_SOURCE_LAYER_CLICK, event.features, event.latLng, event.screenPoint);
    }
}
