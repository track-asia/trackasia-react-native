/* eslint-env node */
const {
  withMetroShared,
} = require("@trackasia-react-native/examples/metro.shared");
const { getDefaultConfig } = require("@react-native/metro-config");

const project = __dirname;

module.exports = withMetroShared(getDefaultConfig(project), { project });
