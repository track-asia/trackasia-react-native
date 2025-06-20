package com.trackasia.reactnative.components.annotation;

import android.content.Context;
import android.graphics.PointF;
import android.graphics.Bitmap;
import android.view.View;
import androidx.annotation.NonNull;

import com.trackasia.geojson.Point;
import com.trackasia.android.geometry.LatLng;
import com.trackasia.android.maps.Style;
import com.trackasia.android.plugins.annotation.Symbol;
import com.trackasia.android.plugins.annotation.SymbolManager;
import com.trackasia.android.plugins.annotation.SymbolOptions;
import com.trackasia.android.maps.TrackAsiaMap;

import com.trackasia.reactnative.components.AbstractMapFeature;
import com.trackasia.reactnative.components.mapview.MLRNMapView;
import com.trackasia.reactnative.events.PointAnnotationClickEvent;
import com.trackasia.reactnative.events.PointAnnotationDragEvent;
import com.trackasia.reactnative.events.constants.EventTypes;
import com.trackasia.reactnative.utils.GeoJSONUtils;
import com.trackasia.reactnative.utils.BitmapUtils;

public class MLRNPointAnnotation extends AbstractMapFeature implements View.OnLayoutChangeListener {
    private Context mContext;
    private MLRNPointAnnotationManager mManager;
    private Symbol mAnnotation;
    private TrackAsiaMap mMap;
    private MLRNMapView mMapView;

    private boolean mHasChildren;

    private Point mCoordinate;

    private String mID;
    private String mTitle;
    private String mSnippet;

    private Float[] mAnchor;
    private boolean mIsSelected;
    private boolean mDraggable;

    private View mChildView;
    private Bitmap mChildBitmap;
    private String mChildBitmapId;

    private View mCalloutView;
    private Symbol mCalloutSymbol;
    private Bitmap mCalloutBitmap;
    private String mCalloutBitmapId;

    private static final String MARKER_IMAGE_ID = "MARKER_IMAGE_ID";

    public MLRNPointAnnotation(Context context, MLRNPointAnnotationManager manager) {
        super(context);
        mContext = context;
        mManager = manager;
    }

    @Override
    public void addView(View childView, int childPosition) {
        if (childView instanceof MLRNCallout) {
            mCalloutView = childView;
        } else {
            mChildView = childView;
        }
        childView.addOnLayoutChangeListener(this);
        if (mMapView != null) {
            mMapView.offscreenAnnotationViewContainer().addView(childView);
        }
    }

    @Override
    public void removeView(View childView) {
        if (mChildView != null) {
            mMap.getStyle(new Style.OnStyleLoaded() {
                @Override
                public void onStyleLoaded(@NonNull Style style) {
                    style.removeImage(mChildBitmapId);
                    mChildView = null;
                    mCalloutView = null;
                    mChildBitmap = null;
                    mChildBitmapId = null;
                    updateOptions();
                }
            });
        }
        if (mMapView != null) {
            mMapView.offscreenAnnotationViewContainer().removeView(childView);
        }
    }

    @Override
    public void addToMap(MLRNMapView mapView) {
        mMapView = mapView;
        mMap = mapView.getMapboxMap();
        makeMarker();

        if (mChildView != null) {
            if (!mChildView.isAttachedToWindow()) {
                mMapView.offscreenAnnotationViewContainer().addView(mChildView);
            }
            addBitmapToStyle(mChildBitmap, mChildBitmapId);
            updateOptions();
        }
        if (mCalloutView != null) {
            if (!mCalloutView.isAttachedToWindow()) {
                mMapView.offscreenAnnotationViewContainer().addView(mCalloutView);
            }
            addBitmapToStyle(mCalloutBitmap, mCalloutBitmapId);
        }
    }

    @Override
    public void removeFromMap(MLRNMapView mapView) {
        MLRNMapView map = (mMapView != null) ? mMapView : mapView;
        if (map == null) {
            return;
        }

        if (mAnnotation != null) {
            map.getSymbolManager().delete(mAnnotation);
        }
        if (mChildView != null) {
            map.offscreenAnnotationViewContainer().removeView(mChildView);
        }
        if (mCalloutView != null) {
            map.offscreenAnnotationViewContainer().removeView(mCalloutView);
        }
    }

    @Override
    public void onLayoutChange(View v, int left, int top, int right, int bottom, int oldLeft, int oldTop,
            int oldRight, int oldBottom) {
        if (left == 0 && top == 0 && right == 0 && bottom == 0) {
            return;
        }
        if (left != oldLeft || right != oldRight || top != oldTop || bottom != oldBottom) {
            refreshBitmap(v, left, top, right, bottom);
        }
    }

    private void refreshBitmap(View v, int left, int top, int right, int bottom) {
        Bitmap bitmap = BitmapUtils.viewToBitmap(v, left, top, right, bottom);
        String bitmapId = Integer.toString(v.getId());
        addBitmapToStyle(bitmap, bitmapId);
        if (v instanceof MLRNCallout) {
            mCalloutBitmap = bitmap;
            mCalloutBitmapId = bitmapId;
        } else {
            if (bitmap != null) {
                mChildBitmap = bitmap;
                mChildBitmapId = bitmapId;
                updateOptions();
            }
        }
    }

    private void refreshBitmap(View v) {
        refreshBitmap(v, v.getLeft(), v.getTop(), v.getRight(), v.getBottom());
    }

    public LatLng getLatLng() {
        return GeoJSONUtils.toLatLng(mCoordinate);
    }

    public long getMapboxID() {
        return mAnnotation == null ? -1 : mAnnotation.getId();
    }

    public String getID() {
        return mID;
    }

    public void setID(String id) {
        mID = id;
    }

    public View getCalloutView() {
        return mCalloutView;
    }

    public void setCoordinate(Point point) {
        mCoordinate = point;

        if (mAnnotation != null) {
            mAnnotation.setLatLng(GeoJSONUtils.toLatLng(point));
            mMapView.getSymbolManager().update(mAnnotation);
        }
        if (mCalloutSymbol != null) {
            mCalloutSymbol.setLatLng(GeoJSONUtils.toLatLng(point));
            mMapView.getSymbolManager().update(mCalloutSymbol);
        }
    }

    public void setAnchor(float x, float y) {
        mAnchor = new Float[]{x, y};

        if (mAnnotation != null) {
            updateAnchor();
            mMapView.getSymbolManager().update(mAnnotation);
        }
    }

    public void setDraggable(Boolean draggable) {
        mDraggable = draggable;
        if (mAnnotation != null) {
            mAnnotation.setDraggable(draggable);
            mMapView.getSymbolManager().update(mAnnotation);
        }
    }

    public Symbol getMarker() {
        return mAnnotation;
    }

    public void onSelect(boolean shouldSendEvent) {
        if (mCalloutView != null) {
            makeCallout();
        }
        if (shouldSendEvent) {
            mManager.handleEvent(makeEvent(true));
        }
    }

    public void onDeselect() {
        mManager.handleEvent(makeEvent(false));
        if (mCalloutSymbol != null) {
            mMapView.getSymbolManager().delete(mCalloutSymbol);
        }
    }

    public void onDragStart() {
        LatLng latLng = mAnnotation.getLatLng();
        mCoordinate = Point.fromLngLat(latLng.getLongitude(), latLng.getLatitude());
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG_START));
    }

    public void onDrag() {
        LatLng latLng = mAnnotation.getLatLng();
        mCoordinate = Point.fromLngLat(latLng.getLongitude(), latLng.getLatitude());
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG));
    }

    public void onDragEnd() {
        LatLng latLng = mAnnotation.getLatLng();
        mCoordinate = Point.fromLngLat(latLng.getLongitude(), latLng.getLatitude());
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG_END));
    }

    public void makeMarker() {
        SymbolOptions options = new SymbolOptions()
            .withLatLng(GeoJSONUtils.toLatLng(mCoordinate))
            .withDraggable(mDraggable)
            .withIconSize(1.0f)
            .withSymbolSortKey(10.0f);
        SymbolManager symbolManager = mMapView.getSymbolManager();
        if (symbolManager != null) {
            mAnnotation = symbolManager.create(options);
            updateOptions();
        }
    }

    private void updateOptions() {
        if (mAnnotation != null) {
            updateIconImage();
            updateAnchor();
            mMapView.getSymbolManager().update(mAnnotation);
        }
    }

    private void updateIconImage() {
        if (mChildView != null) {
            if (mChildBitmapId != null) {
                mAnnotation.setIconImage(mChildBitmapId);
            }
        } else {
            mAnnotation.setIconImage(MARKER_IMAGE_ID);
            mAnnotation.setIconAnchor("bottom");
        }
    }

    private void updateAnchor() {
        if (mAnchor != null && mChildView != null && mChildBitmap != null) {
            int w = mChildBitmap.getWidth();
            int h = mChildBitmap.getHeight();
            final float scale = getResources().getDisplayMetrics().density;
            w = (int) (w / scale);
            h = (int) (h / scale);
            mAnnotation.setIconAnchor("top-left");
            mAnnotation.setIconOffset(new PointF(w * mAnchor[0] * -1, h * mAnchor[1] * -1));
        }
    }

    private void makeCallout() {
        float yOffset = -28f;
        if (mChildView != null) {
            if (mChildBitmap != null) {
                float scale = getResources().getDisplayMetrics().density;
                int h = (int) mChildBitmap.getHeight() / 2;
                h = (int) (h / scale);
                yOffset = (float) h * -1;
            }
        }
        SymbolOptions options = new SymbolOptions()
            .withLatLng(GeoJSONUtils.toLatLng(mCoordinate))
            .withIconImage(mCalloutBitmapId)
            .withIconSize(1.0f)
            .withIconAnchor("bottom")
            .withIconOffset(new Float[] {0f, yOffset})
            .withSymbolSortKey(11.0f)
            .withDraggable(false);
        SymbolManager symbolManager = mMapView.getSymbolManager();
        if (symbolManager != null) {
            mCalloutSymbol = symbolManager.create(options);
        }
    }

    private void addBitmapToStyle(final Bitmap bitmap, final String bitmapId) {
        if (mMap != null && bitmapId != null && bitmap != null) {
            mMap.getStyle(new Style.OnStyleLoaded() {
                @Override
                public void onStyleLoaded(@NonNull Style style) {
                    style.addImage(bitmapId, bitmap);
                }
            });
        }
    }

    private PointAnnotationClickEvent makeEvent(boolean isSelect) {
        String type = isSelect ? EventTypes.ANNOTATION_SELECTED : EventTypes.ANNOTATION_DESELECTED;
        LatLng latLng = GeoJSONUtils.toLatLng(mCoordinate);
        PointF screenPos = getScreenPosition(latLng);
        return new PointAnnotationClickEvent(this, latLng, screenPos, type);
    }

    private PointAnnotationDragEvent makeDragEvent(String type) {
        LatLng latLng = GeoJSONUtils.toLatLng(mCoordinate);
        PointF screenPos = getScreenPosition(latLng);
        return new PointAnnotationDragEvent(this, latLng, screenPos, type);
    }

    private float getDisplayDensity() {
        return mContext.getResources().getDisplayMetrics().density;
    }

    private PointF getScreenPosition(LatLng latLng) {
        PointF screenPos = mMap.getProjection().toScreenLocation(latLng);
        float density = getDisplayDensity();
        screenPos.x /= density;
        screenPos.y /= density;
        return screenPos;
    }

    public void refresh() {
        if (mChildView != null) {
            refreshBitmap(mChildView);
        }
    }
}
