---
sidebar_position: 0
---
# Getting Started

This guide gets you started with TrackAsia in your Expo or React Native project.

## Native Versions

This package wraps TrackAsia Native for Android and iOS, these are the currently used versions:

<dl>
    <dt>Android</dt>
    <dd>
      <a href="https://github.com/track-asia/trackasia-native/releases/tag/android-v2.0.3">2.0.3</a>
    </dd>
    <dt>iOS</dt>
    <dd>
      <a href="https://github.com/track-asia/trackasia-native/releases/tag/ios-v2.0.3">2.0.3</a>
    </dd>
</dl>

## Requirements

<dl>
  <dt>React Native</dt>
  <dd>≥ 0.74.0 (lower versions might work)</dd>
  <dt>Android API Level</dt>
  <dd>≥ 23</dd>
  <dt>Map Style/Tiles</dt>
  <dd>
    <ul>
      <li>This library defaults to the <a href="https://github.com/track-asia/demotiles">TrackAsia Demo Tiles</a></li>
      <li>For production use, please use your own style/tiles or use a provider like Stadia Maps or MapTiler</li>
    </ul>
  </dd>
</dl>

## Installation

Installing the `@track-asia/trackasia-react-native` package differs for Expo and bare React Native projects. Please follow
the guide corresponding to your app setup:

- [Expo](expo.md)
- [React Native](react-native.md)

## Rendering a `<MapView />`

After completing the installation and rebuilding the app, you can start using the library:

```tsx
import React from "react";
import { MapView } from "@track-asia/trackasia-react-native";

function App() {
  return <MapView style={{ flex: 1 }} />;
}
```
