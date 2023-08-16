#import <QuartzCore/QuartzCore.h>
#import "MLNUserLocationHeadingIndicator.h"
@import Mapbox;

@interface MLNUserLocationHeadingArrowLayer : CAShapeLayer <MLNUserLocationHeadingIndicator>

- (instancetype)initWithUserLocationAnnotationView:(MLNUserLocationAnnotationView *)userLocationView;
- (void)updateHeadingAccuracy:(CLLocationDirection)accuracy;
- (void)updateTintColor:(CGColorRef)color;

@end
