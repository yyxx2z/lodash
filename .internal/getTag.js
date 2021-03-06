import baseGetTag from './baseGetTag.js'

/** `Object#toString` result references. */
// 对象 toString 结果参考
/**
 * Object.prototype.toString.call('foo');     // "[object String]"
  Object.prototype.toString.call([1, 2]);    // "[object Array]"
  Object.prototype.toString.call(3);         // "[object Number]"
  Object.prototype.toString.call(true);      // "[object Boolean]"
  Object.prototype.toString.call(undefined); // "[object Undefined]"
  Object.prototype.toString.call(null);      // "[object Null]"
  Object.prototype.toString.call(new Map());       // "[object Map]"
  Object.prototype.toString.call(function* () {}); // "[object GeneratorFunction]"
  Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"
 */
const dataViewTag = '[object DataView]'
const mapTag = '[object Map]'
const objectTag = '[object Object]'
const promiseTag = '[object Promise]'
const setTag = '[object Set]'
const weakMapTag = '[object WeakMap]'

/** Used to detect maps, sets, and weakmaps. */
// 使用于检测 maps, sets, weakmaps
const dataViewCtorString = `${DataView}`
const mapCtorString = `${Map}`
const promiseCtorString = `${Promise}`
const setCtorString = `${Set}`
const weakMapCtorString = `${WeakMap}`

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
let getTag = baseGetTag

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (getTag(new Map) != mapTag) ||
    (getTag(Promise.resolve()) != promiseTag) ||
    (getTag(new Set) != setTag) ||
    (getTag(new WeakMap) != weakMapTag)) {
  getTag = (value) => {
    const result = baseGetTag(value)
    const Ctor = result == objectTag ? value.constructor : undefined
    const ctorString = Ctor ? `${Ctor}` : ''

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag
        case mapCtorString: return mapTag
        case promiseCtorString: return promiseTag
        case setCtorString: return setTag
        case weakMapCtorString: return weakMapTag
      }
    }
    return result
  }
}

export default getTag
