import React from 'react';
import TrackasiaGL from '@trackasia/trackasia-react-native';
import bboxPolygon from '@turf/bbox-polygon';

import sheet from '../../styles/sheet';
import Page from '../common/Page';

const boundsStyle = {
  fillColor: 'rgba(255, 255, 255, 0.1)',
  fillOutlineColor: 'white',
};

const bounds = {
  ne: [-4.265762, 51.054738],
  sw: [-5.760365, 49.947256],
};

const {ne, sw} = bounds;
const polygon = bboxPolygon([sw[0], sw[1], ne[0], ne[1]]);

const RestrictMapBounds = props => (
  <Page {...props}>
    <TrackasiaGL.MapView
      style={sheet.matchParent}
      styleURL={TrackasiaGL.StyleURL.SatelliteStreet}>
      <TrackasiaGL.Camera
        maxBounds={bounds}
        zoomLevel={7}
        centerCoordinate={[-4.744276, 50.361239]}
      />
      <TrackasiaGL.ShapeSource id="bounds" shape={polygon}>
        <TrackasiaGL.FillLayer id="boundsFill" style={boundsStyle} />
      </TrackasiaGL.ShapeSource>
    </TrackasiaGL.MapView>
  </Page>
);

export default RestrictMapBounds;
