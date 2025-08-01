#import <Foundation/Foundation.h>
@import TrackAsia;

@interface MLRNStyleValue : NSObject

@property (nonatomic, strong) NSString *styleType;
@property (nonatomic, strong) NSDictionary *rawStyleValue;
@property (nonatomic, readonly) NSExpression *mlnStyleValue;

- (BOOL)shouldAddImage;
- (NSString *)getImageURI;
- (double)getImageScale;
- (MLNTransition)getTransition;
- (NSExpression *)getSphericalPosition;
- (BOOL)isVisible;

+ (MLRNStyleValue *)make:(NSString *)expressionJSONStr;

@end
