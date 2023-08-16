package com.mapbox.rctmgl.components.styles.layers;

import android.content.Context;

import com.trackasia.android.style.expressions.Expression;
import com.trackasia.android.style.layers.FillLayer;
import com.mapbox.rctmgl.components.mapview.RCTMLNMapView;
import com.mapbox.rctmgl.components.styles.RCTMLNStyle;
import com.mapbox.rctmgl.components.styles.RCTMLNStyleFactory;

/**
 * Created by nickitaliano on 9/8/17.
 */

public class RCTMLNFillLayer extends RCTLayer<FillLayer> {
    private String mSourceLayerID;

    public RCTMLNFillLayer(Context context) {
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
    public FillLayer makeLayer() {
        FillLayer layer = new FillLayer(mID, mSourceID);

        if (mSourceLayerID != null) {
            layer.setSourceLayer(mSourceLayerID);
        }

        return layer;
    }

    @Override
    public void addStyles() {
        RCTMLNStyleFactory.setFillLayerStyle(mLayer, new RCTMLNStyle(getContext(), mReactStyle, mMap));
    }

    public void setSourceLayerID(String sourceLayerID) {
        mSourceLayerID = sourceLayerID;

        if (mLayer != null) {
            mLayer.setSourceLayer(mSourceLayerID);
        }
    }
}
