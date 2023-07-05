import React from 'react';
import TrackasiaGL from '@trackasia/trackasia-react-native';

import sheet from '../../styles/sheet';
import BaseExamplePropTypes from '../common/BaseExamplePropTypes';
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

class DataDrivenCircleColors extends React.PureComponent {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  render() {
    return (
      <Page {...this.props}>
        <TrackasiaGL.MapView
          styleURL={TrackasiaGL.StyleURL.Light}
          style={sheet.matchParent}>
          <TrackasiaGL.Camera
            zoomLevel={10}
            pitch={45}
            centerCoordinate={[-122.400021, 37.789085]}
          />

          <TrackasiaGL.VectorSource
            id="population"
            url={'mapbox://examples.8fgz4egr'}>
            <TrackasiaGL.CircleLayer
              id="sf2010CircleFill"
              sourceLayerID="sf2010"
              style={styles.circles}
            />
          </TrackasiaGL.VectorSource>
        </TrackasiaGL.MapView>
      </Page>
    );
  }
}

export default DataDrivenCircleColors;
