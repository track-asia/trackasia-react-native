import SnapshotOptions from './SnapshotOptions';

import {NativeModules} from 'react-native';

const TrackAsiaGLSnapshotManger = NativeModules.MGLSnapshotModule;

/**
 * The snapshotManager generates static raster images of the map.
 * Each snapshot image depicts a portion of a map defined by an SnapshotOptions object you provide.
 * The snapshotter generates the snapshot asynchronous.
 */
class SnapshotManager {
  /**
   * Takes a snapshot of the base map using the provided Snapshot options. NOTE pitch, heading, zoomLevel only works when centerCoordinate is set!
   *
   * @example
   *
   * // creates a temp file png of base map
   * const uri = await TrackAsiaGL.snapshotManager.takeSnap({
   *   centerCoordinate: [-74.126410, 40.797968],
   *   width: width,
   *   height: height,
   *   zoomLevel: 12,
   *   pitch: 30,
   *   heading: 20,
   *   styleURL: TrackAsiaGL.StyleURL.Dark,
   *   writeToDisk: true, // Create a temporary file
   * });
   *
   * // creates base64 png of base map without logo
   * const uri = await TrackAsiaGL.snapshotManager.takeSnap({
   *   centerCoordinate: [-74.126410, 40.797968],
   *   width: width,
   *   height: height,
   *   zoomLevel: 12,
   *   pitch: 30,
   *   heading: 20,
   *   styleURL: TrackAsiaGL.StyleURL.Dark,
   *   withLogo: false, // Disable Mapbox logo (Android only)
   * });
   *
   * // creates snapshot with bounds
   * const uri = await TrackAsiaGL.snapshotManager.takeSnap({
   *   bounds: [[-74.126410, 40.797968], [-74.143727, 40.772177]],
   *   width: width,
   *   height: height,
   *   styleURL: TrackAsiaGL.StyleURL.Dark,
   * });
   *
   * @param  {SnapshotOptions}  options Snapshot options for create a static image of the base map
   * @return {Promise}
   */
  async takeSnap(options = {}) {
    const snapshotOptions = new SnapshotOptions(options);

    const uri = await TrackAsiaGLSnapshotManger.takeSnap(snapshotOptions);
    return uri;
  }
}

const snapshotManager = new SnapshotManager();
export default snapshotManager;
