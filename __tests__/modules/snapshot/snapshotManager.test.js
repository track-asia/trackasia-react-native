import TrackAsiaGL from '../../../javascript';

describe('snapshotManager', () => {
  it('should resolve uri', async () => {
    const options = {centerCoordinate: [1, 2]};
    const uri = await TrackAsiaGL.snapshotManager.takeSnap(options);
    expect(uri).toEqual('file://test.png');
  });
});
