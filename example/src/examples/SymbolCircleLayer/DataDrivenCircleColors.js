import React from 'react';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

import sheet from '../../styles/sheet';
import Page from '../common/Page';

const styles = {
  circles: {
    circleRadius: [
      'interpolate',
      ['exponential', 1.75],
      ['zoom'],
      12,
      2,
      22,
      180,
    ],

    circleColor: [
      'match',
      ['get', 'ethnicity'],
      'White',
      '#fbb03b',
      'Black',
      '#223b53',
      'Hispanic',
      '#e55e5e',
      'Asian',
      '#3bb2d0',
      /* other */ '#ccc',
    ],
  },
};

function DataDrivenCircleColors() {
  return (
    <Page {...this.props}>
      <TrackAsiaGL.MapView
        styleURL={TrackAsiaGL.StyleURL.Light}
        style={sheet.matchParent}>
        <TrackAsiaGL.Camera
          zoomLevel={10}
          pitch={45}
          centerCoordinate={[-122.400021, 37.789085]}
        />

        <TrackAsiaGL.VectorSource
          id="population"
          url={'mapbox://examples.8fgz4egr'}>
          <TrackAsiaGL.CircleLayer
            id="sf2010CircleFill"
            sourceLayerID="sf2010"
            style={styles.circles}
          />
        </TrackAsiaGL.VectorSource>
      </TrackAsiaGL.MapView>
    </Page>
  );
}

export default React.memo(DataDrivenCircleColors);
