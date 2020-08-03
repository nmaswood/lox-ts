/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/fp-ts/lib/ChainRec.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/lib/ChainRec.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.tailRec = void 0;
/**
 * @since 2.0.0
 */
function tailRec(a, f) {
    var v = f(a);
    while (v._tag === 'Left') {
        v = f(v.left);
    }
    return v.right;
}
exports.tailRec = tailRec;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Either.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/lib/Either.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.exists = exports.elem = exports.toError = exports.either = exports.getValidationMonoid = exports.MonadThrow = exports.ChainRec = exports.Extend = exports.Alt = exports.Bifunctor = exports.Traversable = exports.Foldable = exports.Monad = exports.Applicative = exports.Functor = exports.getValidationSemigroup = exports.getValidation = exports.getAltValidation = exports.getApplicativeValidation = exports.getWitherable = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.getEq = exports.getShow = exports.URI = exports.throwError = exports.sequence = exports.traverse = exports.reduceRight = exports.foldMap = exports.reduce = exports.extend = exports.duplicate = exports.alt = exports.flatten = exports.chainFirst = exports.chain = exports.chainW = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.mapLeft = exports.bimap = exports.map = exports.filterOrElse = exports.orElse = exports.swap = exports.getOrElse = exports.getOrElseW = exports.fold = exports.fromPredicate = exports.fromOption = exports.stringifyJSON = exports.parseJSON = exports.tryCatch = exports.fromNullable = exports.right = exports.left = exports.isRight = exports.isLeft = void 0;
var ChainRec_1 = __webpack_require__(/*! ./ChainRec */ "./node_modules/fp-ts/lib/ChainRec.js");
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
exports.isLeft = function (ma) { return ma._tag === 'Left'; };
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
exports.isRight = function (ma) { return ma._tag === 'Right'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @category constructors
 * @since 2.0.0
 */
exports.left = function (e) { return ({ _tag: 'Left', left: e }); };
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @category constructors
 * @since 2.0.0
 */
exports.right = function (a) { return ({ _tag: 'Right', right: a }); };
// TODO: make lazy in v3
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/lib/Either'
 *
 * const parse = fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category constructors
 * @since 2.0.0
 */
function fromNullable(e) {
    return function (a) { return (a == null ? exports.left(e) : exports.right(a)); };
}
exports.fromNullable = fromNullable;
// TODO: `onError => Lazy<A> => Either` in v3
/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @category constructors
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    try {
        return exports.right(f());
    }
    catch (e) {
        return exports.left(onError(e));
    }
}
exports.tryCatch = tryCatch;
// TODO curry in v3
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
 * assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @category constructors
 * @since 2.0.0
 */
function parseJSON(s, onError) {
    return tryCatch(function () { return JSON.parse(s); }, onError);
}
exports.parseJSON = parseJSON;
// TODO curry in v3
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.deepStrictEqual(E.stringifyJSON({ a: 1 }, E.toError), E.right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(
 *   pipe(
 *     E.stringifyJSON(circular, E.toError),
 *     E.mapLeft(e => e.message.includes('Converting circular structure to JSON'))
 *   ),
 *   E.left(true)
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
function stringifyJSON(u, onError) {
    return tryCatch(function () { return JSON.stringify(u); }, onError);
}
exports.stringifyJSON = stringifyJSON;
/**
 * @category constructors
 * @since 2.0.0
 */
exports.fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? exports.left(onNone()) : exports.right(ma.value);
}; };
/**
 * @category constructors
 * @since 2.0.0
 */
exports.fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); }; };
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { fold, left, right } from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     fold(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     fold(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
function fold(onLeft, onRight) {
    return function (ma) { return (exports.isLeft(ma) ? onLeft(ma.left) : onRight(ma.right)); };
}
exports.fold = fold;
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
exports.getOrElseW = function (onLeft) { return function (ma) {
    return exports.isLeft(ma) ? onLeft(ma.left) : ma.right;
}; };
/**
 * @category destructors
 * @since 2.0.0
 */
exports.getOrElse = exports.getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.0.0
 */
function swap(ma) {
    return exports.isLeft(ma) ? exports.right(ma.left) : exports.left(ma.right);
}
exports.swap = swap;
/**
 * @category combinators
 * @since 2.0.0
 */
function orElse(onLeft) {
    return function (ma) { return (exports.isLeft(ma) ? onLeft(ma.left) : ma); };
}
exports.orElse = orElse;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.filterOrElse = function (predicate, onFalse) { return function (ma) {
    return chain_(ma, function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); });
}; };
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (ma, f) { return (exports.isLeft(ma) ? ma : exports.right(f(ma.right))); };
var ap_ = function (mab, ma) { return (exports.isLeft(mab) ? mab : exports.isLeft(ma) ? ma : exports.right(mab.right(ma.right))); };
var chain_ = function (ma, f) {
    return exports.isLeft(ma) ? ma : f(ma.right);
};
var reduce_ = function (fa, b, f) { return (exports.isLeft(fa) ? b : f(b, fa.right)); };
var foldMap_ = function (M) { return function (fa, f) { return (exports.isLeft(fa) ? M.empty : f(fa.right)); }; };
var reduceRight_ = function (fa, b, f) { return (exports.isLeft(fa) ? b : f(fa.right, b)); };
var traverse_ = function (F) { return function (ma, f) {
    return exports.isLeft(ma) ? F.of(exports.left(ma.left)) : F.map(f(ma.right), exports.right);
}; };
var bimap_ = function (fea, f, g) { return (exports.isLeft(fea) ? exports.left(f(fea.left)) : exports.right(g(fea.right))); };
var mapLeft_ = function (fea, f) { return (exports.isLeft(fea) ? exports.left(f(fea.left)) : fea); };
var alt_ = function (fa, that) { return (exports.isLeft(fa) ? that() : fa); };
var extend_ = function (wa, f) { return (exports.isLeft(wa) ? wa : exports.right(f(wa))); };
var chainRec_ = function (a, f) {
    return ChainRec_1.tailRec(f(a), function (e) {
        return exports.isLeft(e) ? exports.right(exports.left(e.left)) : exports.isLeft(e.right) ? exports.left(f(e.right.left)) : exports.right(exports.right(e.right.right));
    });
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return map_(fa, f); }; };
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
exports.bimap = function (f, g) { return function (fa) { return bimap_(fa, f, g); }; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
exports.mapLeft = function (f) { return function (fa) { return mapLeft_(fa, f); }; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) {
    return ap_(fab, fa);
}; };
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return ap_(map_(fa, function (a) { return function () { return a; }; }), fb);
}; };
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return ap_(map_(fa, function () { return function (b) { return b; }; }), fb);
}; };
/**
 * @category Applicative
 * @since 2.7.0
 */
exports.of = exports.right;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
exports.chainW = function (f) { return function (ma) { return chain_(ma, f); }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
exports.chain = exports.chainW;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
exports.chainFirst = function (f) { return function (ma) {
    return chain_(ma, function (a) { return map_(f(a), function () { return a; }); });
}; };
/**
 * @category Monad
 * @since 2.0.0
 */
exports.flatten = function (mma) { return chain_(mma, function_1.identity); };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
exports.alt = function (that) { return function (fa) {
    return alt_(fa, that);
}; };
/**
 * @category Extend
 * @since 2.0.0
 */
exports.duplicate = function (wa) { return extend_(wa, function_1.identity); };
/**
 * @category Extend
 * @since 2.0.0
 */
exports.extend = function (f) { return function (ma) {
    return extend_(ma, f);
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduce = function (b, f) { return function (fa) {
    return reduce_(fa, b, f);
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.foldMap = function (M) {
    var foldMapM = foldMap_(M);
    return function (f) { return function (fa) { return foldMapM(fa, f); }; };
};
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduceRight = function (b, f) { return function (fa) {
    return reduceRight_(fa, b, f);
}; };
/**
 * @category Traversable
 * @since 2.6.3
 */
exports.traverse = function (F) {
    var traverseF = traverse_(F);
    return function (f) { return function (fa) { return traverseF(fa, f); }; };
};
/**
 * @category Traversable
 * @since 2.6.3
 */
exports.sequence = function (F) { return function (ma) {
    return exports.isLeft(ma) ? F.of(exports.left(ma.left)) : F.map(ma.right, exports.right);
}; };
/**
 * @category MonadThrow
 * @since 2.6.3
 */
exports.throwError = exports.left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Either';
/**
 * @category instances
 * @since 2.0.0
 */
function getShow(SE, SA) {
    return {
        show: function (ma) { return (exports.isLeft(ma) ? "left(" + SE.show(ma.left) + ")" : "right(" + SA.show(ma.right) + ")"); }
    };
}
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.0.0
 */
function getEq(EL, EA) {
    return {
        equals: function (x, y) {
            return x === y || (exports.isLeft(x) ? exports.isLeft(y) && EL.equals(x.left, y.left) : exports.isRight(y) && EA.equals(x.right, y.right));
        }
    };
}
exports.getEq = getEq;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return (exports.isLeft(y) ? x : exports.isLeft(x) ? y : exports.right(S.concat(x.right, y.right))); }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (exports.isLeft(x) ? x : exports.isLeft(y) ? y : exports.right(S.concat(x.right, y.right))); }
    };
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @category instances
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: exports.right(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 2.0.0
 */
function getWitherable(M) {
    var empty = exports.left(M.empty);
    var compact = function (ma) {
        return exports.isLeft(ma) ? ma : ma.right._tag === 'None' ? exports.left(M.empty) : exports.right(ma.right.value);
    };
    var separate = function (ma) {
        return exports.isLeft(ma)
            ? { left: ma, right: ma }
            : exports.isLeft(ma.right)
                ? { left: exports.right(ma.right.left), right: empty }
                : { left: empty, right: exports.right(ma.right.right) };
    };
    var partitionMap = function (ma, f) {
        if (exports.isLeft(ma)) {
            return { left: ma, right: ma };
        }
        var e = f(ma.right);
        return exports.isLeft(e) ? { left: exports.right(e.left), right: empty } : { left: empty, right: exports.right(e.right) };
    };
    var partition = function (ma, p) {
        return exports.isLeft(ma)
            ? { left: ma, right: ma }
            : p(ma.right)
                ? { left: empty, right: exports.right(ma.right) }
                : { left: exports.right(ma.right), right: empty };
    };
    var filterMap = function (ma, f) {
        if (exports.isLeft(ma)) {
            return ma;
        }
        var ob = f(ma.right);
        return ob._tag === 'None' ? exports.left(M.empty) : exports.right(ob.value);
    };
    var filter = function (ma, predicate) {
        return exports.isLeft(ma) ? ma : predicate(ma.right) ? ma : exports.left(M.empty);
    };
    var wither = function (F) {
        var traverseF = traverse_(F);
        return function (ma, f) { return F.map(traverseF(ma, f), compact); };
    };
    var wilt = function (F) {
        var traverseF = traverse_(F);
        return function (ma, f) { return F.map(traverseF(ma, f), separate); };
    };
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: filterMap,
        partition: partition,
        partitionMap: partitionMap,
        traverse: traverse_,
        sequence: exports.sequence,
        reduce: reduce_,
        foldMap: foldMap_,
        reduceRight: reduceRight_,
        wither: wither,
        wilt: wilt
    };
}
exports.getWitherable = getWitherable;
/**
 * @category instances
 * @since 2.7.0
 */
function getApplicativeValidation(SE) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) {
            return exports.isLeft(fab)
                ? exports.isLeft(fa)
                    ? exports.left(SE.concat(fab.left, fa.left))
                    : fab
                : exports.isLeft(fa)
                    ? fa
                    : exports.right(fab.right(fa.right));
        },
        of: exports.of
    };
}
exports.getApplicativeValidation = getApplicativeValidation;
/**
 * @category instances
 * @since 2.7.0
 */
function getAltValidation(SE) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        alt: function (me, that) {
            if (exports.isRight(me)) {
                return me;
            }
            var ea = that();
            return exports.isLeft(ea) ? exports.left(SE.concat(me.left, ea.left)) : ea;
        }
    };
}
exports.getAltValidation = getAltValidation;
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
function getValidation(SE) {
    var applicativeValidation = getApplicativeValidation(SE);
    var altValidation = getAltValidation(SE);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        of: exports.of,
        chain: chain_,
        bimap: bimap_,
        mapLeft: mapLeft_,
        reduce: reduce_,
        foldMap: foldMap_,
        reduceRight: reduceRight_,
        extend: extend_,
        traverse: traverse_,
        sequence: exports.sequence,
        chainRec: chainRec_,
        throwError: exports.throwError,
        ap: applicativeValidation.ap,
        alt: altValidation.alt
    };
}
exports.getValidation = getValidation;
/**
 * @category instances
 * @since 2.0.0
 */
function getValidationSemigroup(SE, SA) {
    return {
        concat: function (x, y) {
            return exports.isLeft(x) ? (exports.isLeft(y) ? exports.left(SE.concat(x.left, y.left)) : x) : exports.isLeft(y) ? y : exports.right(SA.concat(x.right, y.right));
        }
    };
}
exports.getValidationSemigroup = getValidationSemigroup;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Bifunctor = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Extend = {
    URI: exports.URI,
    map: map_,
    extend: extend_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.ChainRec = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    chain: chain_,
    chainRec: chainRec_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.MonadThrow = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_,
    throwError: exports.throwError
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
function getValidationMonoid(SE, SA) {
    return {
        concat: getValidationSemigroup(SE, SA).concat,
        empty: exports.right(SA.empty)
    };
}
exports.getValidationMonoid = getValidationMonoid;
/**
 * @category instances
 * @since 2.0.0
 */
exports.either = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence,
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    extend: extend_,
    chainRec: chainRec_,
    throwError: exports.throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
function toError(e) {
    return e instanceof Error ? e : new Error(String(e));
}
exports.toError = toError;
/**
 * @since 2.0.0
 */
function elem(E) {
    return function (a, ma) { return (exports.isLeft(ma) ? false : E.equals(a, ma.right)); };
}
exports.elem = elem;
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/lib/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @since 2.0.0
 */
function exists(predicate) {
    return function (ma) { return (exports.isLeft(ma) ? false : predicate(ma.right)); };
}
exports.exists = exists;


/***/ }),

/***/ "./node_modules/fp-ts/lib/function.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/lib/function.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @since 2.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.not = exports.unsafeCoerce = exports.identity = void 0;
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
exports.identity = identity;
/**
 * @since 2.0.0
 */
exports.unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
function not(predicate) {
    return function (a) { return !predicate(a); };
}
exports.not = not;
/**
 * @since 2.0.0
 */
function constant(a) {
    return function () { return a; };
}
exports.constant = constant;
/**
 * A thunk that returns always `true`
 *
 * @since 2.0.0
 */
exports.constTrue = function () {
    return true;
};
/**
 * A thunk that returns always `false`
 *
 * @since 2.0.0
 */
exports.constFalse = function () {
    return false;
};
/**
 * A thunk that returns always `null`
 *
 * @since 2.0.0
 */
exports.constNull = function () {
    return null;
};
/**
 * A thunk that returns always `undefined`
 *
 * @since 2.0.0
 */
exports.constUndefined = function () {
    return;
};
/**
 * A thunk that returns always `void`
 *
 * @since 2.0.0
 */
exports.constVoid = function () {
    return;
};
// TODO: remove in v3
/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
function flip(f) {
    return function (b, a) { return f(a, b); };
}
exports.flip = flip;
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
exports.flow = flow;
/**
 * @since 2.0.0
 */
function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
exports.tuple = tuple;
/**
 * @since 2.0.0
 */
function increment(n) {
    return n + 1;
}
exports.increment = increment;
/**
 * @since 2.0.0
 */
function decrement(n) {
    return n - 1;
}
exports.decrement = decrement;
/**
 * @since 2.0.0
 */
function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
exports.absurd = absurd;
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/lib/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
function tupled(f) {
    return function (a) { return f.apply(void 0, a); };
}
exports.tupled = tupled;
/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
function untupled(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return f(a);
    };
}
exports.untupled = untupled;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        case 10:
            return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
    }
    return;
}
exports.pipe = pipe;
/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
exports.hole = absurd;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var scan_1 = __webpack_require__(/*! ./scanner/scan */ "./src/scanner/scan.ts");
Object.defineProperty(exports, "scan", { enumerable: true, get: function () { return scan_1.scan; } });


/***/ }),

/***/ "./src/scanner/CharacterStream.ts":
/*!****************************************!*\
  !*** ./src/scanner/CharacterStream.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterStream = void 0;
class CharacterStream {
    constructor(input) {
        this.index = 0;
        this.input = input;
    }
    hasNext() {
        return this.index < this.input.length;
    }
    peek() {
        const value = this.input[this.index];
        if (value === undefined) {
            throw new Error("char should not be undefined");
        }
        return value;
    }
    peekNext() {
        return this.input[this.index + 1];
    }
    advance() {
        const value = this.input[this.index];
        this.index++;
        if (value === undefined) {
            throw new Error("char should not be undefined");
        }
        return value;
    }
}
exports.CharacterStream = CharacterStream;


/***/ }),

/***/ "./src/scanner/ScannerConstants.ts":
/*!*****************************************!*\
  !*** ./src/scanner/ScannerConstants.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYWORDS = exports.WHITE_SPACE = exports.TWO_CHAR = exports.ONE_CHAR = void 0;
exports.ONE_CHAR = new Map([
    ["(", { type: "non_literal", kind: "LEFT_PAREN" }],
    [")", { type: "non_literal", kind: "RIGHT_PAREN" }],
    ["{", { type: "non_literal", kind: "LEFT_BRACE" }],
    ["}", { type: "non_literal", kind: "RIGHT_BRACE" }],
    [",", { type: "non_literal", kind: "COMMA" }],
    [".", { type: "non_literal", kind: "DOT" }],
    ["-", { type: "non_literal", kind: "MINUS" }],
    ["+", { type: "non_literal", kind: "PLUS" }],
    [";", { type: "non_literal", kind: "SEMICOLON" }],
    ["*", { type: "non_literal", kind: "STAR" }],
]);
exports.TWO_CHAR = new Set(["!", "=", "<", ">"]);
exports.WHITE_SPACE = new Set([" ", "\r", "\t"]);
exports.KEYWORDS = new Map([
    ["and", fromKind("AND")],
    ["class", fromKind("CLASS")],
    ["else", fromKind("ELSE")],
    ["false", fromKind("FALSE")],
    ["for", fromKind("FOR")],
    ["fun", fromKind("FUN")],
    ["if", fromKind("IF")],
    ["nil", fromKind("NIL")],
    ["or", fromKind("OR")],
    ["print", fromKind("PRINT")],
    ["return", fromKind("RETURN")],
    ["super", fromKind("SUPER")],
    ["this", fromKind("THIS")],
    ["true", fromKind("TRUE")],
    ["var", fromKind("VAR")],
    ["while", fromKind("WHILE")],
]);
function fromKind(kind) {
    return {
        type: "non_literal",
        kind,
    };
}


/***/ }),

/***/ "./src/scanner/scan.ts":
/*!*****************************!*\
  !*** ./src/scanner/scan.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scan = void 0;
const E = __importStar(__webpack_require__(/*! fp-ts/lib/Either */ "./node_modules/fp-ts/lib/Either.js"));
const CharacterStream_1 = __webpack_require__(/*! ./CharacterStream */ "./src/scanner/CharacterStream.ts");
const ScannerConstants_1 = __webpack_require__(/*! ./ScannerConstants */ "./src/scanner/ScannerConstants.ts");
const IsChar_1 = __webpack_require__(/*! ../util/IsChar */ "./src/util/IsChar.ts");
function scan(input) {
    const context = {
        stream: new CharacterStream_1.CharacterStream(input),
        line: 0,
        tokens: [],
        errors: [],
    };
    while (context.stream.hasNext()) {
        const char = context.stream.advance();
        if (ScannerConstants_1.ONE_CHAR.has(char)) {
            const token = ScannerConstants_1.ONE_CHAR.get(char);
            if (token === undefined) {
                throw new Error("Token should not be undefined");
            }
            context.tokens.push({
                line: context.line,
                token,
            });
        }
        else if (ScannerConstants_1.TWO_CHAR.has(char)) {
            Handler.forTwoCharacterTokens(context, char);
        }
        else if (char === "/") {
            Handler.forComment(context);
        }
        else if (ScannerConstants_1.WHITE_SPACE.has(char)) {
            // pass
        }
        else if (char === "\n") {
            context.line++;
        }
        else if (char === '"') {
            Handler.forString(context);
        }
        else if (IsChar_1.IsChar.numeric(char)) {
            Handler.forNumber(context);
        }
        else if (IsChar_1.IsChar.alpha(char)) {
            Handler.forReservedAndIdentifier(context);
        }
        else {
            context.errors.push({
                line: context.line,
                message: `Unexpected char ${char}`,
            });
        }
    }
    return context.errors.length === 0
        ? E.right(context.tokens)
        : E.left(context.errors);
}
exports.scan = scan;
class Handler {
    static forTwoCharacterTokens({ stream, tokens, line }, char) {
        const nextChar = stream.peekNext();
        const withLineNumber = NonLiteralBuilder.withLineNumber(line);
        switch (char) {
            case "!":
                if (nextChar === "=") {
                    tokens.push(withLineNumber("BANG_EQUAL"));
                    stream.advance();
                }
                else {
                    tokens.push(withLineNumber("BANG_EQUAL"));
                }
                break;
            case "=":
                if (nextChar === "==") {
                    tokens.push(withLineNumber("EQUAL_EQUAL"));
                    stream.advance();
                }
                else {
                    tokens.push(withLineNumber("EQUAL"));
                }
                break;
            case "<":
                if (nextChar === "=") {
                    tokens.push(withLineNumber("LESS_EQUAL"));
                    stream.advance();
                }
                else {
                    tokens.push(withLineNumber("LESS"));
                }
                break;
            case ">":
                if (nextChar === "=") {
                    tokens.push({
                        line,
                        token: { type: "non_literal", kind: "LESS_EQUAL" },
                    });
                    stream.advance();
                }
                else {
                    tokens.push({
                        line,
                        token: { type: "non_literal", kind: "LESS" },
                    });
                }
                break;
            default:
                throw new Error("This should not happen");
        }
    }
    static forComment({ stream, tokens, line }) {
        if (stream.peek() === "/") {
            while (stream.hasNext() && stream.peek() != "\n") {
                stream.advance();
            }
        }
        else {
            tokens.push(NonLiteralBuilder.withLineNumber(line)("SLASH"));
        }
    }
    static forString(context) {
        const { stream, errors, tokens } = context;
        const startIndex = stream.index;
        let seenEndQuote = false;
        while (stream.hasNext() && !seenEndQuote) {
            if (stream.peek() === "\n") {
                context.line++;
            }
            if (stream.peek() === '"') {
                seenEndQuote = true;
            }
            stream.advance();
        }
        if (!seenEndQuote) {
            errors.push({
                line: context.line,
                message: "Unterminated string",
            });
            return;
        }
        const value = stream.input.slice(startIndex, stream.index - 1);
        tokens.push({
            line: context.line,
            token: {
                type: "literal",
                value: {
                    kind: "STRING",
                    value,
                },
            },
        });
    }
    static forNumber({ stream, line, errors, tokens }) {
        const startIndex = stream.index - 1;
        while (stream.hasNext() && IsChar_1.IsChar.numeric(stream.peek())) {
            stream.advance();
        }
        if (stream.hasNext()) {
            const peekedNext = stream.peekNext();
            if (stream.peek() === "." &&
                peekedNext !== undefined &&
                IsChar_1.IsChar.numeric(peekedNext)) {
                stream.advance();
                while (IsChar_1.IsChar.numeric(stream.peek())) {
                    stream.advance();
                }
            }
        }
        const number = stream.input.slice(startIndex, stream.index);
        const asNumber = Number(number);
        if (Number.isNaN(asNumber)) {
            errors.push({
                line,
                message: `Could not parse number from ${number}`,
            });
        }
        else {
            tokens.push({
                line,
                token: {
                    type: "literal",
                    value: {
                        kind: "NUMBER",
                        value: asNumber,
                    },
                },
            });
        }
    }
    static forReservedAndIdentifier({ stream, line, tokens }) {
        const startIndex = stream.index - 1;
        while (IsChar_1.IsChar.alphaNumeric(stream.peek())) {
            stream.advance();
        }
        const word = stream.input.slice(startIndex, stream.index);
        const token = ScannerConstants_1.KEYWORDS.get(word);
        if (token === undefined) {
            tokens.push({
                line,
                token: {
                    type: "literal",
                    value: {
                        kind: "IDENTIFIER",
                        value: word,
                    },
                },
            });
        }
        else {
            tokens.push({
                line,
                token,
            });
        }
    }
}
class NonLiteralBuilder {
    static withLineNumber(line) {
        return (kind) => ({
            line,
            token: {
                type: "non_literal",
                kind,
            },
        });
    }
}


/***/ }),

/***/ "./src/util/IsChar.ts":
/*!****************************!*\
  !*** ./src/util/IsChar.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IsChar = void 0;
class IsChar {
    static alphaNumeric(c) {
        return /^[a-z0-9]+$/i.test(c);
    }
    static alpha(c) {
        return /^[A-Z]$/i.test(c);
    }
    static numeric(c) {
        return /^[0-9]+$/i.test(c);
    }
}
exports.IsChar = IsChar;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZwLXRzL2xpYi9DaGFpblJlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnAtdHMvbGliL0VpdGhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnAtdHMvbGliL2Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nhbm5lci9DaGFyYWN0ZXJTdHJlYW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjYW5uZXIvU2Nhbm5lckNvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nhbm5lci9zY2FuLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL0lzQ2hhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDZEQUE2RDtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxX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SUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQVpELHdCQVlDIiwiZmlsZSI6Im1haW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGFpbFJlYyA9IHZvaWQgMDtcbi8qKlxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIHRhaWxSZWMoYSwgZikge1xuICAgIHZhciB2ID0gZihhKTtcbiAgICB3aGlsZSAodi5fdGFnID09PSAnTGVmdCcpIHtcbiAgICAgICAgdiA9IGYodi5sZWZ0KTtcbiAgICB9XG4gICAgcmV0dXJuIHYucmlnaHQ7XG59XG5leHBvcnRzLnRhaWxSZWMgPSB0YWlsUmVjO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4aXN0cyA9IGV4cG9ydHMuZWxlbSA9IGV4cG9ydHMudG9FcnJvciA9IGV4cG9ydHMuZWl0aGVyID0gZXhwb3J0cy5nZXRWYWxpZGF0aW9uTW9ub2lkID0gZXhwb3J0cy5Nb25hZFRocm93ID0gZXhwb3J0cy5DaGFpblJlYyA9IGV4cG9ydHMuRXh0ZW5kID0gZXhwb3J0cy5BbHQgPSBleHBvcnRzLkJpZnVuY3RvciA9IGV4cG9ydHMuVHJhdmVyc2FibGUgPSBleHBvcnRzLkZvbGRhYmxlID0gZXhwb3J0cy5Nb25hZCA9IGV4cG9ydHMuQXBwbGljYXRpdmUgPSBleHBvcnRzLkZ1bmN0b3IgPSBleHBvcnRzLmdldFZhbGlkYXRpb25TZW1pZ3JvdXAgPSBleHBvcnRzLmdldFZhbGlkYXRpb24gPSBleHBvcnRzLmdldEFsdFZhbGlkYXRpb24gPSBleHBvcnRzLmdldEFwcGxpY2F0aXZlVmFsaWRhdGlvbiA9IGV4cG9ydHMuZ2V0V2l0aGVyYWJsZSA9IGV4cG9ydHMuZ2V0QXBwbHlNb25vaWQgPSBleHBvcnRzLmdldEFwcGx5U2VtaWdyb3VwID0gZXhwb3J0cy5nZXRTZW1pZ3JvdXAgPSBleHBvcnRzLmdldEVxID0gZXhwb3J0cy5nZXRTaG93ID0gZXhwb3J0cy5VUkkgPSBleHBvcnRzLnRocm93RXJyb3IgPSBleHBvcnRzLnNlcXVlbmNlID0gZXhwb3J0cy50cmF2ZXJzZSA9IGV4cG9ydHMucmVkdWNlUmlnaHQgPSBleHBvcnRzLmZvbGRNYXAgPSBleHBvcnRzLnJlZHVjZSA9IGV4cG9ydHMuZXh0ZW5kID0gZXhwb3J0cy5kdXBsaWNhdGUgPSBleHBvcnRzLmFsdCA9IGV4cG9ydHMuZmxhdHRlbiA9IGV4cG9ydHMuY2hhaW5GaXJzdCA9IGV4cG9ydHMuY2hhaW4gPSBleHBvcnRzLmNoYWluVyA9IGV4cG9ydHMub2YgPSBleHBvcnRzLmFwU2Vjb25kID0gZXhwb3J0cy5hcEZpcnN0ID0gZXhwb3J0cy5hcCA9IGV4cG9ydHMubWFwTGVmdCA9IGV4cG9ydHMuYmltYXAgPSBleHBvcnRzLm1hcCA9IGV4cG9ydHMuZmlsdGVyT3JFbHNlID0gZXhwb3J0cy5vckVsc2UgPSBleHBvcnRzLnN3YXAgPSBleHBvcnRzLmdldE9yRWxzZSA9IGV4cG9ydHMuZ2V0T3JFbHNlVyA9IGV4cG9ydHMuZm9sZCA9IGV4cG9ydHMuZnJvbVByZWRpY2F0ZSA9IGV4cG9ydHMuZnJvbU9wdGlvbiA9IGV4cG9ydHMuc3RyaW5naWZ5SlNPTiA9IGV4cG9ydHMucGFyc2VKU09OID0gZXhwb3J0cy50cnlDYXRjaCA9IGV4cG9ydHMuZnJvbU51bGxhYmxlID0gZXhwb3J0cy5yaWdodCA9IGV4cG9ydHMubGVmdCA9IGV4cG9ydHMuaXNSaWdodCA9IGV4cG9ydHMuaXNMZWZ0ID0gdm9pZCAwO1xudmFyIENoYWluUmVjXzEgPSByZXF1aXJlKFwiLi9DaGFpblJlY1wiKTtcbnZhciBmdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vZnVuY3Rpb25cIik7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBndWFyZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVpdGhlciBpcyBhbiBpbnN0YW5jZSBvZiBgTGVmdGAsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gKlxuICogQGNhdGVnb3J5IGd1YXJkc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMuaXNMZWZ0ID0gZnVuY3Rpb24gKG1hKSB7IHJldHVybiBtYS5fdGFnID09PSAnTGVmdCc7IH07XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBlaXRoZXIgaXMgYW4gaW5zdGFuY2Ugb2YgYFJpZ2h0YCwgYGZhbHNlYCBvdGhlcndpc2VcbiAqXG4gKiBAY2F0ZWdvcnkgZ3VhcmRzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5pc1JpZ2h0ID0gZnVuY3Rpb24gKG1hKSB7IHJldHVybiBtYS5fdGFnID09PSAnUmlnaHQnOyB9O1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gY29uc3RydWN0b3JzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYEVpdGhlcmAgaG9sZGluZyBhIGBMZWZ0YCB2YWx1ZS4gVGhpcyB1c3VhbGx5IHJlcHJlc2VudHMgYSBmYWlsdXJlLCBkdWUgdG8gdGhlIHJpZ2h0LWJpYXMgb2YgdGhpc1xuICogc3RydWN0dXJlXG4gKlxuICogQGNhdGVnb3J5IGNvbnN0cnVjdG9yc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMubGVmdCA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiAoeyBfdGFnOiAnTGVmdCcsIGxlZnQ6IGUgfSk7IH07XG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYEVpdGhlcmAgaG9sZGluZyBhIGBSaWdodGAgdmFsdWUuIFRoaXMgdXN1YWxseSByZXByZXNlbnRzIGEgc3VjY2Vzc2Z1bCB2YWx1ZSBkdWUgdG8gdGhlIHJpZ2h0IGJpYXNcbiAqIG9mIHRoaXMgc3RydWN0dXJlXG4gKlxuICogQGNhdGVnb3J5IGNvbnN0cnVjdG9yc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMucmlnaHQgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gKHsgX3RhZzogJ1JpZ2h0JywgcmlnaHQ6IGEgfSk7IH07XG4vLyBUT0RPOiBtYWtlIGxhenkgaW4gdjNcbi8qKlxuICogVGFrZXMgYSBkZWZhdWx0IGFuZCBhIG51bGxhYmxlIHZhbHVlLCBpZiB0aGUgdmFsdWUgaXMgbm90IG51bGx5LCB0dXJuIGl0IGludG8gYSBgUmlnaHRgLCBpZiB0aGUgdmFsdWUgaXMgbnVsbHkgdXNlXG4gKiB0aGUgcHJvdmlkZWQgZGVmYXVsdCBhcyBhIGBMZWZ0YFxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBmcm9tTnVsbGFibGUsIGxlZnQsIHJpZ2h0IH0gZnJvbSAnZnAtdHMvbGliL0VpdGhlcidcbiAqXG4gKiBjb25zdCBwYXJzZSA9IGZyb21OdWxsYWJsZSgnbnVsbHknKVxuICpcbiAqIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocGFyc2UoMSksIHJpZ2h0KDEpKVxuICogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChwYXJzZShudWxsKSwgbGVmdCgnbnVsbHknKSlcbiAqXG4gKiBAY2F0ZWdvcnkgY29uc3RydWN0b3JzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZnVuY3Rpb24gZnJvbU51bGxhYmxlKGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHsgcmV0dXJuIChhID09IG51bGwgPyBleHBvcnRzLmxlZnQoZSkgOiBleHBvcnRzLnJpZ2h0KGEpKTsgfTtcbn1cbmV4cG9ydHMuZnJvbU51bGxhYmxlID0gZnJvbU51bGxhYmxlO1xuLy8gVE9ETzogYG9uRXJyb3IgPT4gTGF6eTxBPiA9PiBFaXRoZXJgIGluIHYzXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYEVpdGhlcmAgZnJvbSBhIGZ1bmN0aW9uIHRoYXQgbWlnaHQgdGhyb3dcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgRWl0aGVyLCBsZWZ0LCByaWdodCwgdHJ5Q2F0Y2ggfSBmcm9tICdmcC10cy9saWIvRWl0aGVyJ1xuICpcbiAqIGNvbnN0IHVuc2FmZUhlYWQgPSA8QT4oYXM6IEFycmF5PEE+KTogQSA9PiB7XG4gKiAgIGlmIChhcy5sZW5ndGggPiAwKSB7XG4gKiAgICAgcmV0dXJuIGFzWzBdXG4gKiAgIH0gZWxzZSB7XG4gKiAgICAgdGhyb3cgbmV3IEVycm9yKCdlbXB0eSBhcnJheScpXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBjb25zdCBoZWFkID0gPEE+KGFzOiBBcnJheTxBPik6IEVpdGhlcjxFcnJvciwgQT4gPT4ge1xuICogICByZXR1cm4gdHJ5Q2F0Y2goKCkgPT4gdW5zYWZlSGVhZChhcyksIGUgPT4gKGUgaW5zdGFuY2VvZiBFcnJvciA/IGUgOiBuZXcgRXJyb3IoJ3Vua25vd24gZXJyb3InKSkpXG4gKiB9XG4gKlxuICogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChoZWFkKFtdKSwgbGVmdChuZXcgRXJyb3IoJ2VtcHR5IGFycmF5JykpKVxuICogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChoZWFkKFsxLCAyLCAzXSksIHJpZ2h0KDEpKVxuICpcbiAqIEBjYXRlZ29yeSBjb25zdHJ1Y3RvcnNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiB0cnlDYXRjaChmLCBvbkVycm9yKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMucmlnaHQoZigpKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMubGVmdChvbkVycm9yKGUpKTtcbiAgICB9XG59XG5leHBvcnRzLnRyeUNhdGNoID0gdHJ5Q2F0Y2g7XG4vLyBUT0RPIGN1cnJ5IGluIHYzXG4vKipcbiAqIENvbnZlcnRzIGEgSmF2YVNjcmlwdCBPYmplY3QgTm90YXRpb24gKEpTT04pIHN0cmluZyBpbnRvIGFuIG9iamVjdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgcGFyc2VKU09OLCB0b0Vycm9yLCByaWdodCwgbGVmdCB9IGZyb20gJ2ZwLXRzL2xpYi9FaXRoZXInXG4gKlxuICogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChwYXJzZUpTT04oJ3tcImFcIjoxfScsIHRvRXJyb3IpLCByaWdodCh7IGE6IDEgfSkpXG4gKiBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHBhcnNlSlNPTigne1wiYVwiOn0nLCB0b0Vycm9yKSwgbGVmdChuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgdG9rZW4gfSBpbiBKU09OIGF0IHBvc2l0aW9uIDUnKSkpXG4gKlxuICogQGNhdGVnb3J5IGNvbnN0cnVjdG9yc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIHBhcnNlSlNPTihzLCBvbkVycm9yKSB7XG4gICAgcmV0dXJuIHRyeUNhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIEpTT04ucGFyc2Uocyk7IH0sIG9uRXJyb3IpO1xufVxuZXhwb3J0cy5wYXJzZUpTT04gPSBwYXJzZUpTT047XG4vLyBUT0RPIGN1cnJ5IGluIHYzXG4vKipcbiAqIENvbnZlcnRzIGEgSmF2YVNjcmlwdCB2YWx1ZSB0byBhIEphdmFTY3JpcHQgT2JqZWN0IE5vdGF0aW9uIChKU09OKSBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIEUgZnJvbSAnZnAtdHMvbGliL0VpdGhlcidcbiAqIGltcG9ydCB7IHBpcGUgfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nXG4gKlxuICogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChFLnN0cmluZ2lmeUpTT04oeyBhOiAxIH0sIEUudG9FcnJvciksIEUucmlnaHQoJ3tcImFcIjoxfScpKVxuICogY29uc3QgY2lyY3VsYXI6IGFueSA9IHsgcmVmOiBudWxsIH1cbiAqIGNpcmN1bGFyLnJlZiA9IGNpcmN1bGFyXG4gKiBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICogICBwaXBlKFxuICogICAgIEUuc3RyaW5naWZ5SlNPTihjaXJjdWxhciwgRS50b0Vycm9yKSxcbiAqICAgICBFLm1hcExlZnQoZSA9PiBlLm1lc3NhZ2UuaW5jbHVkZXMoJ0NvbnZlcnRpbmcgY2lyY3VsYXIgc3RydWN0dXJlIHRvIEpTT04nKSlcbiAqICAgKSxcbiAqICAgRS5sZWZ0KHRydWUpXG4gKiApXG4gKlxuICogQGNhdGVnb3J5IGNvbnN0cnVjdG9yc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeUpTT04odSwgb25FcnJvcikge1xuICAgIHJldHVybiB0cnlDYXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBKU09OLnN0cmluZ2lmeSh1KTsgfSwgb25FcnJvcik7XG59XG5leHBvcnRzLnN0cmluZ2lmeUpTT04gPSBzdHJpbmdpZnlKU09OO1xuLyoqXG4gKiBAY2F0ZWdvcnkgY29uc3RydWN0b3JzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5mcm9tT3B0aW9uID0gZnVuY3Rpb24gKG9uTm9uZSkgeyByZXR1cm4gZnVuY3Rpb24gKG1hKSB7XG4gICAgcmV0dXJuIG1hLl90YWcgPT09ICdOb25lJyA/IGV4cG9ydHMubGVmdChvbk5vbmUoKSkgOiBleHBvcnRzLnJpZ2h0KG1hLnZhbHVlKTtcbn07IH07XG4vKipcbiAqIEBjYXRlZ29yeSBjb25zdHJ1Y3RvcnNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmZyb21QcmVkaWNhdGUgPSBmdW5jdGlvbiAocHJlZGljYXRlLCBvbkZhbHNlKSB7IHJldHVybiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gKHByZWRpY2F0ZShhKSA/IGV4cG9ydHMucmlnaHQoYSkgOiBleHBvcnRzLmxlZnQob25GYWxzZShhKSkpOyB9OyB9O1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gZGVzdHJ1Y3RvcnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogVGFrZXMgdHdvIGZ1bmN0aW9ucyBhbmQgYW4gYEVpdGhlcmAgdmFsdWUsIGlmIHRoZSB2YWx1ZSBpcyBhIGBMZWZ0YCB0aGUgaW5uZXIgdmFsdWUgaXMgYXBwbGllZCB0byB0aGUgZmlyc3QgZnVuY3Rpb24sXG4gKiBpZiB0aGUgdmFsdWUgaXMgYSBgUmlnaHRgIHRoZSBpbm5lciB2YWx1ZSBpcyBhcHBsaWVkIHRvIHRoZSBzZWNvbmQgZnVuY3Rpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGZvbGQsIGxlZnQsIHJpZ2h0IH0gZnJvbSAnZnAtdHMvbGliL0VpdGhlcidcbiAqIGltcG9ydCB7IHBpcGUgfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nXG4gKlxuICogZnVuY3Rpb24gb25MZWZ0KGVycm9yczogQXJyYXk8c3RyaW5nPik6IHN0cmluZyB7XG4gKiAgIHJldHVybiBgRXJyb3JzOiAke2Vycm9ycy5qb2luKCcsICcpfWBcbiAqIH1cbiAqXG4gKiBmdW5jdGlvbiBvblJpZ2h0KHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICogICByZXR1cm4gYE9rOiAke3ZhbHVlfWBcbiAqIH1cbiAqXG4gKiBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gKiAgIHBpcGUoXG4gKiAgICAgcmlnaHQoMSksXG4gKiAgICAgZm9sZChvbkxlZnQsIG9uUmlnaHQpXG4gKiAgICksXG4gKiAgICdPazogMSdcbiAqIClcbiAqIGFzc2VydC5zdHJpY3RFcXVhbChcbiAqICAgcGlwZShcbiAqICAgICBsZWZ0KFsnZXJyb3IgMScsICdlcnJvciAyJ10pLFxuICogICAgIGZvbGQob25MZWZ0LCBvblJpZ2h0KVxuICogICApLFxuICogICAnRXJyb3JzOiBlcnJvciAxLCBlcnJvciAyJ1xuICogKVxuICpcbiAqIEBjYXRlZ29yeSBkZXN0cnVjdG9yc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGZvbGQob25MZWZ0LCBvblJpZ2h0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtYSkgeyByZXR1cm4gKGV4cG9ydHMuaXNMZWZ0KG1hKSA/IG9uTGVmdChtYS5sZWZ0KSA6IG9uUmlnaHQobWEucmlnaHQpKTsgfTtcbn1cbmV4cG9ydHMuZm9sZCA9IGZvbGQ7XG4vKipcbiAqIExlc3Mgc3RyaWN0IHZlcnNpb24gb2YgW2BnZXRPckVsc2VgXSgjZ2V0T3JFbHNlKS5cbiAqXG4gKiBAY2F0ZWdvcnkgZGVzdHJ1Y3RvcnNcbiAqIEBzaW5jZSAyLjYuMFxuICovXG5leHBvcnRzLmdldE9yRWxzZVcgPSBmdW5jdGlvbiAob25MZWZ0KSB7IHJldHVybiBmdW5jdGlvbiAobWEpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0xlZnQobWEpID8gb25MZWZ0KG1hLmxlZnQpIDogbWEucmlnaHQ7XG59OyB9O1xuLyoqXG4gKiBAY2F0ZWdvcnkgZGVzdHJ1Y3RvcnNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmdldE9yRWxzZSA9IGV4cG9ydHMuZ2V0T3JFbHNlVztcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGNvbWJpbmF0b3JzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIEBjYXRlZ29yeSBjb21iaW5hdG9yc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIHN3YXAobWEpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0xlZnQobWEpID8gZXhwb3J0cy5yaWdodChtYS5sZWZ0KSA6IGV4cG9ydHMubGVmdChtYS5yaWdodCk7XG59XG5leHBvcnRzLnN3YXAgPSBzd2FwO1xuLyoqXG4gKiBAY2F0ZWdvcnkgY29tYmluYXRvcnNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiBvckVsc2Uob25MZWZ0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtYSkgeyByZXR1cm4gKGV4cG9ydHMuaXNMZWZ0KG1hKSA/IG9uTGVmdChtYS5sZWZ0KSA6IG1hKTsgfTtcbn1cbmV4cG9ydHMub3JFbHNlID0gb3JFbHNlO1xuLyoqXG4gKiBAY2F0ZWdvcnkgY29tYmluYXRvcnNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmZpbHRlck9yRWxzZSA9IGZ1bmN0aW9uIChwcmVkaWNhdGUsIG9uRmFsc2UpIHsgcmV0dXJuIGZ1bmN0aW9uIChtYSkge1xuICAgIHJldHVybiBjaGFpbl8obWEsIGZ1bmN0aW9uIChhKSB7IHJldHVybiAocHJlZGljYXRlKGEpID8gZXhwb3J0cy5yaWdodChhKSA6IGV4cG9ydHMubGVmdChvbkZhbHNlKGEpKSk7IH0pO1xufTsgfTtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIG5vbi1waXBlYWJsZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnZhciBtYXBfID0gZnVuY3Rpb24gKG1hLCBmKSB7IHJldHVybiAoZXhwb3J0cy5pc0xlZnQobWEpID8gbWEgOiBleHBvcnRzLnJpZ2h0KGYobWEucmlnaHQpKSk7IH07XG52YXIgYXBfID0gZnVuY3Rpb24gKG1hYiwgbWEpIHsgcmV0dXJuIChleHBvcnRzLmlzTGVmdChtYWIpID8gbWFiIDogZXhwb3J0cy5pc0xlZnQobWEpID8gbWEgOiBleHBvcnRzLnJpZ2h0KG1hYi5yaWdodChtYS5yaWdodCkpKTsgfTtcbnZhciBjaGFpbl8gPSBmdW5jdGlvbiAobWEsIGYpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0xlZnQobWEpID8gbWEgOiBmKG1hLnJpZ2h0KTtcbn07XG52YXIgcmVkdWNlXyA9IGZ1bmN0aW9uIChmYSwgYiwgZikgeyByZXR1cm4gKGV4cG9ydHMuaXNMZWZ0KGZhKSA/IGIgOiBmKGIsIGZhLnJpZ2h0KSk7IH07XG52YXIgZm9sZE1hcF8gPSBmdW5jdGlvbiAoTSkgeyByZXR1cm4gZnVuY3Rpb24gKGZhLCBmKSB7IHJldHVybiAoZXhwb3J0cy5pc0xlZnQoZmEpID8gTS5lbXB0eSA6IGYoZmEucmlnaHQpKTsgfTsgfTtcbnZhciByZWR1Y2VSaWdodF8gPSBmdW5jdGlvbiAoZmEsIGIsIGYpIHsgcmV0dXJuIChleHBvcnRzLmlzTGVmdChmYSkgPyBiIDogZihmYS5yaWdodCwgYikpOyB9O1xudmFyIHRyYXZlcnNlXyA9IGZ1bmN0aW9uIChGKSB7IHJldHVybiBmdW5jdGlvbiAobWEsIGYpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0xlZnQobWEpID8gRi5vZihleHBvcnRzLmxlZnQobWEubGVmdCkpIDogRi5tYXAoZihtYS5yaWdodCksIGV4cG9ydHMucmlnaHQpO1xufTsgfTtcbnZhciBiaW1hcF8gPSBmdW5jdGlvbiAoZmVhLCBmLCBnKSB7IHJldHVybiAoZXhwb3J0cy5pc0xlZnQoZmVhKSA/IGV4cG9ydHMubGVmdChmKGZlYS5sZWZ0KSkgOiBleHBvcnRzLnJpZ2h0KGcoZmVhLnJpZ2h0KSkpOyB9O1xudmFyIG1hcExlZnRfID0gZnVuY3Rpb24gKGZlYSwgZikgeyByZXR1cm4gKGV4cG9ydHMuaXNMZWZ0KGZlYSkgPyBleHBvcnRzLmxlZnQoZihmZWEubGVmdCkpIDogZmVhKTsgfTtcbnZhciBhbHRfID0gZnVuY3Rpb24gKGZhLCB0aGF0KSB7IHJldHVybiAoZXhwb3J0cy5pc0xlZnQoZmEpID8gdGhhdCgpIDogZmEpOyB9O1xudmFyIGV4dGVuZF8gPSBmdW5jdGlvbiAod2EsIGYpIHsgcmV0dXJuIChleHBvcnRzLmlzTGVmdCh3YSkgPyB3YSA6IGV4cG9ydHMucmlnaHQoZih3YSkpKTsgfTtcbnZhciBjaGFpblJlY18gPSBmdW5jdGlvbiAoYSwgZikge1xuICAgIHJldHVybiBDaGFpblJlY18xLnRhaWxSZWMoZihhKSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuaXNMZWZ0KGUpID8gZXhwb3J0cy5yaWdodChleHBvcnRzLmxlZnQoZS5sZWZ0KSkgOiBleHBvcnRzLmlzTGVmdChlLnJpZ2h0KSA/IGV4cG9ydHMubGVmdChmKGUucmlnaHQubGVmdCkpIDogZXhwb3J0cy5yaWdodChleHBvcnRzLnJpZ2h0KGUucmlnaHQucmlnaHQpKTtcbiAgICB9KTtcbn07XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBwaXBlYWJsZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogYG1hcGAgY2FuIGJlIHVzZWQgdG8gdHVybiBmdW5jdGlvbnMgYChhOiBBKSA9PiBCYCBpbnRvIGZ1bmN0aW9ucyBgKGZhOiBGPEE+KSA9PiBGPEI+YCB3aG9zZSBhcmd1bWVudCBhbmQgcmV0dXJuIHR5cGVzXG4gKiB1c2UgdGhlIHR5cGUgY29uc3RydWN0b3IgYEZgIHRvIHJlcHJlc2VudCBzb21lIGNvbXB1dGF0aW9uYWwgY29udGV4dC5cbiAqXG4gKiBAY2F0ZWdvcnkgRnVuY3RvclxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMubWFwID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGZ1bmN0aW9uIChmYSkgeyByZXR1cm4gbWFwXyhmYSwgZik7IH07IH07XG4vKipcbiAqIE1hcCBhIHBhaXIgb2YgZnVuY3Rpb25zIG92ZXIgdGhlIHR3byB0eXBlIGFyZ3VtZW50cyBvZiB0aGUgYmlmdW5jdG9yLlxuICpcbiAqIEBjYXRlZ29yeSBCaWZ1bmN0b3JcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmJpbWFwID0gZnVuY3Rpb24gKGYsIGcpIHsgcmV0dXJuIGZ1bmN0aW9uIChmYSkgeyByZXR1cm4gYmltYXBfKGZhLCBmLCBnKTsgfTsgfTtcbi8qKlxuICogTWFwIGEgZnVuY3Rpb24gb3ZlciB0aGUgZmlyc3QgdHlwZSBhcmd1bWVudCBvZiBhIGJpZnVuY3Rvci5cbiAqXG4gKiBAY2F0ZWdvcnkgQmlmdW5jdG9yXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5tYXBMZWZ0ID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGZ1bmN0aW9uIChmYSkgeyByZXR1cm4gbWFwTGVmdF8oZmEsIGYpOyB9OyB9O1xuLyoqXG4gKiBBcHBseSBhIGZ1bmN0aW9uIHRvIGFuIGFyZ3VtZW50IHVuZGVyIGEgdHlwZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAY2F0ZWdvcnkgQXBwbHlcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmFwID0gZnVuY3Rpb24gKGZhKSB7IHJldHVybiBmdW5jdGlvbiAoZmFiKSB7XG4gICAgcmV0dXJuIGFwXyhmYWIsIGZhKTtcbn07IH07XG4vKipcbiAqIENvbWJpbmUgdHdvIGVmZmVjdGZ1bCBhY3Rpb25zLCBrZWVwaW5nIG9ubHkgdGhlIHJlc3VsdCBvZiB0aGUgZmlyc3QuXG4gKlxuICogQGNhdGVnb3J5IEFwcGx5XG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5hcEZpcnN0ID0gZnVuY3Rpb24gKGZiKSB7IHJldHVybiBmdW5jdGlvbiAoZmEpIHtcbiAgICByZXR1cm4gYXBfKG1hcF8oZmEsIGZ1bmN0aW9uIChhKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBhOyB9OyB9KSwgZmIpO1xufTsgfTtcbi8qKlxuICogQ29tYmluZSB0d28gZWZmZWN0ZnVsIGFjdGlvbnMsIGtlZXBpbmcgb25seSB0aGUgcmVzdWx0IG9mIHRoZSBzZWNvbmQuXG4gKlxuICogQGNhdGVnb3J5IEFwcGx5XG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5hcFNlY29uZCA9IGZ1bmN0aW9uIChmYikgeyByZXR1cm4gZnVuY3Rpb24gKGZhKSB7XG4gICAgcmV0dXJuIGFwXyhtYXBfKGZhLCBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAoYikgeyByZXR1cm4gYjsgfTsgfSksIGZiKTtcbn07IH07XG4vKipcbiAqIEBjYXRlZ29yeSBBcHBsaWNhdGl2ZVxuICogQHNpbmNlIDIuNy4wXG4gKi9cbmV4cG9ydHMub2YgPSBleHBvcnRzLnJpZ2h0O1xuLyoqXG4gKiBMZXNzIHN0cmljdCB2ZXJzaW9uIG9mIFtgY2hhaW5gXSgjY2hhaW4pLlxuICpcbiAqIEBjYXRlZ29yeSBNb25hZFxuICogQHNpbmNlIDIuNi4wXG4gKi9cbmV4cG9ydHMuY2hhaW5XID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGZ1bmN0aW9uIChtYSkgeyByZXR1cm4gY2hhaW5fKG1hLCBmKTsgfTsgfTtcbi8qKlxuICogQ29tcG9zZXMgY29tcHV0YXRpb25zIGluIHNlcXVlbmNlLCB1c2luZyB0aGUgcmV0dXJuIHZhbHVlIG9mIG9uZSBjb21wdXRhdGlvbiB0byBkZXRlcm1pbmUgdGhlIG5leHQgY29tcHV0YXRpb24uXG4gKlxuICogQGNhdGVnb3J5IE1vbmFkXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5jaGFpbiA9IGV4cG9ydHMuY2hhaW5XO1xuLyoqXG4gKiBDb21wb3NlcyBjb21wdXRhdGlvbnMgaW4gc2VxdWVuY2UsIHVzaW5nIHRoZSByZXR1cm4gdmFsdWUgb2Ygb25lIGNvbXB1dGF0aW9uIHRvIGRldGVybWluZSB0aGUgbmV4dCBjb21wdXRhdGlvbiBhbmRcbiAqIGtlZXBpbmcgb25seSB0aGUgcmVzdWx0IG9mIHRoZSBmaXJzdC5cbiAqXG4gKiBAY2F0ZWdvcnkgTW9uYWRcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmNoYWluRmlyc3QgPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gZnVuY3Rpb24gKG1hKSB7XG4gICAgcmV0dXJuIGNoYWluXyhtYSwgZnVuY3Rpb24gKGEpIHsgcmV0dXJuIG1hcF8oZihhKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gYTsgfSk7IH0pO1xufTsgfTtcbi8qKlxuICogQGNhdGVnb3J5IE1vbmFkXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5mbGF0dGVuID0gZnVuY3Rpb24gKG1tYSkgeyByZXR1cm4gY2hhaW5fKG1tYSwgZnVuY3Rpb25fMS5pZGVudGl0eSk7IH07XG4vKipcbiAqIElkZW50aWZpZXMgYW4gYXNzb2NpYXRpdmUgb3BlcmF0aW9uIG9uIGEgdHlwZSBjb25zdHJ1Y3Rvci4gSXQgaXMgc2ltaWxhciB0byBgU2VtaWdyb3VwYCwgZXhjZXB0IHRoYXQgaXQgYXBwbGllcyB0b1xuICogdHlwZXMgb2Yga2luZCBgKiAtPiAqYC5cbiAqXG4gKiBAY2F0ZWdvcnkgQWx0XG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5hbHQgPSBmdW5jdGlvbiAodGhhdCkgeyByZXR1cm4gZnVuY3Rpb24gKGZhKSB7XG4gICAgcmV0dXJuIGFsdF8oZmEsIHRoYXQpO1xufTsgfTtcbi8qKlxuICogQGNhdGVnb3J5IEV4dGVuZFxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMuZHVwbGljYXRlID0gZnVuY3Rpb24gKHdhKSB7IHJldHVybiBleHRlbmRfKHdhLCBmdW5jdGlvbl8xLmlkZW50aXR5KTsgfTtcbi8qKlxuICogQGNhdGVnb3J5IEV4dGVuZFxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGZ1bmN0aW9uIChtYSkge1xuICAgIHJldHVybiBleHRlbmRfKG1hLCBmKTtcbn07IH07XG4vKipcbiAqIEBjYXRlZ29yeSBGb2xkYWJsZVxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMucmVkdWNlID0gZnVuY3Rpb24gKGIsIGYpIHsgcmV0dXJuIGZ1bmN0aW9uIChmYSkge1xuICAgIHJldHVybiByZWR1Y2VfKGZhLCBiLCBmKTtcbn07IH07XG4vKipcbiAqIEBjYXRlZ29yeSBGb2xkYWJsZVxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMuZm9sZE1hcCA9IGZ1bmN0aW9uIChNKSB7XG4gICAgdmFyIGZvbGRNYXBNID0gZm9sZE1hcF8oTSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiBmdW5jdGlvbiAoZmEpIHsgcmV0dXJuIGZvbGRNYXBNKGZhLCBmKTsgfTsgfTtcbn07XG4vKipcbiAqIEBjYXRlZ29yeSBGb2xkYWJsZVxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMucmVkdWNlUmlnaHQgPSBmdW5jdGlvbiAoYiwgZikgeyByZXR1cm4gZnVuY3Rpb24gKGZhKSB7XG4gICAgcmV0dXJuIHJlZHVjZVJpZ2h0XyhmYSwgYiwgZik7XG59OyB9O1xuLyoqXG4gKiBAY2F0ZWdvcnkgVHJhdmVyc2FibGVcbiAqIEBzaW5jZSAyLjYuM1xuICovXG5leHBvcnRzLnRyYXZlcnNlID0gZnVuY3Rpb24gKEYpIHtcbiAgICB2YXIgdHJhdmVyc2VGID0gdHJhdmVyc2VfKEYpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gZnVuY3Rpb24gKGZhKSB7IHJldHVybiB0cmF2ZXJzZUYoZmEsIGYpOyB9OyB9O1xufTtcbi8qKlxuICogQGNhdGVnb3J5IFRyYXZlcnNhYmxlXG4gKiBAc2luY2UgMi42LjNcbiAqL1xuZXhwb3J0cy5zZXF1ZW5jZSA9IGZ1bmN0aW9uIChGKSB7IHJldHVybiBmdW5jdGlvbiAobWEpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0xlZnQobWEpID8gRi5vZihleHBvcnRzLmxlZnQobWEubGVmdCkpIDogRi5tYXAobWEucmlnaHQsIGV4cG9ydHMucmlnaHQpO1xufTsgfTtcbi8qKlxuICogQGNhdGVnb3J5IE1vbmFkVGhyb3dcbiAqIEBzaW5jZSAyLjYuM1xuICovXG5leHBvcnRzLnRocm93RXJyb3IgPSBleHBvcnRzLmxlZnQ7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBpbnN0YW5jZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMuVVJJID0gJ0VpdGhlcic7XG4vKipcbiAqIEBjYXRlZ29yeSBpbnN0YW5jZXNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiBnZXRTaG93KFNFLCBTQSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNob3c6IGZ1bmN0aW9uIChtYSkgeyByZXR1cm4gKGV4cG9ydHMuaXNMZWZ0KG1hKSA/IFwibGVmdChcIiArIFNFLnNob3cobWEubGVmdCkgKyBcIilcIiA6IFwicmlnaHQoXCIgKyBTQS5zaG93KG1hLnJpZ2h0KSArIFwiKVwiKTsgfVxuICAgIH07XG59XG5leHBvcnRzLmdldFNob3cgPSBnZXRTaG93O1xuLyoqXG4gKiBAY2F0ZWdvcnkgaW5zdGFuY2VzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZnVuY3Rpb24gZ2V0RXEoRUwsIEVBKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIHggPT09IHkgfHwgKGV4cG9ydHMuaXNMZWZ0KHgpID8gZXhwb3J0cy5pc0xlZnQoeSkgJiYgRUwuZXF1YWxzKHgubGVmdCwgeS5sZWZ0KSA6IGV4cG9ydHMuaXNSaWdodCh5KSAmJiBFQS5lcXVhbHMoeC5yaWdodCwgeS5yaWdodCkpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0RXEgPSBnZXRFcTtcbi8qKlxuICogU2VtaWdyb3VwIHJldHVybmluZyB0aGUgbGVmdC1tb3N0IG5vbi1gTGVmdGAgdmFsdWUuIElmIGJvdGggb3BlcmFuZHMgYXJlIGBSaWdodGBzIHRoZW4gdGhlIGlubmVyIHZhbHVlcyBhcmVcbiAqIGNvbmNhdGVuYXRlZCB1c2luZyB0aGUgcHJvdmlkZWQgYFNlbWlncm91cGBcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgZ2V0U2VtaWdyb3VwLCBsZWZ0LCByaWdodCB9IGZyb20gJ2ZwLXRzL2xpYi9FaXRoZXInXG4gKiBpbXBvcnQgeyBzZW1pZ3JvdXBTdW0gfSBmcm9tICdmcC10cy9saWIvU2VtaWdyb3VwJ1xuICpcbiAqIGNvbnN0IFMgPSBnZXRTZW1pZ3JvdXA8c3RyaW5nLCBudW1iZXI+KHNlbWlncm91cFN1bSlcbiAqIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5jb25jYXQobGVmdCgnYScpLCBsZWZ0KCdiJykpLCBsZWZ0KCdhJykpXG4gKiBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFMuY29uY2F0KGxlZnQoJ2EnKSwgcmlnaHQoMikpLCByaWdodCgyKSlcbiAqIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5jb25jYXQocmlnaHQoMSksIGxlZnQoJ2InKSksIHJpZ2h0KDEpKVxuICogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChTLmNvbmNhdChyaWdodCgxKSwgcmlnaHQoMikpLCByaWdodCgzKSlcbiAqXG4gKiBAY2F0ZWdvcnkgaW5zdGFuY2VzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZnVuY3Rpb24gZ2V0U2VtaWdyb3VwKFMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiAoZXhwb3J0cy5pc0xlZnQoeSkgPyB4IDogZXhwb3J0cy5pc0xlZnQoeCkgPyB5IDogZXhwb3J0cy5yaWdodChTLmNvbmNhdCh4LnJpZ2h0LCB5LnJpZ2h0KSkpOyB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0U2VtaWdyb3VwID0gZ2V0U2VtaWdyb3VwO1xuLyoqXG4gKiBTZW1pZ3JvdXAgcmV0dXJuaW5nIHRoZSBsZWZ0LW1vc3QgYExlZnRgIHZhbHVlLiBJZiBib3RoIG9wZXJhbmRzIGFyZSBgUmlnaHRgcyB0aGVuIHRoZSBpbm5lciB2YWx1ZXNcbiAqIGFyZSBjb25jYXRlbmF0ZWQgdXNpbmcgdGhlIHByb3ZpZGVkIGBTZW1pZ3JvdXBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGdldEFwcGx5U2VtaWdyb3VwLCBsZWZ0LCByaWdodCB9IGZyb20gJ2ZwLXRzL2xpYi9FaXRoZXInXG4gKiBpbXBvcnQgeyBzZW1pZ3JvdXBTdW0gfSBmcm9tICdmcC10cy9saWIvU2VtaWdyb3VwJ1xuICpcbiAqIGNvbnN0IFMgPSBnZXRBcHBseVNlbWlncm91cDxzdHJpbmcsIG51bWJlcj4oc2VtaWdyb3VwU3VtKVxuICogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChTLmNvbmNhdChsZWZ0KCdhJyksIGxlZnQoJ2InKSksIGxlZnQoJ2EnKSlcbiAqIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5jb25jYXQobGVmdCgnYScpLCByaWdodCgyKSksIGxlZnQoJ2EnKSlcbiAqIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5jb25jYXQocmlnaHQoMSksIGxlZnQoJ2InKSksIGxlZnQoJ2InKSlcbiAqIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5jb25jYXQocmlnaHQoMSksIHJpZ2h0KDIpKSwgcmlnaHQoMykpXG4gKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGdldEFwcGx5U2VtaWdyb3VwKFMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiAoZXhwb3J0cy5pc0xlZnQoeCkgPyB4IDogZXhwb3J0cy5pc0xlZnQoeSkgPyB5IDogZXhwb3J0cy5yaWdodChTLmNvbmNhdCh4LnJpZ2h0LCB5LnJpZ2h0KSkpOyB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0QXBwbHlTZW1pZ3JvdXAgPSBnZXRBcHBseVNlbWlncm91cDtcbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGdldEFwcGx5TW9ub2lkKE0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25jYXQ6IGdldEFwcGx5U2VtaWdyb3VwKE0pLmNvbmNhdCxcbiAgICAgICAgZW1wdHk6IGV4cG9ydHMucmlnaHQoTS5lbXB0eSlcbiAgICB9O1xufVxuZXhwb3J0cy5nZXRBcHBseU1vbm9pZCA9IGdldEFwcGx5TW9ub2lkO1xuLyoqXG4gKiBCdWlsZHMgYFdpdGhlcmFibGVgIGluc3RhbmNlIGZvciBgRWl0aGVyYCBnaXZlbiBgTW9ub2lkYCBmb3IgdGhlIGxlZnQgc2lkZVxuICpcbiAqIEBjYXRlZ29yeSBpbnN0YW5jZXNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiBnZXRXaXRoZXJhYmxlKE0pIHtcbiAgICB2YXIgZW1wdHkgPSBleHBvcnRzLmxlZnQoTS5lbXB0eSk7XG4gICAgdmFyIGNvbXBhY3QgPSBmdW5jdGlvbiAobWEpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuaXNMZWZ0KG1hKSA/IG1hIDogbWEucmlnaHQuX3RhZyA9PT0gJ05vbmUnID8gZXhwb3J0cy5sZWZ0KE0uZW1wdHkpIDogZXhwb3J0cy5yaWdodChtYS5yaWdodC52YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgc2VwYXJhdGUgPSBmdW5jdGlvbiAobWEpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuaXNMZWZ0KG1hKVxuICAgICAgICAgICAgPyB7IGxlZnQ6IG1hLCByaWdodDogbWEgfVxuICAgICAgICAgICAgOiBleHBvcnRzLmlzTGVmdChtYS5yaWdodClcbiAgICAgICAgICAgICAgICA/IHsgbGVmdDogZXhwb3J0cy5yaWdodChtYS5yaWdodC5sZWZ0KSwgcmlnaHQ6IGVtcHR5IH1cbiAgICAgICAgICAgICAgICA6IHsgbGVmdDogZW1wdHksIHJpZ2h0OiBleHBvcnRzLnJpZ2h0KG1hLnJpZ2h0LnJpZ2h0KSB9O1xuICAgIH07XG4gICAgdmFyIHBhcnRpdGlvbk1hcCA9IGZ1bmN0aW9uIChtYSwgZikge1xuICAgICAgICBpZiAoZXhwb3J0cy5pc0xlZnQobWEpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBsZWZ0OiBtYSwgcmlnaHQ6IG1hIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGUgPSBmKG1hLnJpZ2h0KTtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuaXNMZWZ0KGUpID8geyBsZWZ0OiBleHBvcnRzLnJpZ2h0KGUubGVmdCksIHJpZ2h0OiBlbXB0eSB9IDogeyBsZWZ0OiBlbXB0eSwgcmlnaHQ6IGV4cG9ydHMucmlnaHQoZS5yaWdodCkgfTtcbiAgICB9O1xuICAgIHZhciBwYXJ0aXRpb24gPSBmdW5jdGlvbiAobWEsIHApIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuaXNMZWZ0KG1hKVxuICAgICAgICAgICAgPyB7IGxlZnQ6IG1hLCByaWdodDogbWEgfVxuICAgICAgICAgICAgOiBwKG1hLnJpZ2h0KVxuICAgICAgICAgICAgICAgID8geyBsZWZ0OiBlbXB0eSwgcmlnaHQ6IGV4cG9ydHMucmlnaHQobWEucmlnaHQpIH1cbiAgICAgICAgICAgICAgICA6IHsgbGVmdDogZXhwb3J0cy5yaWdodChtYS5yaWdodCksIHJpZ2h0OiBlbXB0eSB9O1xuICAgIH07XG4gICAgdmFyIGZpbHRlck1hcCA9IGZ1bmN0aW9uIChtYSwgZikge1xuICAgICAgICBpZiAoZXhwb3J0cy5pc0xlZnQobWEpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9iID0gZihtYS5yaWdodCk7XG4gICAgICAgIHJldHVybiBvYi5fdGFnID09PSAnTm9uZScgPyBleHBvcnRzLmxlZnQoTS5lbXB0eSkgOiBleHBvcnRzLnJpZ2h0KG9iLnZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBmaWx0ZXIgPSBmdW5jdGlvbiAobWEsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy5pc0xlZnQobWEpID8gbWEgOiBwcmVkaWNhdGUobWEucmlnaHQpID8gbWEgOiBleHBvcnRzLmxlZnQoTS5lbXB0eSk7XG4gICAgfTtcbiAgICB2YXIgd2l0aGVyID0gZnVuY3Rpb24gKEYpIHtcbiAgICAgICAgdmFyIHRyYXZlcnNlRiA9IHRyYXZlcnNlXyhGKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtYSwgZikgeyByZXR1cm4gRi5tYXAodHJhdmVyc2VGKG1hLCBmKSwgY29tcGFjdCk7IH07XG4gICAgfTtcbiAgICB2YXIgd2lsdCA9IGZ1bmN0aW9uIChGKSB7XG4gICAgICAgIHZhciB0cmF2ZXJzZUYgPSB0cmF2ZXJzZV8oRik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobWEsIGYpIHsgcmV0dXJuIEYubWFwKHRyYXZlcnNlRihtYSwgZiksIHNlcGFyYXRlKTsgfTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIFVSSTogZXhwb3J0cy5VUkksXG4gICAgICAgIF9FOiB1bmRlZmluZWQsXG4gICAgICAgIG1hcDogbWFwXyxcbiAgICAgICAgY29tcGFjdDogY29tcGFjdCxcbiAgICAgICAgc2VwYXJhdGU6IHNlcGFyYXRlLFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZmlsdGVyTWFwOiBmaWx0ZXJNYXAsXG4gICAgICAgIHBhcnRpdGlvbjogcGFydGl0aW9uLFxuICAgICAgICBwYXJ0aXRpb25NYXA6IHBhcnRpdGlvbk1hcCxcbiAgICAgICAgdHJhdmVyc2U6IHRyYXZlcnNlXyxcbiAgICAgICAgc2VxdWVuY2U6IGV4cG9ydHMuc2VxdWVuY2UsXG4gICAgICAgIHJlZHVjZTogcmVkdWNlXyxcbiAgICAgICAgZm9sZE1hcDogZm9sZE1hcF8sXG4gICAgICAgIHJlZHVjZVJpZ2h0OiByZWR1Y2VSaWdodF8sXG4gICAgICAgIHdpdGhlcjogd2l0aGVyLFxuICAgICAgICB3aWx0OiB3aWx0XG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0V2l0aGVyYWJsZSA9IGdldFdpdGhlcmFibGU7XG4vKipcbiAqIEBjYXRlZ29yeSBpbnN0YW5jZXNcbiAqIEBzaW5jZSAyLjcuMFxuICovXG5mdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZVZhbGlkYXRpb24oU0UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBVUkk6IGV4cG9ydHMuVVJJLFxuICAgICAgICBfRTogdW5kZWZpbmVkLFxuICAgICAgICBtYXA6IG1hcF8sXG4gICAgICAgIGFwOiBmdW5jdGlvbiAoZmFiLCBmYSkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuaXNMZWZ0KGZhYilcbiAgICAgICAgICAgICAgICA/IGV4cG9ydHMuaXNMZWZ0KGZhKVxuICAgICAgICAgICAgICAgICAgICA/IGV4cG9ydHMubGVmdChTRS5jb25jYXQoZmFiLmxlZnQsIGZhLmxlZnQpKVxuICAgICAgICAgICAgICAgICAgICA6IGZhYlxuICAgICAgICAgICAgICAgIDogZXhwb3J0cy5pc0xlZnQoZmEpXG4gICAgICAgICAgICAgICAgICAgID8gZmFcbiAgICAgICAgICAgICAgICAgICAgOiBleHBvcnRzLnJpZ2h0KGZhYi5yaWdodChmYS5yaWdodCkpO1xuICAgICAgICB9LFxuICAgICAgICBvZjogZXhwb3J0cy5vZlxuICAgIH07XG59XG5leHBvcnRzLmdldEFwcGxpY2F0aXZlVmFsaWRhdGlvbiA9IGdldEFwcGxpY2F0aXZlVmFsaWRhdGlvbjtcbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuNy4wXG4gKi9cbmZ1bmN0aW9uIGdldEFsdFZhbGlkYXRpb24oU0UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBVUkk6IGV4cG9ydHMuVVJJLFxuICAgICAgICBfRTogdW5kZWZpbmVkLFxuICAgICAgICBtYXA6IG1hcF8sXG4gICAgICAgIGFsdDogZnVuY3Rpb24gKG1lLCB0aGF0KSB7XG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5pc1JpZ2h0KG1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBlYSA9IHRoYXQoKTtcbiAgICAgICAgICAgIHJldHVybiBleHBvcnRzLmlzTGVmdChlYSkgPyBleHBvcnRzLmxlZnQoU0UuY29uY2F0KG1lLmxlZnQsIGVhLmxlZnQpKSA6IGVhO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0QWx0VmFsaWRhdGlvbiA9IGdldEFsdFZhbGlkYXRpb247XG4vLyBUT0RPOiByZW1vdmUgaW4gdjNcbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGdldFZhbGlkYXRpb24oU0UpIHtcbiAgICB2YXIgYXBwbGljYXRpdmVWYWxpZGF0aW9uID0gZ2V0QXBwbGljYXRpdmVWYWxpZGF0aW9uKFNFKTtcbiAgICB2YXIgYWx0VmFsaWRhdGlvbiA9IGdldEFsdFZhbGlkYXRpb24oU0UpO1xuICAgIHJldHVybiB7XG4gICAgICAgIFVSSTogZXhwb3J0cy5VUkksXG4gICAgICAgIF9FOiB1bmRlZmluZWQsXG4gICAgICAgIG1hcDogbWFwXyxcbiAgICAgICAgb2Y6IGV4cG9ydHMub2YsXG4gICAgICAgIGNoYWluOiBjaGFpbl8sXG4gICAgICAgIGJpbWFwOiBiaW1hcF8sXG4gICAgICAgIG1hcExlZnQ6IG1hcExlZnRfLFxuICAgICAgICByZWR1Y2U6IHJlZHVjZV8sXG4gICAgICAgIGZvbGRNYXA6IGZvbGRNYXBfLFxuICAgICAgICByZWR1Y2VSaWdodDogcmVkdWNlUmlnaHRfLFxuICAgICAgICBleHRlbmQ6IGV4dGVuZF8sXG4gICAgICAgIHRyYXZlcnNlOiB0cmF2ZXJzZV8sXG4gICAgICAgIHNlcXVlbmNlOiBleHBvcnRzLnNlcXVlbmNlLFxuICAgICAgICBjaGFpblJlYzogY2hhaW5SZWNfLFxuICAgICAgICB0aHJvd0Vycm9yOiBleHBvcnRzLnRocm93RXJyb3IsXG4gICAgICAgIGFwOiBhcHBsaWNhdGl2ZVZhbGlkYXRpb24uYXAsXG4gICAgICAgIGFsdDogYWx0VmFsaWRhdGlvbi5hbHRcbiAgICB9O1xufVxuZXhwb3J0cy5nZXRWYWxpZGF0aW9uID0gZ2V0VmFsaWRhdGlvbjtcbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGdldFZhbGlkYXRpb25TZW1pZ3JvdXAoU0UsIFNBKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29uY2F0OiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuaXNMZWZ0KHgpID8gKGV4cG9ydHMuaXNMZWZ0KHkpID8gZXhwb3J0cy5sZWZ0KFNFLmNvbmNhdCh4LmxlZnQsIHkubGVmdCkpIDogeCkgOiBleHBvcnRzLmlzTGVmdCh5KSA/IHkgOiBleHBvcnRzLnJpZ2h0KFNBLmNvbmNhdCh4LnJpZ2h0LCB5LnJpZ2h0KSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5nZXRWYWxpZGF0aW9uU2VtaWdyb3VwID0gZ2V0VmFsaWRhdGlvblNlbWlncm91cDtcbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuNy4wXG4gKi9cbmV4cG9ydHMuRnVuY3RvciA9IHtcbiAgICBVUkk6IGV4cG9ydHMuVVJJLFxuICAgIG1hcDogbWFwX1xufTtcbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuNy4wXG4gKi9cbmV4cG9ydHMuQXBwbGljYXRpdmUgPSB7XG4gICAgVVJJOiBleHBvcnRzLlVSSSxcbiAgICBtYXA6IG1hcF8sXG4gICAgYXA6IGFwXyxcbiAgICBvZjogZXhwb3J0cy5vZlxufTtcbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuNy4wXG4gKi9cbmV4cG9ydHMuTW9uYWQgPSB7XG4gICAgVVJJOiBleHBvcnRzLlVSSSxcbiAgICBtYXA6IG1hcF8sXG4gICAgYXA6IGFwXyxcbiAgICBvZjogZXhwb3J0cy5vZixcbiAgICBjaGFpbjogY2hhaW5fXG59O1xuLyoqXG4gKiBAY2F0ZWdvcnkgaW5zdGFuY2VzXG4gKiBAc2luY2UgMi43LjBcbiAqL1xuZXhwb3J0cy5Gb2xkYWJsZSA9IHtcbiAgICBVUkk6IGV4cG9ydHMuVVJJLFxuICAgIHJlZHVjZTogcmVkdWNlXyxcbiAgICBmb2xkTWFwOiBmb2xkTWFwXyxcbiAgICByZWR1Y2VSaWdodDogcmVkdWNlUmlnaHRfXG59O1xuLyoqXG4gKiBAY2F0ZWdvcnkgaW5zdGFuY2VzXG4gKiBAc2luY2UgMi43LjBcbiAqL1xuZXhwb3J0cy5UcmF2ZXJzYWJsZSA9IHtcbiAgICBVUkk6IGV4cG9ydHMuVVJJLFxuICAgIG1hcDogbWFwXyxcbiAgICByZWR1Y2U6IHJlZHVjZV8sXG4gICAgZm9sZE1hcDogZm9sZE1hcF8sXG4gICAgcmVkdWNlUmlnaHQ6IHJlZHVjZVJpZ2h0XyxcbiAgICB0cmF2ZXJzZTogdHJhdmVyc2VfLFxuICAgIHNlcXVlbmNlOiBleHBvcnRzLnNlcXVlbmNlXG59O1xuLyoqXG4gKiBAY2F0ZWdvcnkgaW5zdGFuY2VzXG4gKiBAc2luY2UgMi43LjBcbiAqL1xuZXhwb3J0cy5CaWZ1bmN0b3IgPSB7XG4gICAgVVJJOiBleHBvcnRzLlVSSSxcbiAgICBiaW1hcDogYmltYXBfLFxuICAgIG1hcExlZnQ6IG1hcExlZnRfXG59O1xuLyoqXG4gKiBAY2F0ZWdvcnkgaW5zdGFuY2VzXG4gKiBAc2luY2UgMi43LjBcbiAqL1xuZXhwb3J0cy5BbHQgPSB7XG4gICAgVVJJOiBleHBvcnRzLlVSSSxcbiAgICBtYXA6IG1hcF8sXG4gICAgYWx0OiBhbHRfXG59O1xuLyoqXG4gKiBAY2F0ZWdvcnkgaW5zdGFuY2VzXG4gKiBAc2luY2UgMi43LjBcbiAqL1xuZXhwb3J0cy5FeHRlbmQgPSB7XG4gICAgVVJJOiBleHBvcnRzLlVSSSxcbiAgICBtYXA6IG1hcF8sXG4gICAgZXh0ZW5kOiBleHRlbmRfXG59O1xuLyoqXG4gKiBAY2F0ZWdvcnkgaW5zdGFuY2VzXG4gKiBAc2luY2UgMi43LjBcbiAqL1xuZXhwb3J0cy5DaGFpblJlYyA9IHtcbiAgICBVUkk6IGV4cG9ydHMuVVJJLFxuICAgIG1hcDogbWFwXyxcbiAgICBhcDogYXBfLFxuICAgIGNoYWluOiBjaGFpbl8sXG4gICAgY2hhaW5SZWM6IGNoYWluUmVjX1xufTtcbi8qKlxuICogQGNhdGVnb3J5IGluc3RhbmNlc1xuICogQHNpbmNlIDIuNy4wXG4gKi9cbmV4cG9ydHMuTW9uYWRUaHJvdyA9IHtcbiAgICBVUkk6IGV4cG9ydHMuVVJJLFxuICAgIG1hcDogbWFwXyxcbiAgICBhcDogYXBfLFxuICAgIG9mOiBleHBvcnRzLm9mLFxuICAgIGNoYWluOiBjaGFpbl8sXG4gICAgdGhyb3dFcnJvcjogZXhwb3J0cy50aHJvd0Vycm9yXG59O1xuLy8gVE9ETzogcmVtb3ZlIGluIHYzXG4vKipcbiAqIEBjYXRlZ29yeSBpbnN0YW5jZXNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiBnZXRWYWxpZGF0aW9uTW9ub2lkKFNFLCBTQSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbmNhdDogZ2V0VmFsaWRhdGlvblNlbWlncm91cChTRSwgU0EpLmNvbmNhdCxcbiAgICAgICAgZW1wdHk6IGV4cG9ydHMucmlnaHQoU0EuZW1wdHkpXG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0VmFsaWRhdGlvbk1vbm9pZCA9IGdldFZhbGlkYXRpb25Nb25vaWQ7XG4vKipcbiAqIEBjYXRlZ29yeSBpbnN0YW5jZXNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmVpdGhlciA9IHtcbiAgICBVUkk6IGV4cG9ydHMuVVJJLFxuICAgIG1hcDogbWFwXyxcbiAgICBvZjogZXhwb3J0cy5vZixcbiAgICBhcDogYXBfLFxuICAgIGNoYWluOiBjaGFpbl8sXG4gICAgcmVkdWNlOiByZWR1Y2VfLFxuICAgIGZvbGRNYXA6IGZvbGRNYXBfLFxuICAgIHJlZHVjZVJpZ2h0OiByZWR1Y2VSaWdodF8sXG4gICAgdHJhdmVyc2U6IHRyYXZlcnNlXyxcbiAgICBzZXF1ZW5jZTogZXhwb3J0cy5zZXF1ZW5jZSxcbiAgICBiaW1hcDogYmltYXBfLFxuICAgIG1hcExlZnQ6IG1hcExlZnRfLFxuICAgIGFsdDogYWx0XyxcbiAgICBleHRlbmQ6IGV4dGVuZF8sXG4gICAgY2hhaW5SZWM6IGNoYWluUmVjXyxcbiAgICB0aHJvd0Vycm9yOiBleHBvcnRzLnRocm93RXJyb3Jcbn07XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyB1dGlsc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBEZWZhdWx0IHZhbHVlIGZvciB0aGUgYG9uRXJyb3JgIGFyZ3VtZW50IG9mIGB0cnlDYXRjaGBcbiAqXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZnVuY3Rpb24gdG9FcnJvcihlKSB7XG4gICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBFcnJvciA/IGUgOiBuZXcgRXJyb3IoU3RyaW5nKGUpKTtcbn1cbmV4cG9ydHMudG9FcnJvciA9IHRvRXJyb3I7XG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiBlbGVtKEUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIG1hKSB7IHJldHVybiAoZXhwb3J0cy5pc0xlZnQobWEpID8gZmFsc2UgOiBFLmVxdWFscyhhLCBtYS5yaWdodCkpOyB9O1xufVxuZXhwb3J0cy5lbGVtID0gZWxlbTtcbi8qKlxuICogUmV0dXJucyBgZmFsc2VgIGlmIGBMZWZ0YCBvciByZXR1cm5zIHRoZSByZXN1bHQgb2YgdGhlIGFwcGxpY2F0aW9uIG9mIHRoZSBnaXZlbiBwcmVkaWNhdGUgdG8gdGhlIGBSaWdodGAgdmFsdWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGV4aXN0cywgbGVmdCwgcmlnaHQgfSBmcm9tICdmcC10cy9saWIvRWl0aGVyJ1xuICpcbiAqIGNvbnN0IGd0MiA9IGV4aXN0cygobjogbnVtYmVyKSA9PiBuID4gMilcbiAqXG4gKiBhc3NlcnQuc3RyaWN0RXF1YWwoZ3QyKGxlZnQoJ2EnKSksIGZhbHNlKVxuICogYXNzZXJ0LnN0cmljdEVxdWFsKGd0MihyaWdodCgxKSksIGZhbHNlKVxuICogYXNzZXJ0LnN0cmljdEVxdWFsKGd0MihyaWdodCgzKSksIHRydWUpXG4gKlxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGV4aXN0cyhwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1hKSB7IHJldHVybiAoZXhwb3J0cy5pc0xlZnQobWEpID8gZmFsc2UgOiBwcmVkaWNhdGUobWEucmlnaHQpKTsgfTtcbn1cbmV4cG9ydHMuZXhpc3RzID0gZXhpc3RzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmhvbGUgPSBleHBvcnRzLnBpcGUgPSBleHBvcnRzLnVudHVwbGVkID0gZXhwb3J0cy50dXBsZWQgPSBleHBvcnRzLmFic3VyZCA9IGV4cG9ydHMuZGVjcmVtZW50ID0gZXhwb3J0cy5pbmNyZW1lbnQgPSBleHBvcnRzLnR1cGxlID0gZXhwb3J0cy5mbG93ID0gZXhwb3J0cy5mbGlwID0gZXhwb3J0cy5jb25zdFZvaWQgPSBleHBvcnRzLmNvbnN0VW5kZWZpbmVkID0gZXhwb3J0cy5jb25zdE51bGwgPSBleHBvcnRzLmNvbnN0RmFsc2UgPSBleHBvcnRzLmNvbnN0VHJ1ZSA9IGV4cG9ydHMuY29uc3RhbnQgPSBleHBvcnRzLm5vdCA9IGV4cG9ydHMudW5zYWZlQ29lcmNlID0gZXhwb3J0cy5pZGVudGl0eSA9IHZvaWQgMDtcbi8qKlxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KGEpIHtcbiAgICByZXR1cm4gYTtcbn1cbmV4cG9ydHMuaWRlbnRpdHkgPSBpZGVudGl0eTtcbi8qKlxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydHMudW5zYWZlQ29lcmNlID0gaWRlbnRpdHk7XG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiBub3QocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7IHJldHVybiAhcHJlZGljYXRlKGEpOyB9O1xufVxuZXhwb3J0cy5ub3QgPSBub3Q7XG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiBjb25zdGFudChhKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGE7IH07XG59XG5leHBvcnRzLmNvbnN0YW50ID0gY29uc3RhbnQ7XG4vKipcbiAqIEEgdGh1bmsgdGhhdCByZXR1cm5zIGFsd2F5cyBgdHJ1ZWBcbiAqXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5jb25zdFRydWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuLyoqXG4gKiBBIHRodW5rIHRoYXQgcmV0dXJucyBhbHdheXMgYGZhbHNlYFxuICpcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmNvbnN0RmFsc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbi8qKlxuICogQSB0aHVuayB0aGF0IHJldHVybnMgYWx3YXlzIGBudWxsYFxuICpcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmNvbnN0TnVsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbnVsbDtcbn07XG4vKipcbiAqIEEgdGh1bmsgdGhhdCByZXR1cm5zIGFsd2F5cyBgdW5kZWZpbmVkYFxuICpcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnRzLmNvbnN0VW5kZWZpbmVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybjtcbn07XG4vKipcbiAqIEEgdGh1bmsgdGhhdCByZXR1cm5zIGFsd2F5cyBgdm9pZGBcbiAqXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZXhwb3J0cy5jb25zdFZvaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuO1xufTtcbi8vIFRPRE86IHJlbW92ZSBpbiB2M1xuLyoqXG4gKiBGbGlwcyB0aGUgb3JkZXIgb2YgdGhlIGFyZ3VtZW50cyBvZiBhIGZ1bmN0aW9uIG9mIHR3byBhcmd1bWVudHMuXG4gKlxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGZsaXAoZikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYiwgYSkgeyByZXR1cm4gZihhLCBiKTsgfTtcbn1cbmV4cG9ydHMuZmxpcCA9IGZsaXA7XG5mdW5jdGlvbiBmbG93KGFiLCBiYywgY2QsIGRlLCBlZiwgZmcsIGdoLCBoaSwgaWopIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIGFiO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiYyhhYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNkKGJjKGFiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlKGNkKGJjKGFiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlZihkZShjZChiYyhhYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSkpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZnKGVmKGRlKGNkKGJjKGFiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpKSkpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdoKGZnKGVmKGRlKGNkKGJjKGFiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpKSkpKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBoaShnaChmZyhlZihkZShjZChiYyhhYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSkpKSkpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlqKGhpKGdoKGZnKGVmKGRlKGNkKGJjKGFiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpKSkpKSkpKTtcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybjtcbn1cbmV4cG9ydHMuZmxvdyA9IGZsb3c7XG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiB0dXBsZSgpIHtcbiAgICB2YXIgdCA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHRbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59XG5leHBvcnRzLnR1cGxlID0gdHVwbGU7XG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5mdW5jdGlvbiBpbmNyZW1lbnQobikge1xuICAgIHJldHVybiBuICsgMTtcbn1cbmV4cG9ydHMuaW5jcmVtZW50ID0gaW5jcmVtZW50O1xuLyoqXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuZnVuY3Rpb24gZGVjcmVtZW50KG4pIHtcbiAgICByZXR1cm4gbiAtIDE7XG59XG5leHBvcnRzLmRlY3JlbWVudCA9IGRlY3JlbWVudDtcbi8qKlxuICogQHNpbmNlIDIuMC4wXG4gKi9cbmZ1bmN0aW9uIGFic3VyZChfKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYWxsZWQgYGFic3VyZGAgZnVuY3Rpb24gd2hpY2ggc2hvdWxkIGJlIHVuY2FsbGFibGUnKTtcbn1cbmV4cG9ydHMuYWJzdXJkID0gYWJzdXJkO1xuLyoqXG4gKiBDcmVhdGVzIGEgdHVwbGVkIHZlcnNpb24gb2YgdGhpcyBmdW5jdGlvbjogaW5zdGVhZCBvZiBgbmAgYXJndW1lbnRzLCBpdCBhY2NlcHRzIGEgc2luZ2xlIHR1cGxlIGFyZ3VtZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyB0dXBsZWQgfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nXG4gKlxuICogY29uc3QgYWRkID0gdHVwbGVkKCh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciA9PiB4ICsgeSlcbiAqXG4gKiBhc3NlcnQuc3RyaWN0RXF1YWwoYWRkKFsxLCAyXSksIDMpXG4gKlxuICogQHNpbmNlIDIuNC4wXG4gKi9cbmZ1bmN0aW9uIHR1cGxlZChmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7IHJldHVybiBmLmFwcGx5KHZvaWQgMCwgYSk7IH07XG59XG5leHBvcnRzLnR1cGxlZCA9IHR1cGxlZDtcbi8qKlxuICogSW52ZXJzZSBmdW5jdGlvbiBvZiBgdHVwbGVkYFxuICpcbiAqIEBzaW5jZSAyLjQuMFxuICovXG5mdW5jdGlvbiB1bnR1cGxlZChmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZihhKTtcbiAgICB9O1xufVxuZXhwb3J0cy51bnR1cGxlZCA9IHVudHVwbGVkO1xuZnVuY3Rpb24gcGlwZShhLCBhYiwgYmMsIGNkLCBkZSwgZWYsIGZnLCBnaCwgaGksIGlqKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gYWIoYSk7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBiYyhhYihhKSk7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybiBjZChiYyhhYihhKSkpO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICByZXR1cm4gZGUoY2QoYmMoYWIoYSkpKSk7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHJldHVybiBlZihkZShjZChiYyhhYihhKSkpKSk7XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIHJldHVybiBmZyhlZihkZShjZChiYyhhYihhKSkpKSkpO1xuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICByZXR1cm4gZ2goZmcoZWYoZGUoY2QoYmMoYWIoYSkpKSkpKSk7XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIHJldHVybiBoaShnaChmZyhlZihkZShjZChiYyhhYihhKSkpKSkpKSk7XG4gICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICByZXR1cm4gaWooaGkoZ2goZmcoZWYoZGUoY2QoYmMoYWIoYSkpKSkpKSkpKTtcbiAgICB9XG4gICAgcmV0dXJuO1xufVxuZXhwb3J0cy5waXBlID0gcGlwZTtcbi8qKlxuICogVHlwZSBob2xlIHNpbXVsYXRpb25cbiAqXG4gKiBAc2luY2UgMi43LjBcbiAqL1xuZXhwb3J0cy5ob2xlID0gYWJzdXJkO1xuIiwiZXhwb3J0IHsgc2NhbiB9IGZyb20gXCIuL3NjYW5uZXIvc2NhblwiO1xuIiwiZXhwb3J0IGNsYXNzIENoYXJhY3RlclN0cmVhbSB7XG4gIHB1YmxpYyBpbnB1dDogc3RyaW5nO1xuICBwdWJsaWMgaW5kZXggPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0OiBzdHJpbmcpIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gIH1cblxuICBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmluZGV4IDwgdGhpcy5pbnB1dC5sZW5ndGg7XG4gIH1cblxuICBwZWVrKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmlucHV0W3RoaXMuaW5kZXhdO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFyIHNob3VsZCBub3QgYmUgdW5kZWZpbmVkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwZWVrTmV4dCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmlucHV0W3RoaXMuaW5kZXggKyAxXTtcbiAgfVxuXG4gIGFkdmFuY2UoKTogc3RyaW5nIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXRbdGhpcy5pbmRleF07XG4gICAgdGhpcy5pbmRleCsrO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFyIHNob3VsZCBub3QgYmUgdW5kZWZpbmVkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5vbkxpdGVyYWwgfSBmcm9tIFwiLi9Ub2tlblwiO1xuXG5leHBvcnQgY29uc3QgT05FX0NIQVI6IE1hcDxzdHJpbmcsIE5vbkxpdGVyYWw+ID0gbmV3IE1hcChbXG4gIFtcIihcIiwgeyB0eXBlOiBcIm5vbl9saXRlcmFsXCIsIGtpbmQ6IFwiTEVGVF9QQVJFTlwiIH1dLFxuICBbXCIpXCIsIHsgdHlwZTogXCJub25fbGl0ZXJhbFwiLCBraW5kOiBcIlJJR0hUX1BBUkVOXCIgfV0sXG4gIFtcIntcIiwgeyB0eXBlOiBcIm5vbl9saXRlcmFsXCIsIGtpbmQ6IFwiTEVGVF9CUkFDRVwiIH1dLFxuICBbXCJ9XCIsIHsgdHlwZTogXCJub25fbGl0ZXJhbFwiLCBraW5kOiBcIlJJR0hUX0JSQUNFXCIgfV0sXG4gIFtcIixcIiwgeyB0eXBlOiBcIm5vbl9saXRlcmFsXCIsIGtpbmQ6IFwiQ09NTUFcIiB9XSxcbiAgW1wiLlwiLCB7IHR5cGU6IFwibm9uX2xpdGVyYWxcIiwga2luZDogXCJET1RcIiB9XSxcbiAgW1wiLVwiLCB7IHR5cGU6IFwibm9uX2xpdGVyYWxcIiwga2luZDogXCJNSU5VU1wiIH1dLFxuICBbXCIrXCIsIHsgdHlwZTogXCJub25fbGl0ZXJhbFwiLCBraW5kOiBcIlBMVVNcIiB9XSxcbiAgW1wiO1wiLCB7IHR5cGU6IFwibm9uX2xpdGVyYWxcIiwga2luZDogXCJTRU1JQ09MT05cIiB9XSxcbiAgW1wiKlwiLCB7IHR5cGU6IFwibm9uX2xpdGVyYWxcIiwga2luZDogXCJTVEFSXCIgfV0sXG5dKTtcbmV4cG9ydCBjb25zdCBUV09fQ0hBUjogU2V0PHN0cmluZz4gPSBuZXcgU2V0KFtcIiFcIiwgXCI9XCIsIFwiPFwiLCBcIj5cIl0pO1xuZXhwb3J0IGNvbnN0IFdISVRFX1NQQUNFOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoW1wiIFwiLCBcIlxcclwiLCBcIlxcdFwiXSk7XG5leHBvcnQgY29uc3QgS0VZV09SRFM6IE1hcDxzdHJpbmcsIE5vbkxpdGVyYWw+ID0gbmV3IE1hcChbXG4gIFtcImFuZFwiLCBmcm9tS2luZChcIkFORFwiKV0sXG4gIFtcImNsYXNzXCIsIGZyb21LaW5kKFwiQ0xBU1NcIildLFxuICBbXCJlbHNlXCIsIGZyb21LaW5kKFwiRUxTRVwiKV0sXG4gIFtcImZhbHNlXCIsIGZyb21LaW5kKFwiRkFMU0VcIildLFxuICBbXCJmb3JcIiwgZnJvbUtpbmQoXCJGT1JcIildLFxuICBbXCJmdW5cIiwgZnJvbUtpbmQoXCJGVU5cIildLFxuICBbXCJpZlwiLCBmcm9tS2luZChcIklGXCIpXSxcbiAgW1wibmlsXCIsIGZyb21LaW5kKFwiTklMXCIpXSxcbiAgW1wib3JcIiwgZnJvbUtpbmQoXCJPUlwiKV0sXG4gIFtcInByaW50XCIsIGZyb21LaW5kKFwiUFJJTlRcIildLFxuICBbXCJyZXR1cm5cIiwgZnJvbUtpbmQoXCJSRVRVUk5cIildLFxuICBbXCJzdXBlclwiLCBmcm9tS2luZChcIlNVUEVSXCIpXSxcbiAgW1widGhpc1wiLCBmcm9tS2luZChcIlRISVNcIildLFxuICBbXCJ0cnVlXCIsIGZyb21LaW5kKFwiVFJVRVwiKV0sXG4gIFtcInZhclwiLCBmcm9tS2luZChcIlZBUlwiKV0sXG4gIFtcIndoaWxlXCIsIGZyb21LaW5kKFwiV0hJTEVcIildLFxuXSk7XG5cbmZ1bmN0aW9uIGZyb21LaW5kKGtpbmQ6IE5vbkxpdGVyYWxbXCJraW5kXCJdKTogTm9uTGl0ZXJhbCB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJub25fbGl0ZXJhbFwiLFxuICAgIGtpbmQsXG4gIH07XG59XG4iLCJpbXBvcnQgKiBhcyBFIGZyb20gXCJmcC10cy9saWIvRWl0aGVyXCI7XG5cbmltcG9ydCB7IFRva2VuLCBOb25MaXRlcmFsIH0gZnJvbSBcIi4vVG9rZW5cIjtcbmltcG9ydCB7IENoYXJhY3RlclN0cmVhbSB9IGZyb20gXCIuL0NoYXJhY3RlclN0cmVhbVwiO1xuaW1wb3J0IHsgU2NhbkVycm9yIH0gZnJvbSBcIi4vU2NhbkVycm9yXCI7XG5pbXBvcnQgeyBPTkVfQ0hBUiwgVFdPX0NIQVIsIFdISVRFX1NQQUNFLCBLRVlXT1JEUyB9IGZyb20gXCIuL1NjYW5uZXJDb25zdGFudHNcIjtcbmltcG9ydCB7IElzQ2hhciB9IGZyb20gXCIuLi91dGlsL0lzQ2hhclwiO1xuXG5pbnRlcmZhY2UgU2NhbkNvbnRleHQge1xuICBzdHJlYW06IENoYXJhY3RlclN0cmVhbTtcbiAgbGluZTogbnVtYmVyO1xuICB0b2tlbnM6IFRva2VuW107XG4gIGVycm9yczogU2NhbkVycm9yW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FuKGlucHV0OiBzdHJpbmcpOiBFLkVpdGhlcjxTY2FuRXJyb3JbXSwgVG9rZW5bXT4ge1xuICBjb25zdCBjb250ZXh0OiBTY2FuQ29udGV4dCA9IHtcbiAgICBzdHJlYW06IG5ldyBDaGFyYWN0ZXJTdHJlYW0oaW5wdXQpLFxuICAgIGxpbmU6IDAsXG4gICAgdG9rZW5zOiBbXSxcbiAgICBlcnJvcnM6IFtdLFxuICB9O1xuXG4gIHdoaWxlIChjb250ZXh0LnN0cmVhbS5oYXNOZXh0KCkpIHtcbiAgICBjb25zdCBjaGFyID0gY29udGV4dC5zdHJlYW0uYWR2YW5jZSgpO1xuICAgIGlmIChPTkVfQ0hBUi5oYXMoY2hhcikpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gT05FX0NIQVIuZ2V0KGNoYXIpO1xuICAgICAgaWYgKHRva2VuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9rZW4gc2hvdWxkIG5vdCBiZSB1bmRlZmluZWRcIik7XG4gICAgICB9XG4gICAgICBjb250ZXh0LnRva2Vucy5wdXNoKHtcbiAgICAgICAgbGluZTogY29udGV4dC5saW5lLFxuICAgICAgICB0b2tlbixcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoVFdPX0NIQVIuaGFzKGNoYXIpKSB7XG4gICAgICBIYW5kbGVyLmZvclR3b0NoYXJhY3RlclRva2Vucyhjb250ZXh0LCBjaGFyKTtcbiAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiL1wiKSB7XG4gICAgICBIYW5kbGVyLmZvckNvbW1lbnQoY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChXSElURV9TUEFDRS5oYXMoY2hhcikpIHtcbiAgICAgIC8vIHBhc3NcbiAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiXFxuXCIpIHtcbiAgICAgIGNvbnRleHQubGluZSsrO1xuICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJ1wiJykge1xuICAgICAgSGFuZGxlci5mb3JTdHJpbmcoY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChJc0NoYXIubnVtZXJpYyhjaGFyKSkge1xuICAgICAgSGFuZGxlci5mb3JOdW1iZXIoY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChJc0NoYXIuYWxwaGEoY2hhcikpIHtcbiAgICAgIEhhbmRsZXIuZm9yUmVzZXJ2ZWRBbmRJZGVudGlmaWVyKGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZXh0LmVycm9ycy5wdXNoKHtcbiAgICAgICAgbGluZTogY29udGV4dC5saW5lLFxuICAgICAgICBtZXNzYWdlOiBgVW5leHBlY3RlZCBjaGFyICR7Y2hhcn1gLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQuZXJyb3JzLmxlbmd0aCA9PT0gMFxuICAgID8gRS5yaWdodChjb250ZXh0LnRva2VucylcbiAgICA6IEUubGVmdChjb250ZXh0LmVycm9ycyk7XG59XG5cbmNsYXNzIEhhbmRsZXIge1xuICBzdGF0aWMgZm9yVHdvQ2hhcmFjdGVyVG9rZW5zKFxuICAgIHsgc3RyZWFtLCB0b2tlbnMsIGxpbmUgfTogU2NhbkNvbnRleHQsXG4gICAgY2hhcjogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IG5leHRDaGFyID0gc3RyZWFtLnBlZWtOZXh0KCk7XG4gICAgY29uc3Qgd2l0aExpbmVOdW1iZXIgPSBOb25MaXRlcmFsQnVpbGRlci53aXRoTGluZU51bWJlcihsaW5lKTtcbiAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgIGNhc2UgXCIhXCI6XG4gICAgICAgIGlmIChuZXh0Q2hhciA9PT0gXCI9XCIpIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh3aXRoTGluZU51bWJlcihcIkJBTkdfRVFVQUxcIikpO1xuICAgICAgICAgIHN0cmVhbS5hZHZhbmNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2god2l0aExpbmVOdW1iZXIoXCJCQU5HX0VRVUFMXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCI9XCI6XG4gICAgICAgIGlmIChuZXh0Q2hhciA9PT0gXCI9PVwiKSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2god2l0aExpbmVOdW1iZXIoXCJFUVVBTF9FUVVBTFwiKSk7XG4gICAgICAgICAgc3RyZWFtLmFkdmFuY2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh3aXRoTGluZU51bWJlcihcIkVRVUFMXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCI8XCI6XG4gICAgICAgIGlmIChuZXh0Q2hhciA9PT0gXCI9XCIpIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh3aXRoTGluZU51bWJlcihcIkxFU1NfRVFVQUxcIikpO1xuICAgICAgICAgIHN0cmVhbS5hZHZhbmNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2god2l0aExpbmVOdW1iZXIoXCJMRVNTXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCI+XCI6XG4gICAgICAgIGlmIChuZXh0Q2hhciA9PT0gXCI9XCIpIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICBsaW5lLFxuICAgICAgICAgICAgdG9rZW46IHsgdHlwZTogXCJub25fbGl0ZXJhbFwiLCBraW5kOiBcIkxFU1NfRVFVQUxcIiB9LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc3RyZWFtLmFkdmFuY2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICBsaW5lLFxuICAgICAgICAgICAgdG9rZW46IHsgdHlwZTogXCJub25fbGl0ZXJhbFwiLCBraW5kOiBcIkxFU1NcIiB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzaG91bGQgbm90IGhhcHBlblwiKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZm9yQ29tbWVudCh7IHN0cmVhbSwgdG9rZW5zLCBsaW5lIH06IFNjYW5Db250ZXh0KSB7XG4gICAgaWYgKHN0cmVhbS5wZWVrKCkgPT09IFwiL1wiKSB7XG4gICAgICB3aGlsZSAoc3RyZWFtLmhhc05leHQoKSAmJiBzdHJlYW0ucGVlaygpICE9IFwiXFxuXCIpIHtcbiAgICAgICAgc3RyZWFtLmFkdmFuY2UoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zLnB1c2goTm9uTGl0ZXJhbEJ1aWxkZXIud2l0aExpbmVOdW1iZXIobGluZSkoXCJTTEFTSFwiKSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvclN0cmluZyhjb250ZXh0OiBTY2FuQ29udGV4dCkge1xuICAgIGNvbnN0IHsgc3RyZWFtLCBlcnJvcnMsIHRva2VucyB9ID0gY29udGV4dDtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gc3RyZWFtLmluZGV4O1xuICAgIGxldCBzZWVuRW5kUXVvdGUgPSBmYWxzZTtcbiAgICB3aGlsZSAoc3RyZWFtLmhhc05leHQoKSAmJiAhc2VlbkVuZFF1b3RlKSB7XG4gICAgICBpZiAoc3RyZWFtLnBlZWsoKSA9PT0gXCJcXG5cIikge1xuICAgICAgICBjb250ZXh0LmxpbmUrKztcbiAgICAgIH1cblxuICAgICAgaWYgKHN0cmVhbS5wZWVrKCkgPT09ICdcIicpIHtcbiAgICAgICAgc2VlbkVuZFF1b3RlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHN0cmVhbS5hZHZhbmNlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFzZWVuRW5kUXVvdGUpIHtcbiAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgbGluZTogY29udGV4dC5saW5lLFxuICAgICAgICBtZXNzYWdlOiBcIlVudGVybWluYXRlZCBzdHJpbmdcIixcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gc3RyZWFtLmlucHV0LnNsaWNlKHN0YXJ0SW5kZXgsIHN0cmVhbS5pbmRleCAtIDEpO1xuICAgIHRva2Vucy5wdXNoKHtcbiAgICAgIGxpbmU6IGNvbnRleHQubGluZSxcbiAgICAgIHRva2VuOiB7XG4gICAgICAgIHR5cGU6IFwibGl0ZXJhbFwiLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIGtpbmQ6IFwiU1RSSU5HXCIsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZvck51bWJlcih7IHN0cmVhbSwgbGluZSwgZXJyb3JzLCB0b2tlbnMgfTogU2NhbkNvbnRleHQpIHtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gc3RyZWFtLmluZGV4IC0gMTtcbiAgICB3aGlsZSAoc3RyZWFtLmhhc05leHQoKSAmJiBJc0NoYXIubnVtZXJpYyhzdHJlYW0ucGVlaygpKSkge1xuICAgICAgc3RyZWFtLmFkdmFuY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgcGVla2VkTmV4dCA9IHN0cmVhbS5wZWVrTmV4dCgpO1xuICAgICAgaWYgKFxuICAgICAgICBzdHJlYW0ucGVlaygpID09PSBcIi5cIiAmJlxuICAgICAgICBwZWVrZWROZXh0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgSXNDaGFyLm51bWVyaWMocGVla2VkTmV4dClcbiAgICAgICkge1xuICAgICAgICBzdHJlYW0uYWR2YW5jZSgpO1xuXG4gICAgICAgIHdoaWxlIChJc0NoYXIubnVtZXJpYyhzdHJlYW0ucGVlaygpKSkge1xuICAgICAgICAgIHN0cmVhbS5hZHZhbmNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbnVtYmVyID0gc3RyZWFtLmlucHV0LnNsaWNlKHN0YXJ0SW5kZXgsIHN0cmVhbS5pbmRleCk7XG4gICAgY29uc3QgYXNOdW1iZXIgPSBOdW1iZXIobnVtYmVyKTtcblxuICAgIGlmIChOdW1iZXIuaXNOYU4oYXNOdW1iZXIpKSB7XG4gICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgIGxpbmUsXG4gICAgICAgIG1lc3NhZ2U6IGBDb3VsZCBub3QgcGFyc2UgbnVtYmVyIGZyb20gJHtudW1iZXJ9YCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIGxpbmUsXG4gICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgdHlwZTogXCJsaXRlcmFsXCIsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGtpbmQ6IFwiTlVNQkVSXCIsXG4gICAgICAgICAgICB2YWx1ZTogYXNOdW1iZXIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JSZXNlcnZlZEFuZElkZW50aWZpZXIoeyBzdHJlYW0sIGxpbmUsIHRva2VucyB9OiBTY2FuQ29udGV4dCkge1xuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBzdHJlYW0uaW5kZXggLSAxO1xuICAgIHdoaWxlIChJc0NoYXIuYWxwaGFOdW1lcmljKHN0cmVhbS5wZWVrKCkpKSB7XG4gICAgICBzdHJlYW0uYWR2YW5jZSgpO1xuICAgIH1cbiAgICBjb25zdCB3b3JkID0gc3RyZWFtLmlucHV0LnNsaWNlKHN0YXJ0SW5kZXgsIHN0cmVhbS5pbmRleCk7XG4gICAgY29uc3QgdG9rZW4gPSBLRVlXT1JEUy5nZXQod29yZCk7XG4gICAgaWYgKHRva2VuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgbGluZSxcbiAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICB0eXBlOiBcImxpdGVyYWxcIixcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAga2luZDogXCJJREVOVElGSUVSXCIsXG4gICAgICAgICAgICB2YWx1ZTogd29yZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgbGluZSxcbiAgICAgICAgdG9rZW4sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgTm9uTGl0ZXJhbEJ1aWxkZXIge1xuICBzdGF0aWMgd2l0aExpbmVOdW1iZXIobGluZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIChraW5kOiBOb25MaXRlcmFsW1wia2luZFwiXSk6IFRva2VuID0+ICh7XG4gICAgICBsaW5lLFxuICAgICAgdG9rZW46IHtcbiAgICAgICAgdHlwZTogXCJub25fbGl0ZXJhbFwiLFxuICAgICAgICBraW5kLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIElzQ2hhciB7XG4gIHN0YXRpYyBhbHBoYU51bWVyaWMoYzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eW2EtejAtOV0rJC9pLnRlc3QoYyk7XG4gIH1cblxuICBzdGF0aWMgYWxwaGEoYzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eW0EtWl0kL2kudGVzdChjKTtcbiAgfVxuXG4gIHN0YXRpYyBudW1lcmljKGM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXlswLTldKyQvaS50ZXN0KGMpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9