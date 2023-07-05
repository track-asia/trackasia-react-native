import React from 'react';
import {Text} from 'react-native';
import TrackasiaGL from '@trackasia/trackasia-react-native';

import BaseExamplePropTypes from '../common/BaseExamplePropTypes';
import Page from '../common/Page';
import Bubble from '../common/Bubble';

const defaultCamera = {
  centerCoordinate: [-77.036532, 38.897318],
  zoomLevel: 2,
};

const styles = {
  mapView: {flex: 1},
};

class ShowAndHideLayer extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  state = {
    show: true,
  };

  onPress = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const visibility = this.state.show ? 'visible' : 'none';
    return (
      <Page {...this.props}>
        <TrackasiaGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          style={styles.mapView}>
          <TrackasiaGL.Camera defaultSettings={defaultCamera} />
          <TrackasiaGL.FillLayer id="countries-label" style={{visibility}} />
        </TrackasiaGL.MapView>
        <Bubble onPress={this.onPress}>
          <Text>
            {this.state.show ? 'Hide Country Labels' : 'Show Country Labels'}
          </Text>
        </Bubble>
      </Page>
    );
  }
}

export default ShowAndHideLayer;
