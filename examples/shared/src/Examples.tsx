import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as TrackAsiaExamples from "./examples/index";
import { sheet } from "./styles/sheet";

const styles = StyleSheet.create({
  exampleListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  exampleListItemBorder: {
    borderBottomColor: "#cccccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  exampleListLabel: {
    fontSize: 18,
  },
});

class ExampleItem {
  label: string;
  Component: any;

  constructor(label: string, Component: any) {
    this.label = label;
    this.Component = Component;
  }
}

class ExampleGroup {
  root: boolean;
  label: string;
  items: (ExampleGroup | ExampleItem)[];

  constructor(
    label: string,
    items: (ExampleGroup | ExampleItem)[],
    root = false,
  ) {
    this.root = root;
    this.label = label;
    this.items = items;
  }
}

const Examples = new ExampleGroup(
  "TrackAsia React Native",
  [
    new ExampleItem("Bug Report", TrackAsiaExamples.BugReport),
    new ExampleGroup("Map", [
      new ExampleItem("Show Map", TrackAsiaExamples.ShowMap),
      new ExampleItem("Local Style from JSON", TrackAsiaExamples.LocalStyleJSON),
      new ExampleItem("Show Click", TrackAsiaExamples.ShowClick),
      new ExampleItem(
        "Show Region did Change",
        TrackAsiaExamples.ShowRegionDidChange,
      ),
      new ExampleItem("Two Map Views", TrackAsiaExamples.TwoMapViews),
      new ExampleItem(
        "Create Offline Region",
        TrackAsiaExamples.CreateOfflineRegion,
      ),
      new ExampleItem(
        "Get Pixel Point in MapView",
        TrackAsiaExamples.PointInMapView,
      ),
      new ExampleItem(
        "Show and hide a layer",
        TrackAsiaExamples.ShowAndHideLayer,
      ),
      new ExampleItem("Change Layer Color", TrackAsiaExamples.ChangeLayerColor),
      new ExampleItem(
        "Source Layer Visibility",
        TrackAsiaExamples.SourceLayerVisibility,
      ),
      new ExampleItem("Set Tint Color", TrackAsiaExamples.SetTintColor),
    ]),
    new ExampleGroup("Camera", [
      new ExampleItem(
        "Fit (Bounds, Center/Zoom, Padding)",
        TrackAsiaExamples.Fit,
      ),
      new ExampleItem("Set Pitch", TrackAsiaExamples.SetPitch),
      new ExampleItem("Set Heading", TrackAsiaExamples.SetHeading),
      new ExampleItem("Fly To", TrackAsiaExamples.FlyTo),
      new ExampleItem("Restrict Bounds", TrackAsiaExamples.RestrictMapBounds),
      new ExampleItem("Yo-yo Camera", TrackAsiaExamples.YoYo),
      new ExampleItem(
        "Take Snapshot Without Map",
        TrackAsiaExamples.TakeSnapshot,
      ),
      new ExampleItem(
        "Take Snapshot With Map",
        TrackAsiaExamples.TakeSnapshotWithMap,
      ),
      new ExampleItem("Get current Zoom", TrackAsiaExamples.GetZoom),
      new ExampleItem("Get Center", TrackAsiaExamples.GetCenter),
      new ExampleItem("Compass View", TrackAsiaExamples.CompassView),
    ]),

    new ExampleGroup("User Location", [
      new ExampleItem(
        "Follow User Location Alignment",
        TrackAsiaExamples.FollowUserLocationAlignment,
      ),
      new ExampleItem(
        "Follow User Location Render Mode",
        TrackAsiaExamples.FollowUserLocationRenderMode,
      ),
      new ExampleItem(
        "User Location for Navigation",
        TrackAsiaExamples.UserLocationForNavigation,
      ),
      new ExampleItem(
        "User Location Updates",
        TrackAsiaExamples.UserLocationUpdate,
      ),
      new ExampleItem(
        "User Location Displacement",
        TrackAsiaExamples.UserLocationDisplacement,
      ),

      new ExampleItem(
        "Set preferred Frames per Second\n(Android only)",
        TrackAsiaExamples.SetAndroidPreferredFramesPerSecond,
      ),
    ]),

    new ExampleGroup("Symbol/CircleLayer", [
      new ExampleItem("Custom Icon", TrackAsiaExamples.CustomIcon),
      new ExampleItem("Clustering Earthquakes", TrackAsiaExamples.Earthquakes),
      new ExampleItem(
        "Icon from Shape Source",
        TrackAsiaExamples.ShapeSourceIcon,
      ),
      new ExampleItem(
        "Data-driven Circle Colors",
        TrackAsiaExamples.DataDrivenCircleColors,
      ),
    ]),
    new ExampleGroup("Fill/RasterLayer", [
      new ExampleItem("GeoJSON Source", TrackAsiaExamples.GeoJSONSource),
      new ExampleItem(
        "OpenStreetMap Raster Tiles",
        TrackAsiaExamples.OpenStreetMapRasterTiles,
      ),
      new ExampleItem("Indoor Building Map", TrackAsiaExamples.IndoorBuilding),
      new ExampleItem("Query Feature Point", TrackAsiaExamples.QueryAtPoint),
      new ExampleItem(
        "Query Features Bounding Box",
        TrackAsiaExamples.QueryWithRect,
      ),
      new ExampleItem(
        "Custom Vector Source",
        TrackAsiaExamples.CustomVectorSource,
      ),
      new ExampleItem("Image Overlay", TrackAsiaExamples.ImageOverlay),
    ]),
    new ExampleGroup("LineLayer", [
      new ExampleItem("Gradient Line", TrackAsiaExamples.GradientLine),
    ]),
    new ExampleGroup("Sources", [
      new ExampleItem("PMTiles Map Style", TrackAsiaExamples.PMTilesMapStyle),
      new ExampleItem(
        "PMTiles Vector Source",
        TrackAsiaExamples.PMTilesVectorSource,
      ),
    ]),
    new ExampleGroup("Annotations", [
      new ExampleItem(
        "Show Point Annotation",
        TrackAsiaExamples.ShowPointAnnotation,
      ),
      new ExampleItem(
        "Point Annotation Anchors",
        TrackAsiaExamples.PointAnnotationAnchors,
      ),
      new ExampleItem("Marker View", TrackAsiaExamples.MarkerView),
      new ExampleItem("Heatmap", TrackAsiaExamples.Heatmap),
      new ExampleItem("Custom Callout", TrackAsiaExamples.CustomCallout),
    ]),
    new ExampleGroup("Animations", [
      new ExampleItem(
        "Animate Circle along Line",
        TrackAsiaExamples.AnimateCircleAlongLine,
      ),
      new ExampleItem("Animated Length", TrackAsiaExamples.AnimatedLength),
      new ExampleItem("Animated Morph", TrackAsiaExamples.AnimatedMorph),
      new ExampleItem("Animated Size", TrackAsiaExamples.AnimatedSize),
      new ExampleItem("Reanimated Point", TrackAsiaExamples.ReanimatedPoint),
    ]),
    new ExampleItem("Cache Management", TrackAsiaExamples.CacheManagement),
  ],
  true,
);

function FlatMapExamples(
  example: ExampleGroup | ExampleItem,
  flattenedExamples: (ExampleGroup | ExampleItem)[] = [],
): (ExampleGroup | ExampleItem)[] {
  if (example instanceof ExampleGroup) {
    return [
      ...flattenedExamples,
      ...example.items.flatMap((example) => FlatMapExamples(example)),
      example,
    ];
  }

  return [...flattenedExamples, example];
}

const FlatExamples = FlatMapExamples(Examples);

interface ExampleListProps {
  navigation: any;
  route: any;
}

function ExampleList({ route, navigation }: ExampleListProps) {
  const { name } = route;
  const example =
    FlatExamples.find((examples) => examples.label === name) || Examples;

  function itemPress(item: any) {
    navigation.navigate(item.label);
  }

  function renderItem({ item }: { item: any }) {
    return (
      <View style={styles.exampleListItemBorder}>
        <TouchableOpacity onPress={() => itemPress(item)}>
          <View style={styles.exampleListItem}>
            <Text style={styles.exampleListLabel}>{item.label}</Text>
            <Text style={{ fontSize: 24 }}>›</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={sheet.matchParent}>
      <View style={sheet.matchParent}>
        <FlatList
          style={sheet.matchParent}
          data={example instanceof ExampleGroup ? example.items : []}
          keyExtractor={(item) => item.label}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

function buildNavigationScreens(example: any, Stack: any) {
  if (example instanceof ExampleGroup) {
    return (
      <Stack.Screen
        key={example.label}
        name={example.label}
        component={ExampleList}
      />
    );
  }
  return (
    <Stack.Screen
      key={example.label}
      name={example.label}
      component={example.Component}
    />
  );
}

export function Home() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          card: "#295daa",
          primary: "#ffffff",
          background: "#ffffff",
          text: "#ffffff",
        },
      }}
    >
      <Stack.Navigator initialRouteName={Examples.label}>
        {FlatExamples.map((example) => buildNavigationScreens(example, Stack))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
