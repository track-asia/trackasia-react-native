import React from 'react';
import TrackasiaGL from '@trackasia/trackasia-react-native';

import sheet from '../../styles/sheet';
import TabBarPage from '../common/TabBarPage';

const COLOR = ['red', 'yellow', 'green'];
const OPTIONS = [{label: 'red'}, {label: 'yellow'}, {label: 'green'}];

class SetTintColor extends React.Component {
  state = {tintColor: COLOR[0]};

  onTintColorChange = index => {
    this.setState({tintColor: COLOR[index]});
  };

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={OPTIONS}
        onOptionPress={this.onTintColorChange}>
        <TrackasiaGL.MapView
          style={sheet.matchParent}
          tintColor={this.state.tintColor}>
          <TrackasiaGL.Camera
            followZoomLevel={16}
            followUserMode="compass"
            followUserLocation
          />

          <TrackasiaGL.UserLocation
            renderMode="native"
            androidRenderMode="compass"
          />
        </TrackasiaGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetTintColor;
