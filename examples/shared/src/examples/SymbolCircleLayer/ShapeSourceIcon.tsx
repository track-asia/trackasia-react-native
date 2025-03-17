import {
    Images,
    MapView,
    ShapeSource,
    SymbolLayer,
} from "@track-asia/trackasia-react-native";
import { useState } from "react";

import trackasiaIcon from "../../assets/images/trackasia.png";
import { FEATURE_COLLECTION } from "../../constants/GEOMETRIES";
import { sheet } from "../../styles/sheet";

export function ShapeSourceIcon() {
  const [images, setImages] = useState({
    [FEATURE_COLLECTION.features[0]!.properties.name]: trackasiaIcon,
  });

  return (
    <MapView style={sheet.matchParent}>
      <Images
        images={images}
        onImageMissing={(imageKey) =>
          setImages((prevState) => ({
            ...prevState,
            [imageKey]: trackasiaIcon,
          }))
        }
      />
      <ShapeSource id="shape-source" shape={FEATURE_COLLECTION}>
        <SymbolLayer
          id="symbol-layer"
          style={{
            iconImage: ["get", "name"],
          }}
        />
      </ShapeSource>
    </MapView>
  );
}
