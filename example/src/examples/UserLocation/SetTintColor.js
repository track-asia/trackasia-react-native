import React from 'react';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

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
        <TrackAsiaGL.MapView
          style={sheet.matchParent}
          tintColor={this.state.tintColor}>
          <TrackAsiaGL.Camera
            followZoomLevel={16}
            followUserMode="compass"
            followUserLocation
          />

          <TrackAsiaGL.UserLocation
            renderMode="native"
            androidRenderMode="compass"
          />
        </TrackAsiaGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetTintColor;
