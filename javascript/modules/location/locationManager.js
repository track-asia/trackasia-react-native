import {NativeModules, NativeEventEmitter} from 'react-native';

const TrackasiaGL = NativeModules.MLNModule;
const TrackasiaGLLocationManager = NativeModules.MLNLocationModule;

export const LocationModuleEventEmitter = new NativeEventEmitter(
  TrackasiaGLLocationManager,
);

class LocationManager {
  constructor() {
    this._listeners = [];
    this._lastKnownLocation = null;
    this._isListening = false;
    this.onUpdate = this.onUpdate.bind(this);
    this.subscription = null;
  }

  async getLastKnownLocation() {
    if (!this._lastKnownLocation) {
      let lastKnownLocation;

      // as location can be brittle it might happen,
      // that we get an exception from native land
      // let's silently catch it and simply log out
      // instead of throwing an exception
      try {
        lastKnownLocation =
          await TrackasiaGLLocationManager.getLastKnownLocation();
      } catch (error) {
        console.log('locationManager Error: ', error);
      }

      if (!this._lastKnownLocation && lastKnownLocation) {
        this._lastKnownLocation = lastKnownLocation;
      }
    }

    return this._lastKnownLocation;
  }

  addListener(listener) {
    if (!this._isListening) {
      this.start();
    }
    if (!this._listeners.includes(listener)) {
      this._listeners.push(listener);

      if (this._lastKnownLocation) {
        listener(this._lastKnownLocation);
      }
    }
  }

  removeListener(listener) {
    this._listeners = this._listeners.filter(l => l !== listener);
    if (this._listeners.length === 0) {
      this.stop();
    }
  }

  removeAllListeners() {
    this._listeners = [];
    this.stop();
  }

  start(displacement = 0) {
    if (!this._isListening) {
      TrackasiaGLLocationManager.start(displacement);

      this.subscription = LocationModuleEventEmitter.addListener(
        TrackasiaGL.LocationCallbackName.Update,
        this.onUpdate,
      );

      this._isListening = true;
    }
  }

  stop() {
    TrackasiaGLLocationManager.stop();

    if (this._isListening) {
      this.subscription.remove();
    }

    this._isListening = false;
  }

  setMinDisplacement(minDisplacement) {
    TrackasiaGLLocationManager.setMinDisplacement(minDisplacement);
  }

  onUpdate(location) {
    this._lastKnownLocation = location;

    this._listeners.forEach(l => l(location));
  }
}

export default new LocationManager();
