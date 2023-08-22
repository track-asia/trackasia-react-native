import React from 'react';
import {Text} from 'react-native';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

import Page from '../common/Page';
import Bubble from '../common/Bubble';

const defaultCamera = {
  centerCoordinate: [-74.005974, 40.712776],
  zoomLevel: 13,
};

const styles = {
  mapView: {flex: 1},
};

class SourceLayerVisibility extends React.Component {
  state = {
    show: true,
  };

  onPress = () => {
    this.setState(
      {
        show: !this.state.show,
      },
      () => {
        this._map.setSourceVisibility(this.state.show, 'composite', 'road');
      },
    );
  };

  render() {
    return (
      <Page>
        <TrackAsiaGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          style={styles.mapView}>
          <TrackAsiaGL.Camera defaultSettings={defaultCamera} />
        </TrackAsiaGL.MapView>
        <Bubble onPress={this.onPress}>
          <Text>{`${
            this.state.show ? 'Hide' : 'Show'
          } 'Roads' source layer`}</Text>
        </Bubble>
      </Page>
    );
  }
}

export default SourceLayerVisibility;
