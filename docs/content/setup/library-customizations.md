---
sidebar_position: 3
---

# Library Customizations

It's possible to customize the native setup of the library. These props must be applied differently, based on
the project setup.

## Expo

When using Expo, simply add the customizations in the projects `app.json` or `app.config.{js,ts}`. Here is an
example customization for in a `app.config.ts`:

```ts
import type { TrackAsiaPluginProps } from "@track-asia/trackasia-react-native";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  plugins: [
    [
      "@track-asia/trackasia-react-native",
      {
        android: {
          nativeVersion: "x.x.x",
        },
        ios: {
          nativeVersion: "x.x.x",
        },
      } as TrackAsiaPluginProps,
    ],
  ],
});
```

## React Native

When using React Native, the customizations have to be applied differently for each platform.

### Android

On Android they are set in the `gradle.properties`, each of them prefixed with `com.trackasia.reactnative`. Example:

```diff
+ com.trackasia.reactnative.nativeVersion=x.x.x
```

### iOS

On iOS global variables in the `Podfile` are used, prefixed with `$MLRN`.

```diff
+ $MLRN_NATIVE_VERSION="x.x.x"

target "AppName" do
```

## Available Customizations

### Android

| Prop Key                            | Type                    | Description                                                                                                   |
| ----------------------------------- |-------------------------|---------------------------------------------------------------------------------------------------------------|
| `nativeVersion`                     | `VersionString`         | Version for [`io.github.track-asia:android-sdk-*`](https://mvnrepository.com/artifact/io.github.track-asia/android-sdk) |
| `nativeVariant`                     | `"opengl" \| "vulkan"`  | [Variant of `io.github.track-asia:android-sdk-*`](#native-variant)                                                 |
| `pluginVersion`                     | `VersionString`         | Version for `io.github.track-asia:android-plugin-*-v9`                                                             |
| `turfVersion`                       | `VersionString`         | Version for `io.github.track-asia:android-sdk-turf`                                                                |
| `okhttpVersion`                     | `VersionString`         | Version for `com.squareup.okhttp3:okhttp`                                                                     |
| `locationEngine`                    | `"default" \| "google"` | [Location engine to be used](#location-engine)                                                                |
| `googlePlayServicesLocationVersion` | `VersionString`         | Version for `com.google.android.gms:play-services-location`, only used with `locationEngine: "google"`        |

For default values see [`gradle.properties` of the library](https://github.com/track-asia/trackasia-react-native/tree/main/android/gradle.properties).

#### Native Variant

You can choose between the current default OpenGL ES and the newer Vulkan rendering backend. Read more on the
[TrackAsia Native Release introducing Vulkan](https://github.com/track-asia/trackasia-native/releases/tag/android-v11.7.0).

#### Location Engine

Two location engines are available on Android:

- `default`
  - Default location engine provided by the device
  - Doesn't work with emulator
  - F-Droid compatible
- `google`
  - Google Play Services Location Engine
  - Possibly more accurate
  - Works with emulator
  - Not F-Droid compatible

### iOS

| Prop Key        | `Podfile` Global Variable | Type            | Description                                                                                                           |
| --------------- | ------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `nativeVersion` | `$MLRN_NATIVE_VERSION`    | `VersionString` | Version for [`trackasia-gl-native-distribution`](https://github.com/track-asia/trackasia-gl-native-distribution/releases) |
| `spmSpec`       | `$MLRN_SPM_SPEC`          | `string`        | [Swift Package Manager Spec](#spm-spec)                                                                               |

For default values see [`trackasia-react-native.podspec` of the library](https://github.com/track-asia/trackasia-react-native/blob/main/trackasia-react-native.podspec).

#### SPM Spec

Setting a Swift Package Manager Spec allows further customization over setting the native version:

```rb
$MLRN_SPM_SPEC = {
  url: "https://github.com/track-asia/trackasia-gl-native-distribution",
  requirement: {
    kind: "upToNextMajorVersion",
    minimumVersion: "x.x.x"
  },
  product_name: "TrackAsia"
}
```
