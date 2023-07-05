import TrackasiaGL from '../../../javascript';

describe('snapshotManager', () => {
  it('should resolve uri', async () => {
    const options = {centerCoordinate: [1, 2]};
    const uri = await TrackasiaGL.snapshotManager.takeSnap(options);
    expect(uri).toEqual('file://test.png');
  });
});
