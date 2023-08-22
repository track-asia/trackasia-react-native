import React, {FC, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import TrackAsiaGL from '@track-asia/trackasia-react-native';

import sheet from '../../styles/sheet';
import {onSortOptions} from '../../utils';
import TabBarPage from '../common/TabBarPage';

const ShowMap: FC<any> = props => {
  const _mapOptions = Object.keys(TrackAsiaGL.StyleURL)
    .map(key => {
      return {
        label: key,
        data: (TrackAsiaGL.StyleURL as any)[key], // bad any, because enums
      };
    })
    .sort(onSortOptions);

  const [styleURL, setStyleURL] = useState({styleURL: _mapOptions[0].data});

  useEffect(() => {
    TrackAsiaGL.locationManager.start();

    return (): void => {
      TrackAsiaGL.locationManager.stop();
    };
  }, []);

  const onMapChange = (
    index: number,
    newStyleURL: TrackAsiaGL.StyleURL,
  ): void => {
    setStyleURL({styleURL: newStyleURL});
  };

  const onUserMarkerPress = (): void => {
    Alert.alert('You pressed on the user location annotation');
  };

  return (
    <TabBarPage
      {...props}
      scrollable
      options={_mapOptions}
      onOptionPress={onMapChange}>
      <TrackAsiaGL.MapView
        styleURL={styleURL.styleURL}
        style={sheet.matchParent}>
        <TrackAsiaGL.Camera followZoomLevel={6} followUserLocation />

        <TrackAsiaGL.UserLocation onPress={onUserMarkerPress} />
      </TrackAsiaGL.MapView>
    </TabBarPage>
  );
};

export default ShowMap;
