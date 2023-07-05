import React, {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import TrackasiaGL from '@trackasia/trackasia-react-native';

import sheet from '../../styles/sheet';
import Page from '../common/Page';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const style = JSON.stringify(require('../../assets/map-styleURL-style.json'));

const ShowMap: FC<any> = props => {
  useEffect(() => {
    TrackasiaGL.locationManager.start();

    return (): void => {
      TrackasiaGL.locationManager.stop();
    };
  }, []);

  const onUserMarkerPress = (): void => {
    Alert.alert('You pressed on the user location annotation');
  };

  return (
    <Page {...props}>
      <TrackasiaGL.MapView styleURL={style} style={sheet.matchParent}>
        <TrackasiaGL.Camera followZoomLevel={3} followUserLocation />

        <TrackasiaGL.UserLocation onPress={onUserMarkerPress} />
      </TrackasiaGL.MapView>
    </Page>
  );
};

export default ShowMap;
