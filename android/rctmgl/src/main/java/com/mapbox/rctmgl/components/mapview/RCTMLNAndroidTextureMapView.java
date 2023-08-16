package com.mapbox.rctmgl.components.mapview;

import android.content.Context;
import com.trackasia.android.maps.TrackasiaMapOptions;
/**
 * Created by hernanmateo on 12/11/18.
 */

@SuppressWarnings({"MissingPermission"})
public class RCTMLNAndroidTextureMapView extends RCTMLNMapView {
	public static final String LOG_TAG = "RCTMLNAndroidTextureMapView";
	
    public RCTMLNAndroidTextureMapView(Context context, RCTMLNAndroidTextureMapViewManager manager, TrackasiaMapOptions options) {
        super(context, manager, options);
    }
}
