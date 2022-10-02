import glob from 'glob'

export function flattenGlobs(globs) {
  return globs.flatMap(path => glob.sync(path))
}
