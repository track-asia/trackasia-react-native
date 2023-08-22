import React from 'react';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

import sheet from '../../styles/sheet';
import TabBarPage from '../common/TabBarPage';

class SetPitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followPitch: 15,
      zoomLevel: 16,
      duration: 300,
    };

    this._pitchOptions = [
      {label: '15', data: 15},
      {label: '45', data: 45},
      {label: '60', data: 60},
    ];

    this.onUpdatePitch = this.onUpdatePitch.bind(this);
  }

  componentDidMount() {
    TrackAsiaGL.locationManager.start();
  }

  componentWillUnmount() {
    TrackAsiaGL.locationManager.stop();
  }

  onUpdatePitch(index, pitch) {
    this.setState({followPitch: pitch});
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={this._pitchOptions}
        onOptionPress={this.onUpdatePitch}>
        <TrackAsiaGL.MapView style={sheet.matchParent}>
          <TrackAsiaGL.Camera {...this.state} followUserLocation />
          <TrackAsiaGL.UserLocation />
        </TrackAsiaGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetPitch;
