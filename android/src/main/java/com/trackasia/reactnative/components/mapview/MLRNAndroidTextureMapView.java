package com.trackasia.reactnative.components.mapview;

import android.content.Context;
import com.trackasia.android.maps.TrackAsiaMapOptions;

@SuppressWarnings({"MissingPermission"})
public class MLRNAndroidTextureMapView extends MLRNMapView {
	public static final String LOG_TAG = "MLRNAndroidTextureMapView";
	
    public MLRNAndroidTextureMapView(Context context, MLRNAndroidTextureMapViewManager manager, TrackAsiaMapOptions options) {
        super(context, manager, options);
    }
}
