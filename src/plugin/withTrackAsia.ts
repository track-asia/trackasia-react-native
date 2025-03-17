import { type ConfigPlugin, createRunOncePlugin } from "@expo/config-plugins";

import type { TrackAsiaPluginProps } from "./TrackAsiaPluginProps";
import { android } from "./android";
import { ios } from "./ios";

let pkg: { name: string; version?: string } = {
  name: "@track-asia/trackasia-react-native",
};
try {
  pkg = require("@track-asia/trackasia-react-native/package.json");
} catch {
  // empty catch block
}

const withTrackAsia: ConfigPlugin<TrackAsiaPluginProps> = (config, props) => {
  // Android
  config = android.withGradleProperties(config, props);

  // iOS
  config = ios.withExcludedSimulatorArchitectures(config);
  config = ios.withDwarfDsym(config);
  config = ios.withoutSignatures(config);
  config = ios.withPodfileGlobalVariables(config, props);
  config = ios.withPodfilePostInstall(config);

  return config;
};

export default createRunOncePlugin(withTrackAsia, pkg.name, pkg.version);
