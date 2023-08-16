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

const TrackasiaGL = {...NativeModules.MLNModule};

// static methods
TrackasiaGL.requestAndroidLocationPermissions = async function () {
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

TrackasiaGL.UserTrackingModes = Camera.UserTrackingModes;

// components
TrackasiaGL.MapView = MapView;
TrackasiaGL.Light = Light;
TrackasiaGL.PointAnnotation = PointAnnotation;
TrackasiaGL.Callout = Callout;
TrackasiaGL.UserLocation = UserLocation;
TrackasiaGL.Camera = Camera;
TrackasiaGL.Style = Style;

// annotations
TrackasiaGL.Annotation = Annotation;
TrackasiaGL.MarkerView = MarkerView;

// sources
TrackasiaGL.VectorSource = VectorSource;
TrackasiaGL.ShapeSource = ShapeSource;
TrackasiaGL.RasterSource = RasterSource;
TrackasiaGL.ImageSource = ImageSource;
TrackasiaGL.Images = Images;

// layers
TrackasiaGL.FillLayer = FillLayer;
TrackasiaGL.FillExtrusionLayer = FillExtrusionLayer;
TrackasiaGL.HeatmapLayer = HeatmapLayer;
TrackasiaGL.LineLayer = LineLayer;
TrackasiaGL.CircleLayer = CircleLayer;
TrackasiaGL.SymbolLayer = SymbolLayer;
TrackasiaGL.RasterLayer = RasterLayer;
TrackasiaGL.BackgroundLayer = BackgroundLayer;

// modules
TrackasiaGL.locationManager = locationManager;
TrackasiaGL.offlineManager = offlineManager;
TrackasiaGL.snapshotManager = snapshotManager;

// animated
TrackasiaGL.Animated = Animated;

// utils
TrackasiaGL.AnimatedPoint = AnimatedMapPoint;
TrackasiaGL.AnimatedCoordinatesArray = AnimatedCoordinatesArray;
TrackasiaGL.AnimatedExtractCoordinateFromArray =
  AnimatedExtractCoordinateFromArray;
TrackasiaGL.AnimatedRouteCoordinatesArray = AnimatedRouteCoordinatesArray;
TrackasiaGL.AnimatedShape = AnimatedShape;
TrackasiaGL.Logger = Logger;

const {LineJoin} = TrackasiaGL;

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

export default TrackasiaGL;
