import snapshotDiff from "snapshot-diff";

import type { TrackAsiaPluginProps } from "../../../plugin/TrackAsiaPluginProps";
import { applyPodfileGlobalVariables } from "../../../plugin/ios";
import * as podfileFixtures from "./__fixtures__/Podfile";

expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer());

const PROPS: TrackAsiaPluginProps = {
  ios: { nativeVersion: "0.0.0" },
};

describe("Expo Plugin iOS – applyPodfileGlobalVariables", () => {
  it("adds blocks to a react native template podfile", () => {
    expect(
      snapshotDiff(
        podfileFixtures.reactNativeTemplatePodfile,
        applyPodfileGlobalVariables(
          podfileFixtures.reactNativeTemplatePodfile,
          PROPS,
        ),
      ),
    ).toMatchSnapshot();
  });

  it("adds blocks to a expo prebuild template podfile", () => {
    expect(
      snapshotDiff(
        podfileFixtures.expoTemplatePodfile,
        applyPodfileGlobalVariables(podfileFixtures.expoTemplatePodfile, PROPS),
      ),
    ).toMatchSnapshot();
  });

  it("does not re-add blocks to an applied template podfile", () => {
    const runOnce = applyPodfileGlobalVariables(
      podfileFixtures.expoTemplatePodfile,
      PROPS,
    );

    expect(applyPodfileGlobalVariables(runOnce, PROPS)).toBe(runOnce);
  });

  it("updates block on change", () => {
    const runOnce = applyPodfileGlobalVariables(
      podfileFixtures.expoTemplatePodfile,
      PROPS,
    );

    expect(
      snapshotDiff(
        runOnce,
        applyPodfileGlobalVariables(runOnce, {
          ios: { nativeVersion: "1.1.1" },
        }),
      ),
    ).toMatchSnapshot();
  });

  it("adds both spmSpec and nativeVersion when set", () => {
    expect(
      snapshotDiff(
        podfileFixtures.expoTemplatePodfile,
        applyPodfileGlobalVariables(podfileFixtures.expoTemplatePodfile, {
          ios: {
            ...PROPS.ios,
            spmSpec: `{
  url: "https://github.com/track-asia/trackasia-gl-native-distribution",
  requirement: {
    kind: "upToNextMajorVersion",
    minimumVersion: "0.0.0"
  },
  product_name: "TrackAsia"
}`,
          },
        }),
      ),
    ).toMatchSnapshot();
  });

  it("removes block without global variable", () => {
    const runOnce = applyPodfileGlobalVariables(
      podfileFixtures.expoTemplatePodfile,
      PROPS,
    );

    expect(applyPodfileGlobalVariables(runOnce, undefined)).toBe(
      podfileFixtures.expoTemplatePodfile,
    );
  });

  it("adds blocks to a blank podfile", () => {
    expect(
      snapshotDiff(
        podfileFixtures.blankTemplatePodfile,
        applyPodfileGlobalVariables(
          podfileFixtures.blankTemplatePodfile,
          PROPS,
        ),
      ),
    ).toMatchSnapshot();
  });
});
