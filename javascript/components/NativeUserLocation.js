import PropTypes from 'prop-types';
import React from 'react';
import {requireNativeComponent} from 'react-native';

const NATIVE_MODULE_NAME = 'RCTMLNNativeUserLocation';

class NativeUserLocation extends React.Component {
  static propTypes = {
    /**
     * Android render mode.
     *
     *  - normal: just a circle
     *  - compass: triangle with heading
     *  - gps: large arrow
     *
     * @platform android
     */
    androidRenderMode: PropTypes.oneOf(['normal', 'compass', 'gps']),

    /**
     * iOS only. A Boolean value indicating whether the user location annotation may display a permanent heading indicator.
     *
     * @platform ios
     */
    iosShowsUserHeadingIndicator: PropTypes.bool,
  };

  render() {
    return <RCTMLNNativeUserLocation {...this.props} />;
  }
}

const RCTMLNNativeUserLocation = requireNativeComponent(
  NATIVE_MODULE_NAME,
  NativeUserLocation,
  {
    nativeOnly: {},
  },
);

export default NativeUserLocation;
