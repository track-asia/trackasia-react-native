#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@import TrackAsia;

@interface MLRNOfflineModule : RCTEventEmitter <RCTBridgeModule>

extern NSString *const RCT_MAPBOX_OFFLINE_CALLBACK_PROGRESS;
extern NSString *const RCT_MAPBOX_OFFLINE_CALLBACK_ERROR;

@end
