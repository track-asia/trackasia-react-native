import { type FilterExpression } from "../types/TrackAsiaRNStyles";

export function getFilter(filter: FilterExpression | undefined): string[] {
  if (!Array.isArray(filter) || filter.length === 0) {
    return [];
  }

  return filter;
}
