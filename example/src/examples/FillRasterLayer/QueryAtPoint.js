import React from 'react';
import {Text} from 'react-native';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

import sheet from '../../styles/sheet';
import nycJSON from '../../assets/nyc_geojson.json';
import Page from '../common/Page';
import Bubble from '../common/Bubble';

const styles = {
  neighborhoods: {
    fillAntialias: true,
    fillColor: 'blue',
    fillOutlineColor: 'black',
    fillOpacity: 0.84,
  },
  selectedNeighborhood: {
    fillAntialias: true,
    fillColor: 'green',
    fillOpacity: 0.84,
  },
};

class QueryAtPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.emptyState;
    this.onPress = this.onPress.bind(this);
  }

  get emptyState() {
    return {selectedGeoJSON: null, selectedCommunityDistrict: -1};
  }

  async onPress(e) {
    const {screenPointX, screenPointY} = e.properties;

    const featureCollection = await this._map.queryRenderedFeaturesAtPoint(
      [screenPointX, screenPointY],
      null,
      ['nycFill'],
    );

    if (featureCollection.features.length) {
      this.setState({
        selectedGeoJSON: featureCollection,
        selectedCommunityDistrict:
          featureCollection.features[0].properties.communityDistrict,
      });
    } else {
      this.setState(this.emptyState);
    }
  }

  render() {
    return (
      <Page>
        <TrackAsiaGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          style={sheet.matchParent}
          styleURL={TrackAsiaGL.StyleURL.Light}>
          <TrackAsiaGL.Camera
            zoomLevel={9}
            centerCoordinate={[-73.970895, 40.723279]}
          />

          <TrackAsiaGL.ShapeSource id="nyc" shape={nycJSON}>
            <TrackAsiaGL.FillLayer id="nycFill" style={styles.neighborhoods} />
          </TrackAsiaGL.ShapeSource>

          {this.state.selectedGeoJSON ? (
            <TrackAsiaGL.ShapeSource
              id="selectedNYC"
              shape={this.state.selectedGeoJSON}>
              <TrackAsiaGL.FillLayer
                id="selectedNYCFill"
                style={styles.selectedNeighborhood}
              />
            </TrackAsiaGL.ShapeSource>
          ) : null}
        </TrackAsiaGL.MapView>

        <Bubble>
          <Text>Press on a feature to highlight it.</Text>
        </Bubble>
      </Page>
    );
  }
}

export default QueryAtPoint;
