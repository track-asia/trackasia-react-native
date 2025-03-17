//
//  MLRNUserLocation.h
//  MLRN

#import <CoreLocation/CoreLocation.h>
#import <Foundation/Foundation.h>
#import <TrackAsia/MLNUserLocationAnnotationView.h>

@interface MLRNUserLocation : NSObject

+ (id)sharedInstance;

- (MLNUserLocationAnnotationView*)hiddenUserAnnotation;

@end
