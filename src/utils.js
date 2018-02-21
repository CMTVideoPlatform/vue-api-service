import Regexp from 'path-to-regexp'


/**
 * Creates an object with the same keys as `object` and values generated by iteratee
 */
const mapValues = (object, iteratee) => {
  const result = {}

  Object.keys(object).forEach((key) => {
    result[key] = iteratee(object[key], key, object)
  })
  return result
}

const regexpCompileCache = Object.create(null)
/**
 * Replace :key matches in the url with the value of this key from segments object
 */
const fillSegments = (url, segments) => {
  try {
    const filler =
      regexpCompileCache[url] ||
      (regexpCompileCache[url] = Regexp.compile(url))
    return filler(segments || {}, { pretty: true })
  } catch (e) {
    console.warn(false, `missing param for ${url}: ${e.message}`)
    return ''
  }
}

export {
  mapValues,
  fillSegments
}
