package com.trackasia.reactnative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.trackasia.reactnative.components.annotation.MLRNCalloutManager;
import com.trackasia.reactnative.components.annotation.MLRNPointAnnotationManager;
import com.trackasia.reactnative.components.annotation.MLRNMarkerViewManager;
import com.trackasia.reactnative.components.camera.MLRNCameraManager;
import com.trackasia.reactnative.components.images.MLRNImagesManager;
import com.trackasia.reactnative.components.location.MLRNNativeUserLocationManager;
import com.trackasia.reactnative.components.mapview.MLRNMapViewManager;
import com.trackasia.reactnative.components.mapview.MLRNAndroidTextureMapViewManager;
import com.trackasia.reactnative.components.styles.layers.MLRNBackgroundLayerManager;
import com.trackasia.reactnative.components.styles.layers.MLRNCircleLayerManager;
import com.trackasia.reactnative.components.styles.layers.MLRNFillExtrusionLayerManager;
import com.trackasia.reactnative.components.styles.layers.MLRNFillLayerManager;
import com.trackasia.reactnative.components.styles.layers.MLRNHeatmapLayerManager;
import com.trackasia.reactnative.components.styles.layers.MLRNLineLayerManager;
import com.trackasia.reactnative.components.styles.layers.MLRNRasterLayerManager;
import com.trackasia.reactnative.components.styles.layers.MLRNSymbolLayerManager;
import com.trackasia.reactnative.components.styles.light.MLRNLightManager;
import com.trackasia.reactnative.components.styles.sources.MLRNImageSourceManager;
import com.trackasia.reactnative.components.styles.sources.MLRNRasterSourceManager;
import com.trackasia.reactnative.components.styles.sources.MLRNShapeSourceManager;
import com.trackasia.reactnative.components.styles.sources.MLRNVectorSourceManager;
import com.trackasia.reactnative.modules.MLRNLocationModule;
import com.trackasia.reactnative.modules.MLRNLogging;
import com.trackasia.reactnative.modules.MLRNModule;
import com.trackasia.reactnative.modules.MLRNOfflineModule;
import com.trackasia.reactnative.modules.MLRNSnapshotModule;

public class MLRNPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new MLRNModule(reactApplicationContext));
        modules.add(new MLRNOfflineModule(reactApplicationContext));
        modules.add(new MLRNSnapshotModule(reactApplicationContext));
        modules.add(new MLRNLocationModule(reactApplicationContext));
        modules.add(new MLRNLogging(reactApplicationContext));

        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        List<ViewManager> managers = new ArrayList<>();

        // components
        managers.add(new MLRNCameraManager(reactApplicationContext));
        managers.add(new MLRNMapViewManager(reactApplicationContext));
        managers.add(new MLRNMarkerViewManager(reactApplicationContext));
        managers.add(new MLRNAndroidTextureMapViewManager(reactApplicationContext));
        managers.add(new MLRNLightManager());
        managers.add(new MLRNPointAnnotationManager(reactApplicationContext));
        managers.add(new MLRNCalloutManager());
        managers.add(new MLRNNativeUserLocationManager());

        // sources
        managers.add(new MLRNVectorSourceManager(reactApplicationContext));
        managers.add(new MLRNShapeSourceManager(reactApplicationContext));
        managers.add(new MLRNRasterSourceManager(reactApplicationContext));
        managers.add(new MLRNImageSourceManager());

        // images
        managers.add(new MLRNImagesManager(reactApplicationContext));

        // layers
        managers.add(new MLRNFillLayerManager());
        managers.add(new MLRNFillExtrusionLayerManager());
        managers.add(new MLRNHeatmapLayerManager());
        managers.add(new MLRNLineLayerManager());
        managers.add(new MLRNCircleLayerManager());
        managers.add(new MLRNSymbolLayerManager());
        managers.add(new MLRNRasterLayerManager());
        managers.add(new MLRNBackgroundLayerManager());

        return managers;
    }
}
