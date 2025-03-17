package com.trackasia.reactnative.components.styles.layers;

import android.content.Context;

import com.trackasia.android.style.expressions.Expression;
import com.trackasia.android.style.layers.HeatmapLayer;
import com.trackasia.reactnative.components.mapview.MLRNMapView;
import com.trackasia.reactnative.components.styles.MLRNStyle;
import com.trackasia.reactnative.components.styles.MLRNStyleFactory;

public class MLRNHeatmapLayer extends MLRNLayer<HeatmapLayer> {
    private String mSourceLayerID;

    public MLRNHeatmapLayer(Context context){
        super(context);
    }

    @Override
    protected void updateFilter(Expression expression) {
        mLayer.setFilter(expression);
    }

    @Override
    public void addToMap(MLRNMapView mapView) {
        super.addToMap(mapView);
    }

    @Override
    public HeatmapLayer makeLayer() {
        HeatmapLayer layer = new HeatmapLayer(mID, mSourceID);

        if (mSourceLayerID != null) {
            layer.setSourceLayer(mSourceLayerID);
        }

        return layer;
    }

    @Override
    public void addStyles() {
        MLRNStyleFactory.setHeatmapLayerStyle(mLayer, new MLRNStyle(getContext(), mReactStyle, mMap));
    }

    public void setSourceLayerID(String sourceLayerID) {
        mSourceLayerID = sourceLayerID;

        if (mLayer != null) {
            mLayer.setSourceLayer(sourceLayerID);
        }
    }
}
