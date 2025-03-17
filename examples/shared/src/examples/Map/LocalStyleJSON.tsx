import { MapView } from "@track-asia/trackasia-react-native";
import { useState } from "react";
import { Text } from "react-native";

import TrackAsiaDemoTilesBlue from "../../assets/styles/trackasia-demo-tiles-blue.json";
import TrackAsiaDemoTilesWhite from "../../assets/styles/trackasia-demo-tiles-white.json";
import { Bubble } from "../../components/Bubble";
import { sheet } from "../../styles/sheet";

export function LocalStyleJSON() {
  const [color, setColor] = useState<"blue" | "white">("blue");

  return (
    <>
      <MapView
        style={sheet.matchParent}
        mapStyle={
          { blue: TrackAsiaDemoTilesBlue, white: TrackAsiaDemoTilesWhite }[color]
        }
      />
      <Bubble
        onPress={() =>
          setColor((prevState) => {
            return ({ blue: "white", white: "blue" } as const)[prevState];
          })
        }
      >
        <Text>Switch Style JSON</Text>
      </Bubble>
    </>
  );
}
