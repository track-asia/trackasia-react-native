package com.trackasia.reactnative.components.styles.layers;

import android.content.Context;

import com.trackasia.android.style.layers.RasterLayer;
import com.trackasia.reactnative.components.styles.MLRNStyle;
import com.trackasia.reactnative.components.styles.MLRNStyleFactory;

public class MLRNRasterLayer extends MLRNLayer<RasterLayer> {
    public MLRNRasterLayer(Context context) {
        super(context);
    }

    @Override
    public RasterLayer makeLayer() {
        return new RasterLayer(mID, mSourceID);
    }

    @Override
    public void addStyles() {
        MLRNStyleFactory.setRasterLayerStyle(mLayer, new MLRNStyle(getContext(), mReactStyle, mMap));
    }
}
