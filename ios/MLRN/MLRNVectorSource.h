#import "MLRNTileSource.h"
@import TrackAsia;

@interface MLRNVectorSource : MLRNTileSource

- (nonnull NSArray<id<MLNFeature>> *)
    featuresInSourceLayersWithIdentifiers:(nonnull NSSet<NSString *> *)sourceLayerIdentifiers
                                predicate:(nullable NSPredicate *)predicate;

@end
