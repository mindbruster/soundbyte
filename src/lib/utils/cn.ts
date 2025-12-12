/**
 * Class Name Utility
 *
 * Combines class names conditionally, similar to clsx/classnames.
 * Filters out falsy values and joins with spaces.
 */

type ClassValue = string | undefined | null | false | 0 | ClassValue[];

/**
 * Merge class names, filtering out falsy values
 *
 * @param classes - Class names or conditional values
 * @returns Merged class string
 *
 * @example
 * cn('base', isActive && 'active', undefined, 'always')
 * // Returns: 'base active always' or 'base always'
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter((cls): cls is string => typeof cls === 'string' && cls.length > 0)
    .join(' ');
}
