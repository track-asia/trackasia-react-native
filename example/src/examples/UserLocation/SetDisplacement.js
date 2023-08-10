import React from 'react';
import TrackasiaGL from '@trackasia/trackasia-react-native';

import sheet from '../../styles/sheet';
import TabBarPage from '../common/TabBarPage';

const DISPLACEMENT = [0, 5, 10];
const OPTIONS = [{label: '0 meter'}, {label: '5 meter'}, {label: '10 meter'}];

class SetDisplacement extends React.Component {
  state = {minDisplacement: DISPLACEMENT[0]};

  componentDidMount() {
    TrackasiaGL.locationManager.start();
  }

  componentWillUnmount() {
    TrackasiaGL.locationManager.stop();
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
        <TrackasiaGL.MapView style={sheet.matchParent}>
          <TrackasiaGL.Camera
            followZoomLevel={16}
            followUserMode="compass"
            followUserLocation
          />

          <TrackasiaGL.UserLocation
            minDisplacement={this.state.minDisplacement}
          />
        </TrackasiaGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetDisplacement;
