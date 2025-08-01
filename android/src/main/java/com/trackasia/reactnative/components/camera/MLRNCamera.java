package com.trackasia.reactnative.components.camera;

import android.content.Context;
import android.location.Location;
import android.util.Log;

import com.trackasia.android.camera.CameraPosition;
import com.trackasia.android.camera.CameraUpdate;
import com.trackasia.android.camera.CameraUpdateFactory;
import com.trackasia.android.geometry.LatLng;
import com.trackasia.android.geometry.LatLngBounds;
import com.trackasia.android.geometry.VisibleRegion;
import com.trackasia.android.location.OnCameraTrackingChangedListener;
import com.trackasia.android.location.modes.CameraMode;
import com.trackasia.android.maps.TrackAsiaMap;
import com.trackasia.android.maps.Style;

import com.trackasia.reactnative.components.AbstractMapFeature;
import com.trackasia.reactnative.components.location.LocationComponentManager;
import com.trackasia.reactnative.components.mapview.MLRNMapView;
import com.trackasia.reactnative.events.IEvent;
import com.trackasia.reactnative.events.MapUserTrackingModeEvent;
import com.trackasia.reactnative.events.MapChangeEvent;
import com.trackasia.reactnative.location.LocationManager;
import com.trackasia.reactnative.location.UserLocation;
import com.trackasia.reactnative.location.UserLocationVerticalAlignment;
import com.trackasia.reactnative.location.UserTrackingMode;
import com.trackasia.reactnative.location.UserTrackingState;
import com.trackasia.reactnative.utils.GeoJSONUtils;

import com.trackasia.reactnative.events.constants.EventTypes;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import com.trackasia.geojson.Point;

import com.trackasia.android.location.permissions.PermissionsManager;

import androidx.annotation.NonNull;

public class MLRNCamera extends AbstractMapFeature {
    private MLRNCameraManager mManager;
    private MLRNMapView mMapView;

    private boolean hasSentFirstRegion = false;

    private CameraStop mDefaultStop;
    private CameraStop mCameraStop;
    private CameraUpdateQueue mCameraUpdateQueue;

    // private LocationComponent mLocationComponent;
    private LocationComponentManager mLocationComponentManager;

    private int mUserTrackingMode;
    private int mUserTrackingState = UserTrackingState.POSSIBLE;
    private int mUserLocationVerticalAlignment = UserLocationVerticalAlignment.CENTER;

    public static final int USER_LOCATION_CAMERA_MOVE_DURATION = 1000;

    private LocationManager mLocationManager;
    private UserLocation mUserLocation;

    private Point mCenterCoordinate;

    private boolean mAnimated;
    private double mHeading;
    private double mPitch;
    private double mZoomLevel = -1;

    private double mMinZoomLevel = -1;
    private double mMaxZoomLevel = -1;

    private LatLngBounds mMaxBounds;

    private boolean mFollowUserLocation;
    private String mFollowUserMode;

    private Context mContext;


    private LocationManager.OnUserLocationChange mLocationChangeListener = new LocationManager.OnUserLocationChange() {
        @Override
        public void onLocationChange(Location nextLocation) {
            if (getMapboxMap() == null || mLocationComponentManager == null || !mLocationComponentManager.hasLocationComponent() || (!mFollowUserLocation)) {
                return;
            }

            mUserLocation.setCurrentLocation(nextLocation);
            sendUserLocationUpdateEvent(nextLocation);
        }
    };

    private TrackAsiaMap.CancelableCallback mCameraCallback = new TrackAsiaMap.CancelableCallback() {
        @Override
        public void onCancel() {
            if (!hasSentFirstRegion) {
                mMapView.sendRegionChangeEvent(false);
                hasSentFirstRegion = true;
            }
        }

        @Override
        public void onFinish() {
            if (!hasSentFirstRegion) {
                mMapView.sendRegionChangeEvent(false);
                hasSentFirstRegion = true;
            }
        }
    };

    public MLRNCamera(Context context, MLRNCameraManager manager) {
        super(context);
        mContext = context;
        mManager = manager;
        mCameraUpdateQueue = new CameraUpdateQueue();

        mUserLocation = new UserLocation();
        mLocationManager = LocationManager.getInstance(context);
    }

    @Override
    public void addToMap(MLRNMapView mapView) {
        mMapView = mapView;

        setInitialCamera();
        updateMaxMinZoomLevel();
        updateMaxBounds();

        if (mCameraStop != null) {
            updateCamera();
        }

        if (mFollowUserLocation) {
            enableLocation();
        }
    }

    @Override
    public void removeFromMap(MLRNMapView mapView) {

    }

    public void setStop(CameraStop stop) {
        mCameraStop = stop;
        mCameraStop.setCallback(mCameraCallback);

        if (mMapView != null) {
            updateCamera();
        }
    }

    public void setDefaultStop(CameraStop stop) {
        mDefaultStop = stop;
    }

    public void setFollowPitch(double pitch) {
        mPitch = pitch;
        updateCameraPositionIfNeeded(true);
    }

    public void setMaxBounds(LatLngBounds bounds) {
        mMaxBounds = bounds;
        updateMaxBounds();
    }

    private void updateMaxBounds() {
        TrackAsiaMap map = getMapboxMap();
        if (map != null && mMaxBounds != null) {
            map.setLatLngBoundsForCameraTarget(mMaxBounds);
        }
    }

    private void updateMaxMinZoomLevel() {
        TrackAsiaMap map = getMapboxMap();
        if (map != null) {
            if (mMinZoomLevel >= 0.0) {
                map.setMinZoomPreference(mMinZoomLevel);
            }
            if (mMaxZoomLevel >= 0.0) {
                map.setMaxZoomPreference(mMaxZoomLevel);
            }
        }
    }

    private void setInitialCamera() {
        if (mDefaultStop != null) {
            mDefaultStop.setDuration(0);
            mDefaultStop.setMode(com.trackasia.reactnative.components.camera.constants.CameraMode.NONE);
            CameraUpdateItem item = mDefaultStop.toCameraUpdate(mMapView);
            item.run();
        }
    }

    private void updateCamera() {
        mCameraUpdateQueue.offer(mCameraStop);
        mCameraUpdateQueue.execute(mMapView);
    }

    private void updateUserTrackingMode(int userTrackingMode) {
        mUserLocation.setTrackingMode(userTrackingMode);
        IEvent event = new MapUserTrackingModeEvent(this, userTrackingMode);
        mManager.handleEvent(event);
    }

    private void updateUserLocation(boolean isAnimated) {
        if ((!mFollowUserLocation) || mUserLocation.getTrackingMode() == UserTrackingMode.NONE) {
            return;
        }

        if (mUserTrackingState == UserTrackingState.POSSIBLE) {
            updateUserLocationSignificantly(isAnimated);
        } else if (mUserTrackingState == UserTrackingState.CHANGED) {
            updateUserLocationIncrementally(isAnimated);
        }
    }

    private CameraPosition getUserLocationUpdateCameraPosition(double zoomLevel) {
        LatLng center = mUserLocation.getCoordinate();

        if (mUserLocationVerticalAlignment != UserLocationVerticalAlignment.CENTER) {
            VisibleRegion region = mMapView.getVisibleRegion(center, zoomLevel);

            switch (mUserLocationVerticalAlignment) {
                case UserLocationVerticalAlignment.TOP:
                    center = new LatLng(region.nearRight.getLatitude(), center.getLongitude());
                    break;
                case UserLocationVerticalAlignment.BOTTOM:
                    center = new LatLng(region.farLeft.getLatitude(), center.getLongitude());
                    break;
            }
        }

        return new CameraPosition.Builder().target(center).bearing(getDirectionForUserLocationUpdate()).tilt(mPitch).zoom(zoomLevel).build();
    }

    private double getDirectionForUserLocationUpdate() {
        // NOTE: The direction of this is used for map rotation only, not location layer rotation
        CameraPosition currentCamera = mMapView.getCameraPosition();
        double direction = currentCamera.bearing;

        int userTrackingMode = mUserLocation.getTrackingMode();
        if (userTrackingMode == UserTrackingMode.FollowWithHeading || userTrackingMode == UserTrackingMode.FollowWithCourse) {
            direction = mUserLocation.getBearing();
        } else if (mHeading != 0.0) {
            direction = mHeading;
        }

        return direction;
    }

    private void sendUserLocationUpdateEvent(Location location) {
        if (location == null) {
            return;
        }
        IEvent event = new MapChangeEvent(this, EventTypes.USER_LOCATION_UPDATED, makeLocationChangePayload(location));
        mManager.handleEvent(event);
    }

    private boolean hasSetCenterCoordinate() {
        CameraPosition cameraPosition = mMapView.getCameraPosition();
        LatLng center = cameraPosition.target;
        return center.getLatitude() != 0.0 && center.getLongitude() != 0.0;
    }

    static final double minimumZoomLevelForUserTracking = 10.5;
    static final double defaultZoomLevelForUserTracking = 14.0;

    private void updateUserLocationSignificantly(boolean isAnimated) {
        mUserTrackingState = UserTrackingState.BEGAN;

        double zoom = mZoomLevel;
        if (zoom < 0) {
            double cameraZoom = mMapView.getMapboxMap().getCameraPosition().zoom;
            if (cameraZoom < minimumZoomLevelForUserTracking) {
                zoom = defaultZoomLevelForUserTracking;
            } else {
                zoom = cameraZoom;
            }
        }
        CameraUpdate cameraUpdate = CameraUpdateFactory.newCameraPosition(getUserLocationUpdateCameraPosition(zoom));
        TrackAsiaMap.CancelableCallback cameraCallback = new TrackAsiaMap.CancelableCallback() {
            @Override
            public void onCancel() {
                mUserTrackingState = UserTrackingState.CHANGED;
            }

            @Override
            public void onFinish() {
                mUserTrackingState = UserTrackingState.CHANGED;
            }
        };

        if (isAnimated && hasSetCenterCoordinate()) {
            mMapView.animateCamera(cameraUpdate, cameraCallback);
        } else {
            mMapView.moveCamera(cameraUpdate, cameraCallback);
        }
    }

    private void updateUserLocationIncrementally(boolean isAnimated) {
        mUserTrackingState = UserTrackingState.BEGAN;

        CameraPosition cameraPosition = mMapView.getCameraPosition();
        CameraUpdate cameraUpdate = CameraUpdateFactory.newCameraPosition(getUserLocationUpdateCameraPosition(cameraPosition.zoom));

        TrackAsiaMap.CancelableCallback callback = new TrackAsiaMap.CancelableCallback() {
            @Override
            public void onCancel() {
                mUserTrackingState = UserTrackingState.CHANGED;
            }

            @Override
            public void onFinish() {
                mUserTrackingState = UserTrackingState.CHANGED;
            }
        };

        if (isAnimated) {
            mMapView.easeCamera(cameraUpdate, USER_LOCATION_CAMERA_MOVE_DURATION, true, callback);
        } else {
            mMapView.moveCamera(cameraUpdate, callback);
        }
    }

    private void enableLocation() {
        if (!PermissionsManager.areLocationPermissionsGranted(mContext)) {
            return;
        }

        if (!mLocationManager.isActive()) {
            mLocationManager.enable();
        }

        mMapView.getMapboxMap().getStyle(new Style.OnStyleLoaded() {
            @Override
            public void onStyleLoaded(@NonNull Style style) {
                enableLocationComponent(style);
            }
        });
    }

    private void enableLocationComponent(@NonNull Style style) {
        updateUserLocation(false);
        updateLocationLayer(style);

        Location lastKnownLocation = mLocationManager.getLastKnownLocation();
        mLocationManager.addLocationListener(mLocationChangeListener);

        if (lastKnownLocation != null) {
            mLocationChangeListener.onLocationChange(lastKnownLocation);

            postDelayed(new Runnable() {
                @Override
                public void run() {
                    mMapView.sendRegionDidChangeEvent();
                }
            }, 200);
        }

    }

    private void updateLocationLayer(@NonNull Style style) {
        if (mLocationComponentManager == null) {
            mLocationComponentManager = mMapView.getLocationComponentManager();
        }

        mLocationComponentManager.update(style);
        mLocationComponentManager.setFollowUserLocation(mFollowUserLocation);

        if (mFollowUserLocation) {
            mLocationComponentManager.setCameraMode(UserTrackingMode.getCameraMode(mUserTrackingMode));
            mLocationComponentManager.addOnCameraTrackingChangedListener(new OnCameraTrackingChangedListener() {
                @Override
                public void onCameraTrackingChanged(int currentMode) {
                    int userTrackingMode;

                    switch (currentMode) {
                        case CameraMode.NONE:
                            userTrackingMode = UserTrackingMode.NONE;
                            break;
                        case CameraMode.TRACKING:
                            userTrackingMode = UserTrackingMode.FOLLOW;
                            break;
                        case CameraMode.TRACKING_COMPASS:
                            userTrackingMode = UserTrackingMode.FollowWithHeading;
                            break;
                        case CameraMode.TRACKING_GPS:
                            userTrackingMode = UserTrackingMode.FollowWithCourse;
                            break;
                        default:
                            userTrackingMode = UserTrackingMode.NONE;
                    }

                    updateUserTrackingMode(userTrackingMode);
                }

                @Override
                public void onCameraTrackingDismissed() {
                }
            });
        } else {
            mLocationComponentManager.setCameraMode(CameraMode.NONE);
        }
    }

    public void setMinZoomLevel(double zoomLevel) {
        mMinZoomLevel = zoomLevel;
        updateMaxMinZoomLevel();
    }

    public void setMaxZoomLevel(double zoomLevel) {
        mMaxZoomLevel = zoomLevel;
        updateMaxMinZoomLevel();
    }

    public void setZoomLevel(double zoomLevel) {
        mZoomLevel = zoomLevel;
        updateCameraPositionIfNeeded(false);
    }

    private CameraPosition buildCamera(CameraPosition previousPosition, boolean shouldUpdateTarget) {
        CameraPosition.Builder builder = new CameraPosition.Builder(previousPosition).bearing(mHeading).tilt(mPitch).zoom(mZoomLevel);

        if (shouldUpdateTarget) {
            builder.target(GeoJSONUtils.toLatLng(mCenterCoordinate));
        }

        return builder.build();
    }

    private void updateCameraPositionIfNeeded(boolean shouldUpdateTarget) {
        if (mMapView != null) {
            CameraPosition prevPosition = mMapView.getCameraPosition();
            CameraUpdate cameraUpdate = CameraUpdateFactory.newCameraPosition(buildCamera(prevPosition, shouldUpdateTarget));

            if (mAnimated) {
                mMapView.easeCamera(cameraUpdate);
            } else {
                mMapView.moveCamera(cameraUpdate);
            }
        }
    }

    public void setUserTrackingMode(int userTrackingMode) {
        int oldTrackingMode = mUserTrackingMode;
        mUserTrackingMode = userTrackingMode;
        updateUserTrackingMode(userTrackingMode);

        switch (mUserTrackingMode) {
            case UserTrackingMode.NONE:
                mUserTrackingState = UserTrackingState.POSSIBLE;
                break;
            case UserTrackingMode.FOLLOW:
            case UserTrackingMode.FollowWithCourse:
            case UserTrackingMode.FollowWithHeading:
                if (oldTrackingMode == UserTrackingMode.NONE) {
                    mUserTrackingState = UserTrackingState.POSSIBLE;
                }
                break;

        }

        if (getMapboxMap() != null) {
            updateLocationLayer(getMapboxMap().getStyle());
        }
    }


    public void setFollowUserLocation(boolean value) {
        mFollowUserLocation = value;
        updatedFollowUserMode();
    }

    public void setFollowUserMode(String mode) {
        mFollowUserMode = mode;
        updatedFollowUserMode();
    }

    private void updatedFollowUserMode() {
        if (mFollowUserLocation) {
            setUserTrackingMode(UserTrackingMode.fromString(mFollowUserMode));
        } else {
            setUserTrackingMode(UserTrackingMode.NONE);
        }
    }

    TrackAsiaMap getMapboxMap() {
        if (mMapView == null) {
            return null;
        }
        return mMapView.getMapboxMap();
    }

    /**
     * Create a payload of the location data per the web api geolocation spec
     * https://dev.w3.org/geo/api/spec-source.html#position
     *
     * @return
     */
    private WritableMap makeLocationChangePayload(Location location) {
        WritableMap positionProperties = new WritableNativeMap();
        WritableMap coords = new WritableNativeMap();

        coords.putDouble("longitude", location.getLongitude());
        coords.putDouble("latitude", location.getLatitude());
        coords.putDouble("altitude", location.getAltitude());
        coords.putDouble("accuracy", location.getAccuracy());
        // A better solution will be to pull the heading from the compass engine, 
        // unfortunately the api is not publicly available in the mapbox sdk
        coords.putDouble("heading", location.getBearing());
        coords.putDouble("course", location.getBearing());
        coords.putDouble("speed", location.getSpeed());

        positionProperties.putMap("coords", coords);
        positionProperties.putDouble("timestamp", location.getTime());
        return positionProperties;
    }
}
