package com.trackasia.reactnative.components.styles.sources;

import android.content.Context;

import com.trackasia.geojson.Feature;
import com.trackasia.android.style.sources.RasterSource;

import static com.trackasia.android.style.sources.RasterSource.DEFAULT_TILE_SIZE;

public class MLRNRasterSource extends MLRNTileSource<RasterSource> {
    private Integer mTileSize;

    public MLRNRasterSource(Context context) {
        super(context);
    }

    @Override
    public RasterSource makeSource() {
        String configurationUrl = getURL();
        int tileSize = mTileSize == null ? DEFAULT_TILE_SIZE : mTileSize;
        if (configurationUrl != null) {
            return new RasterSource(mID, configurationUrl, tileSize);
        }
        return new RasterSource(mID, buildTileset(), tileSize);
    }


    public void setTileSize(int tileSize) {
        mTileSize = tileSize;
    }

    @Override
    public boolean hasPressListener() {
        return false;
    }

    @Override
    public void onPress(OnPressEvent feature) {
        // ignore, cannot query raster layers
    }
}
