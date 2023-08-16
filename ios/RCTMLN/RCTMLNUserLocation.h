//
//  RCTMLNUserLocation.h
//  RCTMLN

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <Mapbox/MLNUserLocationAnnotationView.h>

@interface RCTMLNUserLocation : NSObject

+ (id)sharedInstance;

- (MLNUserLocationAnnotationView*)hiddenUserAnnotation;

@end
