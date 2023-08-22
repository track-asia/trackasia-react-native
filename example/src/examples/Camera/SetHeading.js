import React from 'react';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

import sheet from '../../styles/sheet';
import TabBarPage from '../common/TabBarPage';

class SetHeading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: 0,
      zoomLevel: 16,
      animationDuration: 150,
      followUserLocation: true,
    };

    this._bearingOptions = [
      {label: '0', data: 0},
      {label: '90', data: 90},
      {label: '180', data: 180},
    ];

    this.onHeadingChange = this.onHeadingChange.bind(this);
  }

  componentDidMount() {
    TrackAsiaGL.locationManager.start();
  }

  componentDidUpdate() {
    if (this.state.followUserLocation) {
      this.setState({followUserLocation: false});
    }
  }

  componentWillUnmount() {
    TrackAsiaGL.locationManager.stop();
  }

  onHeadingChange(index, heading) {
    this.setState({heading});
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={this._bearingOptions}
        onOptionPress={this.onHeadingChange}>
        <TrackAsiaGL.MapView
          ref={ref => (this.map = ref)}
          style={sheet.matchParent}>
          <TrackAsiaGL.Camera {...this.state} />
          <TrackAsiaGL.UserLocation />
        </TrackAsiaGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetHeading;
