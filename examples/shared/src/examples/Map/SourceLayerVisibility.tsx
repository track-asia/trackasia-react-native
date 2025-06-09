import { MapView, type MapViewRef } from "@track-asia/trackasia-react-native";
import { useRef, useState } from "react";
import { Text } from "react-native";

import { Bubble } from "../../components/Bubble";
import { sheet } from "../../styles/sheet";

export function SourceLayerVisibility() {
  const mapViewRef = useRef<MapViewRef>(null);
  const [visible, setVisible] = useState(true);

  return (
    <>
      <MapView ref={mapViewRef} style={sheet.matchParent} />
      <Bubble
        onPress={() => {
          mapViewRef.current?.setSourceVisibility(
            !visible,
            "trackasia",
            "countries",
          );

          setVisible((prevState) => !prevState);
        }}
      >
        <Text>{`${visible ? "Hide" : "Show"} Countries`}</Text>
      </Bubble>
    </>
  );
}
