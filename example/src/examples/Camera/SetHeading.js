import React from 'react';
import TrackasiaGL from '@trackasia/trackasia-react-native';

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
    TrackasiaGL.locationManager.start();
  }

  componentDidUpdate() {
    if (this.state.followUserLocation) {
      this.setState({followUserLocation: false});
    }
  }

  componentWillUnmount() {
    TrackasiaGL.locationManager.stop();
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
        <TrackasiaGL.MapView
          ref={ref => (this.map = ref)}
          style={sheet.matchParent}>
          <TrackasiaGL.Camera {...this.state} />
          <TrackasiaGL.UserLocation />
        </TrackasiaGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetHeading;
