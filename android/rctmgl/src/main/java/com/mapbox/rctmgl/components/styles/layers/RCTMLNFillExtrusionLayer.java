package com.mapbox.rctmgl.components.styles.layers;

import android.content.Context;

import com.trackasia.android.style.expressions.Expression;
import com.trackasia.android.style.layers.FillExtrusionLayer;
import com.mapbox.rctmgl.components.mapview.RCTMLNMapView;
import com.mapbox.rctmgl.components.styles.RCTMLNStyle;
import com.mapbox.rctmgl.components.styles.RCTMLNStyleFactory;

/**
 * Created by nickitaliano on 9/15/17.
 */

public class RCTMLNFillExtrusionLayer extends RCTLayer<FillExtrusionLayer> {
    private String mSourceLayerID;

    public RCTMLNFillExtrusionLayer(Context context) {
        super(context);
    }

    @Override
    protected void updateFilter(Expression expression) {
        mLayer.setFilter(expression);
    }

    @Override
    public void addToMap(RCTMLNMapView mapView) {
        super.addToMap(mapView);
    }

    @Override
    public FillExtrusionLayer makeLayer() {
        FillExtrusionLayer layer = new FillExtrusionLayer(mID, mSourceID);

        if (mSourceLayerID != null) {
            layer.setSourceLayer(mSourceLayerID);
        }

        return layer;
    }

    @Override
    public void addStyles() {
        RCTMLNStyleFactory.setFillExtrusionLayerStyle(mLayer, new RCTMLNStyle(getContext(), mReactStyle, mMap));
    }

    public void setSourceLayerID(String sourceLayerID) {
        mSourceLayerID = sourceLayerID;

        if (mLayer != null) {
            mLayer.setSourceLayer(mSourceLayerID);
        }
    }
}
