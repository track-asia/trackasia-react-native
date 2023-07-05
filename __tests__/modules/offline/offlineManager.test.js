import TrackasiaGL from '../../../javascript';
import {OfflineModuleEventEmitter} from '../../../javascript/modules/offline/offlineManager';

import {NativeModules, Platform} from 'react-native';

describe('offlineManager', () => {
  const packOptions = {
    name: 'test',
    styleURL: 'mapbox://fake-style-url',
    bounds: [
      [0, 1],
      [2, 3],
    ],
    minZoom: 1,
    maxZoom: 22,
  };

  const mockOnProgressEvent = {
    type: 'offlinestatus',
    payload: {
      name: packOptions.name,
      state: TrackasiaGL.OfflinePackDownloadState.Active,
      progress: 50.0,
    },
  };

  const mockOnProgressCompleteEvent = {
    type: 'offlinestatus',
    payload: {
      name: packOptions.name,
      state: TrackasiaGL.OfflinePackDownloadState.Complete,
      progress: 100.0,
    },
  };

  const mockErrorEvent = {
    type: 'offlineerror',
    payload: {
      name: packOptions.name,
      message: 'unit test error',
    },
  };

  afterEach(async () => {
    const packs = await TrackasiaGL.offlineManager.getPacks();
    for (const pack of packs) {
      await TrackasiaGL.offlineManager.deletePack(pack.name);
    }

    jest.clearAllMocks();
  });

  it('should create pack', async () => {
    let offlinePack = await TrackasiaGL.offlineManager.getPack(packOptions.name);
    expect(offlinePack).toBeFalsy();

    await TrackasiaGL.offlineManager.createPack(packOptions);
    offlinePack = await TrackasiaGL.offlineManager.getPack(packOptions.name);
    expect(offlinePack).toBeTruthy();
  });

  it('should delete pack', async () => {
    await TrackasiaGL.offlineManager.createPack(packOptions);
    let offlinePack = await TrackasiaGL.offlineManager.getPack(packOptions.name);
    expect(offlinePack).toBeTruthy();

    await TrackasiaGL.offlineManager.deletePack(packOptions.name);
    offlinePack = await TrackasiaGL.offlineManager.getPack(packOptions.name);
    expect(offlinePack).toBeFalsy();
  });

  it('should set max tile count limit', () => {
    const expectedLimit = 2000;
    const spy = jest.spyOn(NativeModules.MGLOfflineModule, 'setTileCountLimit');
    TrackasiaGL.offlineManager.setTileCountLimit(expectedLimit);
    expect(spy).toHaveBeenCalledWith(expectedLimit);
    spy.mockRestore();
  });

  it('should set progress event throttle value', () => {
    const expectedThrottleValue = 500;
    const spy = jest.spyOn(
      NativeModules.MGLOfflineModule,
      'setProgressEventThrottle',
    );
    TrackasiaGL.offlineManager.setProgressEventThrottle(expectedThrottleValue);
    expect(spy).toHaveBeenCalledWith(expectedThrottleValue);
    spy.mockRestore();
  });

  describe('Events', () => {
    it('should subscribe to native events', async () => {
      const spy = jest.spyOn(OfflineModuleEventEmitter, 'addListener');
      const noop = () => {};
      await TrackasiaGL.offlineManager.createPack(packOptions, noop, noop);
      expect(spy).toHaveBeenCalledTimes(2);
      spy.mockClear();
    });

    it('should call progress listener', async () => {
      const listener = jest.fn();
      await TrackasiaGL.offlineManager.createPack(packOptions, listener);
      const expectedOfflinePack = await TrackasiaGL.offlineManager.getPack(
        packOptions.name,
      );
      TrackasiaGL.offlineManager._onProgress(mockOnProgressEvent);
      expect(listener).toHaveBeenCalledWith(
        expectedOfflinePack,
        mockOnProgressEvent.payload,
      );
    });

    it('should call error listener', async () => {
      const listener = jest.fn();
      await TrackasiaGL.offlineManager.createPack(packOptions, null, listener);
      const expectedOfflinePack = await TrackasiaGL.offlineManager.getPack(
        packOptions.name,
      );
      TrackasiaGL.offlineManager._onError(mockErrorEvent);
      expect(listener).toHaveBeenCalledWith(
        expectedOfflinePack,
        mockErrorEvent.payload,
      );
    });

    it('should not call listeners after unsubscribe', async () => {
      const listener = jest.fn();
      await TrackasiaGL.offlineManager.createPack(
        packOptions,
        listener,
        listener,
      );
      TrackasiaGL.offlineManager.unsubscribe(packOptions.name);
      TrackasiaGL.offlineManager._onProgress(mockOnProgressEvent);
      TrackasiaGL.offlineManager._onError(mockErrorEvent);
      expect(listener).not.toHaveBeenCalled();
    });

    it('should unsubscribe from native events', async () => {
      const noop = () => {};

      await TrackasiaGL.offlineManager.createPack(packOptions, noop, noop);
      TrackasiaGL.offlineManager.unsubscribe(packOptions.name);

      expect(
        TrackasiaGL.offlineManager.subscriptionProgress.remove,
      ).toHaveBeenCalledTimes(1);
      expect(
        TrackasiaGL.offlineManager.subscriptionError.remove,
      ).toHaveBeenCalledTimes(1);
    });

    it('should unsubscribe event listeners once a pack download has completed', async () => {
      const listener = jest.fn();
      await TrackasiaGL.offlineManager.createPack(
        packOptions,
        listener,
        listener,
      );

      expect(
        TrackasiaGL.offlineManager._hasListeners(
          packOptions.name,
          TrackasiaGL.offlineManager._progressListeners,
        ),
      ).toBeTruthy();

      expect(
        TrackasiaGL.offlineManager._hasListeners(
          packOptions.name,
          TrackasiaGL.offlineManager._errorListeners,
        ),
      ).toBeTruthy();

      TrackasiaGL.offlineManager._onProgress(mockOnProgressCompleteEvent);

      expect(
        TrackasiaGL.offlineManager._hasListeners(
          packOptions.name,
          TrackasiaGL.offlineManager._progressListeners,
        ),
      ).toBeFalsy();

      expect(
        TrackasiaGL.offlineManager._hasListeners(
          packOptions.name,
          TrackasiaGL.offlineManager._errorListeners,
        ),
      ).toBeFalsy();
    });
  });

  describe('Android', () => {
    beforeEach(() => (Platform.OS = 'android'));

    it('should set pack observer manually', async () => {
      const spy = jest.spyOn(NativeModules.MGLOfflineModule, 'setPackObserver');

      const name = `test-${Date.now()}`;
      const noop = () => {};
      const options = {...packOptions, name};
      await TrackasiaGL.offlineManager.createPack(options);
      await TrackasiaGL.offlineManager.subscribe(name, noop, noop);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should not set pack observer manually during create flow', async () => {
      const spy = jest.spyOn(NativeModules.MGLOfflineModule, 'setPackObserver');

      const name = `test-${Date.now()}`;
      const noop = () => {};
      const options = {...packOptions, name};
      await TrackasiaGL.offlineManager.createPack(options, noop, noop);

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('iOS', () => {
    beforeEach(() => (Platform.OS = 'ios'));

    it('should not set pack observer manually', async () => {
      const spy = jest.spyOn(NativeModules.MGLOfflineModule, 'setPackObserver');

      const name = `test-${Date.now()}`;
      const noop = () => {};
      const options = {...packOptions, name};
      await TrackasiaGL.offlineManager.createPack(options);
      await TrackasiaGL.offlineManager.subscribe(name, noop, noop);

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
