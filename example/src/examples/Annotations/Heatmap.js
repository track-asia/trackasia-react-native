import React from 'react';
import TrackasiaGL from '@trackasia/trackasia-react-native';

import sheet from '../../styles/sheet';
import {SF_OFFICE_COORDINATE} from '../../utils';
import Page from '../common/Page';

function Heatmap() {
  return (
    <Page>
      <TrackasiaGL.MapView style={sheet.matchParent}>
        <TrackasiaGL.Camera
          zoomLevel={10}
          centerCoordinate={SF_OFFICE_COORDINATE}
        />

        <TrackasiaGL.ShapeSource
          id="earthquakes"
          url="https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson">
          <TrackasiaGL.HeatmapLayer
            id="earthquakes"
            sourceID="earthquakes"
            style={{
              heatmapColor: [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(239,138,98)',
                1,
                'rgb(178,24,43)',
              ],
            }}
          />
        </TrackasiaGL.ShapeSource>
      </TrackasiaGL.MapView>
    </Page>
  );
}

export default Heatmap;
