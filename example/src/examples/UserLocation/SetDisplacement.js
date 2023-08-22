import React from 'react';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

import sheet from '../../styles/sheet';
import TabBarPage from '../common/TabBarPage';

const DISPLACEMENT = [0, 5, 10];
const OPTIONS = [{label: '0 meter'}, {label: '5 meter'}, {label: '10 meter'}];

class SetDisplacement extends React.Component {
  state = {minDisplacement: DISPLACEMENT[0]};

  componentDidMount() {
    TrackAsiaGL.locationManager.start();
  }

  componentWillUnmount() {
    TrackAsiaGL.locationManager.stop();
  }

  onDisplacementChange = index => {
    this.setState({minDisplacement: DISPLACEMENT[index]});
  };

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={OPTIONS}
        onOptionPress={this.onDisplacementChange}>
        <TrackAsiaGL.MapView style={sheet.matchParent}>
          <TrackAsiaGL.Camera
            followZoomLevel={16}
            followUserMode="compass"
            followUserLocation
          />

          <TrackAsiaGL.UserLocation
            minDisplacement={this.state.minDisplacement}
          />
        </TrackAsiaGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetDisplacement;
