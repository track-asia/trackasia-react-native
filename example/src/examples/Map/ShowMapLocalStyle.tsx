import React, {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

import sheet from '../../styles/sheet';
import Page from '../common/Page';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const style = JSON.stringify(require('../../assets/map-styleURL-style.json'));

const ShowMap: FC<any> = props => {
  useEffect(() => {
    TrackAsiaGL.locationManager.start();

    return (): void => {
      TrackAsiaGL.locationManager.stop();
    };
  }, []);

  const onUserMarkerPress = (): void => {
    Alert.alert('You pressed on the user location annotation');
  };

  return (
    <Page {...props}>
      <TrackAsiaGL.MapView styleURL={style} style={sheet.matchParent}>
        <TrackAsiaGL.Camera followZoomLevel={3} followUserLocation />

        <TrackAsiaGL.UserLocation onPress={onUserMarkerPress} />
      </TrackAsiaGL.MapView>
    </Page>
  );
};

export default ShowMap;
