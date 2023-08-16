#import <QuartzCore/QuartzCore.h>
#import "MLNUserLocationHeadingIndicator.h"
@import Mapbox;

@interface MLNUserLocationHeadingBeamLayer : CALayer <MLNUserLocationHeadingIndicator>

- (MLNUserLocationHeadingBeamLayer *)initWithUserLocationAnnotationView:(MLNUserLocationAnnotationView *)userLocationView;
- (void)updateHeadingAccuracy:(CLLocationDirection)accuracy;
- (void)updateTintColor:(CGColorRef)color;

@end
