#import "ViewManager.h"
@import TrackAsia;

@interface MLRNMapViewManager : ViewManager

- (void)didTapMap:(UITapGestureRecognizer *)recognizer;
- (void)didLongPressMap:(UILongPressGestureRecognizer *)recognizer;

@end
