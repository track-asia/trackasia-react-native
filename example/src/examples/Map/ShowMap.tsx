import React, {FC, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import TrackasiaGL from '@trackasia/trackasia-react-native';

import sheet from '../../styles/sheet';
import {onSortOptions} from '../../utils';
import TabBarPage from '../common/TabBarPage';

const ShowMap: FC<any> = props => {
  const _mapOptions = Object.keys(TrackasiaGL.StyleURL)
    .map(key => {
      return {
        label: key,
        data: (TrackasiaGL.StyleURL as any)[key], // bad any, because enums
      };
    })
    .sort(onSortOptions);

  const [styleURL, setStyleURL] = useState({styleURL: _mapOptions[0].data});

  useEffect(() => {
    TrackasiaGL.locationManager.start();

    return (): void => {
      TrackasiaGL.locationManager.stop();
    };
  }, []);

  const onMapChange = (
    index: number,
    newStyleURL: TrackasiaGL.StyleURL,
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
      <TrackasiaGL.MapView
        styleURL={styleURL.styleURL}
        style={sheet.matchParent}>
        <TrackasiaGL.Camera followZoomLevel={6} followUserLocation />

        <TrackasiaGL.UserLocation onPress={onUserMarkerPress} />
      </TrackasiaGL.MapView>
    </TabBarPage>
  );
};

export default ShowMap;
