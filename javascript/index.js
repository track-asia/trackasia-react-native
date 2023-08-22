import {isAndroid} from './utils';
import MapView from './components/MapView';
import Light from './components/Light';
import PointAnnotation from './components/PointAnnotation';
import Annotation from './components/annotations/Annotation';
import Callout from './components/Callout';
import UserLocation from './components/UserLocation';
import Camera from './components/Camera';
import VectorSource from './components/VectorSource';
import ShapeSource from './components/ShapeSource';
import RasterSource from './components/RasterSource';
import ImageSource from './components/ImageSource';
import Images from './components/Images';
import FillLayer from './components/FillLayer';
import FillExtrusionLayer from './components/FillExtrusionLayer';
import HeatmapLayer from './components/HeatmapLayer';
import LineLayer from './components/LineLayer';
import CircleLayer from './components/CircleLayer';
import SymbolLayer from './components/SymbolLayer';
import RasterLayer from './components/RasterLayer';
import BackgroundLayer from './components/BackgroundLayer';
import locationManager from './modules/location/locationManager';
import offlineManager from './modules/offline/offlineManager';
import snapshotManager from './modules/snapshot/snapshotManager';
import MarkerView from './components/MarkerView';
import Animated from './utils/animated/Animated';
import AnimatedMapPoint from './utils/animated/AnimatedPoint';
import AnimatedShape from './utils/animated/AnimatedShape';
import AnimatedCoordinatesArray from './utils/animated/AnimatedCoordinatesArray';
import AnimatedExtractCoordinateFromArray from './utils/animated/AnimatedExtractCoordinateFromArray';
import AnimatedRouteCoordinatesArray from './utils/animated/AnimatedRouteCoordinatesArray';
import Style from './components/Style';
import Logger from './utils/Logger';

import {NativeModules, PermissionsAndroid} from 'react-native';

const TrackAsiaGL = {...NativeModules.MGLModule};

// static methods
TrackAsiaGL.requestAndroidLocationPermissions = async function () {
  if (isAndroid()) {
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    if (!res) {
      return false;
    }

    const permissions = Object.keys(res);
    for (const permission of permissions) {
      if (res[permission] === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    }

    return false;
  }

  throw new Error('You should only call this method on Android!');
};

TrackAsiaGL.UserTrackingModes = Camera.UserTrackingModes;

// components
TrackAsiaGL.MapView = MapView;
TrackAsiaGL.Light = Light;
TrackAsiaGL.PointAnnotation = PointAnnotation;
TrackAsiaGL.Callout = Callout;
TrackAsiaGL.UserLocation = UserLocation;
TrackAsiaGL.Camera = Camera;
TrackAsiaGL.Style = Style;

// annotations
TrackAsiaGL.Annotation = Annotation;
TrackAsiaGL.MarkerView = MarkerView;

// sources
TrackAsiaGL.VectorSource = VectorSource;
TrackAsiaGL.ShapeSource = ShapeSource;
TrackAsiaGL.RasterSource = RasterSource;
TrackAsiaGL.ImageSource = ImageSource;
TrackAsiaGL.Images = Images;

// layers
TrackAsiaGL.FillLayer = FillLayer;
TrackAsiaGL.FillExtrusionLayer = FillExtrusionLayer;
TrackAsiaGL.HeatmapLayer = HeatmapLayer;
TrackAsiaGL.LineLayer = LineLayer;
TrackAsiaGL.CircleLayer = CircleLayer;
TrackAsiaGL.SymbolLayer = SymbolLayer;
TrackAsiaGL.RasterLayer = RasterLayer;
TrackAsiaGL.BackgroundLayer = BackgroundLayer;

// modules
TrackAsiaGL.locationManager = locationManager;
TrackAsiaGL.offlineManager = offlineManager;
TrackAsiaGL.snapshotManager = snapshotManager;

// animated
TrackAsiaGL.Animated = Animated;

// utils
TrackAsiaGL.AnimatedPoint = AnimatedMapPoint;
TrackAsiaGL.AnimatedCoordinatesArray = AnimatedCoordinatesArray;
TrackAsiaGL.AnimatedExtractCoordinateFromArray =
  AnimatedExtractCoordinateFromArray;
TrackAsiaGL.AnimatedRouteCoordinatesArray = AnimatedRouteCoordinatesArray;
TrackAsiaGL.AnimatedShape = AnimatedShape;
TrackAsiaGL.Logger = Logger;

const {LineJoin} = TrackAsiaGL;

export {
  MapView,
  Light,
  PointAnnotation,
  Callout,
  UserLocation,
  Camera,
  Annotation,
  MarkerView,
  VectorSource,
  ShapeSource,
  RasterSource,
  ImageSource,
  Images,
  FillLayer,
  FillExtrusionLayer,
  HeatmapLayer,
  LineLayer,
  CircleLayer,
  SymbolLayer,
  RasterLayer,
  BackgroundLayer,
  locationManager,
  offlineManager,
  snapshotManager,
  AnimatedMapPoint,
  AnimatedCoordinatesArray,
  AnimatedShape,
  Animated,
  LineJoin,
  Logger,
  Style,
};

export default TrackAsiaGL;
