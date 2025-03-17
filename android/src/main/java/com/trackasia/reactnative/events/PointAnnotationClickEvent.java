package com.trackasia.reactnative.events;

import android.graphics.PointF;
import androidx.annotation.NonNull;
import android.view.View;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.trackasia.android.plugins.markerview.MarkerView;
import com.trackasia.android.geometry.LatLng;
import com.trackasia.reactnative.components.annotation.MLRNPointAnnotation;
import com.trackasia.reactnative.events.constants.EventKeys;
import com.trackasia.reactnative.events.constants.EventTypes;
import com.trackasia.reactnative.utils.ConvertUtils;
import com.trackasia.reactnative.utils.GeoJSONUtils;

public class PointAnnotationClickEvent extends MapClickEvent {
    private MLRNPointAnnotation mView;
    private LatLng mTouchedLatLng;
    private PointF mScreenPoint;

    public PointAnnotationClickEvent(MLRNPointAnnotation view, @NonNull LatLng latLng, @NonNull PointF screenPoint, String eventType) {
        super(view, latLng, screenPoint, eventType);
        mView = view;
        mTouchedLatLng = latLng;
        mScreenPoint = screenPoint;
    }

    @Override
    public String getKey() {
        return getType().equals(EventTypes.ANNOTATION_SELECTED) ? EventKeys.POINT_ANNOTATION_SELECTED : EventKeys.POINT_ANNOTATION_DESELECTED;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap properties = new WritableNativeMap();
        properties.putString("id", mView.getID());
        properties.putDouble("screenPointX", mScreenPoint.x);
        properties.putDouble("screenPointY", mScreenPoint.y);
        return GeoJSONUtils.toPointFeature(mTouchedLatLng, properties);
    }
}
