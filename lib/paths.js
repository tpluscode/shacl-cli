import { sync } from 'glob'

export function flattenGlobs(globs) {
  return globs.flatMap(path => sync(path))
}
