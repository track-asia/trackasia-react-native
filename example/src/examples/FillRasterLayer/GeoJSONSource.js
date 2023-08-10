import React from 'react';
import TrackasiaGL from '@trackasia/trackasia-react-native';

import sheet from '../../styles/sheet';
import gridPattern from '../../assets/grid_pattern.png';
import smileyFaceGeoJSON from '../../assets/smiley_face.json';
import Page from '../common/Page';

const layerStyles = {
  background: {
    backgroundPattern: gridPattern,
  },
  smileyFace: {
    fillAntialias: true,
    fillColor: 'white',
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)',
  },
};

function GeoJSONSource() {
  return (
    <Page>
      <TrackasiaGL.MapView
        ref={ref => (this.map = ref)}
        style={sheet.matchParent}
        styleURL={TrackasiaGL.StyleURL.Dark}>
        <TrackasiaGL.Camera
          zoomLevel={2}
          centerCoordinate={[-35.15165038, 40.6235728]}
        />

        <TrackasiaGL.VectorSource>
          <TrackasiaGL.BackgroundLayer
            id="background"
            style={layerStyles.background}
          />
        </TrackasiaGL.VectorSource>

        <TrackasiaGL.ShapeSource id="smileyFaceSource" shape={smileyFaceGeoJSON}>
          <TrackasiaGL.FillLayer
            id="smileyFaceFill"
            style={layerStyles.smileyFace}
          />
        </TrackasiaGL.ShapeSource>
      </TrackasiaGL.MapView>
    </Page>
  );
}

export default GeoJSONSource;
