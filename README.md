[![TrackAsia Logo](https://track-asia.com/assets-v2/images/logo-white.png)](https://track-asia.com)

# TrackAsia React Native

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](/LICENSE.md)
[![Version](https://img.shields.io/npm/v/@track-asia/trackasia-react-native)](https://www.npmjs.com/package/@track-asia/trackasia-react-native)
[![Actions](https://img.shields.io/github/actions/workflow/status/track-asia/trackasia-react-native/release.yml?label=Actions&branch=main)](https://github.com/track-asia/trackasia-react-native/actions/workflows/release.yml?query=branch:main)

_React Native library for creating maps
with [TrackAsia Native for Android & iOS](https://github.com/track-asia/trackasia-gl-native)._

> [!IMPORTANT]
> Support for the new architecture with v10 is only through the interoperability layer. There are still quite a few
> [issues](https://github.com/track-asia/trackasia-react-native/issues?q=is%3Aissue%20state%3Aopen%20type%3ABug%20label%3A%22Architecture%3A%20New%22),
> when used with the new architecture. Switch to the v11 alpha releases on the
> [`alpha`](https://github.com/track-asia/trackasia-react-native/tree/alpha) branch for better support of the new
> architecture.

This project originated as a fork of [rnmapbox](https://github.com/rnmapbox/maps), a community-maintained
React Native library for building maps with the Mapbox iOS and Android mobile SDKs. The original library
supported both Mapbox and TrackAsia for some time, but as the TrackAsia and Mapbox SDKs have
diverged, it has become necessary to separate the projects into specific wrappers by underlying renderer.

<p align="center">
    <img src="/docs/static/screenshots/index/device-android.png"
         alt="Indoor Building Map Android"
         height="320"
          />
    <img src="/docs/static/screenshots/index/device-ios.png"
         alt="Indoor Building Map iOS"
         height="320"
          />
</p>

## Documentation

https://docs.track-asia.com/vi/

## Contributing & Development

Read the [CONTRIBUTING](/CONTRIBUTING.md) guide in order to get familiar with how we do things around here and
set up your local development environment.

## Community

Join the [`#trackasia-react-native`](https://osmus.slack.com/archives/C065DB4T2UB) or [`#trackasia`](https://osmus.slack.com/archives/C01G3D28DAB) [on the Open Street Map Slack](https://slack.openstreetmap.us/).
