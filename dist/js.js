/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
;/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));
;// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.4 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\
// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ┌────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.4.2 - JavaScript Events Library                      │ \\
// ├────────────────────────────────────────────────────────────┤ \\
// │ Author Dmitry Baranovskiy (http://dmitry.baranovskiy.com/) │ \\
// └────────────────────────────────────────────────────────────┘ \\

(function (glob) {
    var version = "0.4.2",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        wildcard = "*",
        fun = function () {},
        numsort = function (a, b) {
            return a - b;
        },
        current_event,
        stop,
        events = {n: {}},
    /*\
     * eve
     [ method ]

     * Fires event with given `name`, given scope and other parameters.

     > Arguments

     - name (string) name of the *event*, dot (`.`) or slash (`/`) separated
     - scope (object) context for the event handlers
     - varargs (...) the rest of arguments will be sent to event handlers

     = (object) array of returned values from the listeners
    \*/
        eve = function (name, scope) {
			name = String(name);
            var e = events,
                oldstop = stop,
                args = Array.prototype.slice.call(arguments, 2),
                listeners = eve.listeners(name),
                z = 0,
                f = false,
                l,
                indexed = [],
                queue = {},
                out = [],
                ce = current_event,
                errors = [];
            current_event = name;
            stop = 0;
            for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
                indexed.push(listeners[i].zIndex);
                if (listeners[i].zIndex < 0) {
                    queue[listeners[i].zIndex] = listeners[i];
                }
            }
            indexed.sort(numsort);
            while (indexed[z] < 0) {
                l = queue[indexed[z++]];
                out.push(l.apply(scope, args));
                if (stop) {
                    stop = oldstop;
                    return out;
                }
            }
            for (i = 0; i < ii; i++) {
                l = listeners[i];
                if ("zIndex" in l) {
                    if (l.zIndex == indexed[z]) {
                        out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                        do {
                            z++;
                            l = queue[indexed[z]];
                            l && out.push(l.apply(scope, args));
                            if (stop) {
                                break;
                            }
                        } while (l)
                    } else {
                        queue[l.zIndex] = l;
                    }
                } else {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                }
            }
            stop = oldstop;
            current_event = ce;
            return out.length ? out : null;
        };
		// Undocumented. Debug only.
		eve._events = events;
    /*\
     * eve.listeners
     [ method ]

     * Internal method which gives you array of all event handlers that will be triggered by the given `name`.

     > Arguments

     - name (string) name of the event, dot (`.`) or slash (`/`) separated

     = (array) array of event handlers
    \*/
    eve.listeners = function (name) {
        var names = name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };
    
    /*\
     * eve.on
     [ method ]
     **
     * Binds given event handler with a given name. You can use wildcards “`*`” for the names:
     | eve.on("*.under.*", f);
     | eve("mouse.under.floor"); // triggers f
     * Use @eve to trigger the listener.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     = (function) returned function accepts a single numeric parameter that represents z-index of the handler. It is an optional feature and only used when you need to ensure that some subset of handlers will be invoked in a given order, despite of the order of assignment. 
     > Example:
     | eve.on("mouse", eatIt)(2);
     | eve.on("mouse", scream);
     | eve.on("mouse", catchIt)(1);
     * This will ensure that `catchIt()` function will be called before `eatIt()`.
	 *
     * If you want to put your handler before non-indexed handlers, specify a negative value.
     * Note: I assume most of the time you don’t need to worry about z-index, but it’s nice to have this feature “just in case”.
    \*/
    eve.on = function (name, f) {
		name = String(name);
		if (typeof f != "function") {
			return function () {};
		}
        var names = name.split(separator),
            e = events;
        for (var i = 0, ii = names.length; i < ii; i++) {
            e = e.n;
            e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = {n: {}});
        }
        e.f = e.f || [];
        for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
            return fun;
        }
        e.f.push(f);
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };
    /*\
     * eve.f
     [ method ]
     **
     * Returns function that will fire given event with optional arguments.
	 * Arguments that will be passed to the result function will be also
	 * concated to the list of final arguments.
 	 | el.onclick = eve.f("click", 1, 2);
 	 | eve.on("click", function (a, b, c) {
 	 |     console.log(a, b, c); // 1, 2, [event object]
 	 | });
     > Arguments
	 - event (string) event name
	 - varargs (…) and any other arguments
	 = (function) possible event handler function
    \*/
	eve.f = function (event) {
		var attrs = [].slice.call(arguments, 1);
		return function () {
			eve.apply(null, [event, null].concat(attrs).concat([].slice.call(arguments, 0)));
		};
	};
    /*\
     * eve.stop
     [ method ]
     **
     * Is used inside an event handler to stop the event, preventing any subsequent listeners from firing.
    \*/
    eve.stop = function () {
        stop = 1;
    };
    /*\
     * eve.nt
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     > Arguments
     **
     - subname (string) #optional subname of the event
     **
     = (string) name of the event, if `subname` is not specified
     * or
     = (boolean) `true`, if current event’s name contains `subname`
    \*/
    eve.nt = function (subname) {
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event);
        }
        return current_event;
    };
    /*\
     * eve.nts
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     **
     = (array) names of the event
    \*/
    eve.nts = function () {
        return current_event.split(separator);
    };
    /*\
     * eve.off
     [ method ]
     **
     * Removes given function from the list of event listeners assigned to given name.
	 * If no arguments specified all the events will be cleared.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
    \*/
    /*\
     * eve.unbind
     [ method ]
     **
     * See @eve.off
    \*/
    eve.off = eve.unbind = function (name, f) {
		if (!name) {
		    eve._events = events = {n: {}};
			return;
		}
        var names = name.split(separator),
            e,
            key,
            splice,
            i, ii, j, jj,
            cur = [events];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                    }
                } else {
                    for (key in e) if (e[has](key)) {
                        splice.push(e[key]);
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                            e.f.splice(j, 1);
                            break;
                        }
                        !e.f.length && delete e.f;
                    }
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        var funcs = e.n[key].f;
                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                            funcs.splice(j, 1);
                            break;
                        }
                        !funcs.length && delete e.n[key].f;
                    }
                } else {
                    delete e.f;
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        delete e.n[key].f;
                    }
                }
                e = e.n;
            }
        }
    };
    /*\
     * eve.once
     [ method ]
     **
     * Binds given event handler with a given name to only run once then unbind itself.
     | eve.once("login", f);
     | eve("login"); // triggers f
     | eve("login"); // no listeners
     * Use @eve to trigger the listener.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     = (function) same return function as @eve.on
    \*/
    eve.once = function (name, f) {
        var f2 = function () {
            eve.unbind(name, f2);
            return f.apply(this, arguments);
        };
        return eve.on(name, f2);
    };
    /*\
     * eve.version
     [ property (string) ]
     **
     * Current version of the library.
    \*/
    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define != "undefined" ? (define("eve", [], function() { return eve; })) : (glob.eve = eve));
})(window || this);
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ "Raphaël 2.1.2" - JavaScript Vector Library                         │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\

(function (glob, factory) {
    // AMD support
    if (typeof define === "function" && define.amd) {
        // Define as an anonymous module
        define(["eve"], function( eve ) {
            return factory(glob, eve);
        });
    } else {
        // Browser globals (glob is window)
        // Raphael adds itself to window
        factory(glob, glob.eve || (typeof require == "function" && require('eve')) );
    }
}(this, function (window, eve) {
    /*\
     * Raphael
     [ method ]
     **
     * Creates a canvas object on which to draw.
     * You must do this first, as all future calls to drawing methods
     * from this instance will be bound to this canvas.
     > Parameters
     **
     - container (HTMLElement|string) DOM element or its ID which is going to be a parent for drawing surface
     - width (number)
     - height (number)
     - callback (function) #optional callback function which is going to be executed in the context of newly created paper
     * or
     - x (number)
     - y (number)
     - width (number)
     - height (number)
     - callback (function) #optional callback function which is going to be executed in the context of newly created paper
     * or
     - all (array) (first 3 or 4 elements in the array are equal to [containerID, width, height] or [x, y, width, height]. The rest are element descriptions in format {type: type, <attributes>}). See @Paper.add.
     - callback (function) #optional callback function which is going to be executed in the context of newly created paper
     * or
     - onReadyCallback (function) function that is going to be called on DOM ready event. You can also subscribe to this event via Eve’s “DOMLoad” event. In this case method returns `undefined`.
     = (object) @Paper
     > Usage
     | // Each of the following examples create a canvas
     | // that is 320px wide by 200px high.
     | // Canvas is created at the viewport’s 10,50 coordinate.
     | var paper = Raphael(10, 50, 320, 200);
     | // Canvas is created at the top left corner of the #notepad element
     | // (or its top right corner in dir="rtl" elements)
     | var paper = Raphael(document.getElementById("notepad"), 320, 200);
     | // Same as above
     | var paper = Raphael("notepad", 320, 200);
     | // Image dump
     | var set = Raphael(["notepad", 320, 200, {
     |     type: "rect",
     |     x: 10,
     |     y: 10,
     |     width: 25,
     |     height: 25,
     |     stroke: "#f00"
     | }, {
     |     type: "text",
     |     x: 30,
     |     y: 40,
     |     text: "Dump"
     | }]);
    \*/
    function R(first) {
        if (R.is(first, "function")) {
            return loaded ? first() : eve.on("raphael.DOMload", first);
        } else if (R.is(first, array)) {
            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
        } else {
            var args = Array.prototype.slice.call(arguments, 0);
            if (R.is(args[args.length - 1], "function")) {
                var f = args.pop();
                return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
                    f.call(R._engine.create[apply](R, args));
                });
            } else {
                return R._engine.create[apply](R, arguments);
            }
        }
    }
    R.version = "2.1.2";
    R.eve = eve;
    var loaded,
        separator = /[, ]+/,
        elements = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
        formatrg = /\{(\d+)\}/g,
        proto = "prototype",
        has = "hasOwnProperty",
        g = {
            doc: document,
            win: window
        },
        oldRaphael = {
            was: Object.prototype[has].call(g.win, "Raphael"),
            is: g.win.Raphael
        },
        Paper = function () {
            /*\
             * Paper.ca
             [ property (object) ]
             **
             * Shortcut for @Paper.customAttributes
            \*/
            /*\
             * Paper.customAttributes
             [ property (object) ]
             **
             * If you have a set of attributes that you would like to represent
             * as a function of some number you can do it easily with custom attributes:
             > Usage
             | paper.customAttributes.hue = function (num) {
             |     num = num % 1;
             |     return {fill: "hsb(" + num + ", 0.75, 1)"};
             | };
             | // Custom attribute “hue” will change fill
             | // to be given hue with fixed saturation and brightness.
             | // Now you can use it like this:
             | var c = paper.circle(10, 10, 10).attr({hue: .45});
             | // or even like this:
             | c.animate({hue: 1}, 1e3);
             |
             | // You could also create custom attribute
             | // with multiple parameters:
             | paper.customAttributes.hsb = function (h, s, b) {
             |     return {fill: "hsb(" + [h, s, b].join(",") + ")"};
             | };
             | c.attr({hsb: "0.5 .8 1"});
             | c.animate({hsb: [1, 0, 0.5]}, 1e3);
            \*/
            this.ca = this.customAttributes = {};
        },
        paperproto,
        appendChild = "appendChild",
        apply = "apply",
        concat = "concat",
        supportsTouch = ('ontouchstart' in g.win) || g.win.DocumentTouch && g.doc instanceof DocumentTouch, //taken from Modernizr touch test
        E = "",
        S = " ",
        Str = String,
        split = "split",
        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
        touchMap = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        lowerCase = Str.prototype.toLowerCase,
        math = Math,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        pow = math.pow,
        PI = math.PI,
        nu = "number",
        string = "string",
        array = "array",
        toString = "toString",
        fillString = "fill",
        objectToString = Object.prototype.toString,
        paper = {},
        push = "push",
        ISURL = R._ISURL = /^url\(['"]?(.+?)['"]?\)$/i,
        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1},
        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        round = math.round,
        setAttribute = "setAttribute",
        toFloat = parseFloat,
        toInt = parseInt,
        upperCase = Str.prototype.toUpperCase,
        availableAttrs = R._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        availableAnimAttrs = R._availableAnimAttrs = {
            blur: nu,
            "clip-rect": "csv",
            cx: nu,
            cy: nu,
            fill: "colour",
            "fill-opacity": nu,
            "font-size": nu,
            height: nu,
            opacity: nu,
            path: "path",
            r: nu,
            rx: nu,
            ry: nu,
            stroke: "colour",
            "stroke-opacity": nu,
            "stroke-width": nu,
            transform: "transform",
            width: nu,
            x: nu,
            y: nu
        },
        whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
        commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        hsrg = {hs: 1, rg: 1},
        p2s = /,?([achlmqrstvxz]),?/gi,
        pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
        radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
        eldata = {},
        sortByKey = function (a, b) {
            return a.key - b.key;
        },
        sortByNumber = function (a, b) {
            return toFloat(a) - toFloat(b);
        },
        fun = function () {},
        pipe = function (x) {
            return x;
        },
        rectPath = R._rectPath = function (x, y, w, h, r) {
            if (r) {
                return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
            }
            return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
        },
        ellipsePath = function (x, y, rx, ry) {
            if (ry == null) {
                ry = rx;
            }
            return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
        },
        getPath = R._getPath = {
            path: function (el) {
                return el.attr("path");
            },
            circle: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.r);
            },
            ellipse: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
            },
            rect: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height, a.r);
            },
            image: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height);
            },
            text: function (el) {
                var bbox = el._getBBox();
                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
            },
            set : function(el) {
                var bbox = el._getBBox();
                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
            }
        },
        /*\
         * Raphael.mapPath
         [ method ]
         **
         * Transform the path string with given matrix.
         > Parameters
         - path (string) path string
         - matrix (object) see @Matrix
         = (string) transformed path string
        \*/
        mapPath = R.mapPath = function (path, matrix) {
            if (!matrix) {
                return path;
            }
            var x, y, i, j, ii, jj, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
                pathi = path[i];
                for (j = 1, jj = pathi.length; j < jj; j += 2) {
                    x = matrix.x(pathi[j], pathi[j + 1]);
                    y = matrix.y(pathi[j], pathi[j + 1]);
                    pathi[j] = x;
                    pathi[j + 1] = y;
                }
            }
            return path;
        };

    R._g = g;
    /*\
     * Raphael.type
     [ property (string) ]
     **
     * Can be “SVG”, “VML” or empty, depending on browser support.
    \*/
    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (R.type == "VML") {
        var d = g.doc.createElement("div"),
            b;
        d.innerHTML = '<v:shape adj="1"/>';
        b = d.firstChild;
        b.style.behavior = "url(#default#VML)";
        if (!(b && typeof b.adj == "object")) {
            return (R.type = E);
        }
        d = null;
    }
    /*\
     * Raphael.svg
     [ property (boolean) ]
     **
     * `true` if browser supports SVG.
    \*/
    /*\
     * Raphael.vml
     [ property (boolean) ]
     **
     * `true` if browser supports VML.
    \*/
    R.svg = !(R.vml = R.type == "VML");
    R._Paper = Paper;
    /*\
     * Raphael.fn
     [ property (object) ]
     **
     * You can add your own method to the canvas. For example if you want to draw a pie chart,
     * you can create your own pie chart function and ship it as a Raphaël plugin. To do this
     * you need to extend the `Raphael.fn` object. You should modify the `fn` object before a
     * Raphaël instance is created, otherwise it will take no effect. Please note that the
     * ability for namespaced plugins was removed in Raphael 2.0. It is up to the plugin to
     * ensure any namespacing ensures proper context.
     > Usage
     | Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
     |     return this.path( ... );
     | };
     | // or create namespace
     | Raphael.fn.mystuff = {
     |     arrow: function () {…},
     |     star: function () {…},
     |     // etc…
     | };
     | var paper = Raphael(10, 10, 630, 480);
     | // then use it
     | paper.arrow(10, 10, 30, 30, 5).attr({fill: "#f00"});
     | paper.mystuff.arrow();
     | paper.mystuff.star();
    \*/
    R.fn = paperproto = Paper.prototype = R.prototype;
    R._id = 0;
    R._oid = 0;
    /*\
     * Raphael.is
     [ method ]
     **
     * Handful of replacements for `typeof` operator.
     > Parameters
     - o (…) any object or primitive
     - type (string) name of the type, i.e. “string”, “function”, “number”, etc.
     = (boolean) is given value is of given type
    \*/
    R.is = function (o, type) {
        type = lowerCase.call(type);
        if (type == "finite") {
            return !isnan[has](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return  (type == "null" && o === null) ||
                (type == typeof o && o !== null) ||
                (type == "object" && o === Object(o)) ||
                (type == "array" && Array.isArray && Array.isArray(o)) ||
                objectToString.call(o).slice(8, -1).toLowerCase() == type;
    };

    function clone(obj) {
        if (typeof obj == "function" || Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) if (obj[has](key)) {
            res[key] = clone(obj[key]);
        }
        return res;
    }

    /*\
     * Raphael.angle
     [ method ]
     **
     * Returns angle between two or three points
     > Parameters
     - x1 (number) x coord of first point
     - y1 (number) y coord of first point
     - x2 (number) x coord of second point
     - y2 (number) y coord of second point
     - x3 (number) #optional x coord of third point
     - y3 (number) #optional y coord of third point
     = (number) angle in degrees.
    \*/
    R.angle = function (x1, y1, x2, y2, x3, y3) {
        if (x3 == null) {
            var x = x1 - x2,
                y = y1 - y2;
            if (!x && !y) {
                return 0;
            }
            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
        } else {
            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
        }
    };
    /*\
     * Raphael.rad
     [ method ]
     **
     * Transform angle to radians
     > Parameters
     - deg (number) angle in degrees
     = (number) angle in radians.
    \*/
    R.rad = function (deg) {
        return deg % 360 * PI / 180;
    };
    /*\
     * Raphael.deg
     [ method ]
     **
     * Transform angle to degrees
     > Parameters
     - rad (number) angle in radians
     = (number) angle in degrees.
    \*/
    R.deg = function (rad) {
        return Math.round ((rad * 180 / PI% 360)* 1000) / 1000;
    };
    /*\
     * Raphael.snapTo
     [ method ]
     **
     * Snaps given value to given grid.
     > Parameters
     - values (array|number) given array of values or step of the grid
     - value (number) value to adjust
     - tolerance (number) #optional tolerance for snapping. Default is `10`.
     = (number) adjusted value.
    \*/
    R.snapTo = function (values, value, tolerance) {
        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
        if (R.is(values, array)) {
            var i = values.length;
            while (i--) if (abs(values[i] - value) <= tolerance) {
                return values[i];
            }
        } else {
            values = +values;
            var rem = value % values;
            if (rem < tolerance) {
                return value - rem;
            }
            if (rem > values - tolerance) {
                return value - rem + values;
            }
        }
        return value;
    };

    /*\
     * Raphael.createUUID
     [ method ]
     **
     * Returns RFC4122, version 4 ID
    \*/
    var createUUID = R.createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });

    /*\
     * Raphael.setWindow
     [ method ]
     **
     * Used when you need to draw in `&lt;iframe>`. Switched window to the iframe one.
     > Parameters
     - newwin (window) new window object
    \*/
    R.setWindow = function (newwin) {
        eve("raphael.setWindow", R, g.win, newwin);
        g.win = newwin;
        g.doc = g.win.document;
        if (R._engine.initWin) {
            R._engine.initWin(g.win);
        }
    };
    var toHex = function (color) {
        if (R.vml) {
            // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
            var trim = /^\s+|\s+$/g;
            var bod;
            try {
                var docum = new ActiveXObject("htmlfile");
                docum.write("<body>");
                docum.close();
                bod = docum.body;
            } catch(e) {
                bod = createPopup().document.body;
            }
            var range = bod.createTextRange();
            toHex = cacher(function (color) {
                try {
                    bod.style.color = Str(color).replace(trim, E);
                    var value = range.queryCommandValue("ForeColor");
                    value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
                    return "#" + ("000000" + value.toString(16)).slice(-6);
                } catch(e) {
                    return "none";
                }
            });
        } else {
            var i = g.doc.createElement("i");
            i.title = "Rapha\xebl Colour Picker";
            i.style.display = "none";
            g.doc.body.appendChild(i);
            toHex = cacher(function (color) {
                i.style.color = color;
                return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
            });
        }
        return toHex(color);
    },
    hsbtoString = function () {
        return "hsb(" + [this.h, this.s, this.b] + ")";
    },
    hsltoString = function () {
        return "hsl(" + [this.h, this.s, this.l] + ")";
    },
    rgbtoString = function () {
        return this.hex;
    },
    prepareRGB = function (r, g, b) {
        if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
            b = r.b;
            g = r.g;
            r = r.r;
        }
        if (g == null && R.is(r, string)) {
            var clr = R.getRGB(r);
            r = clr.r;
            g = clr.g;
            b = clr.b;
        }
        if (r > 1 || g > 1 || b > 1) {
            r /= 255;
            g /= 255;
            b /= 255;
        }

        return [r, g, b];
    },
    packageRGB = function (r, g, b, o) {
        r *= 255;
        g *= 255;
        b *= 255;
        var rgb = {
            r: r,
            g: g,
            b: b,
            hex: R.rgb(r, g, b),
            toString: rgbtoString
        };
        R.is(o, "finite") && (rgb.opacity = o);
        return rgb;
    };

    /*\
     * Raphael.color
     [ method ]
     **
     * Parses the color string and returns object with all values for the given color.
     > Parameters
     - clr (string) color string in one of the supported formats (see @Raphael.getRGB)
     = (object) Combined RGB & HSB object in format:
     o {
     o     r (number) red,
     o     g (number) green,
     o     b (number) blue,
     o     hex (string) color in HTML/CSS format: #••••••,
     o     error (boolean) `true` if string can’t be parsed,
     o     h (number) hue,
     o     s (number) saturation,
     o     v (number) value (brightness),
     o     l (number) lightness
     o }
    \*/
    R.color = function (clr) {
        var rgb;
        if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
            rgb = R.hsb2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
            rgb = R.hsl2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else {
            if (R.is(clr, "string")) {
                clr = R.getRGB(clr);
            }
            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
                rgb = R.rgb2hsl(clr);
                clr.h = rgb.h;
                clr.s = rgb.s;
                clr.l = rgb.l;
                rgb = R.rgb2hsb(clr);
                clr.v = rgb.b;
            } else {
                clr = {hex: "none"};
                clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
            }
        }
        clr.toString = rgbtoString;
        return clr;
    };
    /*\
     * Raphael.hsb2rgb
     [ method ]
     **
     * Converts HSB values to RGB object.
     > Parameters
     - h (number) hue
     - s (number) saturation
     - v (number) value or brightness
     = (object) RGB object in format:
     o {
     o     r (number) red,
     o     g (number) green,
     o     b (number) blue,
     o     hex (string) color in HTML/CSS format: #••••••
     o }
    \*/
    R.hsb2rgb = function (h, s, v, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
            v = h.b;
            s = h.s;
            o = h.o;
            h = h.h;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = v - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    /*\
     * Raphael.hsl2rgb
     [ method ]
     **
     * Converts HSL values to RGB object.
     > Parameters
     - h (number) hue
     - s (number) saturation
     - l (number) luminosity
     = (object) RGB object in format:
     o {
     o     r (number) red,
     o     g (number) green,
     o     b (number) blue,
     o     hex (string) color in HTML/CSS format: #••••••
     o }
    \*/
    R.hsl2rgb = function (h, s, l, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
            l = h.l;
            s = h.s;
            h = h.h;
        }
        if (h > 1 || s > 1 || l > 1) {
            h /= 360;
            s /= 100;
            l /= 100;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = 2 * s * (l < .5 ? l : 1 - l);
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = l - C / 2;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    /*\
     * Raphael.rgb2hsb
     [ method ]
     **
     * Converts RGB values to HSB object.
     > Parameters
     - r (number) red
     - g (number) green
     - b (number) blue
     = (object) HSB object in format:
     o {
     o     h (number) hue
     o     s (number) saturation
     o     b (number) brightness
     o }
    \*/
    R.rgb2hsb = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, V, C;
        V = mmax(r, g, b);
        C = V - mmin(r, g, b);
        H = (C == 0 ? null :
             V == r ? (g - b) / C :
             V == g ? (b - r) / C + 2 :
                      (r - g) / C + 4
            );
        H = ((H + 360) % 6) * 60 / 360;
        S = C == 0 ? 0 : C / V;
        return {h: H, s: S, b: V, toString: hsbtoString};
    };
    /*\
     * Raphael.rgb2hsl
     [ method ]
     **
     * Converts RGB values to HSL object.
     > Parameters
     - r (number) red
     - g (number) green
     - b (number) blue
     = (object) HSL object in format:
     o {
     o     h (number) hue
     o     s (number) saturation
     o     l (number) luminosity
     o }
    \*/
    R.rgb2hsl = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, L, M, m, C;
        M = mmax(r, g, b);
        m = mmin(r, g, b);
        C = M - m;
        H = (C == 0 ? null :
             M == r ? (g - b) / C :
             M == g ? (b - r) / C + 2 :
                      (r - g) / C + 4);
        H = ((H + 360) % 6) * 60 / 360;
        L = (M + m) / 2;
        S = (C == 0 ? 0 :
             L < .5 ? C / (2 * L) :
                      C / (2 - 2 * L));
        return {h: H, s: S, l: L, toString: hsltoString};
    };
    R._path2string = function () {
        return this.join(",").replace(p2s, "$1");
    };
    function repush(array, item) {
        for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
            return array.push(array.splice(i, 1)[0]);
        }
    }
    function cacher(f, scope, postprocessor) {
        function newf() {
            var arg = Array.prototype.slice.call(arguments, 0),
                args = arg.join("\u2400"),
                cache = newf.cache = newf.cache || {},
                count = newf.count = newf.count || [];
            if (cache[has](args)) {
                repush(count, args);
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }
            count.length >= 1e3 && delete cache[count.shift()];
            count.push(args);
            cache[args] = f[apply](scope, arg);
            return postprocessor ? postprocessor(cache[args]) : cache[args];
        }
        return newf;
    }

    var preload = R._preload = function (src, f) {
        var img = g.doc.createElement("img");
        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        img.onload = function () {
            f.call(this);
            this.onload = null;
            g.doc.body.removeChild(this);
        };
        img.onerror = function () {
            g.doc.body.removeChild(this);
        };
        g.doc.body.appendChild(img);
        img.src = src;
    };

    function clrToString() {
        return this.hex;
    }

    /*\
     * Raphael.getRGB
     [ method ]
     **
     * Parses colour string as RGB object
     > Parameters
     - colour (string) colour string in one of formats:
     # <ul>
     #     <li>Colour name (“<code>red</code>”, “<code>green</code>”, “<code>cornflowerblue</code>”, etc)</li>
     #     <li>#••• — shortened HTML colour: (“<code>#000</code>”, “<code>#fc0</code>”, etc)</li>
     #     <li>#•••••• — full length HTML colour: (“<code>#000000</code>”, “<code>#bd2300</code>”)</li>
     #     <li>rgb(•••, •••, •••) — red, green and blue channels’ values: (“<code>rgb(200,&nbsp;100,&nbsp;0)</code>”)</li>
     #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (“<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>”)</li>
     #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (“<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>”)</li>
     #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
     #     <li>hsl(•••, •••, •••) — same as hsb</li>
     #     <li>hsl(•••%, •••%, •••%) — same as hsb</li>
     # </ul>
     = (object) RGB object in format:
     o {
     o     r (number) red,
     o     g (number) green,
     o     b (number) blue
     o     hex (string) color in HTML/CSS format: #••••••,
     o     error (boolean) true if string can’t be parsed
     o }
    \*/
    R.getRGB = cacher(function (colour) {
        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
            return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none", toString: clrToString};
        }
        !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
        var res,
            red,
            green,
            blue,
            opacity,
            t,
            values,
            rgb = colour.match(colourRegExp);
        if (rgb) {
            if (rgb[2]) {
                blue = toInt(rgb[2].substring(5), 16);
                green = toInt(rgb[2].substring(3, 5), 16);
                red = toInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                green = toInt((t = rgb[3].charAt(2)) + t, 16);
                red = toInt((t = rgb[3].charAt(1)) + t, 16);
            }
            if (rgb[4]) {
                values = rgb[4][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
            }
            if (rgb[5]) {
                values = rgb[5][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsb2rgb(red, green, blue, opacity);
            }
            if (rgb[6]) {
                values = rgb[6][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsl2rgb(red, green, blue, opacity);
            }
            rgb = {r: red, g: green, b: blue, toString: clrToString};
            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
            R.is(opacity, "finite") && (rgb.opacity = opacity);
            return rgb;
        }
        return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
    }, R);
    /*\
     * Raphael.hsb
     [ method ]
     **
     * Converts HSB values to hex representation of the colour.
     > Parameters
     - h (number) hue
     - s (number) saturation
     - b (number) value or brightness
     = (string) hex representation of the colour.
    \*/
    R.hsb = cacher(function (h, s, b) {
        return R.hsb2rgb(h, s, b).hex;
    });
    /*\
     * Raphael.hsl
     [ method ]
     **
     * Converts HSL values to hex representation of the colour.
     > Parameters
     - h (number) hue
     - s (number) saturation
     - l (number) luminosity
     = (string) hex representation of the colour.
    \*/
    R.hsl = cacher(function (h, s, l) {
        return R.hsl2rgb(h, s, l).hex;
    });
    /*\
     * Raphael.rgb
     [ method ]
     **
     * Converts RGB values to hex representation of the colour.
     > Parameters
     - r (number) red
     - g (number) green
     - b (number) blue
     = (string) hex representation of the colour.
    \*/
    R.rgb = cacher(function (r, g, b) {
        return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
    });
    /*\
     * Raphael.getColor
     [ method ]
     **
     * On each call returns next colour in the spectrum. To reset it back to red call @Raphael.getColor.reset
     > Parameters
     - value (number) #optional brightness, default is `0.75`
     = (string) hex representation of the colour.
    \*/
    R.getColor = function (value) {
        var start = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: value || .75},
            rgb = this.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            start.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: start.b});
        }
        return rgb.hex;
    };
    /*\
     * Raphael.getColor.reset
     [ method ]
     **
     * Resets spectrum position for @Raphael.getColor back to red.
    \*/
    R.getColor.reset = function () {
        delete this.start;
    };

    // http://schepers.cc/getting-to-the-point
    function catmullRom2bezier(crp, z) {
        var d = [];
        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
            var p = [
                        {x: +crp[i - 2], y: +crp[i - 1]},
                        {x: +crp[i],     y: +crp[i + 1]},
                        {x: +crp[i + 2], y: +crp[i + 3]},
                        {x: +crp[i + 4], y: +crp[i + 5]}
                    ];
            if (z) {
                if (!i) {
                    p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
                } else if (iLen - 4 == i) {
                    p[3] = {x: +crp[0], y: +crp[1]};
                } else if (iLen - 2 == i) {
                    p[2] = {x: +crp[0], y: +crp[1]};
                    p[3] = {x: +crp[2], y: +crp[3]};
                }
            } else {
                if (iLen - 4 == i) {
                    p[3] = p[2];
                } else if (!i) {
                    p[0] = {x: +crp[i], y: +crp[i + 1]};
                }
            }
            d.push(["C",
                  (-p[0].x + 6 * p[1].x + p[2].x) / 6,
                  (-p[0].y + 6 * p[1].y + p[2].y) / 6,
                  (p[1].x + 6 * p[2].x - p[3].x) / 6,
                  (p[1].y + 6*p[2].y - p[3].y) / 6,
                  p[2].x,
                  p[2].y
            ]);
        }

        return d;
    }
    /*\
     * Raphael.parsePathString
     [ method ]
     **
     * Utility method
     **
     * Parses given path string into an array of arrays of path segments.
     > Parameters
     - pathString (string|array) path string or array of segments (in the last case it will be returned straight away)
     = (array) array of segments.
    \*/
    R.parsePathString = function (pathString) {
        if (!pathString) {
            return null;
        }
        var pth = paths(pathString);
        if (pth.arr) {
            return pathClone(pth.arr);
        }

        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [];
        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
            data = pathClone(pathString);
        }
        if (!data.length) {
            Str(pathString).replace(pathCommand, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b][concat](params.splice(0, 2)));
                    name = "l";
                    b = b == "m" ? "l" : "L";
                }
                if (name == "r") {
                    data.push([b][concat](params));
                } else while (params.length >= paramCounts[name]) {
                    data.push([b][concat](params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = R._path2string;
        pth.arr = pathClone(data);
        return data;
    };
    /*\
     * Raphael.parseTransformString
     [ method ]
     **
     * Utility method
     **
     * Parses given path string into an array of transformations.
     > Parameters
     - TString (string|array) transform string or array of transformations (in the last case it will be returned straight away)
     = (array) array of transformations.
    \*/
    R.parseTransformString = cacher(function (TString) {
        if (!TString) {
            return null;
        }
        var paramCounts = {r: 3, s: 4, t: 2, m: 6},
            data = [];
        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
            data = pathClone(TString);
        }
        if (!data.length) {
            Str(TString).replace(tCommand, function (a, b, c) {
                var params = [],
                    name = lowerCase.call(b);
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                data.push([b][concat](params));
            });
        }
        data.toString = R._path2string;
        return data;
    });
    // PATHS
    var paths = function (ps) {
        var p = paths.ps = paths.ps || {};
        if (p[ps]) {
            p[ps].sleep = 100;
        } else {
            p[ps] = {
                sleep: 100
            };
        }
        setTimeout(function () {
            for (var key in p) if (p[has](key) && key != ps) {
                p[key].sleep--;
                !p[key].sleep && delete p[key];
            }
        });
        return p[ps];
    };
    /*\
     * Raphael.findDotsAtSegment
     [ method ]
     **
     * Utility method
     **
     * Find dot coordinates on the given cubic bezier curve at the given t.
     > Parameters
     - p1x (number) x of the first point of the curve
     - p1y (number) y of the first point of the curve
     - c1x (number) x of the first anchor of the curve
     - c1y (number) y of the first anchor of the curve
     - c2x (number) x of the second anchor of the curve
     - c2y (number) y of the second anchor of the curve
     - p2x (number) x of the second point of the curve
     - p2y (number) y of the second point of the curve
     - t (number) position on the curve (0..1)
     = (object) point information in format:
     o {
     o     x: (number) x coordinate of the point
     o     y: (number) y coordinate of the point
     o     m: {
     o         x: (number) x coordinate of the left anchor
     o         y: (number) y coordinate of the left anchor
     o     }
     o     n: {
     o         x: (number) x coordinate of the right anchor
     o         y: (number) y coordinate of the right anchor
     o     }
     o     start: {
     o         x: (number) x coordinate of the start of the curve
     o         y: (number) y coordinate of the start of the curve
     o     }
     o     end: {
     o         x: (number) x coordinate of the end of the curve
     o         y: (number) y coordinate of the end of the curve
     o     }
     o     alpha: (number) angle of the curve derivative at the point
     o }
    \*/
    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t,
            t13 = pow(t1, 3),
            t12 = pow(t1, 2),
            t2 = t * t,
            t3 = t2 * t,
            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
            ax = t1 * p1x + t * c1x,
            ay = t1 * p1y + t * c1y,
            cx = t1 * c2x + t * p2x,
            cy = t1 * c2y + t * p2y,
            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
        (mx > nx || my < ny) && (alpha += 180);
        return {
            x: x,
            y: y,
            m: {x: mx, y: my},
            n: {x: nx, y: ny},
            start: {x: ax, y: ay},
            end: {x: cx, y: cy},
            alpha: alpha
        };
    };
    /*\
     * Raphael.bezierBBox
     [ method ]
     **
     * Utility method
     **
     * Return bounding box of a given cubic bezier curve
     > Parameters
     - p1x (number) x of the first point of the curve
     - p1y (number) y of the first point of the curve
     - c1x (number) x of the first anchor of the curve
     - c1y (number) y of the first anchor of the curve
     - c2x (number) x of the second anchor of the curve
     - c2y (number) y of the second anchor of the curve
     - p2x (number) x of the second point of the curve
     - p2y (number) y of the second point of the curve
     * or
     - bez (array) array of six points for bezier curve
     = (object) point information in format:
     o {
     o     min: {
     o         x: (number) x coordinate of the left point
     o         y: (number) y coordinate of the top point
     o     }
     o     max: {
     o         x: (number) x coordinate of the right point
     o         y: (number) y coordinate of the bottom point
     o     }
     o }
    \*/
    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        if (!R.is(p1x, "array")) {
            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
        }
        var bbox = curveDim.apply(null, p1x);
        return {
            x: bbox.min.x,
            y: bbox.min.y,
            x2: bbox.max.x,
            y2: bbox.max.y,
            width: bbox.max.x - bbox.min.x,
            height: bbox.max.y - bbox.min.y
        };
    };
    /*\
     * Raphael.isPointInsideBBox
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if given point is inside bounding boxes.
     > Parameters
     - bbox (string) bounding box
     - x (string) x coordinate of the point
     - y (string) y coordinate of the point
     = (boolean) `true` if point inside
    \*/
    R.isPointInsideBBox = function (bbox, x, y) {
        return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
    };
    /*\
     * Raphael.isBBoxIntersect
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if two bounding boxes intersect
     > Parameters
     - bbox1 (string) first bounding box
     - bbox2 (string) second bounding box
     = (boolean) `true` if they intersect
    \*/
    R.isBBoxIntersect = function (bbox1, bbox2) {
        var i = R.isPointInsideBBox;
        return i(bbox2, bbox1.x, bbox1.y)
            || i(bbox2, bbox1.x2, bbox1.y)
            || i(bbox2, bbox1.x, bbox1.y2)
            || i(bbox2, bbox1.x2, bbox1.y2)
            || i(bbox1, bbox2.x, bbox2.y)
            || i(bbox1, bbox2.x2, bbox2.y)
            || i(bbox1, bbox2.x, bbox2.y2)
            || i(bbox1, bbox2.x2, bbox2.y2)
            || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
            && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
    };
    function base3(t, p1, p2, p3, p4) {
        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
        return t * t2 - 3 * p1 + 3 * p2;
    }
    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
        if (z == null) {
            z = 1;
        }
        z = z > 1 ? 1 : z < 0 ? 0 : z;
        var z2 = z / 2,
            n = 12,
            Tvalues = [-0.1252,0.1252,-0.3678,0.3678,-0.5873,0.5873,-0.7699,0.7699,-0.9041,0.9041,-0.9816,0.9816],
            Cvalues = [0.2491,0.2491,0.2335,0.2335,0.2032,0.2032,0.1601,0.1601,0.1069,0.1069,0.0472,0.0472],
            sum = 0;
        for (var i = 0; i < n; i++) {
            var ct = z2 * Tvalues[i] + z2,
                xbase = base3(ct, x1, x2, x3, x4),
                ybase = base3(ct, y1, y2, y3, y4),
                comb = xbase * xbase + ybase * ybase;
            sum += Cvalues[i] * math.sqrt(comb);
        }
        return z2 * sum;
    }
    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
        if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
            return;
        }
        var t = 1,
            step = t / 2,
            t2 = t - step,
            l,
            e = .01;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        while (abs(l - ll) > e) {
            step /= 2;
            t2 += (l < ll ? 1 : -1) * step;
            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        }
        return t2;
    }
    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        if (
            mmax(x1, x2) < mmin(x3, x4) ||
            mmin(x1, x2) > mmax(x3, x4) ||
            mmax(y1, y2) < mmin(y3, y4) ||
            mmin(y1, y2) > mmax(y3, y4)
        ) {
            return;
        }
        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (!denominator) {
            return;
        }
        var px = nx / denominator,
            py = ny / denominator,
            px2 = +px.toFixed(2),
            py2 = +py.toFixed(2);
        if (
            px2 < +mmin(x1, x2).toFixed(2) ||
            px2 > +mmax(x1, x2).toFixed(2) ||
            px2 < +mmin(x3, x4).toFixed(2) ||
            px2 > +mmax(x3, x4).toFixed(2) ||
            py2 < +mmin(y1, y2).toFixed(2) ||
            py2 > +mmax(y1, y2).toFixed(2) ||
            py2 < +mmin(y3, y4).toFixed(2) ||
            py2 > +mmax(y3, y4).toFixed(2)
        ) {
            return;
        }
        return {x: px, y: py};
    }
    function inter(bez1, bez2) {
        return interHelper(bez1, bez2);
    }
    function interCount(bez1, bez2) {
        return interHelper(bez1, bez2, 1);
    }
    function interHelper(bez1, bez2, justCount) {
        var bbox1 = R.bezierBBox(bez1),
            bbox2 = R.bezierBBox(bez2);
        if (!R.isBBoxIntersect(bbox1, bbox2)) {
            return justCount ? 0 : [];
        }
        var l1 = bezlen.apply(0, bez1),
            l2 = bezlen.apply(0, bez2),
            n1 = mmax(~~(l1 / 5), 1),
            n2 = mmax(~~(l2 / 5), 1),
            dots1 = [],
            dots2 = [],
            xy = {},
            res = justCount ? 0 : [];
        for (var i = 0; i < n1 + 1; i++) {
            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
            dots1.push({x: p.x, y: p.y, t: i / n1});
        }
        for (i = 0; i < n2 + 1; i++) {
            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
            dots2.push({x: p.x, y: p.y, t: i / n2});
        }
        for (i = 0; i < n1; i++) {
            for (var j = 0; j < n2; j++) {
                var di = dots1[i],
                    di1 = dots1[i + 1],
                    dj = dots2[j],
                    dj1 = dots2[j + 1],
                    ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                    cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                    is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                if (is) {
                    if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                        continue;
                    }
                    xy[is.x.toFixed(4)] = is.y.toFixed(4);
                    var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                        t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                    if (t1 >= 0 && t1 <= 1.001 && t2 >= 0 && t2 <= 1.001) {
                        if (justCount) {
                            res++;
                        } else {
                            res.push({
                                x: is.x,
                                y: is.y,
                                t1: mmin(t1, 1),
                                t2: mmin(t2, 1)
                            });
                        }
                    }
                }
            }
        }
        return res;
    }
    /*\
     * Raphael.pathIntersection
     [ method ]
     **
     * Utility method
     **
     * Finds intersections of two paths
     > Parameters
     - path1 (string) path string
     - path2 (string) path string
     = (array) dots of intersection
     o [
     o     {
     o         x: (number) x coordinate of the point
     o         y: (number) y coordinate of the point
     o         t1: (number) t value for segment of path1
     o         t2: (number) t value for segment of path2
     o         segment1: (number) order number for segment of path1
     o         segment2: (number) order number for segment of path2
     o         bez1: (array) eight coordinates representing beziér curve for the segment of path1
     o         bez2: (array) eight coordinates representing beziér curve for the segment of path2
     o     }
     o ]
    \*/
    R.pathIntersection = function (path1, path2) {
        return interPathHelper(path1, path2);
    };
    R.pathIntersectionNumber = function (path1, path2) {
        return interPathHelper(path1, path2, 1);
    };
    function interPathHelper(path1, path2, justCount) {
        path1 = R._path2curve(path1);
        path2 = R._path2curve(path2);
        var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
            res = justCount ? 0 : [];
        for (var i = 0, ii = path1.length; i < ii; i++) {
            var pi = path1[i];
            if (pi[0] == "M") {
                x1 = x1m = pi[1];
                y1 = y1m = pi[2];
            } else {
                if (pi[0] == "C") {
                    bez1 = [x1, y1].concat(pi.slice(1));
                    x1 = bez1[6];
                    y1 = bez1[7];
                } else {
                    bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                    x1 = x1m;
                    y1 = y1m;
                }
                for (var j = 0, jj = path2.length; j < jj; j++) {
                    var pj = path2[j];
                    if (pj[0] == "M") {
                        x2 = x2m = pj[1];
                        y2 = y2m = pj[2];
                    } else {
                        if (pj[0] == "C") {
                            bez2 = [x2, y2].concat(pj.slice(1));
                            x2 = bez2[6];
                            y2 = bez2[7];
                        } else {
                            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                            x2 = x2m;
                            y2 = y2m;
                        }
                        var intr = interHelper(bez1, bez2, justCount);
                        if (justCount) {
                            res += intr;
                        } else {
                            for (var k = 0, kk = intr.length; k < kk; k++) {
                                intr[k].segment1 = i;
                                intr[k].segment2 = j;
                                intr[k].bez1 = bez1;
                                intr[k].bez2 = bez2;
                            }
                            res = res.concat(intr);
                        }
                    }
                }
            }
        }
        return res;
    }
    /*\
     * Raphael.isPointInsidePath
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if given point is inside a given closed path.
     > Parameters
     - path (string) path string
     - x (number) x of the point
     - y (number) y of the point
     = (boolean) true, if point is inside the path
    \*/
    R.isPointInsidePath = function (path, x, y) {
        var bbox = R.pathBBox(path);
        return R.isPointInsideBBox(bbox, x, y) &&
               interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
    };
    R._removedFactory = function (methodname) {
        return function () {
            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname);
        };
    };
    /*\
     * Raphael.pathBBox
     [ method ]
     **
     * Utility method
     **
     * Return bounding box of a given path
     > Parameters
     - path (string) path string
     = (object) bounding box
     o {
     o     x: (number) x coordinate of the left top point of the box
     o     y: (number) y coordinate of the left top point of the box
     o     x2: (number) x coordinate of the right bottom point of the box
     o     y2: (number) y coordinate of the right bottom point of the box
     o     width: (number) width of the box
     o     height: (number) height of the box
     o     cx: (number) x coordinate of the center of the box
     o     cy: (number) y coordinate of the center of the box
     o }
    \*/
    var pathDimensions = R.pathBBox = function (path) {
        var pth = paths(path);
        if (pth.bbox) {
            return clone(pth.bbox);
        }
        if (!path) {
            return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
        }
        path = path2curve(path);
        var x = 0,
            y = 0,
            X = [],
            Y = [],
            p;
        for (var i = 0, ii = path.length; i < ii; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            } else {
                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X[concat](dim.min.x, dim.max.x);
                Y = Y[concat](dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        var xmin = mmin[apply](0, X),
            ymin = mmin[apply](0, Y),
            xmax = mmax[apply](0, X),
            ymax = mmax[apply](0, Y),
            width = xmax - xmin,
            height = ymax - ymin,
                bb = {
                x: xmin,
                y: ymin,
                x2: xmax,
                y2: ymax,
                width: width,
                height: height,
                cx: xmin + width / 2,
                cy: ymin + height / 2
            };
        pth.bbox = clone(bb);
        return bb;
    },
        pathClone = function (pathArray) {
            var res = clone(pathArray);
            res.toString = R._path2string;
            return res;
        },
        pathToRelative = R._pathToRelative = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.rel) {
                return pathClone(pth.rel);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = pathArray[0][1];
                y = pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res.push(["M", x, y]);
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != lowerCase.call(pa[0])) {
                    r[0] = lowerCase.call(pa[0]);
                    switch (r[0]) {
                        case "a":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] - x).toFixed(3);
                            r[7] = +(pa[7] - y).toFixed(3);
                            break;
                        case "v":
                            r[1] = +(pa[1] - y).toFixed(3);
                            break;
                        case "m":
                            mx = pa[1];
                            my = pa[2];
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                            }
                    }
                } else {
                    r = res[i] = [];
                    if (pa[0] == "m") {
                        mx = pa[1] + x;
                        my = pa[2] + y;
                    }
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                var len = res[i].length;
                switch (res[i][0]) {
                    case "z":
                        x = mx;
                        y = my;
                        break;
                    case "h":
                        x += +res[i][len - 1];
                        break;
                    case "v":
                        y += +res[i][len - 1];
                        break;
                    default:
                        x += +res[i][len - 2];
                        y += +res[i][len - 1];
                }
            }
            res.toString = R._path2string;
            pth.rel = pathClone(res);
            return res;
        },
        pathToAbsolute = R._pathToAbsolute = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.abs) {
                return pathClone(pth.abs);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            if (!pathArray || !pathArray.length) {
                return [["M", 0, 0]];
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = +pathArray[0][1];
                y = +pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res[0] = ["M", x, y];
            }
            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                res.push(r = []);
                pa = pathArray[i];
                if (pa[0] != upperCase.call(pa[0])) {
                    r[0] = upperCase.call(pa[0]);
                    switch (r[0]) {
                        case "A":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] + x);
                            r[7] = +(pa[7] + y);
                            break;
                        case "V":
                            r[1] = +pa[1] + y;
                            break;
                        case "H":
                            r[1] = +pa[1] + x;
                            break;
                        case "R":
                            var dots = [x, y][concat](pa.slice(1));
                            for (var j = 2, jj = dots.length; j < jj; j++) {
                                dots[j] = +dots[j] + x;
                                dots[++j] = +dots[j] + y;
                            }
                            res.pop();
                            res = res[concat](catmullRom2bezier(dots, crz));
                            break;
                        case "M":
                            mx = +pa[1] + x;
                            my = +pa[2] + y;
                        default:
                            for (j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +pa[j] + ((j % 2) ? x : y);
                            }
                    }
                } else if (pa[0] == "R") {
                    dots = [x, y][concat](pa.slice(1));
                    res.pop();
                    res = res[concat](catmullRom2bezier(dots, crz));
                    r = ["R"][concat](pa.slice(-2));
                } else {
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        r[k] = pa[k];
                    }
                }
                switch (r[0]) {
                    case "Z":
                        x = mx;
                        y = my;
                        break;
                    case "H":
                        x = r[1];
                        break;
                    case "V":
                        y = r[1];
                        break;
                    case "M":
                        mx = r[r.length - 2];
                        my = r[r.length - 1];
                    default:
                        x = r[r.length - 2];
                        y = r[r.length - 1];
                }
            }
            res.toString = R._path2string;
            pth.abs = pathClone(res);
            return res;
        },
        l2c = function (x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2];
        },
        q2c = function (x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
                _23 = 2 / 3;
            return [
                    _13 * x1 + _23 * ax,
                    _13 * y1 + _23 * ay,
                    _13 * x2 + _23 * ax,
                    _13 * y2 + _23 * ay,
                    x2,
                    y2
                ];
        },
        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = PI * 120 / 180,
                rad = PI / 180 * (+angle || 0),
                res = [],
                xy,
                rotate = cacher(function (x, y, rad) {
                    var X = x * math.cos(rad) - y * math.sin(rad),
                        Y = x * math.sin(rad) + y * math.cos(rad);
                    return {x: X, y: Y};
                });
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = math.cos(PI / 180 * angle),
                    sin = math.sin(PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                if (h > 1) {
                    h = math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? PI - f1 : f1;
                f2 = x2 < cx ? PI - f2 : f2;
                f1 < 0 && (f1 = PI * 2 + f1);
                f2 < 0 && (f2 = PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * math.cos(f2);
                y2 = cy + ry * math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
                s1 = math.sin(f1),
                c2 = math.cos(f2),
                s2 = math.sin(f2),
                t = math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4][concat](res);
            } else {
                res = [m2, m3, m4][concat](res).join()[split](",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
        },
        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            };
        },
        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                c = p1x - c1x,
                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                y = [p1y, p2y],
                x = [p1x, p2x],
                dot;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
            c = p1y - c1y;
            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            return {
                min: {x: mmin[apply](0, x), y: mmin[apply](0, y)},
                max: {x: mmax[apply](0, x), y: mmax[apply](0, y)}
            };
        }),
        path2curve = R._path2curve = cacher(function (path, path2) {
            var pth = !path2 && paths(path);
            if (!path2 && pth.curve) {
                return pathClone(pth.curve);
            }
            var p = pathToAbsolute(path),
                p2 = path2 && pathToAbsolute(path2),
                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                processPath = function (path, d, pcom) {
                    var nx, ny, tq = {T:1, Q:1};
                    if (!path) {
                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                    }
                    !(path[0] in tq) && (d.qx = d.qy = null);
                    switch (path[0]) {
                        case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;
                        case "A":
                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                            break;
                        case "S":
                            if (pcom == "C" || pcom == "S") { // In "S" case we have to take into account, if the previous command is C/S.
                                nx = d.x * 2 - d.bx;          // And reflect the previous
                                ny = d.y * 2 - d.by;          // command's control point relative to the current point.
                            }
                            else {                            // or some else or nothing
                                nx = d.x;
                                ny = d.y;
                            }
                            path = ["C", nx, ny][concat](path.slice(1));
                            break;
                        case "T":
                            if (pcom == "Q" || pcom == "T") { // In "T" case we have to take into account, if the previous command is Q/T.
                                d.qx = d.x * 2 - d.qx;        // And make a reflection similar
                                d.qy = d.y * 2 - d.qy;        // to case "S".
                            }
                            else {                            // or something else or nothing
                                d.qx = d.x;
                                d.qy = d.y;
                            }
                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;
                        case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;
                        case "L":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                            break;
                        case "H":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                            break;
                        case "V":
                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                            break;
                        case "Z":
                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                            break;
                    }
                    return path;
                },
                fixArc = function (pp, i) {
                    if (pp[i].length > 7) {
                        pp[i].shift();
                        var pi = pp[i];
                        while (pi.length) {
                            pcoms1[i]="A"; // if created multiple C:s, their original seg is saved
                            p2 && (pcoms2[i]="A"); // the same as above
                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                        }
                        pp.splice(i, 1);
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                fixM = function (path1, path2, a1, a2, i) {
                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                        path2.splice(i, 0, ["M", a2.x, a2.y]);
                        a1.bx = 0;
                        a1.by = 0;
                        a1.x = path1[i][1];
                        a1.y = path1[i][2];
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                pcoms1 = [], // path commands of original path p
                pcoms2 = [], // path commands of original path p2
                pfirst = "", // temporary holder for original path command
                pcom = ""; // holder for previous path command of original path
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                p[i] && (pfirst = p[i][0]); // save current path command

                if (pfirst != "C") // C is not saved yet, because it may be result of conversion
                {
                    pcoms1[i] = pfirst; // Save current path command
                    i && ( pcom = pcoms1[i-1]); // Get previous path command pcom
                }
                p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

                if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
                // which may produce multiple C:s
                // so we have to make sure that C is also C in original path

                fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

                if (p2) { // the same procedures is done to p2
                    p2[i] && (pfirst = p2[i][0]);
                    if (pfirst != "C")
                    {
                        pcoms2[i] = pfirst;
                        i && (pcom = pcoms2[i-1]);
                    }
                    p2[i] = processPath(p2[i], attrs2, pcom);

                    if (pcoms2[i]!="A" && pfirst=="C") pcoms2[i]="C";

                    fixArc(p2, i);
                }
                fixM(p, p2, attrs, attrs2, i);
                fixM(p2, p, attrs2, attrs, i);
                var seg = p[i],
                    seg2 = p2 && p2[i],
                    seglen = seg.length,
                    seg2len = p2 && seg2.length;
                attrs.x = seg[seglen - 2];
                attrs.y = seg[seglen - 1];
                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                attrs2.x = p2 && seg2[seg2len - 2];
                attrs2.y = p2 && seg2[seg2len - 1];
            }
            if (!p2) {
                pth.curve = pathClone(p);
            }
            return p2 ? [p, p2] : p;
        }, null, pathClone),
        parseDots = R._parseDots = cacher(function (gradient) {
            var dots = [];
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {},
                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = R.getRGB(par[1]);
                if (dot.color.error) {
                    return null;
                }
                dot.color = dot.color.hex;
                par[2] && (dot.offset = par[2] + "%");
                dots.push(dot);
            }
            for (i = 1, ii = dots.length - 1; i < ii; i++) {
                if (!dots[i].offset) {
                    var start = toFloat(dots[i - 1].offset || 0),
                        end = 0;
                    for (var j = i + 1; j < ii; j++) {
                        if (dots[j].offset) {
                            end = dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = toFloat(end);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        dots[i].offset = start + "%";
                    }
                }
            }
            return dots;
        }),
        tear = R._tear = function (el, paper) {
            el == paper.top && (paper.top = el.prev);
            el == paper.bottom && (paper.bottom = el.next);
            el.next && (el.next.prev = el.prev);
            el.prev && (el.prev.next = el.next);
        },
        tofront = R._tofront = function (el, paper) {
            if (paper.top === el) {
                return;
            }
            tear(el, paper);
            el.next = null;
            el.prev = paper.top;
            paper.top.next = el;
            paper.top = el;
        },
        toback = R._toback = function (el, paper) {
            if (paper.bottom === el) {
                return;
            }
            tear(el, paper);
            el.next = paper.bottom;
            el.prev = null;
            paper.bottom.prev = el;
            paper.bottom = el;
        },
        insertafter = R._insertafter = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.top && (paper.top = el);
            el2.next && (el2.next.prev = el);
            el.next = el2.next;
            el.prev = el2;
            el2.next = el;
        },
        insertbefore = R._insertbefore = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.bottom && (paper.bottom = el);
            el2.prev && (el2.prev.next = el);
            el.prev = el2.prev;
            el2.prev = el;
            el.next = el2;
        },
        /*\
         * Raphael.toMatrix
         [ method ]
         **
         * Utility method
         **
         * Returns matrix of transformations applied to a given path
         > Parameters
         - path (string) path string
         - transform (string|array) transformation string
         = (object) @Matrix
        \*/
        toMatrix = R.toMatrix = function (path, transform) {
            var bb = pathDimensions(path),
                el = {
                    _: {
                        transform: E
                    },
                    getBBox: function () {
                        return bb;
                    }
                };
            extractTransform(el, transform);
            return el.matrix;
        },
        /*\
         * Raphael.transformPath
         [ method ]
         **
         * Utility method
         **
         * Returns path transformed by a given transformation
         > Parameters
         - path (string) path string
         - transform (string|array) transformation string
         = (string) path
        \*/
        transformPath = R.transformPath = function (path, transform) {
            return mapPath(path, toMatrix(path, transform));
        },
        extractTransform = R._extractTransform = function (el, tstr) {
            if (tstr == null) {
                return el._.transform;
            }
            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
            var tdata = R.parseTransformString(tstr),
                deg = 0,
                dx = 0,
                dy = 0,
                sx = 1,
                sy = 1,
                _ = el._,
                m = new Matrix;
            _.transform = tdata || [];
            if (tdata) {
                for (var i = 0, ii = tdata.length; i < ii; i++) {
                    var t = tdata[i],
                        tlen = t.length,
                        command = Str(t[0]).toLowerCase(),
                        absolute = t[0] != command,
                        inver = absolute ? m.invert() : 0,
                        x1,
                        y1,
                        x2,
                        y2,
                        bb;
                    if (command == "t" && tlen == 3) {
                        if (absolute) {
                            x1 = inver.x(0, 0);
                            y1 = inver.y(0, 0);
                            x2 = inver.x(t[1], t[2]);
                            y2 = inver.y(t[1], t[2]);
                            m.translate(x2 - x1, y2 - y1);
                        } else {
                            m.translate(t[1], t[2]);
                        }
                    } else if (command == "r") {
                        if (tlen == 2) {
                            bb = bb || el.getBBox(1);
                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            deg += t[1];
                        } else if (tlen == 4) {
                            if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.rotate(t[1], x2, y2);
                            } else {
                                m.rotate(t[1], t[2], t[3]);
                            }
                            deg += t[1];
                        }
                    } else if (command == "s") {
                        if (tlen == 2 || tlen == 3) {
                            bb = bb || el.getBBox(1);
                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            sx *= t[1];
                            sy *= t[tlen - 1];
                        } else if (tlen == 5) {
                            if (absolute) {
                                x2 = inver.x(t[3], t[4]);
                                y2 = inver.y(t[3], t[4]);
                                m.scale(t[1], t[2], x2, y2);
                            } else {
                                m.scale(t[1], t[2], t[3], t[4]);
                            }
                            sx *= t[1];
                            sy *= t[2];
                        }
                    } else if (command == "m" && tlen == 7) {
                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    _.dirtyT = 1;
                    el.matrix = m;
                }
            }

            /*\
             * Element.matrix
             [ property (object) ]
             **
             * Keeps @Matrix object, which represents element transformation
            \*/
            el.matrix = m;

            _.sx = sx;
            _.sy = sy;
            _.deg = deg;
            _.dx = dx = m.e;
            _.dy = dy = m.f;

            if (sx == 1 && sy == 1 && !deg && _.bbox) {
                _.bbox.x += +dx;
                _.bbox.y += +dy;
            } else {
                _.dirtyT = 1;
            }
        },
        getEmpty = function (item) {
            var l = item[0];
            switch (l.toLowerCase()) {
                case "t": return [l, 0, 0];
                case "m": return [l, 1, 0, 0, 1, 0, 0];
                case "r": if (item.length == 4) {
                    return [l, 0, item[2], item[3]];
                } else {
                    return [l, 0];
                }
                case "s": if (item.length == 5) {
                    return [l, 1, 1, item[3], item[4]];
                } else if (item.length == 3) {
                    return [l, 1, 1];
                } else {
                    return [l, 1];
                }
            }
        },
        equaliseTransform = R._equaliseTransform = function (t1, t2) {
            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
            t1 = R.parseTransformString(t1) || [];
            t2 = R.parseTransformString(t2) || [];
            var maxlength = mmax(t1.length, t2.length),
                from = [],
                to = [],
                i = 0, j, jj,
                tt1, tt2;
            for (; i < maxlength; i++) {
                tt1 = t1[i] || getEmpty(t2[i]);
                tt2 = t2[i] || getEmpty(tt1);
                if ((tt1[0] != tt2[0]) ||
                    (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) ||
                    (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))
                    ) {
                    return;
                }
                from[i] = [];
                to[i] = [];
                for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                    j in tt1 && (from[i][j] = tt1[j]);
                    j in tt2 && (to[i][j] = tt2[j]);
                }
            }
            return {
                from: from,
                to: to
            };
        };
    R._getContainer = function (x, y, w, h) {
        var container;
        container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
        if (container == null) {
            return;
        }
        if (container.tagName) {
            if (y == null) {
                return {
                    container: container,
                    width: container.style.pixelWidth || container.offsetWidth,
                    height: container.style.pixelHeight || container.offsetHeight
                };
            } else {
                return {
                    container: container,
                    width: y,
                    height: w
                };
            }
        }
        return {
            container: 1,
            x: x,
            y: y,
            width: w,
            height: h
        };
    };
    /*\
     * Raphael.pathToRelative
     [ method ]
     **
     * Utility method
     **
     * Converts path to relative form
     > Parameters
     - pathString (string|array) path string or array of segments
     = (array) array of segments.
    \*/
    R.pathToRelative = pathToRelative;
    R._engine = {};
    /*\
     * Raphael.path2curve
     [ method ]
     **
     * Utility method
     **
     * Converts path to a new path where all segments are cubic bezier curves.
     > Parameters
     - pathString (string|array) path string or array of segments
     = (array) array of segments.
    \*/
    R.path2curve = path2curve;
    /*\
     * Raphael.matrix
     [ method ]
     **
     * Utility method
     **
     * Returns matrix based on given parameters.
     > Parameters
     - a (number)
     - b (number)
     - c (number)
     - d (number)
     - e (number)
     - f (number)
     = (object) @Matrix
    \*/
    R.matrix = function (a, b, c, d, e, f) {
        return new Matrix(a, b, c, d, e, f);
    };
    function Matrix(a, b, c, d, e, f) {
        if (a != null) {
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.d = +d;
            this.e = +e;
            this.f = +f;
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }
    (function (matrixproto) {
        /*\
         * Matrix.add
         [ method ]
         **
         * Adds given matrix to existing one.
         > Parameters
         - a (number)
         - b (number)
         - c (number)
         - d (number)
         - e (number)
         - f (number)
         or
         - matrix (object) @Matrix
        \*/
        matrixproto.add = function (a, b, c, d, e, f) {
            var out = [[], [], []],
                m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
                x, y, z, res;

            if (a && a instanceof Matrix) {
                matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]];
            }

            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    res = 0;
                    for (z = 0; z < 3; z++) {
                        res += m[x][z] * matrix[z][y];
                    }
                    out[x][y] = res;
                }
            }
            this.a = out[0][0];
            this.b = out[1][0];
            this.c = out[0][1];
            this.d = out[1][1];
            this.e = out[0][2];
            this.f = out[1][2];
        };
        /*\
         * Matrix.invert
         [ method ]
         **
         * Returns inverted version of the matrix
         = (object) @Matrix
        \*/
        matrixproto.invert = function () {
            var me = this,
                x = me.a * me.d - me.b * me.c;
            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
        };
        /*\
         * Matrix.clone
         [ method ]
         **
         * Returns copy of the matrix
         = (object) @Matrix
        \*/
        matrixproto.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
        };
        /*\
         * Matrix.translate
         [ method ]
         **
         * Translate the matrix
         > Parameters
         - x (number)
         - y (number)
        \*/
        matrixproto.translate = function (x, y) {
            this.add(1, 0, 0, 1, x, y);
        };
        /*\
         * Matrix.scale
         [ method ]
         **
         * Scales the matrix
         > Parameters
         - x (number)
         - y (number) #optional
         - cx (number) #optional
         - cy (number) #optional
        \*/
        matrixproto.scale = function (x, y, cx, cy) {
            y == null && (y = x);
            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
            this.add(x, 0, 0, y, 0, 0);
            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
        };
        /*\
         * Matrix.rotate
         [ method ]
         **
         * Rotates the matrix
         > Parameters
         - a (number)
         - x (number)
         - y (number)
        \*/
        matrixproto.rotate = function (a, x, y) {
            a = R.rad(a);
            x = x || 0;
            y = y || 0;
            var cos = +math.cos(a).toFixed(9),
                sin = +math.sin(a).toFixed(9);
            this.add(cos, sin, -sin, cos, x, y);
            this.add(1, 0, 0, 1, -x, -y);
        };
        /*\
         * Matrix.x
         [ method ]
         **
         * Return x coordinate for given point after transformation described by the matrix. See also @Matrix.y
         > Parameters
         - x (number)
         - y (number)
         = (number) x
        \*/
        matrixproto.x = function (x, y) {
            return x * this.a + y * this.c + this.e;
        };
        /*\
         * Matrix.y
         [ method ]
         **
         * Return y coordinate for given point after transformation described by the matrix. See also @Matrix.x
         > Parameters
         - x (number)
         - y (number)
         = (number) y
        \*/
        matrixproto.y = function (x, y) {
            return x * this.b + y * this.d + this.f;
        };
        matrixproto.get = function (i) {
            return +this[Str.fromCharCode(97 + i)].toFixed(4);
        };
        matrixproto.toString = function () {
            return R.svg ?
                "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" :
                [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        };
        matrixproto.toFilter = function () {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) +
                ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) +
                ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        };
        matrixproto.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        function norm(a) {
            return a[0] * a[0] + a[1] * a[1];
        }
        function normalize(a) {
            var mag = math.sqrt(norm(a));
            a[0] && (a[0] /= mag);
            a[1] && (a[1] /= mag);
        }
        /*\
         * Matrix.split
         [ method ]
         **
         * Splits matrix into primitive transformations
         = (object) in format:
         o dx (number) translation by x
         o dy (number) translation by y
         o scalex (number) scale by x
         o scaley (number) scale by y
         o shear (number) shear
         o rotate (number) rotation in deg
         o isSimple (boolean) could it be represented via simple transformations
        \*/
        matrixproto.split = function () {
            var out = {};
            // translation
            out.dx = this.e;
            out.dy = this.f;

            // scale and shear
            var row = [[this.a, this.c], [this.b, this.d]];
            out.scalex = math.sqrt(norm(row[0]));
            normalize(row[0]);

            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

            out.scaley = math.sqrt(norm(row[1]));
            normalize(row[1]);
            out.shear /= out.scaley;

            // rotation
            var sin = -row[0][1],
                cos = row[1][1];
            if (cos < 0) {
                out.rotate = R.deg(math.acos(cos));
                if (sin < 0) {
                    out.rotate = 360 - out.rotate;
                }
            } else {
                out.rotate = R.deg(math.asin(sin));
            }

            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
            return out;
        };
        /*\
         * Matrix.toTransformString
         [ method ]
         **
         * Return transform string that represents given matrix
         = (string) transform string
        \*/
        matrixproto.toTransformString = function (shorter) {
            var s = shorter || this[split]();
            if (s.isSimple) {
                s.scalex = +s.scalex.toFixed(4);
                s.scaley = +s.scaley.toFixed(4);
                s.rotate = +s.rotate.toFixed(4);
                return  (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) +
                        (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) +
                        (s.rotate ? "r" + [s.rotate, 0, 0] : E);
            } else {
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
            }
        };
    })(Matrix.prototype);

    // WebKit rendering bug workaround method
    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") ||
        (navigator.vendor == "Google Inc." && version && version[1] < 8)) {
        /*\
         * Paper.safari
         [ method ]
         **
         * There is an inconvenient rendering bug in Safari (WebKit):
         * sometimes the rendering should be forced.
         * This method should help with dealing with this bug.
        \*/
        paperproto.safari = function () {
            var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
            setTimeout(function () {rect.remove();});
        };
    } else {
        paperproto.safari = fun;
    }

    var preventDefault = function () {
        this.returnValue = false;
    },
    preventTouch = function () {
        return this.originalEvent.preventDefault();
    },
    stopPropagation = function () {
        this.cancelBubble = true;
    },
    stopTouch = function () {
        return this.originalEvent.stopPropagation();
    },
    getEventPosition = function (e) {
        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;

        return {
            x: e.clientX + scrollX,
            y: e.clientY + scrollY
        };
    },
    addEvent = (function () {
        if (g.doc.addEventListener) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    var pos = getEventPosition(e);
                    return fn.call(element, e, pos.x, pos.y);
                };
                obj.addEventListener(type, f, false);

                if (supportsTouch && touchMap[type]) {
                    var _f = function (e) {
                        var pos = getEventPosition(e),
                            olde = e;

                        for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                            if (e.targetTouches[i].target == obj) {
                                e = e.targetTouches[i];
                                e.originalEvent = olde;
                                e.preventDefault = preventTouch;
                                e.stopPropagation = stopTouch;
                                break;
                            }
                        }

                        return fn.call(element, e, pos.x, pos.y);
                    };
                    obj.addEventListener(touchMap[type], _f, false);
                }

                return function () {
                    obj.removeEventListener(type, f, false);

                    if (supportsTouch && touchMap[type])
                        obj.removeEventListener(touchMap[type], _f, false);

                    return true;
                };
            };
        } else if (g.doc.attachEvent) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    e = e || g.win.event;
                    var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                        scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                        x = e.clientX + scrollX,
                        y = e.clientY + scrollY;
                    e.preventDefault = e.preventDefault || preventDefault;
                    e.stopPropagation = e.stopPropagation || stopPropagation;
                    return fn.call(element, e, x, y);
                };
                obj.attachEvent("on" + type, f);
                var detacher = function () {
                    obj.detachEvent("on" + type, f);
                    return true;
                };
                return detacher;
            };
        }
    })(),
    drag = [],
    dragMove = function (e) {
        var x = e.clientX,
            y = e.clientY,
            scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
            dragi,
            j = drag.length;
        while (j--) {
            dragi = drag[j];
            if (supportsTouch && e.touches) {
                var i = e.touches.length,
                    touch;
                while (i--) {
                    touch = e.touches[i];
                    if (touch.identifier == dragi.el._drag.id) {
                        x = touch.clientX;
                        y = touch.clientY;
                        (e.originalEvent ? e.originalEvent : e).preventDefault();
                        break;
                    }
                }
            } else {
                e.preventDefault();
            }
            var node = dragi.el.node,
                o,
                next = node.nextSibling,
                parent = node.parentNode,
                display = node.style.display;
            g.win.opera && parent.removeChild(node);
            node.style.display = "none";
            o = dragi.el.paper.getElementByPoint(x, y);
            node.style.display = display;
            g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
            o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
            x += scrollX;
            y += scrollY;
            eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
        }
    },
    dragUp = function (e) {
        R.unmousemove(dragMove).unmouseup(dragUp);
        var i = drag.length,
            dragi;
        while (i--) {
            dragi = drag[i];
            dragi.el._drag = {};
            eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
        }
        drag = [];
    },
    /*\
     * Raphael.el
     [ property (object) ]
     **
     * You can add your own method to elements. This is usefull when you want to hack default functionality or
     * want to wrap some common transformation or attributes in one method. In difference to canvas methods,
     * you can redefine element method at any time. Expending element methods wouldn’t affect set.
     > Usage
     | Raphael.el.red = function () {
     |     this.attr({fill: "#f00"});
     | };
     | // then use it
     | paper.circle(100, 100, 20).red();
    \*/
    elproto = R.el = {};
    /*\
     * Element.click
     [ method ]
     **
     * Adds event handler for click for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.unclick
     [ method ]
     **
     * Removes event handler for click for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.dblclick
     [ method ]
     **
     * Adds event handler for double click for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.undblclick
     [ method ]
     **
     * Removes event handler for double click for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.mousedown
     [ method ]
     **
     * Adds event handler for mousedown for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.unmousedown
     [ method ]
     **
     * Removes event handler for mousedown for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.mousemove
     [ method ]
     **
     * Adds event handler for mousemove for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.unmousemove
     [ method ]
     **
     * Removes event handler for mousemove for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.mouseout
     [ method ]
     **
     * Adds event handler for mouseout for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.unmouseout
     [ method ]
     **
     * Removes event handler for mouseout for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.mouseover
     [ method ]
     **
     * Adds event handler for mouseover for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.unmouseover
     [ method ]
     **
     * Removes event handler for mouseover for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.mouseup
     [ method ]
     **
     * Adds event handler for mouseup for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.unmouseup
     [ method ]
     **
     * Removes event handler for mouseup for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.touchstart
     [ method ]
     **
     * Adds event handler for touchstart for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.untouchstart
     [ method ]
     **
     * Removes event handler for touchstart for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.touchmove
     [ method ]
     **
     * Adds event handler for touchmove for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.untouchmove
     [ method ]
     **
     * Removes event handler for touchmove for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.touchend
     [ method ]
     **
     * Adds event handler for touchend for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.untouchend
     [ method ]
     **
     * Removes event handler for touchend for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/

    /*\
     * Element.touchcancel
     [ method ]
     **
     * Adds event handler for touchcancel for the element.
     > Parameters
     - handler (function) handler for the event
     = (object) @Element
    \*/
    /*\
     * Element.untouchcancel
     [ method ]
     **
     * Removes event handler for touchcancel for the element.
     > Parameters
     - handler (function) #optional handler for the event
     = (object) @Element
    \*/
    for (var i = events.length; i--;) {
        (function (eventName) {
            R[eventName] = elproto[eventName] = function (fn, scope) {
                if (R.is(fn, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)});
                }
                return this;
            };
            R["un" + eventName] = elproto["un" + eventName] = function (fn) {
                var events = this.events || [],
                    l = events.length;
                while (l--){
                    if (events[l].name == eventName && (R.is(fn, "undefined") || events[l].f == fn)) {
                        events[l].unbind();
                        events.splice(l, 1);
                        !events.length && delete this.events;
                    }
                }
                return this;
            };
        })(events[i]);
    }

    /*\
     * Element.data
     [ method ]
     **
     * Adds or retrieves given value asociated with given key.
     **
     * See also @Element.removeData
     > Parameters
     - key (string) key to store data
     - value (any) #optional value to store
     = (object) @Element
     * or, if value is not specified:
     = (any) value
     * or, if key and value are not specified:
     = (object) Key/value pairs for all the data associated with the element.
     > Usage
     | for (var i = 0, i < 5, i++) {
     |     paper.circle(10 + 15 * i, 10, 10)
     |          .attr({fill: "#000"})
     |          .data("i", i)
     |          .click(function () {
     |             alert(this.data("i"));
     |          });
     | }
    \*/
    elproto.data = function (key, value) {
        var data = eldata[this.id] = eldata[this.id] || {};
        if (arguments.length == 0) {
            return data;
        }
        if (arguments.length == 1) {
            if (R.is(key, "object")) {
                for (var i in key) if (key[has](i)) {
                    this.data(i, key[i]);
                }
                return this;
            }
            eve("raphael.data.get." + this.id, this, data[key], key);
            return data[key];
        }
        data[key] = value;
        eve("raphael.data.set." + this.id, this, value, key);
        return this;
    };
    /*\
     * Element.removeData
     [ method ]
     **
     * Removes value associated with an element by given key.
     * If key is not provided, removes all the data of the element.
     > Parameters
     - key (string) #optional key
     = (object) @Element
    \*/
    elproto.removeData = function (key) {
        if (key == null) {
            eldata[this.id] = {};
        } else {
            eldata[this.id] && delete eldata[this.id][key];
        }
        return this;
    };
     /*\
     * Element.getData
     [ method ]
     **
     * Retrieves the element data
     = (object) data
    \*/
    elproto.getData = function () {
        return clone(eldata[this.id] || {});
    };
    /*\
     * Element.hover
     [ method ]
     **
     * Adds event handlers for hover for the element.
     > Parameters
     - f_in (function) handler for hover in
     - f_out (function) handler for hover out
     - icontext (object) #optional context for hover in handler
     - ocontext (object) #optional context for hover out handler
     = (object) @Element
    \*/
    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };
    /*\
     * Element.unhover
     [ method ]
     **
     * Removes event handlers for hover for the element.
     > Parameters
     - f_in (function) handler for hover in
     - f_out (function) handler for hover out
     = (object) @Element
    \*/
    elproto.unhover = function (f_in, f_out) {
        return this.unmouseover(f_in).unmouseout(f_out);
    };
    var draggable = [];
    /*\
     * Element.drag
     [ method ]
     **
     * Adds event handlers for drag of the element.
     > Parameters
     - onmove (function) handler for moving
     - onstart (function) handler for drag start
     - onend (function) handler for drag end
     - mcontext (object) #optional context for moving handler
     - scontext (object) #optional context for drag start handler
     - econtext (object) #optional context for drag end handler
     * Additionaly following `drag` events will be triggered: `drag.start.<id>` on start,
     * `drag.end.<id>` on end and `drag.move.<id>` on every move. When element will be dragged over another element
     * `drag.over.<id>` will be fired as well.
     *
     * Start event and start handler will be called in specified context or in context of the element with following parameters:
     o x (number) x position of the mouse
     o y (number) y position of the mouse
     o event (object) DOM event object
     * Move event and move handler will be called in specified context or in context of the element with following parameters:
     o dx (number) shift by x from the start point
     o dy (number) shift by y from the start point
     o x (number) x position of the mouse
     o y (number) y position of the mouse
     o event (object) DOM event object
     * End event and end handler will be called in specified context or in context of the element with following parameters:
     o event (object) DOM event object
     = (object) @Element
    \*/
    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
        function start(e) {
            (e.originalEvent || e).preventDefault();
            var x = e.clientX,
                y = e.clientY,
                scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            this._drag.id = e.identifier;
            if (supportsTouch && e.touches) {
                var i = e.touches.length, touch;
                while (i--) {
                    touch = e.touches[i];
                    this._drag.id = touch.identifier;
                    if (touch.identifier == this._drag.id) {
                        x = touch.clientX;
                        y = touch.clientY;
                        break;
                    }
                }
            }
            this._drag.x = x + scrollX;
            this._drag.y = y + scrollY;
            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
            drag.push({el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
            onstart && eve.on("raphael.drag.start." + this.id, onstart);
            onmove && eve.on("raphael.drag.move." + this.id, onmove);
            onend && eve.on("raphael.drag.end." + this.id, onend);
            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
        }
        this._drag = {};
        draggable.push({el: this, start: start});
        this.mousedown(start);
        return this;
    };
    /*\
     * Element.onDragOver
     [ method ]
     **
     * Shortcut for assigning event handler for `drag.over.<id>` event, where id is id of the element (see @Element.id).
     > Parameters
     - f (function) handler for event, first argument would be the element you are dragging over
    \*/
    elproto.onDragOver = function (f) {
        f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
    };
    /*\
     * Element.undrag
     [ method ]
     **
     * Removes all drag event handlers from given element.
    \*/
    elproto.undrag = function () {
        var i = draggable.length;
        while (i--) if (draggable[i].el == this) {
            this.unmousedown(draggable[i].start);
            draggable.splice(i, 1);
            eve.unbind("raphael.drag.*." + this.id);
        }
        !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
        drag = [];
    };
    /*\
     * Paper.circle
     [ method ]
     **
     * Draws a circle.
     **
     > Parameters
     **
     - x (number) x coordinate of the centre
     - y (number) y coordinate of the centre
     - r (number) radius
     = (object) Raphaël element object with type “circle”
     **
     > Usage
     | var c = paper.circle(50, 50, 40);
    \*/
    paperproto.circle = function (x, y, r) {
        var out = R._engine.circle(this, x || 0, y || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    /*\
     * Paper.rect
     [ method ]
     *
     * Draws a rectangle.
     **
     > Parameters
     **
     - x (number) x coordinate of the top left corner
     - y (number) y coordinate of the top left corner
     - width (number) width
     - height (number) height
     - r (number) #optional radius for rounded corners, default is 0
     = (object) Raphaël element object with type “rect”
     **
     > Usage
     | // regular rectangle
     | var c = paper.rect(10, 10, 50, 50);
     | // rectangle with rounded corners
     | var c = paper.rect(40, 40, 50, 50, 10);
    \*/
    paperproto.rect = function (x, y, w, h, r) {
        var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    /*\
     * Paper.ellipse
     [ method ]
     **
     * Draws an ellipse.
     **
     > Parameters
     **
     - x (number) x coordinate of the centre
     - y (number) y coordinate of the centre
     - rx (number) horizontal radius
     - ry (number) vertical radius
     = (object) Raphaël element object with type “ellipse”
     **
     > Usage
     | var c = paper.ellipse(50, 50, 40, 20);
    \*/
    paperproto.ellipse = function (x, y, rx, ry) {
        var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    /*\
     * Paper.path
     [ method ]
     **
     * Creates a path element by given path data string.
     > Parameters
     - pathString (string) #optional path string in SVG format.
     * Path string consists of one-letter commands, followed by comma seprarated arguments in numercal form. Example:
     | "M10,20L30,40"
     * Here we can see two commands: “M”, with arguments `(10, 20)` and “L” with arguments `(30, 40)`. Upper case letter mean command is absolute, lower case—relative.
     *
     # <p>Here is short list of commands available, for more details see <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path's data attribute's format are described in the SVG specification.">SVG path string format</a>.</p>
     # <table><thead><tr><th>Command</th><th>Name</th><th>Parameters</th></tr></thead><tbody>
     # <tr><td>M</td><td>moveto</td><td>(x y)+</td></tr>
     # <tr><td>Z</td><td>closepath</td><td>(none)</td></tr>
     # <tr><td>L</td><td>lineto</td><td>(x y)+</td></tr>
     # <tr><td>H</td><td>horizontal lineto</td><td>x+</td></tr>
     # <tr><td>V</td><td>vertical lineto</td><td>y+</td></tr>
     # <tr><td>C</td><td>curveto</td><td>(x1 y1 x2 y2 x y)+</td></tr>
     # <tr><td>S</td><td>smooth curveto</td><td>(x2 y2 x y)+</td></tr>
     # <tr><td>Q</td><td>quadratic Bézier curveto</td><td>(x1 y1 x y)+</td></tr>
     # <tr><td>T</td><td>smooth quadratic Bézier curveto</td><td>(x y)+</td></tr>
     # <tr><td>A</td><td>elliptical arc</td><td>(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+</td></tr>
     # <tr><td>R</td><td><a href="http://en.wikipedia.org/wiki/Catmull–Rom_spline#Catmull.E2.80.93Rom_spline">Catmull-Rom curveto</a>*</td><td>x1 y1 (x y)+</td></tr></tbody></table>
     * * “Catmull-Rom curveto” is a not standard SVG command and added in 2.0 to make life easier.
     * Note: there is a special case when path consist of just three commands: “M10,10R…z”. In this case path will smoothly connects to its beginning.
     > Usage
     | var c = paper.path("M10 10L90 90");
     | // draw a diagonal line:
     | // move to 10,10, line to 90,90
     * For example of path strings, check out these icons: http://raphaeljs.com/icons/
    \*/
    paperproto.path = function (pathString) {
        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
        var out = R._engine.path(R.format[apply](R, arguments), this);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    /*\
     * Paper.image
     [ method ]
     **
     * Embeds an image into the surface.
     **
     > Parameters
     **
     - src (string) URI of the source image
     - x (number) x coordinate position
     - y (number) y coordinate position
     - width (number) width of the image
     - height (number) height of the image
     = (object) Raphaël element object with type “image”
     **
     > Usage
     | var c = paper.image("apple.png", 10, 10, 80, 80);
    \*/
    paperproto.image = function (src, x, y, w, h) {
        var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    /*\
     * Paper.text
     [ method ]
     **
     * Draws a text string. If you need line breaks, put “\n” in the string.
     **
     > Parameters
     **
     - x (number) x coordinate position
     - y (number) y coordinate position
     - text (string) The text string to draw
     = (object) Raphaël element object with type “text”
     **
     > Usage
     | var t = paper.text(50, 50, "Raphaël\nkicks\nbutt!");
    \*/
    paperproto.text = function (x, y, text) {
        var out = R._engine.text(this, x || 0, y || 0, Str(text));
        this.__set__ && this.__set__.push(out);
        return out;
    };
    /*\
     * Paper.set
     [ method ]
     **
     * Creates array-like object to keep and operate several elements at once.
     * Warning: it doesn’t create any elements for itself in the page, it just groups existing elements.
     * Sets act as pseudo elements — all methods available to an element can be used on a set.
     = (object) array-like object that represents set of elements
     **
     > Usage
     | var st = paper.set();
     | st.push(
     |     paper.circle(10, 10, 5),
     |     paper.circle(30, 10, 5)
     | );
     | st.attr({fill: "red"}); // changes the fill of both circles
    \*/
    paperproto.set = function (itemsArray) {
        !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
        var out = new Set(itemsArray);
        this.__set__ && this.__set__.push(out);
        out["paper"] = this;
        out["type"] = "set";
        return out;
    };
    /*\
     * Paper.setStart
     [ method ]
     **
     * Creates @Paper.set. All elements that will be created after calling this method and before calling
     * @Paper.setFinish will be added to the set.
     **
     > Usage
     | paper.setStart();
     | paper.circle(10, 10, 5),
     | paper.circle(30, 10, 5)
     | var st = paper.setFinish();
     | st.attr({fill: "red"}); // changes the fill of both circles
    \*/
    paperproto.setStart = function (set) {
        this.__set__ = set || this.set();
    };
    /*\
     * Paper.setFinish
     [ method ]
     **
     * See @Paper.setStart. This method finishes catching and returns resulting set.
     **
     = (object) set
    \*/
    paperproto.setFinish = function (set) {
        var out = this.__set__;
        delete this.__set__;
        return out;
    };
    /*\
     * Paper.getSize
     [ method ]
     **
     * Obtains current paper actual size.
     **
     = (object)
     \*/
    paperproto.getSize = function () {
        var container = this.canvas.parentNode;
        return {
            width: container.offsetWidth,
            height: container.offsetHeight
                };
        };
    /*\
     * Paper.setSize
     [ method ]
     **
     * If you need to change dimensions of the canvas call this method
     **
     > Parameters
     **
     - width (number) new width of the canvas
     - height (number) new height of the canvas
    \*/
    paperproto.setSize = function (width, height) {
        return R._engine.setSize.call(this, width, height);
    };
    /*\
     * Paper.setViewBox
     [ method ]
     **
     * Sets the view box of the paper. Practically it gives you ability to zoom and pan whole paper surface by
     * specifying new boundaries.
     **
     > Parameters
     **
     - x (number) new x position, default is `0`
     - y (number) new y position, default is `0`
     - w (number) new width of the canvas
     - h (number) new height of the canvas
     - fit (boolean) `true` if you want graphics to fit into new boundary box
    \*/
    paperproto.setViewBox = function (x, y, w, h, fit) {
        return R._engine.setViewBox.call(this, x, y, w, h, fit);
    };
    /*\
     * Paper.top
     [ property ]
     **
     * Points to the topmost element on the paper
    \*/
    /*\
     * Paper.bottom
     [ property ]
     **
     * Points to the bottom element on the paper
    \*/
    paperproto.top = paperproto.bottom = null;
    /*\
     * Paper.raphael
     [ property ]
     **
     * Points to the @Raphael object/function
    \*/
    paperproto.raphael = R;
    var getOffset = function (elem) {
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top  = box.top  + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop ) - clientTop,
            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
        return {
            y: top,
            x: left
        };
    };
    /*\
     * Paper.getElementByPoint
     [ method ]
     **
     * Returns you topmost element under given point.
     **
     = (object) Raphaël element object
     > Parameters
     **
     - x (number) x coordinate from the top left corner of the window
     - y (number) y coordinate from the top left corner of the window
     > Usage
     | paper.getElementByPoint(mouseX, mouseY).attr({stroke: "#f00"});
    \*/
    paperproto.getElementByPoint = function (x, y) {
        var paper = this,
            svg = paper.canvas,
            target = g.doc.elementFromPoint(x, y);
        if (g.win.opera && target.tagName == "svg") {
            var so = getOffset(svg),
                sr = svg.createSVGRect();
            sr.x = x - so.x;
            sr.y = y - so.y;
            sr.width = sr.height = 1;
            var hits = svg.getIntersectionList(sr, null);
            if (hits.length) {
                target = hits[hits.length - 1];
            }
        }
        if (!target) {
            return null;
        }
        while (target.parentNode && target != svg.parentNode && !target.raphael) {
            target = target.parentNode;
        }
        target == paper.canvas.parentNode && (target = svg);
        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
        return target;
    };

    /*\
     * Paper.getElementsByBBox
     [ method ]
     **
     * Returns set of elements that have an intersecting bounding box
     **
     > Parameters
     **
     - bbox (object) bbox to check with
     = (object) @Set
     \*/
    paperproto.getElementsByBBox = function (bbox) {
        var set = this.set();
        this.forEach(function (el) {
            if (R.isBBoxIntersect(el.getBBox(), bbox)) {
                set.push(el);
            }
        });
        return set;
    };

    /*\
     * Paper.getById
     [ method ]
     **
     * Returns you element by its internal ID.
     **
     > Parameters
     **
     - id (number) id
     = (object) Raphaël element object
    \*/
    paperproto.getById = function (id) {
        var bot = this.bottom;
        while (bot) {
            if (bot.id == id) {
                return bot;
            }
            bot = bot.next;
        }
        return null;
    };
    /*\
     * Paper.forEach
     [ method ]
     **
     * Executes given function for each element on the paper
     *
     * If callback function returns `false` it will stop loop running.
     **
     > Parameters
     **
     - callback (function) function to run
     - thisArg (object) context object for the callback
     = (object) Paper object
     > Usage
     | paper.forEach(function (el) {
     |     el.attr({ stroke: "blue" });
     | });
    \*/
    paperproto.forEach = function (callback, thisArg) {
        var bot = this.bottom;
        while (bot) {
            if (callback.call(thisArg, bot) === false) {
                return this;
            }
            bot = bot.next;
        }
        return this;
    };
    /*\
     * Paper.getElementsByPoint
     [ method ]
     **
     * Returns set of elements that have common point inside
     **
     > Parameters
     **
     - x (number) x coordinate of the point
     - y (number) y coordinate of the point
     = (object) @Set
    \*/
    paperproto.getElementsByPoint = function (x, y) {
        var set = this.set();
        this.forEach(function (el) {
            if (el.isPointInside(x, y)) {
                set.push(el);
            }
        });
        return set;
    };
    function x_y() {
        return this.x + S + this.y;
    }
    function x_y_w_h() {
        return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
    }
    /*\
     * Element.isPointInside
     [ method ]
     **
     * Determine if given point is inside this element’s shape
     **
     > Parameters
     **
     - x (number) x coordinate of the point
     - y (number) y coordinate of the point
     = (boolean) `true` if point inside the shape
    \*/
    elproto.isPointInside = function (x, y) {
        var rp = this.realPath = getPath[this.type](this);
        if (this.attr('transform') && this.attr('transform').length) {
            rp = R.transformPath(rp, this.attr('transform'));
        }
        return R.isPointInsidePath(rp, x, y);
    };
    /*\
     * Element.getBBox
     [ method ]
     **
     * Return bounding box for a given element
     **
     > Parameters
     **
     - isWithoutTransform (boolean) flag, `true` if you want to have bounding box before transformations. Default is `false`.
     = (object) Bounding box object:
     o {
     o     x: (number) top left corner x
     o     y: (number) top left corner y
     o     x2: (number) bottom right corner x
     o     y2: (number) bottom right corner y
     o     width: (number) width
     o     height: (number) height
     o }
    \*/
    elproto.getBBox = function (isWithoutTransform) {
        if (this.removed) {
            return {};
        }
        var _ = this._;
        if (isWithoutTransform) {
            if (_.dirty || !_.bboxwt) {
                this.realPath = getPath[this.type](this);
                _.bboxwt = pathDimensions(this.realPath);
                _.bboxwt.toString = x_y_w_h;
                _.dirty = 0;
            }
            return _.bboxwt;
        }
        if (_.dirty || _.dirtyT || !_.bbox) {
            if (_.dirty || !this.realPath) {
                _.bboxwt = 0;
                this.realPath = getPath[this.type](this);
            }
            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
            _.bbox.toString = x_y_w_h;
            _.dirty = _.dirtyT = 0;
        }
        return _.bbox;
    };
    /*\
     * Element.clone
     [ method ]
     **
     = (object) clone of a given element
     **
    \*/
    elproto.clone = function () {
        if (this.removed) {
            return null;
        }
        var out = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(out);
        return out;
    };
    /*\
     * Element.glow
     [ method ]
     **
     * Return set of elements that create glow-like effect around given element. See @Paper.set.
     *
     * Note: Glow is not connected to the element. If you change element attributes it won’t adjust itself.
     **
     > Parameters
     **
     - glow (object) #optional parameters object with all properties optional:
     o {
     o     width (number) size of the glow, default is `10`
     o     fill (boolean) will it be filled, default is `false`
     o     opacity (number) opacity, default is `0.5`
     o     offsetx (number) horizontal offset, default is `0`
     o     offsety (number) vertical offset, default is `0`
     o     color (string) glow colour, default is `black`
     o }
     = (object) @Paper.set of elements that represents glow
    \*/
    elproto.glow = function (glow) {
        if (this.type == "text") {
            return null;
        }
        glow = glow || {};
        var s = {
            width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
            fill: glow.fill || false,
            opacity: glow.opacity || .5,
            offsetx: glow.offsetx || 0,
            offsety: glow.offsety || 0,
            color: glow.color || "#000"
        },
            c = s.width / 2,
            r = this.paper,
            out = r.set(),
            path = this.realPath || getPath[this.type](this);
        path = this.matrix ? mapPath(path, this.matrix) : path;
        for (var i = 1; i < c + 1; i++) {
            out.push(r.path(path).attr({
                stroke: s.color,
                fill: s.fill ? s.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(s.width / c * i).toFixed(3),
                opacity: +(s.opacity / c).toFixed(3)
            }));
        }
        return out.insertBefore(this).translate(s.offsetx, s.offsety);
    };
    var curveslengths = {},
    getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
        if (length == null) {
            return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
        } else {
            return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
        }
    },
    getLengthFactory = function (istotal, subpath) {
        return function (path, length, onlystart) {
            path = path2curve(path);
            var x, y, p, l, sp = "", subpaths = {}, point,
                len = 0;
            for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                    x = +p[1];
                    y = +p[2];
                } else {
                    l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                    if (len + l > length) {
                        if (subpath && !subpaths.start) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                            if (onlystart) {return sp;}
                            subpaths.start = sp;
                            sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                            len += l;
                            x = +p[5];
                            y = +p[6];
                            continue;
                        }
                        if (!istotal && !subpath) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            return {x: point.x, y: point.y, alpha: point.alpha};
                        }
                    }
                    len += l;
                    x = +p[5];
                    y = +p[6];
                }
                sp += p.shift() + p;
            }
            subpaths.end = sp;
            point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
            point.alpha && (point = {x: point.x, y: point.y, alpha: point.alpha});
            return point;
        };
    };
    var getTotalLength = getLengthFactory(1),
        getPointAtLength = getLengthFactory(),
        getSubpathsAtLength = getLengthFactory(0, 1);
    /*\
     * Raphael.getTotalLength
     [ method ]
     **
     * Returns length of the given path in pixels.
     **
     > Parameters
     **
     - path (string) SVG path string.
     **
     = (number) length.
    \*/
    R.getTotalLength = getTotalLength;
    /*\
     * Raphael.getPointAtLength
     [ method ]
     **
     * Return coordinates of the point located at the given length on the given path.
     **
     > Parameters
     **
     - path (string) SVG path string
     - length (number)
     **
     = (object) representation of the point:
     o {
     o     x: (number) x coordinate
     o     y: (number) y coordinate
     o     alpha: (number) angle of derivative
     o }
    \*/
    R.getPointAtLength = getPointAtLength;
    /*\
     * Raphael.getSubpath
     [ method ]
     **
     * Return subpath of a given path from given length to given length.
     **
     > Parameters
     **
     - path (string) SVG path string
     - from (number) position of the start of the segment
     - to (number) position of the end of the segment
     **
     = (string) pathstring for the segment
    \*/
    R.getSubpath = function (path, from, to) {
        if (this.getTotalLength(path) - to < 1e-6) {
            return getSubpathsAtLength(path, from).end;
        }
        var a = getSubpathsAtLength(path, to, 1);
        return from ? getSubpathsAtLength(a, from).end : a;
    };
    /*\
     * Element.getTotalLength
     [ method ]
     **
     * Returns length of the path in pixels. Only works for element of “path” type.
     = (number) length.
    \*/
    elproto.getTotalLength = function () {
        var path = this.getPath();
        if (!path) {
            return;
        }

        if (this.node.getTotalLength) {
            return this.node.getTotalLength();
        }

        return getTotalLength(path);
    };
    /*\
     * Element.getPointAtLength
     [ method ]
     **
     * Return coordinates of the point located at the given length on the given path. Only works for element of “path” type.
     **
     > Parameters
     **
     - length (number)
     **
     = (object) representation of the point:
     o {
     o     x: (number) x coordinate
     o     y: (number) y coordinate
     o     alpha: (number) angle of derivative
     o }
    \*/
    elproto.getPointAtLength = function (length) {
        var path = this.getPath();
        if (!path) {
            return;
        }

        return getPointAtLength(path, length);
    };
    /*\
     * Element.getPath
     [ method ]
     **
     * Returns path of the element. Only works for elements of “path” type and simple elements like circle.
     = (object) path
     **
    \*/
    elproto.getPath = function () {
        var path,
            getPath = R._getPath[this.type];

        if (this.type == "text" || this.type == "set") {
            return;
        }

        if (getPath) {
            path = getPath(this);
        }

        return path;
    };
    /*\
     * Element.getSubpath
     [ method ]
     **
     * Return subpath of a given element from given length to given length. Only works for element of “path” type.
     **
     > Parameters
     **
     - from (number) position of the start of the segment
     - to (number) position of the end of the segment
     **
     = (string) pathstring for the segment
    \*/
    elproto.getSubpath = function (from, to) {
        var path = this.getPath();
        if (!path) {
            return;
        }

        return R.getSubpath(path, from, to);
    };
    /*\
     * Raphael.easing_formulas
     [ property ]
     **
     * Object that contains easing formulas for animation. You could extend it with your own. By default it has following list of easing:
     # <ul>
     #     <li>“linear”</li>
     #     <li>“&lt;” or “easeIn” or “ease-in”</li>
     #     <li>“>” or “easeOut” or “ease-out”</li>
     #     <li>“&lt;>” or “easeInOut” or “ease-in-out”</li>
     #     <li>“backIn” or “back-in”</li>
     #     <li>“backOut” or “back-out”</li>
     #     <li>“elastic”</li>
     #     <li>“bounce”</li>
     # </ul>
     # <p>See also <a href="http://raphaeljs.com/easing.html">Easing demo</a>.</p>
    \*/
    var ef = R.easing_formulas = {
        linear: function (n) {
            return n;
        },
        "<": function (n) {
            return pow(n, 1.7);
        },
        ">": function (n) {
            return pow(n, .48);
        },
        "<>": function (n) {
            var q = .48 - n / 1.04,
                Q = math.sqrt(.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            var s = 1.70158;
            return n * n * ((s + 1) * n - s);
        },
        backOut: function (n) {
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1;
        },
        elastic: function (n) {
            if (n == !!n) {
                return n;
            }
            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
        },
        bounce: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + .75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + .9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + .984375;
                    }
                }
            }
            return l;
        }
    };
    ef.easeIn = ef["ease-in"] = ef["<"];
    ef.easeOut = ef["ease-out"] = ef[">"];
    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
    ef["back-in"] = ef.backIn;
    ef["back-out"] = ef.backOut;

    var animationElements = [],
        requestAnimFrame = window.requestAnimationFrame       ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame    ||
                           window.oRequestAnimationFrame      ||
                           window.msRequestAnimationFrame     ||
                           function (callback) {
                               setTimeout(callback, 16);
                           },
        animation = function () {
            var Now = +new Date,
                l = 0;
            for (; l < animationElements.length; l++) {
                var e = animationElements[l];
                if (e.el.removed || e.paused) {
                    continue;
                }
                var time = Now - e.start,
                    ms = e.ms,
                    easing = e.easing,
                    from = e.from,
                    diff = e.diff,
                    to = e.to,
                    t = e.t,
                    that = e.el,
                    set = {},
                    now,
                    init = {},
                    key;
                if (e.initstatus) {
                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                    e.status = e.initstatus;
                    delete e.initstatus;
                    e.stop && animationElements.splice(l--, 1);
                } else {
                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
                }
                if (time < 0) {
                    continue;
                }
                if (time < ms) {
                    var pos = easing(time / ms);
                    for (var attr in from) if (from[has](attr)) {
                        switch (availableAnimAttrs[attr]) {
                            case nu:
                                now = +from[attr] + pos * ms * diff[attr];
                                break;
                            case "colour":
                                now = "rgb(" + [
                                    upto255(round(from[attr].r + pos * ms * diff[attr].r)),
                                    upto255(round(from[attr].g + pos * ms * diff[attr].g)),
                                    upto255(round(from[attr].b + pos * ms * diff[attr].b))
                                ].join(",") + ")";
                                break;
                            case "path":
                                now = [];
                                for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                    now[i] = [from[attr][i][0]];
                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                    }
                                    now[i] = now[i].join(S);
                                }
                                now = now.join(S);
                                break;
                            case "transform":
                                if (diff[attr].real) {
                                    now = [];
                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
                                        now[i] = [from[attr][i][0]];
                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                            now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                                        }
                                    }
                                } else {
                                    var get = function (i) {
                                        return +from[attr][i] + pos * ms * diff[attr][i];
                                    };
                                    // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
                                    now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]];
                                }
                                break;
                            case "csv":
                                if (attr == "clip-rect") {
                                    now = [];
                                    i = 4;
                                    while (i--) {
                                        now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                    }
                                }
                                break;
                            default:
                                var from2 = [][concat](from[attr]);
                                now = [];
                                i = that.paper.customAttributes[attr].length;
                                while (i--) {
                                    now[i] = +from2[i] + pos * ms * diff[attr][i];
                                }
                                break;
                        }
                        set[attr] = now;
                    }
                    that.attr(set);
                    (function (id, that, anim) {
                        setTimeout(function () {
                            eve("raphael.anim.frame." + id, that, anim);
                        });
                    })(that.id, that, e.anim);
                } else {
                    (function(f, el, a) {
                        setTimeout(function() {
                            eve("raphael.anim.frame." + el.id, el, a);
                            eve("raphael.anim.finish." + el.id, el, a);
                            R.is(f, "function") && f.call(el);
                        });
                    })(e.callback, that, e.anim);
                    that.attr(to);
                    animationElements.splice(l--, 1);
                    if (e.repeat > 1 && !e.next) {
                        for (key in to) if (to[has](key)) {
                            init[key] = e.totalOrigin[key];
                        }
                        e.el.attr(init);
                        runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
                    }
                    if (e.next && !e.stop) {
                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
                    }
                }
            }
            R.svg && that && that.paper && that.paper.safari();
            animationElements.length && requestAnimFrame(animation);
        },
        upto255 = function (color) {
            return color > 255 ? 255 : color < 0 ? 0 : color;
        };
    /*\
     * Element.animateWith
     [ method ]
     **
     * Acts similar to @Element.animate, but ensure that given animation runs in sync with another given element.
     **
     > Parameters
     **
     - el (object) element to sync with
     - anim (object) animation to sync with
     - params (object) #optional final attributes for the element, see also @Element.attr
     - ms (number) #optional number of milliseconds for animation to run
     - easing (string) #optional easing type. Accept on of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
     - callback (function) #optional callback function. Will be called at the end of animation.
     * or
     - element (object) element to sync with
     - anim (object) animation to sync with
     - animation (object) #optional animation object, see @Raphael.animation
     **
     = (object) original element
    \*/
    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
            x, y;
        runAnimation(a, element, a.percents[0], null, element.attr());
        for (var i = 0, ii = animationElements.length; i < ii; i++) {
            if (animationElements[i].anim == anim && animationElements[i].el == el) {
                animationElements[ii - 1].start = animationElements[i].start;
                break;
            }
        }
        return element;
        //
        //
        // var a = params ? R.animation(params, ms, easing, callback) : anim,
        //     status = element.status(anim);
        // return this.animate(a).status(a, status * anim.ms / a.ms);
    };
    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
        var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t;
        }
        function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for(t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (abs(x2) < epsilon) {
                    return t2;
                }
                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                if (abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) / 2 + t0;
            }
            return t2;
        }
        return solve(t, 1 / (200 * duration));
    }
    elproto.onAnimation = function (f) {
        f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
        return this;
    };
    function Animation(anim, ms) {
        var percents = [],
            newAnim = {};
        this.ms = ms;
        this.times = 1;
        if (anim) {
            for (var attr in anim) if (anim[has](attr)) {
                newAnim[toFloat(attr)] = anim[attr];
                percents.push(toFloat(attr));
            }
            percents.sort(sortByNumber);
        }
        this.anim = newAnim;
        this.top = percents[percents.length - 1];
        this.percents = percents;
    }
    /*\
     * Animation.delay
     [ method ]
     **
     * Creates a copy of existing animation object with given delay.
     **
     > Parameters
     **
     - delay (number) number of ms to pass between animation start and actual animation
     **
     = (object) new altered Animation object
     | var anim = Raphael.animation({cx: 10, cy: 20}, 2e3);
     | circle1.animate(anim); // run the given animation immediately
     | circle2.animate(anim.delay(500)); // run the given animation after 500 ms
    \*/
    Animation.prototype.delay = function (delay) {
        var a = new Animation(this.anim, this.ms);
        a.times = this.times;
        a.del = +delay || 0;
        return a;
    };
    /*\
     * Animation.repeat
     [ method ]
     **
     * Creates a copy of existing animation object with given repetition.
     **
     > Parameters
     **
     - repeat (number) number iterations of animation. For infinite animation pass `Infinity`
     **
     = (object) new altered Animation object
    \*/
    Animation.prototype.repeat = function (times) {
        var a = new Animation(this.anim, this.ms);
        a.del = this.del;
        a.times = math.floor(mmax(times, 0)) || 1;
        return a;
    };
    function runAnimation(anim, element, percent, status, totalOrigin, times) {
        percent = toFloat(percent);
        var params,
            isInAnim,
            isInAnimSet,
            percents = [],
            next,
            prev,
            timestamp,
            ms = anim.ms,
            from = {},
            to = {},
            diff = {};
        if (status) {
            for (i = 0, ii = animationElements.length; i < ii; i++) {
                var e = animationElements[i];
                if (e.el.id == element.id && e.anim == anim) {
                    if (e.percent != percent) {
                        animationElements.splice(i, 1);
                        isInAnimSet = 1;
                    } else {
                        isInAnim = e;
                    }
                    element.attr(e.totalOrigin);
                    break;
                }
            }
        } else {
            status = +to; // NaN
        }
        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
                percent = anim.percents[i];
                prev = anim.percents[i - 1] || 0;
                ms = ms / anim.top * (percent - prev);
                next = anim.percents[i + 1];
                params = anim.anim[percent];
                break;
            } else if (status) {
                element.attr(anim.anim[anim.percents[i]]);
            }
        }
        if (!params) {
            return;
        }
        if (!isInAnim) {
            for (var attr in params) if (params[has](attr)) {
                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                    from[attr] = element.attr(attr);
                    (from[attr] == null) && (from[attr] = availableAttrs[attr]);
                    to[attr] = params[attr];
                    switch (availableAnimAttrs[attr]) {
                        case nu:
                            diff[attr] = (to[attr] - from[attr]) / ms;
                            break;
                        case "colour":
                            from[attr] = R.getRGB(from[attr]);
                            var toColour = R.getRGB(to[attr]);
                            diff[attr] = {
                                r: (toColour.r - from[attr].r) / ms,
                                g: (toColour.g - from[attr].g) / ms,
                                b: (toColour.b - from[attr].b) / ms
                            };
                            break;
                        case "path":
                            var pathes = path2curve(from[attr], to[attr]),
                                toPath = pathes[1];
                            from[attr] = pathes[0];
                            diff[attr] = [];
                            for (i = 0, ii = from[attr].length; i < ii; i++) {
                                diff[attr][i] = [0];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                }
                            }
                            break;
                        case "transform":
                            var _ = element._,
                                eq = equaliseTransform(_[attr], to[attr]);
                            if (eq) {
                                from[attr] = eq.from;
                                to[attr] = eq.to;
                                diff[attr] = [];
                                diff[attr].real = true;
                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                    diff[attr][i] = [from[attr][i][0]];
                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                                    }
                                }
                            } else {
                                var m = (element.matrix || new Matrix),
                                    to2 = {
                                        _: {transform: _.transform},
                                        getBBox: function () {
                                            return element.getBBox(1);
                                        }
                                    };
                                from[attr] = [
                                    m.a,
                                    m.b,
                                    m.c,
                                    m.d,
                                    m.e,
                                    m.f
                                ];
                                extractTransform(to2, to[attr]);
                                to[attr] = to2._.transform;
                                diff[attr] = [
                                    (to2.matrix.a - m.a) / ms,
                                    (to2.matrix.b - m.b) / ms,
                                    (to2.matrix.c - m.c) / ms,
                                    (to2.matrix.d - m.d) / ms,
                                    (to2.matrix.e - m.e) / ms,
                                    (to2.matrix.f - m.f) / ms
                                ];
                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
                                // extractTransform(to2, to[attr]);
                                // diff[attr] = [
                                //     (to2._.sx - _.sx) / ms,
                                //     (to2._.sy - _.sy) / ms,
                                //     (to2._.deg - _.deg) / ms,
                                //     (to2._.dx - _.dx) / ms,
                                //     (to2._.dy - _.dy) / ms
                                // ];
                            }
                            break;
                        case "csv":
                            var values = Str(params[attr])[split](separator),
                                from2 = Str(from[attr])[split](separator);
                            if (attr == "clip-rect") {
                                from[attr] = from2;
                                diff[attr] = [];
                                i = from2.length;
                                while (i--) {
                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                }
                            }
                            to[attr] = values;
                            break;
                        default:
                            values = [][concat](params[attr]);
                            from2 = [][concat](from[attr]);
                            diff[attr] = [];
                            i = element.paper.customAttributes[attr].length;
                            while (i--) {
                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                            }
                            break;
                    }
                }
            }
            var easing = params.easing,
                easyeasy = R.easing_formulas[easing];
            if (!easyeasy) {
                easyeasy = Str(easing).match(bezierrg);
                if (easyeasy && easyeasy.length == 5) {
                    var curve = easyeasy;
                    easyeasy = function (t) {
                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                    };
                } else {
                    easyeasy = pipe;
                }
            }
            timestamp = params.start || anim.start || +new Date;
            e = {
                anim: anim,
                percent: percent,
                timestamp: timestamp,
                start: timestamp + (anim.del || 0),
                status: 0,
                initstatus: status || 0,
                stop: false,
                ms: ms,
                easing: easyeasy,
                from: from,
                diff: diff,
                to: to,
                el: element,
                callback: params.callback,
                prev: prev,
                next: next,
                repeat: times || anim.times,
                origin: element.attr(),
                totalOrigin: totalOrigin
            };
            animationElements.push(e);
            if (status && !isInAnim && !isInAnimSet) {
                e.stop = true;
                e.start = new Date - ms * status;
                if (animationElements.length == 1) {
                    return animation();
                }
            }
            if (isInAnimSet) {
                e.start = new Date - e.ms * status;
            }
            animationElements.length == 1 && requestAnimFrame(animation);
        } else {
            isInAnim.initstatus = status;
            isInAnim.start = new Date - isInAnim.ms * status;
        }
        eve("raphael.anim.start." + element.id, element, anim);
    }
    /*\
     * Raphael.animation
     [ method ]
     **
     * Creates an animation object that can be passed to the @Element.animate or @Element.animateWith methods.
     * See also @Animation.delay and @Animation.repeat methods.
     **
     > Parameters
     **
     - params (object) final attributes for the element, see also @Element.attr
     - ms (number) number of milliseconds for animation to run
     - easing (string) #optional easing type. Accept one of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
     - callback (function) #optional callback function. Will be called at the end of animation.
     **
     = (object) @Animation
    \*/
    R.animation = function (params, ms, easing, callback) {
        if (params instanceof Animation) {
            return params;
        }
        if (R.is(easing, "function") || !easing) {
            callback = callback || easing || null;
            easing = null;
        }
        params = Object(params);
        ms = +ms || 0;
        var p = {},
            json,
            attr;
        for (attr in params) if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
            json = true;
            p[attr] = params[attr];
        }
        if (!json) {
            // if percent-like syntax is used and end-of-all animation callback used
            if(callback){
                // find the last one
                var lastKey = 0;
                for(var i in params){
                    var percent = toInt(i);
                    if(params[has](i) && percent > lastKey){
                        lastKey = percent;
                    }
                }
                lastKey += '%';
                // if already defined callback in the last keyframe, skip
                !params[lastKey].callback && (params[lastKey].callback = callback);
            }
          return new Animation(params, ms);
        } else {
            easing && (p.easing = easing);
            callback && (p.callback = callback);
            return new Animation({100: p}, ms);
        }
    };
    /*\
     * Element.animate
     [ method ]
     **
     * Creates and starts animation for given element.
     **
     > Parameters
     **
     - params (object) final attributes for the element, see also @Element.attr
     - ms (number) number of milliseconds for animation to run
     - easing (string) #optional easing type. Accept one of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
     - callback (function) #optional callback function. Will be called at the end of animation.
     * or
     - animation (object) animation object, see @Raphael.animation
     **
     = (object) original element
    \*/
    elproto.animate = function (params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
        runAnimation(anim, element, anim.percents[0], null, element.attr());
        return element;
    };
    /*\
     * Element.setTime
     [ method ]
     **
     * Sets the status of animation of the element in milliseconds. Similar to @Element.status method.
     **
     > Parameters
     **
     - anim (object) animation object
     - value (number) number of milliseconds from the beginning of the animation
     **
     = (object) original element if `value` is specified
     * Note, that during animation following events are triggered:
     *
     * On each animation frame event `anim.frame.<id>`, on start `anim.start.<id>` and on end `anim.finish.<id>`.
    \*/
    elproto.setTime = function (anim, value) {
        if (anim && value != null) {
            this.status(anim, mmin(value, anim.ms) / anim.ms);
        }
        return this;
    };
    /*\
     * Element.status
     [ method ]
     **
     * Gets or sets the status of animation of the element.
     **
     > Parameters
     **
     - anim (object) #optional animation object
     - value (number) #optional 0 – 1. If specified, method works like a setter and sets the status of a given animation to the value. This will cause animation to jump to the given position.
     **
     = (number) status
     * or
     = (array) status if `anim` is not specified. Array of objects in format:
     o {
     o     anim: (object) animation object
     o     status: (number) status
     o }
     * or
     = (object) original element if `value` is specified
    \*/
    elproto.status = function (anim, value) {
        var out = [],
            i = 0,
            len,
            e;
        if (value != null) {
            runAnimation(anim, this, -1, mmin(value, 1));
            return this;
        } else {
            len = animationElements.length;
            for (; i < len; i++) {
                e = animationElements[i];
                if (e.el.id == this.id && (!anim || e.anim == anim)) {
                    if (anim) {
                        return e.status;
                    }
                    out.push({
                        anim: e.anim,
                        status: e.status
                    });
                }
            }
            if (anim) {
                return 0;
            }
            return out;
        }
    };
    /*\
     * Element.pause
     [ method ]
     **
     * Stops animation of the element with ability to resume it later on.
     **
     > Parameters
     **
     - anim (object) #optional animation object
     **
     = (object) original element
    \*/
    elproto.pause = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                animationElements[i].paused = true;
            }
        }
        return this;
    };
    /*\
     * Element.resume
     [ method ]
     **
     * Resumes animation if it was paused with @Element.pause method.
     **
     > Parameters
     **
     - anim (object) #optional animation object
     **
     = (object) original element
    \*/
    elproto.resume = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            var e = animationElements[i];
            if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
                delete e.paused;
                this.status(e.anim, e.status);
            }
        }
        return this;
    };
    /*\
     * Element.stop
     [ method ]
     **
     * Stops animation of the element.
     **
     > Parameters
     **
     - anim (object) #optional animation object
     **
     = (object) original element
    \*/
    elproto.stop = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                animationElements.splice(i--, 1);
            }
        }
        return this;
    };
    function stopAnimation(paper) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.paper == paper) {
            animationElements.splice(i--, 1);
        }
    }
    eve.on("raphael.remove", stopAnimation);
    eve.on("raphael.clear", stopAnimation);
    elproto.toString = function () {
        return "Rapha\xebl\u2019s object";
    };

    // Set
    var Set = function (items) {
        this.items = [];
        this.length = 0;
        this.type = "set";
        if (items) {
            for (var i = 0, ii = items.length; i < ii; i++) {
                if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
                    this[this.items.length] = this.items[this.items.length] = items[i];
                    this.length++;
                }
            }
        }
    },
    setproto = Set.prototype;
    /*\
     * Set.push
     [ method ]
     **
     * Adds each argument to the current set.
     = (object) original element
    \*/
    setproto.push = function () {
        var item,
            len;
        for (var i = 0, ii = arguments.length; i < ii; i++) {
            item = arguments[i];
            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
                len = this.items.length;
                this[len] = this.items[len] = item;
                this.length++;
            }
        }
        return this;
    };
    /*\
     * Set.pop
     [ method ]
     **
     * Removes last element and returns it.
     = (object) element
    \*/
    setproto.pop = function () {
        this.length && delete this[this.length--];
        return this.items.pop();
    };
    /*\
     * Set.forEach
     [ method ]
     **
     * Executes given function for each element in the set.
     *
     * If function returns `false` it will stop loop running.
     **
     > Parameters
     **
     - callback (function) function to run
     - thisArg (object) context object for the callback
     = (object) Set object
    \*/
    setproto.forEach = function (callback, thisArg) {
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            if (callback.call(thisArg, this.items[i], i) === false) {
                return this;
            }
        }
        return this;
    };
    for (var method in elproto) if (elproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname][apply](el, arg);
                });
            };
        })(method);
    }
    setproto.attr = function (name, value) {
        if (name && R.is(name, array) && R.is(name[0], "object")) {
            for (var j = 0, jj = name.length; j < jj; j++) {
                this.items[j].attr(name[j]);
            }
        } else {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                this.items[i].attr(name, value);
            }
        }
        return this;
    };
    /*\
     * Set.clear
     [ method ]
     **
     * Removes all elements from the set
    \*/
    setproto.clear = function () {
        while (this.length) {
            this.pop();
        }
    };
    /*\
     * Set.splice
     [ method ]
     **
     * Removes given element from the set
     **
     > Parameters
     **
     - index (number) position of the deletion
     - count (number) number of element to remove
     - insertion… (object) #optional elements to insert
     = (object) set elements that were deleted
    \*/
    setproto.splice = function (index, count, insertion) {
        index = index < 0 ? mmax(this.length + index, 0) : index;
        count = mmax(0, mmin(this.length - index, count));
        var tail = [],
            todel = [],
            args = [],
            i;
        for (i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (i = 0; i < count; i++) {
            todel.push(this[index + i]);
        }
        for (; i < this.length - index; i++) {
            tail.push(this[index + i]);
        }
        var arglen = args.length;
        for (i = 0; i < arglen + tail.length; i++) {
            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
        }
        i = this.items.length = this.length -= count - arglen;
        while (this[i]) {
            delete this[i++];
        }
        return new Set(todel);
    };
    /*\
     * Set.exclude
     [ method ]
     **
     * Removes given element from the set
     **
     > Parameters
     **
     - element (object) element to remove
     = (boolean) `true` if object was found & removed from the set
    \*/
    setproto.exclude = function (el) {
        for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
            this.splice(i, 1);
            return true;
        }
    };
    setproto.animate = function (params, ms, easing, callback) {
        (R.is(easing, "function") || !easing) && (callback = easing || null);
        var len = this.items.length,
            i = len,
            item,
            set = this,
            collector;
        if (!len) {
            return this;
        }
        callback && (collector = function () {
            !--len && callback.call(set);
        });
        easing = R.is(easing, string) ? easing : collector;
        var anim = R.animation(params, ms, easing, collector);
        item = this.items[--i].animate(anim);
        while (i--) {
            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
            (this.items[i] && !this.items[i].removed) || len--;
        }
        return this;
    };
    setproto.insertAfter = function (el) {
        var i = this.items.length;
        while (i--) {
            this.items[i].insertAfter(el);
        }
        return this;
    };
    setproto.getBBox = function () {
        var x = [],
            y = [],
            x2 = [],
            y2 = [];
        for (var i = this.items.length; i--;) if (!this.items[i].removed) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            x2.push(box.x + box.width);
            y2.push(box.y + box.height);
        }
        x = mmin[apply](0, x);
        y = mmin[apply](0, y);
        x2 = mmax[apply](0, x2);
        y2 = mmax[apply](0, y2);
        return {
            x: x,
            y: y,
            x2: x2,
            y2: y2,
            width: x2 - x,
            height: y2 - y
        };
    };
    setproto.clone = function (s) {
        s = this.paper.set();
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            s.push(this.items[i].clone());
        }
        return s;
    };
    setproto.toString = function () {
        return "Rapha\xebl\u2018s set";
    };

    setproto.glow = function(glowConfig) {
        var ret = this.paper.set();
        this.forEach(function(shape, index){
            var g = shape.glow(glowConfig);
            if(g != null){
                g.forEach(function(shape2, index2){
                    ret.push(shape2);
                });
            }
        });
        return ret;
    };


    /*\
     * Set.isPointInside
     [ method ]
     **
     * Determine if given point is inside this set’s elements
     **
     > Parameters
     **
     - x (number) x coordinate of the point
     - y (number) y coordinate of the point
     = (boolean) `true` if point is inside any of the set's elements
     \*/
    setproto.isPointInside = function (x, y) {
        var isPointInside = false;
        this.forEach(function (el) {
            if (el.isPointInside(x, y)) {
                isPointInside = true;
                return false; // stop loop
            }
        });
        return isPointInside;
    };

    /*\
     * Raphael.registerFont
     [ method ]
     **
     * Adds given font to the registered set of fonts for Raphaël. Should be used as an internal call from within Cufón’s font file.
     * Returns original parameter, so it could be used with chaining.
     # <a href="http://wiki.github.com/sorccu/cufon/about">More about Cufón and how to convert your font form TTF, OTF, etc to JavaScript file.</a>
     **
     > Parameters
     **
     - font (object) the font to register
     = (object) the font you passed in
     > Usage
     | Cufon.registerFont(Raphael.registerFont({…}));
    \*/
    R.registerFont = function (font) {
        if (!font.face) {
            return font;
        }
        this.fonts = this.fonts || {};
        var fontcopy = {
                w: font.w,
                face: {},
                glyphs: {}
            },
            family = font.face["font-family"];
        for (var prop in font.face) if (font.face[has](prop)) {
            fontcopy.face[prop] = font.face[prop];
        }
        if (this.fonts[family]) {
            this.fonts[family].push(fontcopy);
        } else {
            this.fonts[family] = [fontcopy];
        }
        if (!font.svg) {
            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
            for (var glyph in font.glyphs) if (font.glyphs[has](glyph)) {
                var path = font.glyphs[glyph];
                fontcopy.glyphs[glyph] = {
                    w: path.w,
                    k: {},
                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
                            return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[command] || "M";
                        }) + "z"
                };
                if (path.k) {
                    for (var k in path.k) if (path[has](k)) {
                        fontcopy.glyphs[glyph].k[k] = path.k[k];
                    }
                }
            }
        }
        return font;
    };
    /*\
     * Paper.getFont
     [ method ]
     **
     * Finds font object in the registered fonts by given parameters. You could specify only one word from the font name, like “Myriad” for “Myriad Pro”.
     **
     > Parameters
     **
     - family (string) font family name or any word from it
     - weight (string) #optional font weight
     - style (string) #optional font style
     - stretch (string) #optional font stretch
     = (object) the font object
     > Usage
     | paper.print(100, 100, "Test string", paper.getFont("Times", 800), 30);
    \*/
    paperproto.getFont = function (family, weight, style, stretch) {
        stretch = stretch || "normal";
        style = style || "normal";
        weight = +weight || {normal: 400, bold: 700, lighter: 300, bolder: 800}[weight] || 400;
        if (!R.fonts) {
            return;
        }
        var font = R.fonts[family];
        if (!font) {
            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
            for (var fontName in R.fonts) if (R.fonts[has](fontName)) {
                if (name.test(fontName)) {
                    font = R.fonts[fontName];
                    break;
                }
            }
        }
        var thefont;
        if (font) {
            for (var i = 0, ii = font.length; i < ii; i++) {
                thefont = font[i];
                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                    break;
                }
            }
        }
        return thefont;
    };
    /*\
     * Paper.print
     [ method ]
     **
     * Creates path that represent given text written using given font at given position with given size.
     * Result of the method is path element that contains whole text as a separate path.
     **
     > Parameters
     **
     - x (number) x position of the text
     - y (number) y position of the text
     - string (string) text to print
     - font (object) font object, see @Paper.getFont
     - size (number) #optional size of the font, default is `16`
     - origin (string) #optional could be `"baseline"` or `"middle"`, default is `"middle"`
     - letter_spacing (number) #optional number in range `-1..1`, default is `0`
     - line_spacing (number) #optional number in range `1..3`, default is `1`
     = (object) resulting path element, which consist of all letters
     > Usage
     | var txt = r.print(10, 50, "print", r.getFont("Museo"), 30).attr({fill: "#fff"});
    \*/
    paperproto.print = function (x, y, string, font, size, origin, letter_spacing, line_spacing) {
        origin = origin || "middle"; // baseline|middle
        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
        line_spacing = mmax(mmin(line_spacing || 1, 3), 1);
        var letters = Str(string)[split](E),
            shift = 0,
            notfirst = 0,
            path = E,
            scale;
        R.is(font, "string") && (font = this.getFont(font));
        if (font) {
            scale = (size || 16) / font.face["units-per-em"];
            var bb = font.face.bbox[split](separator),
                top = +bb[0],
                lineHeight = bb[3] - bb[1],
                shifty = 0,
                height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
            for (var i = 0, ii = letters.length; i < ii; i++) {
                if (letters[i] == "\n") {
                    shift = 0;
                    curr = 0;
                    notfirst = 0;
                    shifty += lineHeight * line_spacing;
                } else {
                    var prev = notfirst && font.glyphs[letters[i - 1]] || {},
                        curr = font.glyphs[letters[i]];
                    shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                    notfirst = 1;
                }
                if (curr && curr.d) {
                    path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
                }
            }
        }
        return this.path(path).attr({
            fill: "#000",
            stroke: "none"
        });
    };

    /*\
     * Paper.add
     [ method ]
     **
     * Imports elements in JSON array in format `{type: type, <attributes>}`
     **
     > Parameters
     **
     - json (array)
     = (object) resulting set of imported elements
     > Usage
     | paper.add([
     |     {
     |         type: "circle",
     |         cx: 10,
     |         cy: 10,
     |         r: 5
     |     },
     |     {
     |         type: "rect",
     |         x: 10,
     |         y: 10,
     |         width: 10,
     |         height: 10,
     |         fill: "#fc0"
     |     }
     | ]);
    \*/
    paperproto.add = function (json) {
        if (R.is(json, "array")) {
            var res = this.set(),
                i = 0,
                ii = json.length,
                j;
            for (; i < ii; i++) {
                j = json[i] || {};
                elements[has](j.type) && res.push(this[j.type]().attr(j));
            }
        }
        return res;
    };

    /*\
     * Raphael.format
     [ method ]
     **
     * Simple format function. Replaces construction of type “`{<number>}`” to the corresponding argument.
     **
     > Parameters
     **
     - token (string) string to format
     - … (string) rest of arguments will be treated as parameters for replacement
     = (string) formated string
     > Usage
     | var x = 10,
     |     y = 20,
     |     width = 40,
     |     height = 50;
     | // this will draw a rectangular shape equivalent to "M10,20h40v50h-40z"
     | paper.path(Raphael.format("M{0},{1}h{2}v{3}h{4}z", x, y, width, height, -width));
    \*/
    R.format = function (token, params) {
        var args = R.is(params, array) ? [0][concat](params) : arguments;
        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
            return args[++i] == null ? E : args[i];
        }));
        return token || E;
    };
    /*\
     * Raphael.fullfill
     [ method ]
     **
     * A little bit more advanced format function than @Raphael.format. Replaces construction of type “`{<name>}`” to the corresponding argument.
     **
     > Parameters
     **
     - token (string) string to format
     - json (object) object which properties will be used as a replacement
     = (string) formated string
     > Usage
     | // this will draw a rectangular shape equivalent to "M10,20h40v50h-40z"
     | paper.path(Raphael.fullfill("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
     |     x: 10,
     |     y: 20,
     |     dim: {
     |         width: 40,
     |         height: 50,
     |         "negative width": -40
     |     }
     | }));
    \*/
    R.fullfill = (function () {
        var tokenRegex = /\{([^\}]+)\}/g,
            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
            replacer = function (all, key, obj) {
                var res = obj;
                key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                    name = name || quotedName;
                    if (res) {
                        if (name in res) {
                            res = res[name];
                        }
                        typeof res == "function" && isFunc && (res = res());
                    }
                });
                res = (res == null || res == obj ? all : res) + "";
                return res;
            };
        return function (str, obj) {
            return String(str).replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj);
            });
        };
    })();
    /*\
     * Raphael.ninja
     [ method ]
     **
     * If you want to leave no trace of Raphaël (Well, Raphaël creates only one global variable `Raphael`, but anyway.) You can use `ninja` method.
     * Beware, that in this case plugins could stop working, because they are depending on global variable existance.
     **
     = (object) Raphael object
     > Usage
     | (function (local_raphael) {
     |     var paper = local_raphael(10, 10, 320, 200);
     |     …
     | })(Raphael.ninja());
    \*/
    R.ninja = function () {
        oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
        return R;
    };
    /*\
     * Raphael.st
     [ property (object) ]
     **
     * You can add your own method to elements and sets. It is wise to add a set method for each element method
     * you added, so you will be able to call the same method on sets too.
     **
     * See also @Raphael.el.
     > Usage
     | Raphael.el.red = function () {
     |     this.attr({fill: "#f00"});
     | };
     | Raphael.st.red = function () {
     |     this.forEach(function (el) {
     |         el.red();
     |     });
     | };
     | // then use it
     | paper.set(paper.circle(100, 100, 20), paper.circle(110, 100, 20)).red();
    \*/
    R.st = setproto;

    eve.on("raphael.DOMload", function () {
        loaded = true;
    });

    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
    (function (doc, loaded, f) {
        if (doc.readyState == null && doc.addEventListener){
            doc.addEventListener(loaded, f = function () {
                doc.removeEventListener(loaded, f, false);
                doc.readyState = "complete";
            }, false);
            doc.readyState = "loading";
        }
        function isLoaded() {
            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
        }
        isLoaded();
    })(document, "DOMContentLoaded");

// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ SVG Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\

(function(){
    if (!R.svg) {
        return;
    }
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        toInt = parseInt,
        math = Math,
        mmax = math.max,
        abs = math.abs,
        pow = math.pow,
        separator = /[, ]+/,
        eve = R.eve,
        E = "",
        S = " ";
    var xlink = "http://www.w3.org/1999/xlink",
        markers = {
            block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
        },
        markerCounter = {};
    R.toString = function () {
        return  "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
    };
    var $ = function (el, attr) {
        if (attr) {
            if (typeof el == "string") {
                el = $(el);
            }
            for (var key in attr) if (attr[has](key)) {
                if (key.substring(0, 6) == "xlink:") {
                    el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
                } else {
                    el.setAttribute(key, Str(attr[key]));
                }
            }
        } else {
            el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
            el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
        }
        return el;
    },
    addGradientFill = function (element, gradient) {
        var type = "linear",
            id = element.id + gradient,
            fx = .5, fy = .5,
            o = element.node,
            SVG = element.paper,
            s = o.style,
            el = R._g.doc.getElementById(id);
        if (!el) {
            gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
                type = "radial";
                if (_fx && _fy) {
                    fx = toFloat(_fx);
                    fy = toFloat(_fy);
                    var dir = ((fy > .5) * 2 - 1);
                    pow(fx - .5, 2) + pow(fy - .5, 2) > .25 &&
                        (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) &&
                        fy != .5 &&
                        (fy = fy.toFixed(5) - 1e-5 * dir);
                }
                return E;
            });
            gradient = gradient.split(/\s*\-\s*/);
            if (type == "linear") {
                var angle = gradient.shift();
                angle = -toFloat(angle);
                if (isNaN(angle)) {
                    return null;
                }
                var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                    max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                vector[2] *= max;
                vector[3] *= max;
                if (vector[2] < 0) {
                    vector[0] = -vector[2];
                    vector[2] = 0;
                }
                if (vector[3] < 0) {
                    vector[1] = -vector[3];
                    vector[3] = 0;
                }
            }
            var dots = R._parseDots(gradient);
            if (!dots) {
                return null;
            }
            id = id.replace(/[\(\)\s,\xb0#]/g, "_");

            if (element.gradient && id != element.gradient.id) {
                SVG.defs.removeChild(element.gradient);
                delete element.gradient;
            }

            if (!element.gradient) {
                el = $(type + "Gradient", {id: id});
                element.gradient = el;
                $(el, type == "radial" ? {
                    fx: fx,
                    fy: fy
                } : {
                    x1: vector[0],
                    y1: vector[1],
                    x2: vector[2],
                    y2: vector[3],
                    gradientTransform: element.matrix.invert()
                });
                SVG.defs.appendChild(el);
                for (var i = 0, ii = dots.length; i < ii; i++) {
                    el.appendChild($("stop", {
                        offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                        "stop-color": dots[i].color || "#fff"
                    }));
                }
            }
        }
        $(o, {
            fill: "url('" + document.location + "#" + id + "')",
            opacity: 1,
            "fill-opacity": 1
        });
        s.fill = E;
        s.opacity = 1;
        s.fillOpacity = 1;
        return 1;
    },
    updatePosition = function (o) {
        var bbox = o.getBBox(1);
        $(o.pattern, {patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"});
    },
    addArrow = function (o, value, isEnd) {
        if (o.type == "path") {
            var values = Str(value).toLowerCase().split("-"),
                p = o.paper,
                se = isEnd ? "end" : "start",
                node = o.node,
                attrs = o.attrs,
                stroke = attrs["stroke-width"],
                i = values.length,
                type = "classic",
                from,
                to,
                dx,
                refX,
                attr,
                w = 3,
                h = 3,
                t = 5;
            while (i--) {
                switch (values[i]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        type = values[i];
                        break;
                    case "wide": h = 5; break;
                    case "narrow": h = 2; break;
                    case "long": w = 5; break;
                    case "short": w = 2; break;
                }
            }
            if (type == "open") {
                w += 2;
                h += 2;
                t += 2;
                dx = 1;
                refX = isEnd ? 4 : 1;
                attr = {
                    fill: "none",
                    stroke: attrs.stroke
                };
            } else {
                refX = dx = w / 2;
                attr = {
                    fill: attrs.stroke,
                    stroke: "none"
                };
            }
            if (o._.arrows) {
                if (isEnd) {
                    o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                    o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
                } else {
                    o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                    o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
                }
            } else {
                o._.arrows = {};
            }
            if (type != "none") {
                var pathId = "raphael-marker-" + type,
                    markerId = "raphael-marker-" + se + type + w + h + "-obj" + o.id;
                if (!R._g.doc.getElementById(pathId)) {
                    p.defs.appendChild($($("path"), {
                        "stroke-linecap": "round",
                        d: markers[type],
                        id: pathId
                    }));
                    markerCounter[pathId] = 1;
                } else {
                    markerCounter[pathId]++;
                }
                var marker = R._g.doc.getElementById(markerId),
                    use;
                if (!marker) {
                    marker = $($("marker"), {
                        id: markerId,
                        markerHeight: h,
                        markerWidth: w,
                        orient: "auto",
                        refX: refX,
                        refY: h / 2
                    });
                    use = $($("use"), {
                        "xlink:href": "#" + pathId,
                        transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
                        "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
                    });
                    marker.appendChild(use);
                    p.defs.appendChild(marker);
                    markerCounter[markerId] = 1;
                } else {
                    markerCounter[markerId]++;
                    use = marker.getElementsByTagName("use")[0];
                }
                $(use, attr);
                var delta = dx * (type != "diamond" && type != "oval");
                if (isEnd) {
                    from = o._.arrows.startdx * stroke || 0;
                    to = R.getTotalLength(attrs.path) - delta * stroke;
                } else {
                    from = delta * stroke;
                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                }
                attr = {};
                attr["marker-" + se] = "url(#" + markerId + ")";
                if (to || from) {
                    attr.d = R.getSubpath(attrs.path, from, to);
                }
                $(node, attr);
                o._.arrows[se + "Path"] = pathId;
                o._.arrows[se + "Marker"] = markerId;
                o._.arrows[se + "dx"] = delta;
                o._.arrows[se + "Type"] = type;
                o._.arrows[se + "String"] = value;
            } else {
                if (isEnd) {
                    from = o._.arrows.startdx * stroke || 0;
                    to = R.getTotalLength(attrs.path) - from;
                } else {
                    from = 0;
                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                }
                o._.arrows[se + "Path"] && $(node, {d: R.getSubpath(attrs.path, from, to)});
                delete o._.arrows[se + "Path"];
                delete o._.arrows[se + "Marker"];
                delete o._.arrows[se + "dx"];
                delete o._.arrows[se + "Type"];
                delete o._.arrows[se + "String"];
            }
            for (attr in markerCounter) if (markerCounter[has](attr) && !markerCounter[attr]) {
                var item = R._g.doc.getElementById(attr);
                item && item.parentNode.removeChild(item);
            }
        }
    },
    dasharray = {
        "": [0],
        "none": [0],
        "-": [3, 1],
        ".": [1, 1],
        "-.": [3, 1, 1, 1],
        "-..": [3, 1, 1, 1, 1, 1],
        ". ": [1, 3],
        "- ": [4, 3],
        "--": [8, 3],
        "- .": [4, 3, 1, 3],
        "--.": [8, 3, 1, 3],
        "--..": [8, 3, 1, 3, 1, 3]
    },
    addDashes = function (o, value, params) {
        value = dasharray[Str(value).toLowerCase()];
        if (value) {
            var width = o.attrs["stroke-width"] || "1",
                butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                dashes = [],
                i = value.length;
            while (i--) {
                dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
            }
            $(o.node, {"stroke-dasharray": dashes.join(",")});
        }
    },
    setFillAndStroke = function (o, params) {
        var node = o.node,
            attrs = o.attrs,
            vis = node.style.visibility;
        node.style.visibility = "hidden";
        for (var att in params) {
            if (params[has](att)) {
                if (!R._availableAttrs[has](att)) {
                    continue;
                }
                var value = params[att];
                attrs[att] = value;
                switch (att) {
                    case "blur":
                        o.blur(value);
                        break;
                    case "title":
                        var title = node.getElementsByTagName("title");

                        // Use the existing <title>.
                        if (title.length && (title = title[0])) {
                          title.firstChild.nodeValue = value;
                        } else {
                          title = $("title");
                          var val = R._g.doc.createTextNode(value);
                          title.appendChild(val);
                          node.appendChild(title);
                        }
                        break;
                    case "href":
                    case "target":
                        var pn = node.parentNode;
                        if (pn.tagName.toLowerCase() != "a") {
                            var hl = $("a");
                            pn.insertBefore(hl, node);
                            hl.appendChild(node);
                            pn = hl;
                        }
                        if (att == "target") {
                            pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
                        } else {
                            pn.setAttributeNS(xlink, att, value);
                        }
                        break;
                    case "cursor":
                        node.style.cursor = value;
                        break;
                    case "transform":
                        o.transform(value);
                        break;
                    case "arrow-start":
                        addArrow(o, value);
                        break;
                    case "arrow-end":
                        addArrow(o, value, 1);
                        break;
                    case "clip-rect":
                        var rect = Str(value).split(separator);
                        if (rect.length == 4) {
                            o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                            var el = $("clipPath"),
                                rc = $("rect");
                            el.id = R.createUUID();
                            $(rc, {
                                x: rect[0],
                                y: rect[1],
                                width: rect[2],
                                height: rect[3]
                            });
                            el.appendChild(rc);
                            o.paper.defs.appendChild(el);
                            $(node, {"clip-path": "url(#" + el.id + ")"});
                            o.clip = rc;
                        }
                        if (!value) {
                            var path = node.getAttribute("clip-path");
                            if (path) {
                                var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                                clip && clip.parentNode.removeChild(clip);
                                $(node, {"clip-path": E});
                                delete o.clip;
                            }
                        }
                    break;
                    case "path":
                        if (o.type == "path") {
                            $(node, {d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"});
                            o._.dirty = 1;
                            if (o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                        }
                        break;
                    case "width":
                        node.setAttribute(att, value);
                        o._.dirty = 1;
                        if (attrs.fx) {
                            att = "x";
                            value = attrs.x;
                        } else {
                            break;
                        }
                    case "x":
                        if (attrs.fx) {
                            value = -attrs.x - (attrs.width || 0);
                        }
                    case "rx":
                        if (att == "rx" && o.type == "rect") {
                            break;
                        }
                    case "cx":
                        node.setAttribute(att, value);
                        o.pattern && updatePosition(o);
                        o._.dirty = 1;
                        break;
                    case "height":
                        node.setAttribute(att, value);
                        o._.dirty = 1;
                        if (attrs.fy) {
                            att = "y";
                            value = attrs.y;
                        } else {
                            break;
                        }
                    case "y":
                        if (attrs.fy) {
                            value = -attrs.y - (attrs.height || 0);
                        }
                    case "ry":
                        if (att == "ry" && o.type == "rect") {
                            break;
                        }
                    case "cy":
                        node.setAttribute(att, value);
                        o.pattern && updatePosition(o);
                        o._.dirty = 1;
                        break;
                    case "r":
                        if (o.type == "rect") {
                            $(node, {rx: value, ry: value});
                        } else {
                            node.setAttribute(att, value);
                        }
                        o._.dirty = 1;
                        break;
                    case "src":
                        if (o.type == "image") {
                            node.setAttributeNS(xlink, "href", value);
                        }
                        break;
                    case "stroke-width":
                        if (o._.sx != 1 || o._.sy != 1) {
                            value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
                        }
                        node.setAttribute(att, value);
                        if (attrs["stroke-dasharray"]) {
                            addDashes(o, attrs["stroke-dasharray"], params);
                        }
                        if (o._.arrows) {
                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                        }
                        break;
                    case "stroke-dasharray":
                        addDashes(o, value, params);
                        break;
                    case "fill":
                        var isURL = Str(value).match(R._ISURL);
                        if (isURL) {
                            el = $("pattern");
                            var ig = $("image");
                            el.id = R.createUUID();
                            $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                            $(ig, {x: 0, y: 0, "xlink:href": isURL[1]});
                            el.appendChild(ig);

                            (function (el) {
                                R._preload(isURL[1], function () {
                                    var w = this.offsetWidth,
                                        h = this.offsetHeight;
                                    $(el, {width: w, height: h});
                                    $(ig, {width: w, height: h});
                                    o.paper.safari();
                                });
                            })(el);
                            o.paper.defs.appendChild(el);
                            $(node, {fill: "url(#" + el.id + ")"});
                            o.pattern = el;
                            o.pattern && updatePosition(o);
                            break;
                        }
                        var clr = R.getRGB(value);
                        if (!clr.error) {
                            delete params.gradient;
                            delete attrs.gradient;
                            !R.is(attrs.opacity, "undefined") &&
                                R.is(params.opacity, "undefined") &&
                                $(node, {opacity: attrs.opacity});
                            !R.is(attrs["fill-opacity"], "undefined") &&
                                R.is(params["fill-opacity"], "undefined") &&
                                $(node, {"fill-opacity": attrs["fill-opacity"]});
                        } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                            if ("opacity" in attrs || "fill-opacity" in attrs) {
                                var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                if (gradient) {
                                    var stops = gradient.getElementsByTagName("stop");
                                    $(stops[stops.length - 1], {"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)});
                                }
                            }
                            attrs.gradient = value;
                            attrs.fill = "none";
                            break;
                        }
                        clr[has]("opacity") && $(node, {"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                    case "stroke":
                        clr = R.getRGB(value);
                        node.setAttribute(att, clr.hex);
                        att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                        if (att == "stroke" && o._.arrows) {
                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                        }
                        break;
                    case "gradient":
                        (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                        break;
                    case "opacity":
                        if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                            $(node, {"stroke-opacity": value > 1 ? value / 100 : value});
                        }
                        // fall
                    case "fill-opacity":
                        if (attrs.gradient) {
                            gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                            if (gradient) {
                                stops = gradient.getElementsByTagName("stop");
                                $(stops[stops.length - 1], {"stop-opacity": value});
                            }
                            break;
                        }
                    default:
                        att == "font-size" && (value = toInt(value, 10) + "px");
                        var cssrule = att.replace(/(\-.)/g, function (w) {
                            return w.substring(1).toUpperCase();
                        });
                        node.style[cssrule] = value;
                        o._.dirty = 1;
                        node.setAttribute(att, value);
                        break;
                }
            }
        }

        tuneText(o, params);
        node.style.visibility = vis;
    },
    leading = 1.2,
    tuneText = function (el, params) {
        if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
            return;
        }
        var a = el.attrs,
            node = el.node,
            fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

        if (params[has]("text")) {
            a.text = params.text;
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            var texts = Str(params.text).split("\n"),
                tspans = [],
                tspan;
            for (var i = 0, ii = texts.length; i < ii; i++) {
                tspan = $("tspan");
                i && $(tspan, {dy: fontSize * leading, x: a.x});
                tspan.appendChild(R._g.doc.createTextNode(texts[i]));
                node.appendChild(tspan);
                tspans[i] = tspan;
            }
        } else {
            tspans = node.getElementsByTagName("tspan");
            for (i = 0, ii = tspans.length; i < ii; i++) if (i) {
                $(tspans[i], {dy: fontSize * leading, x: a.x});
            } else {
                $(tspans[0], {dy: 0});
            }
        }
        $(node, {x: a.x, y: a.y});
        el._.dirty = 1;
        var bb = el._getBBox(),
            dif = a.y - (bb.y + bb.height / 2);
        dif && R.is(dif, "finite") && $(tspans[0], {dy: dif});
    },
    getRealNode = function (node) {
        if (node.parentNode && node.parentNode.tagName.toLowerCase() === "a") {
            return node.parentNode;
        } else {
            return node;
        }
    },
    Element = function (node, svg) {
        var X = 0,
            Y = 0;
        /*\
         * Element.node
         [ property (object) ]
         **
         * Gives you a reference to the DOM object, so you can assign event handlers or just mess around.
         **
         * Note: Don’t mess with it.
         > Usage
         | // draw a circle at coordinate 10,10 with radius of 10
         | var c = paper.circle(10, 10, 10);
         | c.node.onclick = function () {
         |     c.attr("fill", "red");
         | };
        \*/
        this[0] = this.node = node;
        /*\
         * Element.raphael
         [ property (object) ]
         **
         * Internal reference to @Raphael object. In case it is not available.
         > Usage
         | Raphael.el.red = function () {
         |     var hsb = this.paper.raphael.rgb2hsb(this.attr("fill"));
         |     hsb.h = 1;
         |     this.attr({fill: this.paper.raphael.hsb2rgb(hsb).hex});
         | }
        \*/
        node.raphael = true;
        /*\
         * Element.id
         [ property (number) ]
         **
         * Unique id of the element. Especially useful when you want to listen to events of the element,
         * because all events are fired in format `<module>.<action>.<id>`. Also useful for @Paper.getById method.
        \*/
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.matrix = R.matrix();
        this.realPath = null;
        /*\
         * Element.paper
         [ property (object) ]
         **
         * Internal reference to “paper” where object drawn. Mainly for use in plugins and element extensions.
         > Usage
         | Raphael.el.cross = function () {
         |     this.attr({fill: "red"});
         |     this.paper.path("M10,10L50,50M50,10L10,50")
         |         .attr({stroke: "red"});
         | }
        \*/
        this.paper = svg;
        this.attrs = this.attrs || {};
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            deg: 0,
            dx: 0,
            dy: 0,
            dirty: 1
        };
        !svg.bottom && (svg.bottom = this);
        /*\
         * Element.prev
         [ property (object) ]
         **
         * Reference to the previous element in the hierarchy.
        \*/
        this.prev = svg.top;
        svg.top && (svg.top.next = this);
        svg.top = this;
        /*\
         * Element.next
         [ property (object) ]
         **
         * Reference to the next element in the hierarchy.
        \*/
        this.next = null;
    },
    elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;

    R._engine.path = function (pathString, SVG) {
        var el = $("path");
        SVG.canvas && SVG.canvas.appendChild(el);
        var p = new Element(el, SVG);
        p.type = "path";
        setFillAndStroke(p, {
            fill: "none",
            stroke: "#000",
            path: pathString
        });
        return p;
    };
    /*\
     * Element.rotate
     [ method ]
     **
     * Deprecated! Use @Element.transform instead.
     * Adds rotation by given angle around given point to the list of
     * transformations of the element.
     > Parameters
     - deg (number) angle in degrees
     - cx (number) #optional x coordinate of the centre of rotation
     - cy (number) #optional y coordinate of the centre of rotation
     * If cx & cy aren’t specified centre of the shape is used as a point of rotation.
     = (object) @Element
    \*/
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    /*\
     * Element.scale
     [ method ]
     **
     * Deprecated! Use @Element.transform instead.
     * Adds scale by given amount relative to given point to the list of
     * transformations of the element.
     > Parameters
     - sx (number) horisontal scale amount
     - sy (number) vertical scale amount
     - cx (number) #optional x coordinate of the centre of scale
     - cy (number) #optional y coordinate of the centre of scale
     * If cx & cy aren’t specified centre of the shape is used instead.
     = (object) @Element
    \*/
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        return this;
    };
    /*\
     * Element.translate
     [ method ]
     **
     * Deprecated! Use @Element.transform instead.
     * Adds translation by given amount to the list of transformations of the element.
     > Parameters
     - dx (number) horisontal shift
     - dy (number) vertical shift
     = (object) @Element
    \*/
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    /*\
     * Element.transform
     [ method ]
     **
     * Adds transformation to the element which is separate to other attributes,
     * i.e. translation doesn’t change `x` or `y` of the rectange. The format
     * of transformation string is similar to the path string syntax:
     | "t100,100r30,100,100s2,2,100,100r45s1.5"
     * Each letter is a command. There are four commands: `t` is for translate, `r` is for rotate, `s` is for
     * scale and `m` is for matrix.
     *
     * There are also alternative “absolute” translation, rotation and scale: `T`, `R` and `S`. They will not take previous transformation into account. For example, `...T100,0` will always move element 100 px horisontally, while `...t100,0` could move it vertically if there is `r90` before. Just compare results of `r90t100,0` and `r90T100,0`.
     *
     * So, the example line above could be read like “translate by 100, 100; rotate 30° around 100, 100; scale twice around 100, 100;
     * rotate 45° around centre; scale 1.5 times relative to centre”. As you can see rotate and scale commands have origin
     * coordinates as optional parameters, the default is the centre point of the element.
     * Matrix accepts six parameters.
     > Usage
     | var el = paper.rect(10, 20, 300, 200);
     | // translate 100, 100, rotate 45°, translate -100, 0
     | el.transform("t100,100r45t-100,0");
     | // if you want you can append or prepend transformations
     | el.transform("...t50,50");
     | el.transform("s2...");
     | // or even wrap
     | el.transform("t50,50...t-50-50");
     | // to reset transformation call method with empty string
     | el.transform("");
     | // to get current value call it without parameters
     | console.log(el.transform());
     > Parameters
     - tstr (string) #optional transformation string
     * If tstr isn’t specified
     = (string) current transformation string
     * else
     = (object) @Element
    \*/
    elproto.transform = function (tstr) {
        var _ = this._;
        if (tstr == null) {
            return _.transform;
        }
        R._extractTransform(this, tstr);

        this.clip && $(this.clip, {transform: this.matrix.invert()});
        this.pattern && updatePosition(this);
        this.node && $(this.node, {transform: this.matrix});

        if (_.sx != 1 || _.sy != 1) {
            var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({"stroke-width": sw});
        }

        return this;
    };
    /*\
     * Element.hide
     [ method ]
     **
     * Makes element invisible. See @Element.show.
     = (object) @Element
    \*/
    elproto.hide = function () {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this;
    };
    /*\
     * Element.show
     [ method ]
     **
     * Makes element visible. See @Element.hide.
     = (object) @Element
    \*/
    elproto.show = function () {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this;
    };
    /*\
     * Element.remove
     [ method ]
     **
     * Removes element from the paper.
    \*/
    elproto.remove = function () {
        var node = getRealNode(this.node);
        if (this.removed || !node.parentNode) {
            return;
        }
        var paper = this.paper;
        paper.__set__ && paper.__set__.exclude(this);
        eve.unbind("raphael.*.*." + this.id);
        if (this.gradient) {
            paper.defs.removeChild(this.gradient);
        }
        R._tear(this, paper);

        node.parentNode.removeChild(node);

        // Remove custom data for element
        this.removeData();

        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto._getBBox = function () {
        if (this.node.style.display == "none") {
            this.show();
            var hide = true;
        }
        var canvasHidden = false,
            containerStyle;
        if (this.paper.canvas.parentElement) {
          containerStyle = this.paper.canvas.parentElement.style;
        } //IE10+ can't find parentElement
        else if (this.paper.canvas.parentNode) {
          containerStyle = this.paper.canvas.parentNode.style;
        }

        if(containerStyle && containerStyle.display == "none") {
          canvasHidden = true;
          containerStyle.display = "";
        }
        var bbox = {};
        try {
            bbox = this.node.getBBox();
        } catch(e) {
            // Firefox 3.0.x, 25.0.1 (probably more versions affected) play badly here - possible fix
            bbox = {
                x: this.node.clientLeft,
                y: this.node.clientTop,
                width: this.node.clientWidth,
                height: this.node.clientHeight
            }
        } finally {
            bbox = bbox || {};
            if(canvasHidden){
              containerStyle.display = "none";
            }
        }
        hide && this.hide();
        return bbox;
    };
    /*\
     * Element.attr
     [ method ]
     **
     * Sets the attributes of the element.
     > Parameters
     - attrName (string) attribute’s name
     - value (string) value
     * or
     - params (object) object of name/value pairs
     * or
     - attrName (string) attribute’s name
     * or
     - attrNames (array) in this case method returns array of current values for given attribute names
     = (object) @Element if attrsName & value or params are passed in.
     = (...) value of the attribute if only attrsName is passed in.
     = (array) array of values of the attribute if attrsNames is passed in.
     = (object) object of attributes if nothing is passed in.
     > Possible parameters
     # <p>Please refer to the <a href="http://www.w3.org/TR/SVG/" title="The W3C Recommendation for the SVG language describes these properties in detail.">SVG specification</a> for an explanation of these parameters.</p>
     o arrow-end (string) arrowhead on the end of the path. The format for string is `<type>[-<width>[-<length>]]`. Possible types: `classic`, `block`, `open`, `oval`, `diamond`, `none`, width: `wide`, `narrow`, `medium`, length: `long`, `short`, `midium`.
     o clip-rect (string) comma or space separated values: x, y, width and height
     o cursor (string) CSS type of the cursor
     o cx (number) the x-axis coordinate of the center of the circle, or ellipse
     o cy (number) the y-axis coordinate of the center of the circle, or ellipse
     o fill (string) colour, gradient or image
     o fill-opacity (number)
     o font (string)
     o font-family (string)
     o font-size (number) font size in pixels
     o font-weight (string)
     o height (number)
     o href (string) URL, if specified element behaves as hyperlink
     o opacity (number)
     o path (string) SVG path string format
     o r (number) radius of the circle, ellipse or rounded corner on the rect
     o rx (number) horisontal radius of the ellipse
     o ry (number) vertical radius of the ellipse
     o src (string) image URL, only works for @Element.image element
     o stroke (string) stroke colour
     o stroke-dasharray (string) [“”, “`-`”, “`.`”, “`-.`”, “`-..`”, “`. `”, “`- `”, “`--`”, “`- .`”, “`--.`”, “`--..`”]
     o stroke-linecap (string) [“`butt`”, “`square`”, “`round`”]
     o stroke-linejoin (string) [“`bevel`”, “`round`”, “`miter`”]
     o stroke-miterlimit (number)
     o stroke-opacity (number)
     o stroke-width (number) stroke width in pixels, default is '1'
     o target (string) used with href
     o text (string) contents of the text element. Use `\n` for multiline text
     o text-anchor (string) [“`start`”, “`middle`”, “`end`”], default is “`middle`”
     o title (string) will create tooltip with a given text
     o transform (string) see @Element.transform
     o width (number)
     o x (number)
     o y (number)
     > Gradients
     * Linear gradient format: “`‹angle›-‹colour›[-‹colour›[:‹offset›]]*-‹colour›`”, example: “`90-#fff-#000`” – 90°
     * gradient from white to black or “`0-#fff-#f00:20-#000`” – 0° gradient from white via red (at 20%) to black.
     *
     * radial gradient: “`r[(‹fx›, ‹fy›)]‹colour›[-‹colour›[:‹offset›]]*-‹colour›`”, example: “`r#fff-#000`” –
     * gradient from white to black or “`r(0.25, 0.75)#fff-#000`” – gradient from white to black with focus point
     * at 0.25, 0.75. Focus point coordinates are in 0..1 range. Radial gradients can only be applied to circles and ellipses.
     > Path String
     # <p>Please refer to <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path’s data attribute’s format are described in the SVG specification.">SVG documentation regarding path string</a>. Raphaël fully supports it.</p>
     > Colour Parsing
     # <ul>
     #     <li>Colour name (“<code>red</code>”, “<code>green</code>”, “<code>cornflowerblue</code>”, etc)</li>
     #     <li>#••• — shortened HTML colour: (“<code>#000</code>”, “<code>#fc0</code>”, etc)</li>
     #     <li>#•••••• — full length HTML colour: (“<code>#000000</code>”, “<code>#bd2300</code>”)</li>
     #     <li>rgb(•••, •••, •••) — red, green and blue channels’ values: (“<code>rgb(200,&nbsp;100,&nbsp;0)</code>”)</li>
     #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (“<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>”)</li>
     #     <li>rgba(•••, •••, •••, •••) — red, green and blue channels’ values: (“<code>rgba(200,&nbsp;100,&nbsp;0, .5)</code>”)</li>
     #     <li>rgba(•••%, •••%, •••%, •••%) — same as above, but in %: (“<code>rgba(100%,&nbsp;175%,&nbsp;0%, 50%)</code>”)</li>
     #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (“<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>”)</li>
     #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
     #     <li>hsba(•••, •••, •••, •••) — same as above, but with opacity</li>
     #     <li>hsl(•••, •••, •••) — almost the same as hsb, see <a href="http://en.wikipedia.org/wiki/HSL_and_HSV" title="HSL and HSV - Wikipedia, the free encyclopedia">Wikipedia page</a></li>
     #     <li>hsl(•••%, •••%, •••%) — same as above, but in %</li>
     #     <li>hsla(•••, •••, •••, •••) — same as above, but with opacity</li>
     #     <li>Optionally for hsb and hsl you could specify hue as a degree: “<code>hsl(240deg,&nbsp;1,&nbsp;.5)</code>” or, if you want to go fancy, “<code>hsl(240°,&nbsp;1,&nbsp;.5)</code>”</li>
     # </ul>
    \*/
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            if (name == "transform") {
                return this._.transform;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        if (value != null) {
            var params = {};
            params[name] = value;
        } else if (name != null && R.is(name, "object")) {
            params = name;
        }
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
            this.attrs[key] = params[key];
            for (var subkey in par) if (par[has](subkey)) {
                params[subkey] = par[subkey];
            }
        }
        setFillAndStroke(this, params);
        return this;
    };
    /*\
     * Element.toFront
     [ method ]
     **
     * Moves the element so it is the closest to the viewer’s eyes, on top of other elements.
     = (object) @Element
    \*/
    elproto.toFront = function () {
        if (this.removed) {
            return this;
        }
        var node = getRealNode(this.node);
        node.parentNode.appendChild(node);
        var svg = this.paper;
        svg.top != this && R._tofront(this, svg);
        return this;
    };
    /*\
     * Element.toBack
     [ method ]
     **
     * Moves the element so it is the furthest from the viewer’s eyes, behind other elements.
     = (object) @Element
    \*/
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        var node = getRealNode(this.node);
        var parentNode = node.parentNode;
        parentNode.insertBefore(node, parentNode.firstChild);
        R._toback(this, this.paper);
        var svg = this.paper;
        return this;
    };
    /*\
     * Element.insertAfter
     [ method ]
     **
     * Inserts current object after the given one.
     = (object) @Element
    \*/
    elproto.insertAfter = function (element) {
        if (this.removed || !element) {
            return this;
        }

        var node = getRealNode(this.node);
        var afterNode = getRealNode(element.node || element[element.length - 1].node);
        if (afterNode.nextSibling) {
            afterNode.parentNode.insertBefore(node, afterNode.nextSibling);
        } else {
            afterNode.parentNode.appendChild(node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    /*\
     * Element.insertBefore
     [ method ]
     **
     * Inserts current object before the given one.
     = (object) @Element
    \*/
    elproto.insertBefore = function (element) {
        if (this.removed || !element) {
            return this;
        }

        var node = getRealNode(this.node);
        var beforeNode = getRealNode(element.node || element[0].node);
        beforeNode.parentNode.insertBefore(node, beforeNode);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        // Experimental. No Safari support. Use it on your own risk.
        var t = this;
        if (+size !== 0) {
            var fltr = $("filter"),
                blur = $("feGaussianBlur");
            t.attrs.blur = size;
            fltr.id = R.createUUID();
            $(blur, {stdDeviation: +size || 1.5});
            fltr.appendChild(blur);
            t.paper.defs.appendChild(fltr);
            t._blur = fltr;
            $(t.node, {filter: "url(#" + fltr.id + ")"});
        } else {
            if (t._blur) {
                t._blur.parentNode.removeChild(t._blur);
                delete t._blur;
                delete t.attrs.blur;
            }
            t.node.removeAttribute("filter");
        }
        return t;
    };
    R._engine.circle = function (svg, x, y, r) {
        var el = $("circle");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, r: r, fill: "none", stroke: "#000"};
        res.type = "circle";
        $(el, res.attrs);
        return res;
    };
    R._engine.rect = function (svg, x, y, w, h, r) {
        var el = $("rect");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000"};
        res.type = "rect";
        $(el, res.attrs);
        return res;
    };
    R._engine.ellipse = function (svg, x, y, rx, ry) {
        var el = $("ellipse");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000"};
        res.type = "ellipse";
        $(el, res.attrs);
        return res;
    };
    R._engine.image = function (svg, src, x, y, w, h) {
        var el = $("image");
        $(el, {x: x, y: y, width: w, height: h, preserveAspectRatio: "none"});
        el.setAttributeNS(xlink, "href", src);
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, src: src};
        res.type = "image";
        return res;
    };
    R._engine.text = function (svg, x, y, text) {
        var el = $("text");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {
            x: x,
            y: y,
            "text-anchor": "middle",
            text: text,
            "font-family": R._availableAttrs["font-family"],
            "font-size": R._availableAttrs["font-size"],
            stroke: "none",
            fill: "#000"
        };
        res.type = "text";
        setFillAndStroke(res, res.attrs);
        return res;
    };
    R._engine.setSize = function (width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        if (this._viewBox) {
            this.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con && con.container,
            x = con.x,
            y = con.y,
            width = con.width,
            height = con.height;
        if (!container) {
            throw new Error("SVG container not found.");
        }
        var cnvs = $("svg"),
            css = "overflow:hidden;",
            isFloating;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        $(cnvs, {
            height: height,
            version: 1.1,
            width: width,
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
        });
        if (container == 1) {
            cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
            R._g.doc.body.appendChild(cnvs);
            isFloating = 1;
        } else {
            cnvs.style.cssText = css + "position:relative";
            if (container.firstChild) {
                container.insertBefore(cnvs, container.firstChild);
            } else {
                container.appendChild(cnvs);
            }
        }
        container = new R._Paper;
        container.width = width;
        container.height = height;
        container.canvas = cnvs;
        container.clear();
        container._left = container._top = 0;
        isFloating && (container.renderfix = function () {});
        container.renderfix();
        return container;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var paperSize = this.getSize(),
            size = mmax(w / paperSize.width, h / paperSize.height),
            top = this.top,
            aspectRatio = fit ? "xMidYMid meet" : "xMinYMin",
            vb,
            sw;
        if (x == null) {
            if (this._vbSize) {
                size = 1;
            }
            delete this._vbSize;
            vb = "0 0 " + this.width + S + this.height;
        } else {
            this._vbSize = size;
            vb = x + S + y + S + w + S + h;
        }
        $(this.canvas, {
            viewBox: vb,
            preserveAspectRatio: aspectRatio
        });
        while (size && top) {
            sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
            top.attr({"stroke-width": sw});
            top._.dirty = 1;
            top._.dirtyT = 1;
            top = top.prev;
        }
        this._viewBox = [x, y, w, h, !!fit];
        return this;
    };
    /*\
     * Paper.renderfix
     [ method ]
     **
     * Fixes the issue of Firefox and IE9 regarding subpixel rendering. If paper is dependant
     * on other elements after reflow it could shift half pixel which cause for lines to lost their crispness.
     * This method fixes the issue.
     **
       Special thanks to Mariusz Nowak (http://www.medikoo.com/) for this method.
    \*/
    R.prototype.renderfix = function () {
        var cnvs = this.canvas,
            s = cnvs.style,
            pos;
        try {
            pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
        } catch (e) {
            pos = cnvs.createSVGMatrix();
        }
        var left = -pos.e % 1,
            top = -pos.f % 1;
        if (left || top) {
            if (left) {
                this._left = (this._left + left) % 1;
                s.left = this._left + "px";
            }
            if (top) {
                this._top = (this._top + top) % 1;
                s.top = this._top + "px";
            }
        }
    };
    /*\
     * Paper.clear
     [ method ]
     **
     * Clears the paper, i.e. removes all the elements.
    \*/
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        var c = this.canvas;
        while (c.firstChild) {
            c.removeChild(c.firstChild);
        }
        this.bottom = this.top = null;
        (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
        c.appendChild(this.desc);
        c.appendChild(this.defs = $("defs"));
    };
    /*\
     * Paper.remove
     [ method ]
     **
     * Removes the paper from the DOM.
    \*/
    R.prototype.remove = function () {
        eve("raphael.remove", this);
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
    };
    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
})();

// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ VML Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\

(function(){
    if (!R.vml) {
        return;
    }
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        math = Math,
        round = math.round,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        fillString = "fill",
        separator = /[, ]+/,
        eve = R.eve,
        ms = " progid:DXImageTransform.Microsoft",
        S = " ",
        E = "",
        map = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
        bites = /([clmz]),?([^clmz]*)/gi,
        blurregexp = / progid:\S+Blur\([^\)]+\)/g,
        val = /-?[^,\s-]+/g,
        cssDot = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",
        zoom = 21600,
        pathTypes = {path: 1, rect: 1, image: 1},
        ovalTypes = {circle: 1, ellipse: 1},
        path2vml = function (path) {
            var total =  /[ahqstv]/ig,
                command = R._pathToAbsolute;
            Str(path).match(total) && (command = R._path2curve);
            total = /[clmz]/g;
            if (command == R._pathToAbsolute && !Str(path).match(total)) {
                var res = Str(path).replace(bites, function (all, command, args) {
                    var vals = [],
                        isMove = command.toLowerCase() == "m",
                        res = map[command];
                    args.replace(val, function (value) {
                        if (isMove && vals.length == 2) {
                            res += vals + map[command == "m" ? "l" : "L"];
                            vals = [];
                        }
                        vals.push(round(value * zoom));
                    });
                    return res + vals;
                });
                return res;
            }
            var pa = command(path), p, r;
            res = [];
            for (var i = 0, ii = pa.length; i < ii; i++) {
                p = pa[i];
                r = pa[i][0].toLowerCase();
                r == "z" && (r = "x");
                for (var j = 1, jj = p.length; j < jj; j++) {
                    r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
                }
                res.push(r);
            }
            return res.join(S);
        },
        compensation = function (deg, dx, dy) {
            var m = R.matrix();
            m.rotate(-deg, .5, .5);
            return {
                dx: m.x(dx, dy),
                dy: m.y(dx, dy)
            };
        },
        setCoords = function (p, sx, sy, dx, dy, deg) {
            var _ = p._,
                m = p.matrix,
                fillpos = _.fillpos,
                o = p.node,
                s = o.style,
                y = 1,
                flip = "",
                dxdy,
                kx = zoom / sx,
                ky = zoom / sy;
            s.visibility = "hidden";
            if (!sx || !sy) {
                return;
            }
            o.coordsize = abs(kx) + S + abs(ky);
            s.rotation = deg * (sx * sy < 0 ? -1 : 1);
            if (deg) {
                var c = compensation(deg, dx, dy);
                dx = c.dx;
                dy = c.dy;
            }
            sx < 0 && (flip += "x");
            sy < 0 && (flip += " y") && (y = -1);
            s.flip = flip;
            o.coordorigin = (dx * -kx) + S + (dy * -ky);
            if (fillpos || _.fillsize) {
                var fill = o.getElementsByTagName(fillString);
                fill = fill && fill[0];
                o.removeChild(fill);
                if (fillpos) {
                    c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                    fill.position = c.dx * y + S + c.dy * y;
                }
                if (_.fillsize) {
                    fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
                }
                o.appendChild(fill);
            }
            s.visibility = "visible";
        };
    R.toString = function () {
        return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
    };
    var addArrow = function (o, value, isEnd) {
        var values = Str(value).toLowerCase().split("-"),
            se = isEnd ? "end" : "start",
            i = values.length,
            type = "classic",
            w = "medium",
            h = "medium";
        while (i--) {
            switch (values[i]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    type = values[i];
                    break;
                case "wide":
                case "narrow": h = values[i]; break;
                case "long":
                case "short": w = values[i]; break;
            }
        }
        var stroke = o.node.getElementsByTagName("stroke")[0];
        stroke[se + "arrow"] = type;
        stroke[se + "arrowlength"] = w;
        stroke[se + "arrowwidth"] = h;
    },
    setFillAndStroke = function (o, params) {
        // o.paper.canvas.style.display = "none";
        o.attrs = o.attrs || {};
        var node = o.node,
            a = o.attrs,
            s = node.style,
            xy,
            newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
            isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
            res = o;


        for (var par in params) if (params[has](par)) {
            a[par] = params[par];
        }
        if (newpath) {
            a.path = R._getPath[o.type](o);
            o._.dirty = 1;
        }
        params.href && (node.href = params.href);
        params.title && (node.title = params.title);
        params.target && (node.target = params.target);
        params.cursor && (s.cursor = params.cursor);
        "blur" in params && o.blur(params.blur);
        if (params.path && o.type == "path" || newpath) {
            node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
            o._.dirty = 1;
            if (o.type == "image") {
                o._.fillpos = [a.x, a.y];
                o._.fillsize = [a.width, a.height];
                setCoords(o, 1, 1, 0, 0, 0);
            }
        }
        "transform" in params && o.transform(params.transform);
        if (isOval) {
            var cx = +a.cx,
                cy = +a.cy,
                rx = +a.rx || +a.r || 0,
                ry = +a.ry || +a.r || 0;
            node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
            o._.dirty = 1;
        }
        if ("clip-rect" in params) {
            var rect = Str(params["clip-rect"]).split(separator);
            if (rect.length == 4) {
                rect[2] = +rect[2] + (+rect[0]);
                rect[3] = +rect[3] + (+rect[1]);
                var div = node.clipRect || R._g.doc.createElement("div"),
                    dstyle = div.style;
                dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                if (!node.clipRect) {
                    dstyle.position = "absolute";
                    dstyle.top = 0;
                    dstyle.left = 0;
                    dstyle.width = o.paper.width + "px";
                    dstyle.height = o.paper.height + "px";
                    node.parentNode.insertBefore(div, node);
                    div.appendChild(node);
                    node.clipRect = div;
                }
            }
            if (!params["clip-rect"]) {
                node.clipRect && (node.clipRect.style.clip = "auto");
            }
        }
        if (o.textpath) {
            var textpathStyle = o.textpath.style;
            params.font && (textpathStyle.font = params.font);
            params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
            params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
            params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
            params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
        }
        if ("arrow-start" in params) {
            addArrow(res, params["arrow-start"]);
        }
        if ("arrow-end" in params) {
            addArrow(res, params["arrow-end"], 1);
        }
        if (params.opacity != null || 
            params["stroke-width"] != null ||
            params.fill != null ||
            params.src != null ||
            params.stroke != null ||
            params["stroke-width"] != null ||
            params["stroke-opacity"] != null ||
            params["fill-opacity"] != null ||
            params["stroke-dasharray"] != null ||
            params["stroke-miterlimit"] != null ||
            params["stroke-linejoin"] != null ||
            params["stroke-linecap"] != null) {
            var fill = node.getElementsByTagName(fillString),
                newfill = false;
            fill = fill && fill[0];
            !fill && (newfill = fill = createNode(fillString));
            if (o.type == "image" && params.src) {
                fill.src = params.src;
            }
            params.fill && (fill.on = true);
            if (fill.on == null || params.fill == "none" || params.fill === null) {
                fill.on = false;
            }
            if (fill.on && params.fill) {
                var isURL = Str(params.fill).match(R._ISURL);
                if (isURL) {
                    fill.parentNode == node && node.removeChild(fill);
                    fill.rotate = true;
                    fill.src = isURL[1];
                    fill.type = "tile";
                    var bbox = o.getBBox(1);
                    fill.position = bbox.x + S + bbox.y;
                    o._.fillpos = [bbox.x, bbox.y];

                    R._preload(isURL[1], function () {
                        o._.fillsize = [this.offsetWidth, this.offsetHeight];
                    });
                } else {
                    fill.color = R.getRGB(params.fill).hex;
                    fill.src = E;
                    fill.type = "solid";
                    if (R.getRGB(params.fill).error && (res.type in {circle: 1, ellipse: 1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                        a.fill = "none";
                        a.gradient = params.fill;
                        fill.rotate = false;
                    }
                }
            }
            if ("fill-opacity" in params || "opacity" in params) {
                var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                opacity = mmin(mmax(opacity, 0), 1);
                fill.opacity = opacity;
                if (fill.src) {
                    fill.color = "none";
                }
            }
            node.appendChild(fill);
            var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
            newstroke = false;
            !stroke && (newstroke = stroke = createNode("stroke"));
            if ((params.stroke && params.stroke != "none") ||
                params["stroke-width"] ||
                params["stroke-opacity"] != null ||
                params["stroke-dasharray"] ||
                params["stroke-miterlimit"] ||
                params["stroke-linejoin"] ||
                params["stroke-linecap"]) {
                stroke.on = true;
            }
            (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
            var strokeColor = R.getRGB(params.stroke);
            stroke.on && params.stroke && (stroke.color = strokeColor.hex);
            opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
            var width = (toFloat(params["stroke-width"]) || 1) * .75;
            opacity = mmin(mmax(opacity, 0), 1);
            params["stroke-width"] == null && (width = a["stroke-width"]);
            params["stroke-width"] && (stroke.weight = width);
            width && width < 1 && (opacity *= width) && (stroke.weight = 1);
            stroke.opacity = opacity;
        
            params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
            stroke.miterlimit = params["stroke-miterlimit"] || 8;
            params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
            if ("stroke-dasharray" in params) {
                var dasharray = {
                    "-": "shortdash",
                    ".": "shortdot",
                    "-.": "shortdashdot",
                    "-..": "shortdashdotdot",
                    ". ": "dot",
                    "- ": "dash",
                    "--": "longdash",
                    "- .": "dashdot",
                    "--.": "longdashdot",
                    "--..": "longdashdotdot"
                };
                stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
            }
            newstroke && node.appendChild(stroke);
        }
        if (res.type == "text") {
            res.paper.canvas.style.display = E;
            var span = res.paper.span,
                m = 100,
                fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
            s = span.style;
            a.font && (s.font = a.font);
            a["font-family"] && (s.fontFamily = a["font-family"]);
            a["font-weight"] && (s.fontWeight = a["font-weight"]);
            a["font-style"] && (s.fontStyle = a["font-style"]);
            fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
            s.fontSize = fontSize * m + "px";
            res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
            var brect = span.getBoundingClientRect();
            res.W = a.w = (brect.right - brect.left) / m;
            res.H = a.h = (brect.bottom - brect.top) / m;
            // res.paper.canvas.style.display = "none";
            res.X = a.x;
            res.Y = a.y + res.H / 2;

            ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
            var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
            for (var d = 0, dd = dirtyattrs.length; d < dd; d++) if (dirtyattrs[d] in params) {
                res._.dirty = 1;
                break;
            }
        
            // text-anchor emulation
            switch (a["text-anchor"]) {
                case "start":
                    res.textpath.style["v-text-align"] = "left";
                    res.bbx = res.W / 2;
                break;
                case "end":
                    res.textpath.style["v-text-align"] = "right";
                    res.bbx = -res.W / 2;
                break;
                default:
                    res.textpath.style["v-text-align"] = "center";
                    res.bbx = 0;
                break;
            }
            res.textpath.style["v-text-kern"] = true;
        }
        // res.paper.canvas.style.display = E;
    },
    addGradientFill = function (o, gradient, fill) {
        o.attrs = o.attrs || {};
        var attrs = o.attrs,
            pow = Math.pow,
            opacity,
            oindex,
            type = "linear",
            fxfy = ".5 .5";
        o.attrs.gradient = gradient;
        gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
            type = "radial";
            if (fx && fy) {
                fx = toFloat(fx);
                fy = toFloat(fy);
                pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                fxfy = fx + S + fy;
            }
            return E;
        });
        gradient = gradient.split(/\s*\-\s*/);
        if (type == "linear") {
            var angle = gradient.shift();
            angle = -toFloat(angle);
            if (isNaN(angle)) {
                return null;
            }
        }
        var dots = R._parseDots(gradient);
        if (!dots) {
            return null;
        }
        o = o.shape || o.node;
        if (dots.length) {
            o.removeChild(fill);
            fill.on = true;
            fill.method = "none";
            fill.color = dots[0].color;
            fill.color2 = dots[dots.length - 1].color;
            var clrs = [];
            for (var i = 0, ii = dots.length; i < ii; i++) {
                dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
            }
            fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
            if (type == "radial") {
                fill.type = "gradientTitle";
                fill.focus = "100%";
                fill.focussize = "0 0";
                fill.focusposition = fxfy;
                fill.angle = 0;
            } else {
                // fill.rotate= true;
                fill.type = "gradient";
                fill.angle = (270 - angle) % 360;
            }
            o.appendChild(fill);
        }
        return 1;
    },
    Element = function (node, vml) {
        this[0] = this.node = node;
        node.raphael = true;
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.X = 0;
        this.Y = 0;
        this.attrs = {};
        this.paper = vml;
        this.matrix = R.matrix();
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            dx: 0,
            dy: 0,
            deg: 0,
            dirty: 1,
            dirtyT: 1
        };
        !vml.bottom && (vml.bottom = this);
        this.prev = vml.top;
        vml.top && (vml.top.next = this);
        vml.top = this;
        this.next = null;
    };
    var elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;
    elproto.transform = function (tstr) {
        if (tstr == null) {
            return this._.transform;
        }
        var vbs = this.paper._viewBoxShift,
            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
            oldt;
        if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
        }
        R._extractTransform(this, vbt + tstr);
        var matrix = this.matrix.clone(),
            skew = this.skew,
            o = this.node,
            split,
            isGrad = ~Str(this.attrs.fill).indexOf("-"),
            isPatt = !Str(this.attrs.fill).indexOf("url(");
        matrix.translate(1, 1);
        if (isPatt || isGrad || this.type == "image") {
            skew.matrix = "1 0 0 1";
            skew.offset = "0 0";
            split = matrix.split();
            if ((isGrad && split.noRotation) || !split.isSimple) {
                o.style.filter = matrix.toFilter();
                var bb = this.getBBox(),
                    bbt = this.getBBox(1),
                    dx = bb.x - bbt.x,
                    dy = bb.y - bbt.y;
                o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
                setCoords(this, 1, 1, dx, dy, 0);
            } else {
                o.style.filter = E;
                setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
            }
        } else {
            o.style.filter = E;
            skew.matrix = Str(matrix);
            skew.offset = matrix.offset();
        }
        if (oldt !== null) { // empty string value is true as well
            this._.transform = oldt;
            R._extractTransform(this, oldt);
        }
        return this;
    };
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        if (deg == null) {
            return;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this._.dirtyT = 1;
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        if (this._.bbox) {
            this._.bbox.x += dx;
            this._.bbox.y += dy;
        }
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
            isNaN(cx) && (cx = null);
            isNaN(cy) && (cy = null);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
    
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        this._.dirtyT = 1;
        return this;
    };
    elproto.hide = function () {
        !this.removed && (this.node.style.display = "none");
        return this;
    };
    elproto.show = function () {
        !this.removed && (this.node.style.display = E);
        return this;
    };
    // Needed to fix the vml setViewBox issues
    elproto.auxGetBBox = R.el.getBBox;
    elproto.getBBox = function(){
      var b = this.auxGetBBox();
      if (this.paper && this.paper._viewBoxShift)
      {
        var c = {};
        var z = 1/this.paper._viewBoxShift.scale;
        c.x = b.x - this.paper._viewBoxShift.dx;
        c.x *= z;
        c.y = b.y - this.paper._viewBoxShift.dy;
        c.y *= z;
        c.width  = b.width  * z;
        c.height = b.height * z;
        c.x2 = c.x + c.width;
        c.y2 = c.y + c.height;
        return c;
      }
      return b;
    };
    elproto._getBBox = function () {
        if (this.removed) {
            return {};
        }
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
        };
    };
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        this.paper.__set__ && this.paper.__set__.exclude(this);
        R.eve.unbind("raphael.*.*." + this.id);
        R._tear(this, this.paper);
        this.node.parentNode.removeChild(this.node);
        this.shape && this.shape.parentNode.removeChild(this.shape);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (this.attrs && value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        var params;
        if (value != null) {
            params = {};
            params[name] = value;
        }
        value == null && R.is(name, "object") && (params = name);
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        if (params) {
            for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
                this.attrs[key] = params[key];
                for (var subkey in par) if (par[has](subkey)) {
                    params[subkey] = par[subkey];
                }
            }
            // this.paper.canvas.style.display = "none";
            if (params.text && this.type == "text") {
                this.textpath.string = params.text;
            }
            setFillAndStroke(this, params);
            // this.paper.canvas.style.display = E;
        }
        return this;
    };
    elproto.toFront = function () {
        !this.removed && this.node.parentNode.appendChild(this.node);
        this.paper && this.paper.top != this && R._tofront(this, this.paper);
        return this;
    };
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            R._toback(this, this.paper);
        }
        return this;
    };
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[element.length - 1];
        }
        if (element.node.nextSibling) {
            element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
        } else {
            element.node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[0];
        }
        element.node.parentNode.insertBefore(this.node, element.node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        var s = this.node.runtimeStyle,
            f = s.filter;
        f = f.replace(blurregexp, E);
        if (+size !== 0) {
            this.attrs.blur = size;
            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
        } else {
            s.filter = f;
            s.margin = 0;
            delete this.attrs.blur;
        }
        return this;
    };

    R._engine.path = function (pathString, vml) {
        var el = createNode("shape");
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = vml.coordorigin;
        var p = new Element(el, vml),
            attr = {fill: "none", stroke: "#000"};
        pathString && (attr.path = pathString);
        p.type = "path";
        p.path = [];
        p.Path = E;
        setFillAndStroke(p, attr);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.rect = function (vml, x, y, w, h, r) {
        var path = R._rectPath(x, y, w, h, r),
            res = vml.path(path),
            a = res.attrs;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.r = r;
        a.path = path;
        res.type = "rect";
        return res;
    };
    R._engine.ellipse = function (vml, x, y, rx, ry) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - rx;
        res.Y = y - ry;
        res.W = rx * 2;
        res.H = ry * 2;
        res.type = "ellipse";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            rx: rx,
            ry: ry
        });
        return res;
    };
    R._engine.circle = function (vml, x, y, r) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - r;
        res.Y = y - r;
        res.W = res.H = r * 2;
        res.type = "circle";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            r: r
        });
        return res;
    };
    R._engine.image = function (vml, src, x, y, w, h) {
        var path = R._rectPath(x, y, w, h),
            res = vml.path(path).attr({stroke: "none"}),
            a = res.attrs,
            node = res.node,
            fill = node.getElementsByTagName(fillString)[0];
        a.src = src;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.path = path;
        res.type = "image";
        fill.parentNode == node && node.removeChild(fill);
        fill.rotate = true;
        fill.src = src;
        fill.type = "tile";
        res._.fillpos = [x, y];
        res._.fillsize = [w, h];
        node.appendChild(fill);
        setCoords(res, 1, 1, 0, 0, 0);
        return res;
    };
    R._engine.text = function (vml, x, y, text) {
        var el = createNode("shape"),
            path = createNode("path"),
            o = createNode("textpath");
        x = x || 0;
        y = y || 0;
        text = text || "";
        path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
        path.textpathok = true;
        o.string = Str(text);
        o.on = true;
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = "0 0";
        var p = new Element(el, vml),
            attr = {
                fill: "#000",
                stroke: "none",
                font: R._availableAttrs.font,
                text: text
            };
        p.shape = el;
        p.path = path;
        p.textpath = o;
        p.type = "text";
        p.attrs.text = Str(text);
        p.attrs.x = x;
        p.attrs.y = y;
        p.attrs.w = 1;
        p.attrs.h = 1;
        setFillAndStroke(p, attr);
        el.appendChild(o);
        el.appendChild(path);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.setSize = function (width, height) {
        var cs = this.canvas.style;
        this.width = width;
        this.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        cs.width = width;
        cs.height = height;
        cs.clip = "rect(0 " + width + " " + height + " 0)";
        if (this._viewBox) {
            R._engine.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var paperSize = this.getSize(),
            width = paperSize.width,
            height = paperSize.height,
            H, W;
        if (fit) {
            H = height / h;
            W = width / w;
            if (w * H < width) {
                x -= (width - w * H) / 2 / H;
            }
            if (h * W < height) {
                y -= (height - h * W) / 2 / W;
            }
        }
        this._viewBox = [x, y, w, h, !!fit];
        this._viewBoxShift = {
            dx: -x,
            dy: -y,
            scale: paperSize
        };
        this.forEach(function (el) {
            el.transform("...");
        });
        return this;
    };
    var createNode;
    R._engine.initWin = function (win) {
            var doc = win.document;
            if (doc.styleSheets.length < 31) {
                doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            } else {
                // no more room, add to the existing one
                // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx
                doc.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
            }
            try {
                !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                createNode = function (tagName) {
                    return doc.createElement('<rvml:' + tagName + ' class="rvml">');
                };
            } catch (e) {
                createNode = function (tagName) {
                    return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
            }
        };
    R._engine.initWin(R._g.win);
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con.container,
            height = con.height,
            s,
            width = con.width,
            x = con.x,
            y = con.y;
        if (!container) {
            throw new Error("VML container not found.");
        }
        var res = new R._Paper,
            c = res.canvas = R._g.doc.createElement("div"),
            cs = c.style;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        res.width = width;
        res.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        res.coordsize = zoom * 1e3 + S + zoom * 1e3;
        res.coordorigin = "0 0";
        res.span = R._g.doc.createElement("span");
        res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        c.appendChild(res.span);
        cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
        if (container == 1) {
            R._g.doc.body.appendChild(c);
            cs.left = x + "px";
            cs.top = y + "px";
            cs.position = "absolute";
        } else {
            if (container.firstChild) {
                container.insertBefore(c, container.firstChild);
            } else {
                container.appendChild(c);
            }
        }
        res.renderfix = function () {};
        return res;
    };
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        this.canvas.innerHTML = E;
        this.span = R._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null;
    };
    R.prototype.remove = function () {
        R.eve("raphael.remove", this);
        this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        return true;
    };

    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
})();

    // EXPOSE
    // SVG and VML are appended just before the EXPOSE line
    // Even with AMD, Raphael should be defined globally
    oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);

    if(typeof exports == "object"){
        module.exports = R;
    }
    return R;
}));
;/**
*
* Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
* Requires jQuery and raphael.js
*
* Version: 1.0.0
*
* Copyright (c) 2015 Vincent Brouté (http://www.vincentbroute.fr/mapael)
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
*
*/
(function($) {

	"use strict";
	
	$.fn.mapael = function(options) {
	
		// Extend legend default options with user options
		options = $.extend(true, {}, $.fn.mapael.defaultOptions, options);
		
		for (var type in options.legend) {
			if ($.isArray(options.legend[type])) {
				for (var i = 0; i < options.legend[type].length; ++i)
					options.legend[type][i] = $.extend(true, {}, $.fn.mapael.legendDefaultOptions[type], options.legend[type][i]);
			} else {
				options.legend[type] = $.extend(true, {}, $.fn.mapael.legendDefaultOptions[type], options.legend[type]);
			}
		}
		
		return this.each(function() {
		
			var $self = $(this)
				, $tooltip = $("<div>").addClass(options.map.tooltip.cssClass).css("display", "none")
				, $container = $("." + options.map.cssClass, this).empty().append($tooltip)
				, mapConf = $.fn.mapael.maps[options.map.name]
				, paper = new Raphael($container[0], mapConf.width, mapConf.height)
				, elemOptions = {}
				, resizeTO = 0
				, areas = {}
				, plots = {}
				, legends = []
				, id = 0;
			
			options.map.tooltip.css && $tooltip.css(options.map.tooltip.css);
			paper.setViewBox(0, 0, mapConf.width, mapConf.height, false);
			
			// Draw map areas
			for (id in mapConf.elems) {
				elemOptions = $.fn.mapael.getElemOptions(
					options.map.defaultArea
					, (options.areas[id] ? options.areas[id] : {})
					, options.legend.area
				);
				areas[id] = {"mapElem" : paper.path(mapConf.elems[id]).attr(elemOptions.attrs)};
			}
			
			// Init map areas in a second loop (prevent texts to be hidden by map elements)
			for (id in mapConf.elems) {
				elemOptions = $.fn.mapael.getElemOptions(
					options.map.defaultArea
					, (options.areas[id] ? options.areas[id] : {})
					, options.legend.area
				);
				$.fn.mapael.initElem(paper, areas[id], elemOptions, $tooltip, id);
			}
			
			// Draw links
			$.fn.mapael.drawLinksCollection(paper, options, mapConf.getCoords, $tooltip);
			
			// Draw plots
			for (id in options.plots) {
				plots[id] = $.fn.mapael.drawPlot(id, options, mapConf, paper, $tooltip);
			}
			
			/**
			* Zoom on the map at a specific level focused on specific coordinates
			* If no coordinates are specified, the zoom will be focused on the center of the map
			* options :
			*	"level" : level of the zoom between 0 and maxLevel
			*	"x" or "latitude" : x coordinate or latitude of the point to focus on
			*	"y" or "longitude" : y coordinate or longitude of the point to focus on
			*	"fixedCenter" : set to true in order to preserve the position of x,y in the canvas when zoomed
			*/
			$self.on("zoom", function(e, zoomOptions) {
				var newLevel = Math.min(Math.max(zoomOptions.level, 0), options.map.zoom.maxLevel)
					, panX = 0
					, panY = 0
					, previousZoomLevel = (1 + $self.data("zoomLevel") * options.map.zoom.step)
					, zoomLevel = (1 + newLevel * options.map.zoom.step)
					, offsetX = 0
					, offsetY = 0
					, coords = {};
				
				if (typeof zoomOptions.latitude != "undefined" && typeof zoomOptions.longitude != "undefined") {
					coords = mapConf.getCoords(zoomOptions.latitude, zoomOptions.longitude);
					zoomOptions.x = coords.x;
					zoomOptions.y = coords.y;
				}
				
				if (typeof zoomOptions.x == "undefined")
					zoomOptions.x = paper._viewBox[0] + paper._viewBox[2] / 2;

				if (typeof zoomOptions.y == "undefined")
					zoomOptions.y = (paper._viewBox[1] + paper._viewBox[3] / 2);
				
				// Update zoom level of the map
				if (newLevel == 0) {
					paper.setViewBox(panX, panY, mapConf.width, mapConf.height);
				} else {
					if (typeof zoomOptions.fixedCenter != 'undefined' && zoomOptions.fixedCenter == true) {
						if (zoomLevel == previousZoomLevel) return;
						
						offsetX = $self.data("panX") + ((zoomOptions.x - $self.data("panX")) * (zoomLevel - previousZoomLevel)) / zoomLevel;
						offsetY = $self.data("panY") + ((zoomOptions.y - $self.data("panY")) * (zoomLevel - previousZoomLevel)) / zoomLevel;
					
						panX = Math.min(Math.max(0, offsetX), (mapConf.width - (mapConf.width / zoomLevel)));
						panY = Math.min(Math.max(0, offsetY), (mapConf.height - (mapConf.height / zoomLevel)));
					} else {
						panX = Math.min(Math.max(0, zoomOptions.x - (mapConf.width / zoomLevel)/2), (mapConf.width - (mapConf.width / zoomLevel)));
						panY = Math.min(Math.max(0, zoomOptions.y - (mapConf.height / zoomLevel)/2), (mapConf.height - (mapConf.height / zoomLevel)));
					}
					
					paper.setViewBox(panX, panY, mapConf.width / zoomLevel, mapConf.height / zoomLevel);
				}
				$self.data({"zoomLevel" : newLevel, "panX" : panX, "panY" : panY, "zoomX" : zoomOptions.x, "zoomY" : zoomOptions.y});
			});
			
			/**
			* Update the zoom level of the map on mousewheel
			*/
			options.map.zoom.enabled && options.map.zoom.mousewheel && $self.on("mousewheel", function(e) {
				var offset = $container.offset(),
					initFactor = (options.map.width) ? ($.fn.mapael.maps[options.map.name].width / options.map.width) : ($.fn.mapael.maps[options.map.name].width / $container.width())
					, zoomLevel = (e.deltaY > 0) ? 1 : -1
					, zoomFactor = 1 / (1 + ($self.data("zoomLevel")) * options.map.zoom.step)
					, x = zoomFactor * initFactor * (e.clientX + $(window).scrollLeft() - offset.left) + $self.data("panX")
					, y = zoomFactor * initFactor * (e.clientY + $(window).scrollTop() - offset.top) + $self.data("panY");
					
				$self.trigger("zoom", {fixedCenter : true, "level" : $self.data("zoomLevel") + zoomLevel, "x" : x, "y" : y});
					
				return false;
			});
			
			// Enable zoom
			if (options.map.zoom.enabled)
				$.fn.mapael.initZoom($container, paper, mapConf.width, mapConf.height, options.map.zoom);
			
			// Set initial zoom
			if (typeof options.map.zoom.init != "undefined") {
				$self.trigger("zoom", options.map.zoom.init);
			}
			
			// Create the legends for areas
			$.merge(legends, $.fn.mapael.createLegends($self, options, "area", areas, 1));
				
			/**
			*
			* Update the current map
			* Refresh attributes and tooltips for areas and plots
			* @param updatedOptions options to update for plots and areas
			* @param newPlots new plots to add to the map
			* @param deletedPlotsplots to delete from the map
			* @param opt option for the refresh :
			*  opt.animDuration animation duration in ms (default = 0)
			*  opt.resetAreas true to reset previous areas options
			*  opt.resetPlots true to reset previous plots options
			*  opt.afterUpdate Hook that allows to add custom processing on the map
			*/
			$self.on("update", function(e, updatedOptions, newPlots, deletedPlots, opt) {
				var i = 0
					, id = 0
					, animDuration = 0
					, elemOptions = {};
				
				// Reset hidden map elements (when user click on legend elements)
				legends.forEach(function(el) {
					el.forEach && el.forEach(function(el) {
						if(typeof el.hidden != "undefined" && el.hidden == true) {
							$(el.node).trigger("click");
						}
					})
				});
				
				if (typeof opt != "undefined") {
					(opt.resetAreas) && (options.areas = {});
					(opt.resetPlots) && (options.plots = {});
					(opt.animDuration) && (animDuration = opt.animDuration);
				}
				
				$.extend(true, options, updatedOptions);
				
				// Delete plots
				if (typeof deletedPlots == "object") {
					for (;i < deletedPlots.length; i++) {
						if (typeof plots[deletedPlots[i]] != "undefined") {
							if (animDuration > 0) {
								(function(plot) {
									plot.mapElem.animate({"opacity":0}, animDuration, "linear", function() {plot.mapElem.remove();});
									if (plot.textElem) {
										plot.textElem.animate({"opacity":0}, animDuration, "linear", function() {plot.textElem.remove();});
									}
								})(plots[deletedPlots[i]]);
							} else {
								plots[deletedPlots[i]].mapElem.remove();
								if (plots[deletedPlots[i]].textElem) {
									plots[deletedPlots[i]].textElem.remove();
								}
							}
							delete plots[deletedPlots[i]];
						}
					}
				}
				
				// New plots
				if (typeof newPlots == "object") {
					for (id in newPlots) {
						if (typeof plots[id] == "undefined") {
							options.plots[id] = newPlots[id];
							plots[id] = $.fn.mapael.drawPlot(id, options, mapConf, paper, $tooltip);
							if (animDuration > 0) {
								plots[id].mapElem.attr({opacity : 0});
								plots[id].textElem.attr({opacity : 0});
								plots[id].mapElem.animate({"opacity": (typeof plots[id].mapElem.originalAttrs.opacity != "undefined") ? plots[id].mapElem.originalAttrs.opacity : 1}, animDuration);
								plots[id].textElem.animate({"opacity": (typeof plots[id].textElem.originalAttrs.opacity != "undefined") ? plots[id].textElem.originalAttrs.opacity : 1}, animDuration);
							}
						}
					}
				}
				
				// Update areas attributes and tooltips
				for (id in areas) {
					elemOptions = $.fn.mapael.getElemOptions(
						options.map.defaultArea
						, (options.areas[id] ? options.areas[id] : {})
						, options.legend.area
					);
					
					$.fn.mapael.updateElem(elemOptions, areas[id], $tooltip, animDuration);
				}
				
				// Update plots attributes and tooltips
				for (id in plots) {
					elemOptions = $.fn.mapael.getElemOptions(
						options.map.defaultPlot
						, (options.plots[id] ? options.plots[id] : {})
						, options.legend.plot
					);
					if (elemOptions.type == "square") {
						elemOptions.attrs.width = elemOptions.size;
						elemOptions.attrs.height = elemOptions.size;
						elemOptions.attrs.x = plots[id].mapElem.attrs.x - (elemOptions.size - plots[id].mapElem.attrs.width) / 2;
						elemOptions.attrs.y = plots[id].mapElem.attrs.y - (elemOptions.size - plots[id].mapElem.attrs.height) / 2;
					} else if (elemOptions.type == "image") {
						elemOptions.attrs.x = plots[id].mapElem.attrs.x - (elemOptions.width - plots[id].mapElem.attrs.width) / 2;
						elemOptions.attrs.y = plots[id].mapElem.attrs.y - (elemOptions.height - plots[id].mapElem.attrs.height) / 2;
					} else { // Default : circle
						elemOptions.attrs.r = elemOptions.size / 2;
					}
					
					$.fn.mapael.updateElem(elemOptions, plots[id], $tooltip, animDuration);
				}
				
				if(typeof opt != "undefined")
					opt.afterUpdate && opt.afterUpdate($self, paper, areas, plots, options);
			});
			
			// Handle resizing of the map
			if (options.map.width) {
				paper.setSize(options.map.width, mapConf.height * (options.map.width / mapConf.width));
				
				// Create the legends for plots taking into account the scale of the map
				$.merge(legends, $.fn.mapael.createLegends($self, options, "plot", plots, (options.map.width / mapConf.width)));
			} else {
				$(window).on("resize", function() {
					clearTimeout(resizeTO);
					resizeTO = setTimeout(function(){$container.trigger("resizeEnd");}, 150);
				});
				
				// Create the legends for plots taking into account the scale of the map
				var createPlotLegend = function() {
					$.merge(legends, $.fn.mapael.createLegends($self, options, "plot", plots, ($container.width() / mapConf.width)));
					
					$container.unbind("resizeEnd", createPlotLegend);
				};
				
				$container.on("resizeEnd", function() {
					var containerWidth = $container.width();
					if (paper.width != containerWidth) {
						paper.setSize(containerWidth, mapConf.height * (containerWidth / mapConf.width));
					}
				}).on("resizeEnd", createPlotLegend).trigger("resizeEnd");
			}
			
			// Hook that allows to add custom processing on the map
			options.map.afterInit && options.map.afterInit($self, paper, areas, plots, options);
			
			$(paper.desc).append(" and Mapael (http://www.vincentbroute.fr/mapael/)");
		});
	};
	
	/**
	* Init the element "elem" on the map (drawing, setting attributes, events, tooltip, ...)
	*/
	$.fn.mapael.initElem = function(paper, elem, options, $tooltip, id) {
		var bbox = {}, textPosition = {};
		if (typeof options.value != "undefined")
			elem.value = options.value;
		
		// Init attrsHover
		$.fn.mapael.setHoverOptions(elem.mapElem, options.attrs, options.attrsHover);
		
		// Init the label related to the element
		if (options.text && typeof options.text.content != "undefined") {
			// Set a text label in the area
			bbox = elem.mapElem.getBBox();
			textPosition = $.fn.mapael.getTextPosition(bbox, options.text.position, options.text.margin);
			options.text.attrs["text-anchor"] = textPosition.textAnchor;
			elem.textElem = paper.text(textPosition.x, textPosition.y, options.text.content).attr(options.text.attrs);
			$.fn.mapael.setHoverOptions(elem.textElem, options.text.attrs, options.text.attrsHover);
			$.fn.mapael.setHover(paper, elem.mapElem, elem.textElem);
			options.eventHandlers && $.fn.mapael.setEventHandlers(id, options, elem.mapElem, elem.textElem);
			$(elem.textElem.node).attr("data-id", id);
		} else {
			$.fn.mapael.setHover(paper, elem.mapElem);
			options.eventHandlers && $.fn.mapael.setEventHandlers(id, options, elem.mapElem);
		}
		
		// Init the tooltip
		if (options.tooltip && options.tooltip.content) {
			elem.mapElem.tooltipContent = options.tooltip.content;
			$.fn.mapael.setTooltip(elem.mapElem, $tooltip);
			
			if (options.text && typeof options.text.content != "undefined") {
				elem.textElem.tooltipContent = options.tooltip.content;
				$.fn.mapael.setTooltip(elem.textElem, $tooltip);
			}
		}
		
		// Init the link
		if (options.href) {
			elem.mapElem.href = options.href;
			elem.mapElem.target = options.target;
			$.fn.mapael.setHref(elem.mapElem);
			
			if (options.text && typeof options.text.content != "undefined") {
				elem.textElem.href = options.href;
				elem.textElem.target = options.target;
				$.fn.mapael.setHref(elem.textElem);
			}
		}
		
		$(elem.mapElem.node).attr("data-id", id);
	};
	
	/**
	* Draw all links between plots on the paper
	*/
	$.fn.mapael.drawLinksCollection = function(paper, options, getCoords, $tooltip) {
		var p1 = {}
			, p2 = {}
			, elemOptions = {}
			, coordsP1 = {}
			, coordsP2 ={};
		
		for (var id in options.links) {
			elemOptions = $.fn.mapael.getElemOptions(options.map.defaultLink, options.links[id], {});
			
			if (typeof options.links[id].between[0] == 'string') {
				p1 = options.plots[options.links[id].between[0]];
			} else {
				p1 = options.links[id].between[0];
			}
			
			if (typeof options.links[id].between[1] == 'string') {
				p2 = options.plots[options.links[id].between[1]];
			} else {
				p2 = options.links[id].between[1];
			}
			
			if (typeof p1.latitude != "undefined" && typeof p1.longitude != "undefined") {
				coordsP1 = getCoords(p1.latitude, p1.longitude);
			} else {
				coordsP1.x = p1.x;
				coordsP1.y = p1.y;
			}
		
			if (typeof p2.latitude != "undefined" && typeof p2.longitude != "undefined") {
				coordsP2 = getCoords(p2.latitude, p2.longitude);
			} else {
				coordsP2.x = p2.x;
				coordsP2.y = p2.y;
			}
			$.fn.mapael.drawLink(id, paper, coordsP1.x, coordsP1.y, coordsP2.x, coordsP2.y, elemOptions, $tooltip);
		}
	};
	
	/**
	* Draw a curved link between two couples of coordinates a(xa,ya) and b(xb, yb) on the paper
	*/
	$.fn.mapael.drawLink = function(id, paper, xa, ya, xb, yb, elemOptions, $tooltip) {
		var elem = {}
		
			// Compute the "curveto" SVG point, d(x,y)
			// c(xc, yc) is the center of (xa,ya) and (xb, yb)
			, xc = (xa + xb) / 2
			 , yc = (ya + yb) / 2
				
			 // Equation for (cd) : y = acd * x + bcd (d is the cure point)
			 , acd = - 1 / ((yb - ya) / (xb - xa))
			 , bcd = yc - acd * xc
		
			 // dist(c,d) = dist(a,b) (=abDist)
			 , abDist = Math.sqrt((xb-xa)*(xb-xa) + (yb-ya)*(yb-ya))

			 // Solution for equation dist(cd) = sqrt((xd - xc)² + (yd - yc)²)
			 // dist(c,d)² = (xd - xc)² + (yd - yc)²
			 // We assume that dist(c,d) = dist(a,b)
			 // so : (xd - xc)² + (yd - yc)² - dist(a,b)² = 0
			 // With the factor : (xd - xc)² + (yd - yc)² - (factor*dist(a,b))² = 0
			 // (xd - xc)² + (acd*xd + bcd - yc)² - (factor*dist(a,b))² = 0
			 , a = 1 + acd*acd
			 , b = -2 * xc + 2*acd*bcd - 2 * acd*yc
			 , c = xc*xc + bcd*bcd - bcd*yc - yc*bcd + yc*yc - ((elemOptions.factor*abDist) * (elemOptions.factor*abDist))
			 , delta = b*b - 4*a*c
			 , x = 0
			 , y = 0;
		
		// There are two solutions, we choose one or the other depending on the sign of the factor
		if (elemOptions.factor > 0) {
			 x = (-b + Math.sqrt(delta)) / (2*a);
			 y = acd * x + bcd;
		} else {
			 x = (-b - Math.sqrt(delta)) / (2*a);
			 y = acd * x + bcd;
		}

		elem.mapElem = paper.path("m "+xa+","+ya+" C "+x+","+y+" "+xb+","+yb+" "+xb+","+yb+"").attr(elemOptions.attrs);
		$.fn.mapael.initElem(paper, elem, elemOptions, $tooltip, id);
		
		return elem;
	};

	/**
	* Update the element "elem" on the map with the new elemOptions options
	*/
	$.fn.mapael.updateElem = function(elemOptions, elem, $tooltip, animDuration) {
		var bbox, textPosition, plotOffset;
		if (typeof elemOptions.value != "undefined")
			elem.value = elemOptions.value;
		
		// Update the label
		if (elem.textElem) {
			if (typeof elemOptions.text != "undefined" && typeof elemOptions.text.content != "undefined" && elemOptions.text.content != elem.textElem.attrs.text)
				elem.textElem.attr({text : elemOptions.text.content});

			bbox = elem.mapElem.getBBox();
			if (elemOptions.size) {
				plotOffset = (elemOptions.size - bbox.height) / 2;
				bbox.x -= plotOffset;
				bbox.x2 += plotOffset;
				bbox.y -= plotOffset;
				bbox.y2 += plotOffset;
			}
			textPosition = $.fn.mapael.getTextPosition(bbox, elemOptions.text.position, elemOptions.text.margin);
			if (textPosition.x != elem.textElem.attrs.x || textPosition.y != elem.textElem.attrs.y) {
				if (animDuration > 0) {
					elem.textElem.attr({"text-anchor" : textPosition.textAnchor});
					elem.textElem.animate({x : textPosition.x, y : textPosition.y}, animDuration);
				} else
					elem.textElem.attr({x : textPosition.x, y : textPosition.y, "text-anchor" : textPosition.textAnchor});
			}
			
			$.fn.mapael.setHoverOptions(elem.textElem, elemOptions.text.attrs, elemOptions.text.attrsHover);
			if (animDuration > 0)
				elem.textElem.animate(elemOptions.text.attrs, animDuration);
			else
				elem.textElem.attr(elemOptions.text.attrs);
		}
		
		// Update elements attrs and attrsHover
		$.fn.mapael.setHoverOptions(elem.mapElem, elemOptions.attrs, elemOptions.attrsHover);
		if (animDuration > 0)
			elem.mapElem.animate(elemOptions.attrs, animDuration);
		else
			elem.mapElem.attr(elemOptions.attrs);
		
		// Update the tooltip
		if (elemOptions.tooltip && typeof elemOptions.tooltip.content != "undefined") {
			if (typeof elem.mapElem.tooltipContent == "undefined") {
				$.fn.mapael.setTooltip(elem.mapElem, $tooltip);
				(elem.textElem) && $.fn.mapael.setTooltip(elem.textElem, $tooltip);
			}
			elem.mapElem.tooltipContent = elemOptions.tooltip.content;
			(elem.textElem) && (elem.textElem.tooltipContent = elemOptions.tooltip.content);
		}
		
		// Update the link
		if (typeof elemOptions.href != "undefined") {
			if (typeof elem.mapElem.href == "undefined") {
				$.fn.mapael.setHref(elem.mapElem);
				(elem.textElem) && $.fn.mapael.setHref(elem.textElem);
			}
			elem.mapElem.href = elemOptions.href;
			elem.mapElem.target = elemOptions.target;
			if (elem.textElem) {
				elem.textElem.href = elemOptions.href;
				elem.textElem.target = elemOptions.target;
			}
		}
	};
	
	/**
	* Draw the plot
	*/
	$.fn.mapael.drawPlot = function(id, options, mapConf, paper, $tooltip) {
		var plot = {}
			, coords = {}
			, elemOptions = $.fn.mapael.getElemOptions(
				options.map.defaultPlot
				, (options.plots[id] ? options.plots[id] : {})
				, options.legend.plot
			);
		
		if (typeof elemOptions.x != "undefined" && typeof elemOptions.y != "undefined")
			coords = {x : elemOptions.x, y : elemOptions.y};
		else
			coords = mapConf.getCoords(elemOptions.latitude, elemOptions.longitude);
		
		if (elemOptions.type == "square") {
			plot = {"mapElem" : paper.rect(
				coords.x - (elemOptions.size / 2)
				, coords.y - (elemOptions.size / 2)
				, elemOptions.size
				, elemOptions.size
			).attr(elemOptions.attrs)};
		} else if (elemOptions.type == "image") {
			plot = {
				"mapElem" : paper.image(
					elemOptions.url
					, coords.x - elemOptions.width / 2
					, coords.y - elemOptions.height / 2
					, elemOptions.width
					, elemOptions.height
				).attr(elemOptions.attrs)
			};
		} else { // Default = circle
			plot = {"mapElem" : paper.circle(coords.x, coords.y, elemOptions.size / 2).attr(elemOptions.attrs)};
		}
		
		$.fn.mapael.initElem(paper, plot, elemOptions, $tooltip, id);
		
		return plot;
	};
	
	/**
	* Set target link on elem
	*/
	$.fn.mapael.setHref = function(elem) {
		elem.attr({cursor : "pointer"});
		$(elem.node).bind("click", function() {
			if (!$.fn.mapael.panning && elem.href)
				window.open(elem.href, elem.target);
		});
	};
	
	/**
	* Set a tooltip for the areas and plots
	* @param elem area or plot element
	* @param $tooltip the tooltip container
	* @param content the content to set in the tooltip
	*/
	$.fn.mapael.setTooltip = function(elem, $tooltip) {
		var tooltipTO = 0
			, $container = $tooltip.parent()
			, containerY2 = $container.offset().left + $container.width();
	
		$(elem.node).on("mouseover", function(e) {
			tooltipTO = setTimeout(
				function() {
					elem.tooltipContent && $tooltip.html(elem.tooltipContent).css("display", "block");
					$tooltip.css({"left" : Math.min(containerY2 - $tooltip.outerWidth() - 5, e.pageX + 10 - $(window).scrollLeft()), "top" : e.pageY + 20 - $(window).scrollTop()});
				}
				, 120
			);
		}).on("mouseout", function(e) {
			clearTimeout(tooltipTO);
			$tooltip.css("display", "none");
		}).on("mousemove", function(e) {
			$tooltip.css({"left" : Math.min(containerY2 - $tooltip.outerWidth() - 5, e.pageX + 10 - $(window).scrollLeft()), "top" : e.pageY + 20 - $(window).scrollTop()});
		});
	};
	
	/**
	* Set user defined handlers for events on areas and plots
	* @param id the id of the element
	* @param elemOptions the element parameters
	* @param mapElem the map element to set callback on
	* @param textElem the optional text within the map element
	*/
	$.fn.mapael.setEventHandlers = function(id, elemOptions, mapElem, textElem) {
		for(var event in elemOptions.eventHandlers) {
			(function(event) {
				$(mapElem.node).on(event, function(e) {!$.fn.mapael.panning && elemOptions.eventHandlers[event](e, id, mapElem, textElem, elemOptions)});
				textElem && $(textElem.node).on(event, function(e) {!$.fn.mapael.panning && elemOptions.eventHandlers[event](e, id, mapElem, textElem, elemOptions)});
			})(event);
		}
	};
	
	$.fn.mapael.panning = false;
	
	/**
	* Init zoom and panning for the map
	* @param $container
	* @param paper
	* @param mapWidth
	* @param mapHeight
	* @param options
	*/
	$.fn.mapael.initZoom = function($container, paper, mapWidth, mapHeight, options) {
		var $parentContainer = $container.parent()
			, $zoomIn = $("<div>").addClass(options.zoomInCssClass).html("+")
			, $zoomOut = $("<div>").addClass(options.zoomOutCssClass).html("&#x2212;")
			, mousedown = false
			, previousX = 0
			, previousY = 0;
		
		// Zoom
		$parentContainer.data("zoomLevel", 0).data({"panX" : 0, "panY" : 0});
		$container.append($zoomIn).append($zoomOut);
		
		$zoomIn.on("click", function() {$parentContainer.trigger("zoom", {"level" : $parentContainer.data("zoomLevel") + 1});});
		$zoomOut.on("click", function() {$parentContainer.trigger("zoom", {"level" : $parentContainer.data("zoomLevel") - 1});});
		
		// Panning
		$("body").on("mouseup", function(e) {
			mousedown = false;
			setTimeout(function () {$.fn.mapael.panning = false;}, 50);
		});
		
		$container.on("mousedown", function(e) {
			mousedown = true;
			previousX = e.pageX;
			previousY = e.pageY;
			return false;
		}).on("mousemove", function(e) {
			var currentLevel = $parentContainer.data("zoomLevel");
			if (mousedown && currentLevel != 0) {
				var offsetX = (previousX - e.pageX) / (1 + (currentLevel * options.step)) * (mapWidth / paper.width)
					, offsetY = (previousY - e.pageY) / (1 + (currentLevel * options.step)) * (mapHeight / paper.height)
					, panX = Math.min(Math.max(0, paper._viewBox[0] + offsetX), (mapWidth - paper._viewBox[2]))
					, panY = Math.min(Math.max(0, paper._viewBox[1] + offsetY), (mapHeight - paper._viewBox[3]));					
				
				if (Math.abs(offsetX) > 5 || Math.abs(offsetY) > 5) {
					$parentContainer.data({"panX" : panX, "panY" : panY});
					
					paper.setViewBox(panX, panY, paper._viewBox[2], paper._viewBox[3]);
					
					previousX = e.pageX;
					previousY = e.pageY;
					$.fn.mapael.panning = true;
				}
			}
			return false;
		});
	};
	
	/**
	* Draw a legend for areas and / or plots
	* @param legendOptions options for the legend to draw
	* @param $container the map container
	* @param options map options object
	* @param legendType the type of the legend : "area" or "plot"
	* @param elems collection of plots or areas on the maps
	* @param legendIndex index of the legend in the conf array
	*/
	$.fn.mapael.drawLegend = function (legendOptions, $container, options, legendType, elems, scale, legendIndex) {
		var $legend = {}
			, paper = {}
			, width = 0
			, height = 0
			, title = {}
			, elem = {}
			, elemBBox = {}
			, label = {}
			, i = 0
			, x = 0
			, y = 0
			, yCenter = 0
			, sliceAttrs = [];
		
			if (!legendOptions.slices || !legendOptions.display)
				return;
				
			$legend = $("." + legendOptions.cssClass, $container).empty();
			paper = new Raphael($legend.get(0));
			height = width = 0;
			
			// Set the title of the legend
			if(legendOptions.title) {
				title = paper.text(legendOptions.marginLeftTitle, 0, legendOptions.title).attr(legendOptions.titleAttrs);
				title.attr({y : 0.5 * title.getBBox().height});
					
				width = legendOptions.marginLeftTitle + title.getBBox().width;
				height += legendOptions.marginBottomTitle + title.getBBox().height;
			}
			
			// Calculate attrs (and width, height and r (radius)) for legend elements, and yCenter for horizontal legends
			for(i = 0, length = legendOptions.slices.length; i < length; ++i) {
				if (typeof legendOptions.slices[i].legendSpecificAttrs == "undefined")
					legendOptions.slices[i].legendSpecificAttrs = {};
					
				sliceAttrs[i] = $.extend(
					{}
					, (legendType == "plot") ? options.map["defaultPlot"].attrs : options.map["defaultArea"].attrs
					, legendOptions.slices[i].attrs
					, legendOptions.slices[i].legendSpecificAttrs
				);
			
				if (legendType == "area") {
					if (typeof sliceAttrs[i].width == "undefined")
						sliceAttrs[i].width = 30;
					if (typeof sliceAttrs[i].height == "undefined")
						sliceAttrs[i].height = 20;
				} else if (legendOptions.slices[i].type == "square") {
					if (typeof sliceAttrs[i].width == "undefined")
						sliceAttrs[i].width = legendOptions.slices[i].size;
					if (typeof sliceAttrs[i].height == "undefined")
						sliceAttrs[i].height = legendOptions.slices[i].size;
				} else if (legendOptions.slices[i].type == "image") {
					if (typeof sliceAttrs[i].width == "undefined")
						sliceAttrs[i].width = legendOptions.slices[i].width;
					if (typeof sliceAttrs[i].height == "undefined")
						sliceAttrs[i].height = legendOptions.slices[i].height;
				} else {
					if (typeof sliceAttrs[i].r == "undefined")
						sliceAttrs[i].r = legendOptions.slices[i].size / 2;
				}
				
				if(legendOptions.slices[i].type == "image" || legendType == "area") {
					yCenter = Math.max(yCenter, legendOptions.marginBottomTitle + title.getBBox().height + scale * sliceAttrs[i].height/2);
				} else {
					yCenter = Math.max(yCenter, legendOptions.marginBottomTitle + title.getBBox().height + scale * sliceAttrs[i].r);
				}
			}
				
			if (legendOptions.mode == "horizontal") {
				width = legendOptions.marginLeft;
			}
			
			// Draw legend elements (circle, square or image in vertical or horizontal mode)
			for(i = 0, length = legendOptions.slices.length; i < length; ++i) {
				if (typeof legendOptions.slices[i].display == "undefined" || legendOptions.slices[i].display == true) {
					if(legendType == "area") {
						if (legendOptions.mode == "horizontal") {
							x = width + legendOptions.marginLeft;
							y = yCenter - (0.5 * scale * sliceAttrs[i].height);
						} else {
							x = legendOptions.marginLeft;
							y = height;
						}
						
						elem = paper.rect(x, y, scale * (sliceAttrs[i].width), scale * (sliceAttrs[i].height));
					} else if(legendOptions.slices[i].type == "square") {					
						if (legendOptions.mode == "horizontal") {
							x = width + legendOptions.marginLeft;
							y = yCenter - (0.5 * scale * sliceAttrs[i].height);
						} else {
							x = legendOptions.marginLeft;
							y = height;
						}
						
						elem = paper.rect(x, y, scale * (sliceAttrs[i].width), scale * (sliceAttrs[i].height));
							
					} else if(legendOptions.slices[i].type == "image") {					
						if (legendOptions.mode == "horizontal") {
							x = width + legendOptions.marginLeft;
							y = yCenter - (0.5 * scale * sliceAttrs[i].height);
						} else {
							x = legendOptions.marginLeft;
							y = height;
						}

						elem = paper.image(
							legendOptions.slices[i].url, x, y, scale * sliceAttrs[i].width, scale * sliceAttrs[i].height);
					} else {
						if (legendOptions.mode == "horizontal") {
							x = width + legendOptions.marginLeft + scale * (sliceAttrs[i].r);
							y = yCenter;
						} else {
							x = legendOptions.marginLeft + scale * (sliceAttrs[i].r);
							y = height + scale * (sliceAttrs[i].r);
						}
						elem = paper.circle(x, y, scale * (sliceAttrs[i].r));
					}
					
					// Set attrs to the element drawn above
					delete sliceAttrs[i].width;
					delete sliceAttrs[i].height;
					delete sliceAttrs[i].r;
					elem.attr(sliceAttrs[i]);
					elemBBox = elem.getBBox();
					
					// Draw the label associated with the element
					if (legendOptions.mode == "horizontal") {
						x = width + legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel;
						y = yCenter;
					} else {
						x = legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel;
						y = height + (elemBBox.height / 2);
					}
					
					label = paper.text(x, y, legendOptions.slices[i].label).attr(legendOptions.labelAttrs);
					
					// Update the width and height for the paper
					if (legendOptions.mode == "horizontal") {
						width += legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel + label.getBBox().width;
						if(legendOptions.slices[i].type == "image" || legendType == "area") {
							height = Math.max(height, legendOptions.marginBottom + title.getBBox().height + elemBBox.height);
						} else {
							height = Math.max(height, legendOptions.marginBottomTitle + legendOptions.marginBottom + title.getBBox().height + elemBBox.height);
						}
					} else {
						width = Math.max(width, legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel + label.getBBox().width);
						height += legendOptions.marginBottom + elemBBox.height;
					}
					
					$(elem.node).attr({"data-type": "elem", "data-index": i});
					$(label.node).attr({"data-type": "label", "data-index": i});
					
					// Hide map elements when the user clicks on a legend item
					if (legendOptions.hideElemsOnClick.enabled) {
						// Hide/show elements when user clicks on a legend element
						label.attr({cursor:"pointer"});
						elem.attr({cursor:"pointer"});
						
						$.fn.mapael.setHoverOptions(elem, sliceAttrs[i], sliceAttrs[i]);
						$.fn.mapael.setHoverOptions(label, legendOptions.labelAttrs, legendOptions.labelAttrsHover);
						$.fn.mapael.setHover(paper, elem, label);
						
						label.hidden = false;
						$.fn.mapael.handleClickOnLegendElem(legendOptions, legendOptions.slices[i], label, elem, elems, legendIndex);
					}
				}
			}
		
			// VMLWidth option allows you to set static width for the legend
			// only for VML render because text.getBBox() returns wrong values on IE6/7
			if (Raphael.type != "SVG" && legendOptions.VMLWidth)
				width = legendOptions.VMLWidth;
			
			paper.setSize(width, height);
			return paper;
	};
	
	/**
	* Allow to hide elements of the map when the user clicks on a related legend item
	* @param legendOptions options for the legend to draw
	* @param sliceOptions options of the slice
	* @param label label of the legend item
	* @param elem element of the legend item
	* @param elems collection of plots or areas displayed on the map
	* @param legendIndex index of the legend in the conf array
	*/
	$.fn.mapael.handleClickOnLegendElem = function(legendOptions, sliceOptions, label, elem, elems, legendIndex) {
		var hideMapElems = function() {
			var elemValue = 0;
			
			if (!label.hidden) {
				label.animate({"opacity":0.5}, 300);
			} else {
				label.animate({"opacity":1}, 300);
			}
			
			for (var id in elems) {
				if ($.isArray(elems[id].value)) {
					elemValue = elems[id].value[legendIndex];
				} else {
					elemValue = elems[id].value;
				}
				
				if ((typeof sliceOptions.sliceValue != "undefined" && elemValue == sliceOptions.sliceValue)
					|| ((typeof sliceOptions.sliceValue == "undefined")
						&& (typeof sliceOptions.min == "undefined" || elemValue >= sliceOptions.min)
						&& (typeof sliceOptions.max == "undefined" || elemValue < sliceOptions.max))
				) {
					(function(id) {
						if (!label.hidden) {
							elems[id].mapElem.animate({"opacity":legendOptions.hideElemsOnClick.opacity}, 300, "linear", function() {(legendOptions.hideElemsOnClick.opacity == 0) && elems[id].mapElem.hide();});
							elems[id].textElem && elems[id].textElem.animate({"opacity":legendOptions.hideElemsOnClick.opacity}, 300, "linear", function() {(legendOptions.hideElemsOnClick.opacity == 0) && elems[id].textElem.hide();});
						} else {
							if (legendOptions.hideElemsOnClick.opacity == 0) {
								elems[id].mapElem.show();
								elems[id].textElem && elems[id].textElem.show();
							}
							elems[id].mapElem.animate({"opacity":typeof elems[id].mapElem.originalAttrs.opacity != "undefined" ? elems[id].mapElem.originalAttrs.opacity : 1}, 300);
							elems[id].textElem && elems[id].textElem.animate({"opacity":typeof elems[id].textElem.originalAttrs.opacity != "undefined" ? elems[id].textElem.originalAttrs.opacity : 1}, 300);
						}
					})(id);
				}
			}
			label.hidden = !label.hidden;
		};
		$(label.node).on("click", hideMapElems);
		$(elem.node).on("click", hideMapElems);
	};
	
	/**
	* Create all legends for a specified type (area or plot)
	* @param $container the map container
	* @param options map options
	* @param legendType the type of the legend : "area" or "plot"
	* @param elems collection of plots or areas displayed on the map
	* @param scale scale ratio of the map
	*/
	$.fn.mapael.createLegends = function ($container, options, legendType, elems, scale) {
		var legends = [];
		
		if ($.isArray(options.legend[legendType])) {
			for (var j = 0; j < options.legend[legendType].length; ++j) {
				legends.push($.fn.mapael.drawLegend(options.legend[legendType][j], $container, options, legendType, elems, scale, j));
			}
		} else {
			legends.push($.fn.mapael.drawLegend(options.legend[legendType], $container, options, legendType, elems, scale));
		}
		return legends;
	};
	
	/**
	* Set the attributes on hover and the attributes to restore for a map element
	* @param elem the map element
	* @param originalAttrs the original attributes to restore on mouseout event
	* @param attrsHover the attributes to set on mouseover event
	*/
	$.fn.mapael.setHoverOptions = function (elem, originalAttrs, attrsHover) {
		// Disable transform option on hover for VML (IE<9) because of several bugs
		if (Raphael.type != "SVG") delete attrsHover.transform;
		elem.attrsHover = attrsHover;
		
		if (elem.attrsHover.transform) elem.originalAttrs = $.extend({transform : "s1"}, originalAttrs);
		else elem.originalAttrs = originalAttrs;
	};
	
	/**
	* Set the hover behavior (mouseover & mouseout) for plots and areas
	* @param paper Raphael paper object
	* @param mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.setHover = function (paper, mapElem, textElem) {
		var $mapElem = {}
			, $textElem = {}
			, hoverTO = 0
			, overBehaviour = function() {hoverTO = setTimeout(function () {$.fn.mapael.elemHover(paper, mapElem, textElem);}, 120);}
			, outBehaviour = function () {clearTimeout(hoverTO);$.fn.mapael.elemOut(paper, mapElem, textElem);};
			
		$mapElem = $(mapElem.node);
		$mapElem.on("mouseover", overBehaviour);
		$mapElem.on("mouseout", outBehaviour);
		
		if (textElem) {
			$textElem = $(textElem.node);
			$textElem.on("mouseover", overBehaviour);
			$(textElem.node).on("mouseout", outBehaviour);
		}
	};
	
	/**
	* Set he behaviour for "mouseover" event
	* @param paper paper Raphael paper object
	* @param mapElem mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.elemHover = function (paper, mapElem, textElem) {
		mapElem.animate(mapElem.attrsHover, mapElem.attrsHover.animDuration);
		textElem && textElem.animate(textElem.attrsHover, textElem.attrsHover.animDuration);
		paper.safari();
	};
	
	/**
	* Set he behaviour for "mouseout" event
	* @param paper Raphael paper object
	* @param mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.elemOut = function (paper, mapElem, textElem) {
		mapElem.animate(mapElem.originalAttrs, mapElem.attrsHover.animDuration);
		textElem && textElem.animate(textElem.originalAttrs, textElem.attrsHover.animDuration);
		paper.safari();
	};
	
	/**
	* Get element options by merging default options, element options and legend options
	* @param defaultOptions
	* @param elemOptions
	* @param legendOptions
	*/
	$.fn.mapael.getElemOptions = function(defaultOptions, elemOptions, legendOptions) {
		var options = $.extend(true, {}, defaultOptions, elemOptions);
		if (typeof options.value != "undefined") {
			if ($.isArray(legendOptions)) {
				for (var i = 0, length = legendOptions.length;i<length;++i) {
					options = $.extend(true, {}, options, $.fn.mapael.getLegendSlice(options.value[i], legendOptions[i]));
				}
			} else {
				options = $.extend(true, {}, options, $.fn.mapael.getLegendSlice(options.value, legendOptions));
			}
		}
		return options;
	};
	
	/**
	* Get the coordinates of the text relative to a bbox and a position
	* @param bbox the boundary box of the element
	* @param textPosition the wanted text position (inner, right, left, top or bottom)
	*/
	$.fn.mapael.getTextPosition = function(bbox, textPosition, margin) {
		var textX = 0
			, textY = 0
			, textAnchor = "";
			
		switch (textPosition) {
			case "bottom" :
				textX = (bbox.x + bbox.x2) / 2;
				textY = bbox.y2 + margin;
				textAnchor = "middle";
				break;
			case "top" :
				textX = (bbox.x + bbox.x2) / 2;
				textY = bbox.y - margin;
				textAnchor = "middle";
				break;
			case "left" :
				textX = bbox.x - margin;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "end";
				break;
			case "right" :
				textX = bbox.x2 + margin;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "start";
				break;
			default : // "inner" position
				textX = (bbox.x + bbox.x2) / 2;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "middle";
		}
		return {"x" : textX, "y" : textY, "textAnchor" : textAnchor};
	};
	
	/**
	* Get the legend conf matching with the value
	* @param value the value to match with a slice in the legend
	* @param legend the legend params object
	* @return the legend slice matching with the value
	*/
	$.fn.mapael.getLegendSlice = function (value, legend) {
		for(var i = 0, length = legend.slices.length; i < length; ++i) {
			if ((typeof legend.slices[i].sliceValue != "undefined" && value == legend.slices[i].sliceValue)
				|| ((typeof legend.slices[i].sliceValue == "undefined")
					&& (typeof legend.slices[i].min == "undefined" || value >= legend.slices[i].min)
					&& (typeof legend.slices[i].max == "undefined" || value < legend.slices[i].max))
			) {
				return legend.slices[i];
			}
		}
		return {};
	};
	
	// Default map options
	$.fn.mapael.defaultOptions = {
		map : {
			cssClass : "map"
			, tooltip : {
				cssClass : "mapTooltip"
			}
			, defaultArea : {
				attrs : {
					fill : "#343434"
					, stroke : "#5d5d5d"
					, "stroke-width" : 1
					, "stroke-linejoin" : "round"
				}
				, attrsHover : {
					fill : "#f38a03"
					, animDuration : 300
				}
				, text : {
					position : "inner"
					, margin : 10
					, attrs : {
						"font-size" : 15
						, fill : "#c7c7c7"
					}
					, attrsHover : {
						fill : "#eaeaea"
						, "animDuration" : 300
					}
				}
				, target : "_self"
			}
			, defaultPlot : {
				type : "circle"
				, size : 15
				, attrs : {
					fill : "#0088db"
					, stroke : "#fff"
					, "stroke-width" : 0
					, "stroke-linejoin" : "round"
				}
				, attrsHover : {
					"stroke-width" : 3
					, animDuration : 300
				}
				, text : {
					position : "right"
					, margin : 10
					, attrs : {
						"font-size" : 15
						, fill : "#c7c7c7"
					}
					, attrsHover : {
						fill : "#eaeaea"
						, animDuration : 300
					}
				}
				, target : "_self"
			}
			, defaultLink : {
				factor : 0.5
				, attrs : {
					stroke : "#0088db"
					, "stroke-width" : 2
				}
				, attrsHover : {
					animDuration : 300
				}
				, text : {
					position : "inner"
					, margin : 10
					, attrs : {
						"font-size" : 15
						, fill : "#c7c7c7"
					}
					, attrsHover : {
						fill : "#eaeaea"
						, animDuration : 300
					}
				}
				, target : "_self"
			}
			, zoom : {
				enabled : false
				, maxLevel : 5
				, step : 0.25
				, zoomInCssClass : "zoomIn"
				, zoomOutCssClass : "zoomOut"
				, mousewheel : true
			}
		}
		, legend : {
			area : []
			, plot : []
		}
		, areas : {}
		, plots : {}
		, links : {}
	};
	
	$.fn.mapael.legendDefaultOptions = {
		area : {
			cssClass : "areaLegend"
			, display : true
			, marginLeft : 10
			, marginLeftTitle : 5
			, marginBottomTitle: 10
			, marginLeftLabel : 10
			, marginBottom : 10
			, titleAttrs : {
				"font-size" : 16
				, fill : "#343434"
				, "text-anchor" : "start"
			}
			, labelAttrs : {
				"font-size" : 12
				, fill : "#343434"
				, "text-anchor" : "start"
			}
			, labelAttrsHover : {
				fill : "#787878"
				, animDuration : 300
			}
			, hideElemsOnClick : {
				enabled : true
				, opacity : 0.2
			}
			, slices : []
			, mode : "vertical"
		}
		, plot : {
			cssClass : "plotLegend"
			, display : true
			, marginLeft : 10
			, marginLeftTitle : 5
			, marginBottomTitle: 10
			, marginLeftLabel : 10
			, marginBottom : 10
			, titleAttrs : {
				"font-size" : 16
				, fill : "#343434"
				, "text-anchor" : "start"
			}
			, labelAttrs : {
				"font-size" : 12
				, fill : "#343434"
				, "text-anchor" : "start"
			}
			, labelAttrsHover : {
				fill : "#787878"
				, animDuration : 300
			}
			, hideElemsOnClick : {
				enabled : true
				, opacity : 0.2
			}
			, slices : []
			, mode : "vertical"
		}
	};
})(jQuery);
;/**
*
* Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
* Requires jQuery and raphael.js
*
* Map of World by country
* 
* @source http://backspace.com/mapapp/javascript_world/
*/

(function($) {
	$.extend(true, $.fn.mapael, 
		{
			maps :  {
				world_countries : {
					width : 1000,
					height : 400,
					getCoords : function (lat, lon) {
						var xfactor = 2.752;
						var xoffset = 473.75;
						var x = (lon * xfactor) + xoffset;
						
						var yfactor = -2.753;
						var yoffset = 231;
						var y = (lat * yfactor) + yoffset;
						
						return {x : x, y : y};
					},
					'elems': {
						"AE" : "M615.622,164.177l0.582,0.000l0.000,0.580l2.324,-0.289l2.326,0.000l1.455,0.000l2.033,-1.743l2.034,-1.743l1.745,-1.742l0.583,0.871l0.291,2.324l-1.456,0.000l-0.289,1.742l0.581,0.291l-1.163,0.580l0.000,1.161l-0.873,1.162l0.000,1.162l-0.580,0.580l-8.430,-1.452l-0.872,-2.613l0.291,0.871z",
						"AF" : "M642.364,132.815l2.617,1.162l2.034,-0.291l0.581,-1.452l2.325,-0.291l1.454,-0.870l0.583,-2.323l2.326,-0.291l0.580,-1.162l1.164,0.871l0.871,0.000l1.453,0.000l2.035,0.582l0.871,0.290l2.036,-0.872l0.872,0.582l0.872,-1.162l1.745,0.000l0.289,-0.291l0.290,-1.161l1.455,-1.161l1.454,0.871l-0.291,0.871l0.581,0.000l0.000,2.323l0.873,0.872l1.161,-0.581l1.162,-0.291l1.744,-1.162l1.745,0.290l2.909,0.000l0.580,0.582l-1.743,0.290l-1.454,0.581l-2.907,0.291l-3.197,0.580l-1.454,1.161l0.581,1.162l0.289,1.452l-1.450,1.161l0.289,1.162l-0.872,0.871l-2.616,0.000l1.161,1.743l-1.742,0.580l-1.162,1.743l0.000,1.743l-0.875,0.580l-1.160,0.000l-2.036,0.290l-0.292,0.581l-2.034,0.000l-1.452,1.742l-0.291,2.323l-3.488,1.161l-2.035,-0.289l-0.581,0.580l-1.455,-0.291l-2.907,0.291l-4.649,-1.452l2.615,-2.323l-0.289,-1.742l-2.036,-0.581l-0.290,-1.743l-0.873,-2.032l1.163,-1.742l-1.163,-0.291l0.873,-2.032l-1.161,3.485z",
						"AL" : "M530.451,115.973l-0.289,0.871l0.289,1.161l1.165,0.581l0.000,0.872l-0.873,0.291l-0.292,0.869l-1.160,1.453l-0.583,-0.291l0.000,-0.580l-1.454,-0.871l-0.292,-1.452l0.292,-1.742l0.292,-0.872l-0.584,-0.580l0.000,-0.872l1.163,-1.162l0.292,0.291l0.582,0.000l0.581,0.581l0.582,0.290l-0.289,-1.162z",
						"AM" : "M593.82,118.005l3.780,-0.580l0.581,0.870l0.871,0.291l-0.289,0.872l1.452,0.871l-0.871,0.871l1.163,0.871l1.162,0.290l0.000,2.032l-0.873,0.000l-1.163,-1.451l0.000,-0.581l-1.160,0.000l-0.873,-0.581l-0.582,0.000l-1.162,-0.871l-2.036,-0.580l0.292,-1.452l0.292,0.872z",
						"AO" : "M518.825,247.227l0.582,2.032l0.871,1.453l0.581,0.87l0.874,1.452h2.033l0.873-0.581l1.452,0.581l0.582-0.871l0.581-1.451l1.744-0.291v-0.29h1.452l-0.289,0.871h3.488v1.742l0.579,1.161l-0.579,1.453l0.29,1.74l0.873,1.162v3.195l0.581-0.292h1.162l1.745-0.29h1.161l0.291,0.871l-0.291,1.452l0.583,1.161l-0.292,1.161v0.873h-5.524l-0.289,8.711l2.034,2.322l1.745,1.744l-5.232,1.161l-6.396-0.582l-2.033-1.161h-11.047l-0.581,0.291l-1.745-1.161l-1.743-0.292l-1.455,0.581l-1.452,0.581l-0.29-1.742l0.581-2.612l0.871-2.324v-1.161l0.874-2.613l0.871-1.163l1.452-1.742l0.873-1.16l0.292-2.033v-1.451l-0.874-1.162l-0.871-1.742l-0.581-1.452v-0.581l0.872-1.161l-0.872-2.613l-0.291-1.742l-1.455-1.741l0.292-0.582l1.163-0.581l0.581,0.291l1.162-0.581L518.825,247.227zM508.071,246.646l-0.874,0.291l-0.581-2.031l1.163-1.163l0.87-0.581l0.874,0.871l-0.874,0.58l-0.578,0.872V246.646z",
						"AR" : "M293.546,382.836h-2.616l-1.454-0.87h-1.745h-2.907v-6.389l1.163,1.45l1.163,2.033l3.779,1.744l3.778,0.58L293.546,382.836zM295,291.656l1.452,2.033l1.163-2.323l3.198,0.29l0.291,0.581l5.232,4.356l2.326,0.29l3.198,2.033l2.906,1.161l0.291,1.162l-2.617,4.354l2.617,0.58l3.197,0.581l2.326-0.581l2.326-2.032l0.582-2.322l1.163-0.58l1.454,1.45v2.324l-2.325,1.45l-1.745,1.163l-3.198,2.612l-3.779,3.777l-0.582,2.321l-0.872,2.613l0.291,2.905l-0.872,0.58v1.741l-0.29,1.452l3.487,2.323l-0.291,2.033l1.745,1.161l-0.291,1.162l-2.616,3.773l-4.07,1.455l-5.522,0.579l-2.907-0.29l0.582,1.451l-0.582,2.033l0.291,1.452l-1.454,0.871l-2.907,0.58l-2.616-1.161l-1.163,0.871l0.583,2.613l1.744,0.872l1.452-0.872l0.873,1.453l-2.617,0.87l-2.035,1.743l-0.582,2.613l-0.58,1.451h-2.617l-2.035,1.451l-0.873,2.033l2.617,2.032l2.615,0.582l-0.872,2.613l-3.197,1.452l-1.744,3.194l-2.616,1.161l-1.163,1.163l0.872,2.902l2.035,1.742l-1.163-0.291l-2.617-0.29l-6.685-0.58l-1.163-1.453v-2.03h-1.744l-0.873-0.873l-0.291-2.904l2.035-1.161l0.873-1.741l-0.292-1.453l1.455-2.323l0.872-3.775l-0.291-1.451l1.452-0.58l-0.29-1.162l-1.454-0.289l0.873-1.162l-1.162-1.162l-0.582-3.194l1.164-0.581l-0.582-3.193l0.582-2.904l0.872-2.613l1.453-0.87l-0.581-2.615l-0.292-2.613l2.326-1.742l-0.29-2.323l1.744-2.613v-2.613l-0.873-0.58l-1.163-4.646l1.744-2.904l-0.291-2.612l0.872-2.614l2.035-2.324l1.744-1.741l-0.872-1.163l0.582-0.87v-4.646l2.907-1.451l1.163-2.613l-0.291-0.872l2.034-2.324L295,291.656z",
						"AT" : "M520.57,98.549l-0.292,1.162l-1.453,0.000l0.582,0.581l-1.164,1.742l-0.291,0.580l-2.616,0.000l-1.162,0.582l-2.326,-0.291l-4.069,-0.580l-0.582,-0.872l-2.615,0.292l-0.291,0.580l-1.746,-0.291l-1.452,0.000l-1.162,-0.581l0.289,-0.581l0.000,-0.580l0.873,-0.291l1.452,0.871l0.292,-0.871l2.326,0.291l2.034,-0.581l1.452,0.000l0.584,0.581l0.290,-0.291l-0.290,-1.742l0.872,-0.580l1.162,-1.162l2.035,0.871l1.453,-1.162l0.871,0.000l2.326,0.581l1.163,0.000l1.455,0.581l-0.292,0.291l-0.292,-0.870z",
						"AU" : "M874.039,343.054l2.616,0.871l1.454-0.29l2.325-0.581l1.453,0.291l0.291,3.193l-0.87,0.872l-0.293,2.321l-1.162-0.579l-1.744,1.741h-0.582l-1.743-0.289l-1.745-2.324l-0.289-1.742l-1.744-2.323l0.29-1.451L874.039,343.054zM868.806,268.715l1.163,2.324l1.744-1.163l0.873,1.163l1.452,1.161l-0.289,1.161l0.58,2.324l0.291,1.45l0.873,0.29l0.579,2.323l-0.289,1.453l0.871,1.741l3.198,1.453l1.744,1.451l2.034,1.161l-0.582,0.581l1.745,1.742l0.87,2.904l1.165-0.581l1.163,1.452l0.581-0.581l0.579,2.904l2.036,1.742l1.163,1.161l2.034,2.033l0.873,2.322v1.452v1.742l1.163,2.323v2.323l-0.582,1.452l-0.581,2.323v1.742l-0.582,2.033l-1.162,2.322l-2.034,1.453l-1.163,2.031l-0.872,1.453l-0.872,2.322l-0.871,1.451l-0.873,2.033l-0.292,1.743v0.87l-1.452,1.163h-3.198l-2.326,1.159l-1.452,1.163l-1.454,1.161l-2.325-1.45l-1.743-0.293l0.289-1.45l-1.452,0.58l-2.325,1.744l-2.326-0.581l-1.743-0.582h-1.454l-2.616-0.871l-1.744-1.743l-0.582-2.032l-0.58-1.452l-1.456-1.162l-2.614-0.29l0.873-1.161l-0.581-2.033l-1.455,1.744l-2.326,0.579l1.455-1.452l0.292-1.74l1.161-1.453l-0.291-2.032l-2.324,2.612l-1.745,0.873l-0.873,2.03l-2.323-1.161l0.29-1.452l-1.744-1.741l-1.455-1.161l0.583-0.581l-3.779-1.743h-1.744l-2.616-1.45l-4.942,0.29l-3.778,0.871l-2.907,1.162l-2.615-0.292l-2.908,1.451l-2.616,0.581l-0.289,1.452l-1.163,1.161h-2.325l-1.744,0.291l-2.325-0.581l-2.036,0.29l-2.034,0.291l-1.455,1.452l-0.871-0.291l-1.452,0.871l-1.163,0.873h-2.036h-2.034l-2.906-1.744l-1.452-0.58v-1.742l1.452-0.291l0.581-0.58l-0.29-1.161l0.58-1.743l-0.29-1.741l-1.454-2.614l-0.579-1.742v-1.452l-0.873-1.743l-0.29-0.87l-1.163-1.162l-0.292-2.033l-1.454-2.323l-0.579-1.161l1.163,1.161l-0.874-2.321l1.455,0.58l0.873,1.161v-1.451l-1.454-2.033l-0.292-0.87l-0.582-0.872l0.29-1.742l0.584-0.581l0.289-1.451l-0.289-1.453l1.162-2.032l0.292,2.032l1.161-1.743l2.034-1.159l1.454-1.162l2.034-0.872l1.454-0.29l0.581,0.29l2.325-0.871l1.455-0.29l0.579-0.58l0.582-0.291h1.744l2.616-0.871l1.745-1.161l0.579-1.452l1.744-1.452v-1.162v-1.45l2.036-2.324l1.163,2.324l1.163-0.292l-0.871-1.45l0.871-1.453l1.163,0.871l0.289-2.322l1.454-1.162l0.58-1.162l1.454-0.58v-0.581l1.163,0.291l0.291-0.872l1.163-0.291l1.163-0.289l2.034,1.161l1.743,1.742h1.453l1.744,0.291l-0.581-1.742l1.454-2.032l1.163-0.873l-0.291-0.581l1.162-1.452l1.744-1.161l1.165,0.291l2.323-0.291v-1.452l-2.034-0.87l1.453-0.58l2.035,0.869l1.453,1.163l2.326,0.581l0.581-0.29l1.744,0.87l1.744-0.87l0.871,0.29l0.872-0.581l1.164,1.451l-0.873,1.453l-0.872,1.16h-0.873l0.292,1.162l-0.873,1.452l-1.163,1.161l0.292,0.872l2.325,1.452l2.034,0.87l1.454,0.871l2.034,1.742h0.581l1.452,0.582l0.582,0.87l2.617,1.161l1.745-1.161l0.581-1.452l0.581-1.161l0.29-1.452l0.873-2.322l-0.291-1.161v-0.872l-0.291-1.452l0.291-2.322l0.581-0.29l-0.29-1.163l0.581-1.451l0.582-1.452v-0.872l1.163-0.869l0.58,1.45l0.291,1.743l0.581,0.291l0.291,1.16l0.871,1.163l0.292,1.74L868.806,268.715z",
						"AZ" : "M597.6,121.78l0.873,0.581h1.16v0.581l1.163,1.451l-2.033-0.29l-1.163-1.453l-0.582-0.871H597.6zM604.285,117.715h1.165l0.29-0.581l1.744-1.162l1.452,1.452l1.453,2.033h1.165l0.87,0.871h-2.325l-0.292,2.322l-0.579,0.873l-0.873,0.58v1.452l-0.582,0.291l-1.743-1.453l0.871-1.451l-0.871-0.871l-0.872,0.291l-3.488,2.032v-2.032l-1.162-0.291l-1.163-0.871l0.871-0.871l-1.452-0.871l0.289-0.871l-0.871-0.291l-0.581-0.871l0.581-0.29l2.034,0.581l1.454,0.29l0.582-0.29l-1.455-1.453l0.582-0.29h0.873L604.285,117.715z",
						"BA" : "M526.091,107.552l0.871,0.000l-0.581,1.161l1.455,1.162l-0.582,1.161l-0.581,0.291l-0.582,0.290l-0.872,0.581l-0.291,1.451l-2.614,-1.161l-0.874,-1.161l-1.162,-0.581l-1.163,-0.871l-0.579,-0.872l-1.454,-1.451l0.581,-0.872l1.162,0.581l0.582,-0.581l1.163,0.000l2.325,0.291l2.033,0.000l-1.163,-0.581z",
						"BD" : "M728.989,170.275l-0.292,2.033l-0.871,-0.291l0.291,2.033l-0.872,-1.452l-0.292,-1.452l-0.290,-1.162l-1.163,-1.742l-2.615,0.000l0.289,1.161l-0.873,1.453l-1.161,-0.581l-0.581,0.581l-0.582,-0.292l-1.164,-0.289l-0.290,-2.324l-1.160,-2.032l0.579,-1.742l-1.744,-0.582l0.582,-1.160l1.743,-0.873l-2.034,-1.451l1.163,-2.032l2.034,1.451l1.454,0.000l0.291,2.032l2.616,0.291l2.327,0.000l1.743,0.291l-1.454,2.324l-1.163,0.289l-0.872,1.452l1.454,1.452l0.581,-1.742l0.872,0.000l-1.454,-4.356z",
						"BE" : "M482.78,89.837l2.034,0.000l2.617,-0.580l1.745,1.451l1.452,0.582l-0.290,1.742l-0.583,0.291l-0.290,1.451l-2.615,-1.161l-1.162,0.000l-2.036,-1.162l-1.163,-1.161l-1.452,0.000l-0.293,-0.872l-2.036,0.581z",
						"BF" : "M465.919,204.54l-1.744,-0.872l-1.452,0.291l-0.872,0.581l-1.164,-0.581l-0.579,-0.871l-1.165,-0.582l-0.290,-1.741l0.873,-1.161l0.000,-0.871l2.034,-2.324l0.291,-1.742l0.872,-0.871l1.452,0.581l1.163,-0.581l0.291,-0.872l2.035,-1.161l0.582,-0.871l2.617,-1.162l1.452,-0.290l0.582,0.581l2.035,0.000l-0.292,1.161l0.292,1.162l1.453,2.033l0.291,1.161l3.198,0.581l-0.291,2.032l-0.583,0.872l-1.161,0.290l-0.584,1.162l-0.870,0.290l-2.616,0.000l-1.163,-0.290l-0.872,0.290l-1.163,0.000l-4.942,0.000l0.000,1.452l-0.290,-2.323z",
						"BG" : "M536.265,109.294l0.581,1.162l1.164,-0.291l2.035,0.581l4.071,0.000l1.452,-0.581l3.196,-0.581l2.035,0.872l1.454,0.290l-1.163,1.161l-1.163,2.033l0.872,1.452l-2.324,-0.290l-2.907,0.871l0.000,1.452l-2.326,0.000l-2.034,-0.872l-2.326,0.872l-2.036,-0.290l0.000,-1.743l-1.452,-0.871l0.290,-0.292l-0.290,-0.289l0.580,-0.871l1.164,-0.871l-1.454,-1.162l-0.290,-1.161l-0.871,0.581z",
						"BI" : "M554.579,243.451l-0.290,-3.484l-0.583,-1.161l1.743,0.290l0.874,-1.743l1.454,0.291l0.000,0.871l0.582,0.871l0.000,0.872l-0.582,0.580l-1.163,1.454l-0.872,0.870l1.163,-0.289z",
						"BJ" : "M481.037,213.833l-2.037,0.290l-0.872,-2.033l0.290,-6.388l-0.579,-0.289l-0.291,-1.454l-0.872,-0.871l-0.873,-0.871l0.582,-1.452l0.870,-0.290l0.584,-1.162l1.161,-0.290l0.583,-0.872l1.161,-0.871l0.874,0.000l2.034,1.453l0.000,1.160l0.580,1.453l-0.580,1.160l0.291,0.873l-1.454,1.452l-0.582,0.871l-0.581,1.743l0.000,1.741l0.289,-4.647z",
						"BN" : "M787.998,218.479l1.163,-0.872l2.324,-1.741l0.000,1.451l-0.291,1.743l-1.163,0.000l-0.580,0.870l1.453,1.451z",
						"BO" : "M300.812,291.656l-3.197,-0.290l-1.163,2.323l-1.452,-2.033l-3.781,-0.582l-2.033,2.324l-2.036,0.582l-1.163,-4.065l-1.453,-2.906l0.872,-2.612l-1.453,-1.163l-0.291,-2.031l-1.454,-2.033l1.745,-2.904l-1.163,-2.324l0.582,-0.869l-0.582,-0.872l1.163,-1.452l0.000,-2.323l0.290,-2.033l0.582,-0.873l-2.326,-4.355l2.035,0.000l1.163,0.000l0.872,-0.870l2.326,-0.872l1.453,-1.162l3.487,-0.580l-0.289,2.031l0.289,1.163l0.000,1.743l2.909,2.612l3.196,0.290l0.872,1.162l2.035,0.581l1.163,0.872l1.744,0.000l1.453,0.580l0.000,1.743l0.582,0.871l0.000,1.162l-0.582,0.000l0.872,3.195l5.233,0.000l-0.291,1.740l0.291,0.873l1.453,0.871l0.872,1.742l-0.581,2.032l-0.873,1.453l0.291,1.451l-0.872,0.580l0.000,-0.871l-2.615,-1.451l-2.616,0.000l-4.652,0.871l-1.453,2.324l0.000,1.451l-1.163,3.485l0.291,0.581z",
						"BR" : "M315.056,314.017l3.778,-3.777l3.198,-2.613l1.745,-1.163l2.325,-1.450l0.000,-2.324l-1.454,-1.450l-1.162,0.580l0.580,-1.742l0.292,-1.454l0.000,-1.741l-1.163,-0.290l-0.872,0.290l-1.163,0.000l-0.290,-1.162l-0.291,-2.613l-0.291,-0.581l-2.035,-0.871l-1.163,0.581l-2.907,-0.581l0.291,-3.776l-0.872,-1.452l0.872,-0.580l-0.291,-1.451l0.873,-1.453l0.581,-2.032l-0.872,-1.742l-1.453,-0.871l-0.291,-0.873l0.291,-1.740l-5.233,0.000l-0.872,-3.195l0.582,0.000l0.000,-1.162l-0.582,-0.871l0.000,-1.743l-1.453,-0.580l-1.744,0.000l-1.163,-0.872l-2.035,-0.581l-0.872,-1.162l-3.196,-0.290l-2.909,-2.612l0.000,-1.743l-0.289,-1.163l0.289,-2.031l-3.487,0.580l-1.453,1.162l-2.326,0.872l-0.872,0.870l-1.163,0.000l-2.035,0.000l-1.744,0.292l-1.163,-0.292l0.292,-4.066l-2.326,1.453l-2.616,0.000l-0.872,-1.453l-1.744,0.000l0.581,-1.451l-1.744,-1.451l-1.163,-2.614l0.872,-0.581l0.000,-1.162l1.744,-0.581l-0.290,-1.451l0.581,-1.162l0.291,-1.161l3.198,-2.034l2.033,-0.289l0.583,-0.580l2.324,0.290l1.163,-7.551l0.291,-1.161l-0.582,-1.743l-1.162,-0.871l0.000,-2.033l1.453,-0.581l0.582,0.290l0.291,-0.871l-1.745,-0.290l0.000,-1.742l5.233,0.000l0.871,-0.871l0.873,0.871l0.582,1.452l0.581,-0.290l1.452,1.451l2.036,-0.289l0.580,-0.582l2.036,-0.870l1.162,-0.291l0.291,-1.162l2.035,-0.871l-0.291,-0.581l-2.324,-0.289l-0.292,-1.744l0.000,-1.741l-1.163,-0.872l0.582,0.000l2.034,0.290l2.326,0.582l0.581,-0.582l2.035,-0.580l3.198,-0.871l0.872,-1.162l-0.291,-0.580l1.453,-0.291l0.582,0.582l-0.290,1.451l0.872,0.290l0.580,1.161l-0.580,1.162l-0.582,2.324l0.582,1.451l0.291,1.162l1.743,1.162l1.454,0.290l0.290,-0.581l0.872,0.000l1.163,-0.581l0.871,-0.871l1.454,0.290l0.872,0.000l1.454,0.291l0.290,-0.581l-0.581,-0.581l0.291,-0.870l1.163,0.289l1.162,-0.289l1.745,0.581l1.161,0.581l0.873,-0.873l0.582,0.292l0.290,0.581l1.453,0.000l0.872,-1.162l0.872,-2.034l1.745,-2.323l0.872,-0.290l0.581,1.452l1.744,4.936l1.453,0.291l0.000,2.032l-2.034,2.323l0.872,0.872l4.942,0.290l0.000,2.904l2.034,-2.033l3.489,1.163l4.650,1.741l1.163,1.453l-0.290,1.451l3.197,-0.872l5.232,1.453l4.070,0.000l4.069,2.322l3.780,3.196l2.034,0.582l2.326,0.289l0.872,0.870l1.162,3.485l0.291,1.452l-1.162,4.646l-1.163,1.742l-4.070,3.775l-1.744,3.194l-2.035,2.323l-0.581,0.290l-0.873,2.034l0.291,4.936l-0.872,4.357l-0.290,1.742l-0.873,1.162l-0.581,3.774l-2.615,3.483l-0.583,2.906l-2.034,1.161l-0.872,1.453l-2.907,0.000l-4.360,1.160l-1.745,1.162l-3.197,0.871l-3.198,2.324l-2.325,2.613l-0.581,2.032l0.581,1.452l-0.581,2.904l-0.581,1.163l-2.035,1.742l-2.907,4.645l-2.325,2.323l-2.036,1.162l-1.162,2.615l-1.744,1.740l-0.872,-1.740l1.163,-1.164l-1.454,-2.032l-2.325,-1.451l-2.907,-1.743l-0.872,0.000l-2.907,-2.033l1.744,-0.292z",
						"BS" : "M260.408,165.628h-0.872l-0.581-1.452l-1.163-0.871l0.872-1.743l0.581,0.291l1.164,2.033V165.628zM259.536,157.788l-2.907,0.581l-0.291-1.162l1.454-0.29l1.744,0.29V157.788zM261.86,157.788l-0.58,2.032l-0.583-0.29l0.291-1.451l-1.453-1.162v-0.291L261.86,157.788z",
						"BT" : "M726.082,154.594l1.163,0.871l0.000,1.742l-2.326,0.000l-2.326,-0.290l-1.744,0.581l-2.615,-1.162l0.000,-0.581l1.743,-2.033l1.454,-0.580l2.035,0.580l1.453,0.000l-1.163,-0.872z",
						"BW" : "M544.405,281.784l0.582,0.580l0.870,1.742l2.907,2.903l1.455,0.292l0.000,0.870l0.580,1.744l2.326,0.579l1.745,1.162l-4.071,2.033l-2.324,2.032l-0.871,1.742l-0.874,1.161l-1.452,0.293l-0.584,1.161l-0.289,0.870l-1.744,0.582l-2.327,0.000l-1.162,-0.872l-1.162,-0.290l-1.454,0.580l-0.582,1.453l-1.452,0.870l-1.164,1.162l-2.033,0.290l-0.582,-0.872l0.289,-1.741l-1.741,-2.613l-0.874,-0.580l0.000,-7.843l2.908,-0.289l0.000,-9.582l2.033,-0.291l4.361,-0.871l0.871,1.162l1.744,-1.162l0.874,0.000l1.743,-0.582l0.291,0.291l-1.163,-2.034z",
						"BY" : "M538.301,82.579l2.907,0.000l2.908,-0.872l0.578,-1.452l2.326,-1.162l-0.290,-1.160l1.745,-0.291l2.906,-1.162l2.908,0.581l0.290,0.872l1.454,-0.291l2.615,0.581l0.289,1.161l-0.578,0.871l1.743,1.743l1.163,0.581l-0.292,0.290l2.036,0.580l0.872,0.872l-1.163,0.580l-2.326,-0.290l-0.581,0.290l0.871,0.872l0.583,2.033l-2.328,0.000l-0.870,0.580l-0.290,1.451l-0.873,-0.289l-2.615,0.000l-0.583,-0.581l-1.162,0.581l-1.163,-0.291l-2.036,-0.290l-3.196,-0.581l-2.615,-0.291l-2.035,0.291l-1.746,0.581l-1.163,0.000l0.000,-1.161l-0.871,-1.162l1.453,-0.582l0.000,-1.161l-0.582,-0.870l0.289,1.452z",
						"BZ" : "M228.433,181.89l0.000,-0.290l0.290,-0.290l0.582,0.580l0.872,-1.742l0.580,0.000l0.000,0.290l0.581,0.000l-0.289,0.872l-0.292,1.162l0.292,0.289l-0.292,1.162l0.000,0.291l-0.290,1.161l-0.582,0.872l-0.291,0.000l-0.581,0.870l-0.872,0.000l0.292,-2.903l0.000,2.324z",
						"CA" : "M298.487,102.905l2.035,0.291h2.617l-1.454,1.162l-0.872,0.29l-3.488-1.162l-0.873-1.161l1.163-0.872L298.487,102.905zM303.719,95.937h-1.454l-3.488-0.872l-2.616-1.162l0.872-0.291l3.779,0.581l2.616,1.162L303.719,95.937zM133.669,97.679l-1.163,0.291l-4.651-1.162l-0.872-1.162l-2.324-0.871l-0.582-0.871l-2.907-0.581l-0.872-1.452V91.29l2.907,0.581l1.744,0.58l2.617,0.291l0.872,0.872l1.454,1.162l2.615,1.162L133.669,97.679zM319.125,91.581l-1.744,2.323l1.744-0.871l2.035,0.581l-1.163,0.871l2.617,0.873l1.163-0.582l2.906,0.871l-0.872,1.742l1.744-0.291l0.292,1.452l0.872,1.742l-1.164,2.323h-1.162l-1.744-0.29l0.582-2.323l-0.872-0.29l-3.198,2.323h-1.453l1.744-1.452l-2.617-0.581h-2.907h-5.232l-0.58-0.872l1.744-0.871l-1.164-0.871l2.326-1.451l2.906-4.356l1.745-1.743l2.325-0.87h1.163l-0.582,0.87L319.125,91.581zM108.38,82.289l2.616-0.291l-0.58,3.195l2.324,2.323h-1.163l-1.744-1.453l-0.871-1.161l-1.454-0.871l-0.582-1.162l0.291-0.871L108.38,82.289zM255.466,59.928l-0.872,1.453l-1.453-0.291l-0.582-0.58v-0.291l1.163-0.872h1.163L255.466,59.928zM248.198,58.477l-3.197,1.451h-1.744l-0.581-0.581l2.034-1.452h3.779L248.198,58.477zM239.478,50.346l0.291,1.161l1.454-0.29l1.744,0.581l2.906,1.162l3.198,0.871l0.29,1.162l2.035-0.29l1.745,0.871l-2.326,0.872l-4.361-0.581l-1.453-1.161l-2.617,1.452l-4.069,1.451l-0.872-1.742l-3.779,0.291l2.325-1.162l0.291-2.323l1.163-2.613L239.478,50.346zM265.058,46.28l-3.198,0.291l-0.58-1.453l1.162-1.451l2.326-0.581l2.326,0.871v1.161l-0.291,0.292L265.058,46.28zM210.41,40.763l-1.744,1.162l-3.488-0.872l-2.325,0.291l-3.779-1.162l2.325-0.872l2.035-1.162l2.907,0.581l1.744,0.581l0.581,0.581L210.41,40.763zM224.653,39.891v2.614l3.488-2.032l3.197,1.742l-0.581,2.033l2.616,2.032l2.907-2.032l2.035-2.324v-3.195l4.069,0.292l4.07,0.29l3.488,1.452l0.291,1.452l-2.035,1.452l1.744,1.451l-0.291,1.162l-5.231,2.033l-3.779,0.291l-2.907-0.581l-0.872,1.161l-2.617,2.323l-0.872,1.453l-3.196,1.743l-3.78,0.29l-2.325,1.162l-0.292,1.741l-3.197,0.291l-3.198,2.324l-2.907,2.904l-1.162,2.323l-0.292,3.194l4.07,0.291l1.454,2.614l1.163,2.033l3.779-0.582l5.232,1.453l2.616,0.871l2.035,1.452l3.489,0.582l2.907,1.162l4.651,0.29l2.906,0.291l-0.581,2.323l0.872,2.614l2.035,3.194l4.07,2.613l2.326-0.871l1.452-2.903l-1.452-4.357l-2.035-1.452l4.36-1.162l3.197-2.033l1.455-1.742l-0.292-2.032l-1.744-2.324L257.5,69.22l3.489-2.904l-1.162-2.323l-1.163-4.355l2.034-0.582l4.651,0.582l2.907,0.29l2.326-0.581l2.616,0.872l3.198,1.451l0.872,1.162l4.941,0.291v2.323l0.872,3.484l2.616,0.291l1.745,1.742l4.07-1.742l2.616-2.904l1.744-1.161l2.325,2.323l3.488,3.484l3.198,3.195l-1.163,1.742l3.487,1.742l2.616,1.451l4.36,0.872l1.744,0.871l1.163,2.324l2.035,0.29l1.163,0.872l0.291,3.194l-2.035,1.161l-2.035,0.872l-4.65,0.871l-3.198,2.323l-4.942,0.582l-5.814-0.582h-4.07h-2.906l-2.326,2.033l-3.488,1.162l-3.779,3.775l-3.197,2.613l2.325-0.58l4.36-3.486l5.814-2.322l4.069-0.291l2.326,1.162l-2.616,2.032l0.872,2.905l0.872,2.032l3.779,1.452l4.361-0.581l2.906-2.903l0.292,2.032l1.744,0.871l-3.489,1.742l-6.104,1.743l-2.616,1.161l-3.198,2.033l-2.034-0.291l-0.29-2.323l4.94-2.324h-4.36l-3.197,0.291l-1.744-1.452v-3.775l-1.163-0.87l-2.035,0.581l-0.872-0.581l-2.035,2.032l-0.873,2.033l-0.872,1.162l-1.162,0.58h-0.872l-0.292,0.871h-5.232h-4.07l-1.163,0.581l-2.907,1.743l-0.291,0.29l-0.872,1.162h-2.616h-2.616l-1.454,0.291l0.582,0.581l0.291,0.871l-0.291,0.291l-3.488,1.453l-2.907,0.29l-3.197,1.452h-0.581l-0.872-0.29l-0.292-0.581v-0.29l0.581-0.873l1.163-1.451l0.872-1.742l-0.58-2.323l-0.583-2.613l-2.906-1.162l0.581-0.581l-0.581-0.29h-0.581l-0.583-0.291l-0.29-0.871l-0.583,0.291h-0.58v-0.291l-0.582-0.291l-0.291-0.58l-2.035-0.871l-2.326-0.872l-2.616-1.162l-2.617-1.161l-2.326,0.87h-0.872l-3.488-0.581l-2.325,0.291l-2.616-0.871l-2.907-0.291l-1.744-0.291l-0.871-0.581l-0.582-1.452h-0.873v1.161h-5.813h-9.302h-9.302h-8.43h-8.138h-8.14h-8.43h-2.616h-8.139h-7.849h-0.582l-5.231-2.613l-2.036-1.452l-4.941-0.871l-1.454-2.614l0.291-1.742l-3.488-1.161l-0.291-2.033l-3.488-2.033v-1.452l1.454-1.452v-1.743l-4.65-1.742l-2.908-2.903l-1.744-2.033l-2.616-1.162l-1.744-1.162l-1.454-1.451l-2.616,0.871L95.3,68.93l-2.326-1.741l-2.035-1.162l-2.616-0.872h-2.616V49.475V39.311l5.232,0.581l4.069,1.453h2.907l2.616-0.871l3.198-0.871l4.07,0.29l4.069-1.162l4.651-0.87l1.744,1.162l2.035-0.581l0.872-1.452l1.744,0.29l4.651,2.613l3.778-1.742l0.292,2.033l3.487-0.581l0.872-0.872l3.487,0.292l4.071,1.161l6.395,0.871l3.779,0.582l2.907-0.291l3.488,1.452l-3.779,1.453l4.94,0.581l7.559-0.291l2.325-0.581l2.906,1.742l2.908-1.451l-2.616-1.162l1.744-0.871l3.196-0.291l2.326-0.29l2.035,0.871l2.907,1.452l3.197-0.291l4.65,1.162l4.361-0.291h4.07l-0.291-1.742l2.326-0.581l4.36,1.162v2.614l1.744-2.324h2.035l1.454-2.614l-3.198-1.742l-3.196-1.162l0.291-2.903l3.198-2.033l3.778,0.29l2.617,1.453l3.779,2.904l-2.326,1.451L224.653,39.891zM159.54,29.728l-1.453,1.453l6.104-0.871l3.779,1.451l3.197-1.451l2.617,0.871l2.035,2.613l1.454-1.161l-1.745-2.615l2.327-0.581l2.615,0.581l3.198,1.162l1.744,2.613l0.872,2.033l4.651,1.162l4.941,1.452l-0.29,1.162l-4.651,0.29l1.744,0.872l-0.873,1.162l-4.941-0.581l-4.651-0.581h-3.198l-5.231,1.162l-6.977,0.291l-4.941,0.29l-1.454-1.452l-3.778-0.58l-2.617,0.29l-3.198-2.323l1.744-0.291l4.36-0.29h3.778l3.488-0.291l-5.233-0.871l-5.813,0.291h-4.069l-1.454-1.162l6.396-0.871h-4.07l-4.941-0.872l2.325-2.033l2.036-1.162l7.267-1.452L159.54,29.728zM185.993,29.147l-2.326,1.742l-4.361-2.032l1.163-0.291h3.488L185.993,29.147zM263.604,30.018l0.291,0.582h-2.907h-2.906l-3.197,0.29l-0.582-0.29l-3.198-1.452l0.291-0.872l1.163-0.291l6.396,0.291L263.604,30.018zM235.409,29.728l2.325,1.743l2.326-2.323l6.977-0.872l4.941,2.614l-0.582,2.033l5.523-0.871l2.616-1.162l6.104,1.451l3.78,1.162l0.29,1.162l5.233-0.581l2.906,1.742l6.687,1.162l2.326,1.161l2.616,2.614l-5.233,1.162l6.687,1.742l4.359,0.582l3.779,2.613l4.36,0.29l-0.872,1.743l-4.651,3.194l-3.488-1.162l-4.36-2.613l-3.488,0.291l-0.291,1.742l2.907,1.452l3.778,1.452l0.872,0.581l2.036,2.904l-1.164,1.743l-3.488-0.582l-6.685-2.323l3.779,2.323l2.906,1.743l0.292,0.871l-7.268-0.871l-6.104-1.743l-3.198-1.161l0.872-0.871l-4.07-1.451l-4.07-1.453v0.871l-7.848,0.582L257.5,53.25l1.745-2.033h5.232l5.814-0.291l-1.163-0.871l1.163-1.452l3.488-2.613l-0.872-1.162l-0.873-1.162l-4.36-1.162l-5.522-1.161l1.743-0.581l-2.907-1.742h-2.325l-2.326-1.162l-1.453,0.87l-4.942,0.292l-9.883-0.581l-5.814-0.581l-4.651-0.582l-2.325-0.871l2.908-1.451h-3.78l-0.872-2.615l2.036-2.613l2.906-0.87l6.977-0.872L235.409,29.728zM197.62,27.985l3.198,0.582l4.942-0.582l0.582,0.872l-2.617,1.452l4.361,1.162l-0.582,2.323l-4.361,1.162l-2.907-0.291l-1.744-0.871l-6.976-2.323l0.29-0.871l5.523,0.29l-3.196-1.742L197.62,27.985zM217.096,30.89l-2.907,2.033h-3.197l-1.454-2.613v-1.452l1.454-1.162l2.616-0.581h5.814l5.232,0.871l-4.069,2.324L217.096,30.89zM142.099,34.665l-7.267,1.162l-1.453-1.162l-6.396-1.452l1.455-1.162l1.743-2.033l2.326-1.742l-2.615-1.742l9.301-0.29l4.07,0.581h6.976l2.616,0.871l2.907,1.162l-3.488,0.87l-6.686,1.743l-3.488,2.032V34.665zM216.224,24.792l-1.744,1.162l-3.778-0.291l-3.489-0.871l1.453-1.162l4.07-0.58l2.326,0.871L216.224,24.792zM202.562,19.855l2.035,1.452l0.291,1.452l-1.454,2.033l-4.36,0.291l-2.908-0.582v-1.452h-4.65v-2.033h2.906l4.07-0.871l4.07,0.291V19.855zM175.819,21.307l1.163,1.162l2.324-0.582l2.907,0.291l0.582,1.161l-1.745,1.453l-9.301,0.291l-6.977,1.162h-4.07l-0.291-0.873l5.523-1.16l-12.208,0.29l-4.07-0.29l3.779-2.904l2.616-0.581l7.848,0.871l4.942,1.453l4.651,0.29l-3.779-2.613l2.326-0.871l2.907,0.29L175.819,21.307zM213.026,18.984l3.198,0.872h5.523l2.326,0.871l-0.582,1.161l2.906,0.582l1.744,0.58h3.779l4.069,0.29l4.361-0.58l5.522-0.29l4.651,0.29l2.907,0.871l0.582,1.162l-1.744,0.871l-4.07,0.582l-3.488-0.291l-7.848,0.291h-5.813l-4.36-0.291l-7.268-0.871l-0.872-1.453l-0.582-1.451l-2.617-1.162l-5.814-0.291l-3.196-0.871l1.163-1.162L213.026,18.984zM154.018,17.532l-0.582,2.033l-2.035,0.871l-2.616,0.29l-4.941,1.161l-4.65,0.291l-3.488-0.582l4.651-2.032l5.523-1.742h4.36L154.018,17.532zM215.351,17.823h-1.163l-5.231-0.291l-0.582-0.581h5.522l1.744,0.581L215.351,17.823zM170.586,17.243l-5.232,0.87l-4.071-0.87l2.326-0.873l3.779-0.29l4.07,0.29L170.586,17.243zM172.04,14.919l-3.488,0.291H163.9v-0.291l2.907-0.872l1.453,0.29L172.04,14.919zM210.12,16.37l-4.07,0.581l-2.326-0.87l-1.163-0.871l-0.291-1.162h3.488l1.744,0.29l3.198,0.872L210.12,16.37zM198.201,15.499l1.163,1.162l-4.361-0.291l-4.65-0.871h-6.104l2.616-0.871l-3.198-0.581l-0.291-1.162l5.524,0.291l7.266,1.161L198.201,15.499zM234.246,12.015l3.198,0.871l-3.779,0.582l-4.942,2.322h-4.942l-5.813-0.291l-2.907-1.162v-0.87l2.325-0.872h-4.941l-3.198-0.872l-1.744-1.162l2.034-1.161l1.744-0.871l2.907-0.291l-1.163-0.581l6.395-0.29l3.489,1.452l4.651,0.871l4.36,0.29L234.246,12.015zM285.116,2.432l7.558,0.29l5.813,0.291l4.942,0.58v0.873l-6.685,1.161l-6.687,0.581l-2.616,0.582h6.104L287.15,8.53l-4.651,0.581l-4.651,2.324l-5.813,0.58l-1.744,0.581l-8.139,0.291l3.778,0.291l-2.035,0.58l2.326,1.162l-2.616,1.162l-4.36,0.581l-1.162,1.162l-3.779,0.871l0.291,0.581h4.65v0.581l-7.267,1.741l-7.268-0.871l-7.848,0.291l-4.361-0.291h-4.941l-0.581-1.452l5.231-0.581l-1.454-2.033h1.744l7.268,1.162l-3.779-1.742l-4.36-0.582l2.326-1.162l4.651-0.581l0.872-0.871l-3.779-1.162l-1.163-1.451h7.558l2.034,0.29l4.361-0.87l-6.105-0.291h-9.883L227.85,8.53l-2.325-1.162l-3.197-0.581l-0.582-1.162l4.07-0.291l3.197-0.29l5.232-0.291l4.07-1.162l3.488,0.291l2.906,0.582l2.327-1.453l3.487-0.291l4.942-0.29l8.429-0.291l1.454,0.291l7.849-0.291h6.104L285.116,2.432z",
						"CD" : "M558.648,221.382l-0.289,3.196l1.162,0.289l-0.873,0.871l-0.871,0.872l-1.163,1.451l-0.581,1.161l-0.291,2.324l-0.582,0.871l0.000,2.324l-0.871,0.580l0.000,1.742l-0.290,0.290l-0.293,1.453l0.583,1.161l0.290,3.484l0.581,2.324l-0.290,1.452l0.290,1.742l1.744,1.452l1.455,3.485l-1.163,-0.290l-3.490,0.581l-0.873,0.290l-0.873,1.742l0.873,1.161l-0.580,3.195l-0.293,2.904l0.584,0.291l2.035,1.160l0.581,-0.581l0.289,2.904l-2.033,0.000l-1.163,-1.451l-0.872,-1.162l-2.325,-0.291l-0.581,-1.452l-1.745,0.873l-2.036,-0.291l-0.871,-1.452l-1.743,-0.291l-1.454,0.291l0.000,-0.872l-1.164,-0.290l-1.161,0.000l-1.745,0.290l-1.162,0.000l-0.581,0.292l0.000,-3.196l-0.873,-1.162l-0.290,-1.740l0.579,-1.453l-0.579,-1.161l0.000,-1.743l-3.488,0.000l0.289,-0.871l-1.452,0.000l0.000,0.290l-1.745,0.291l-0.581,1.452l-0.582,0.871l-1.452,-0.581l-0.873,0.581l-2.033,0.000l-0.874,-1.452l-0.581,-0.871l-0.871,-1.453l-0.582,-2.032l-8.140,-0.290l-1.162,0.581l-0.581,-0.291l-1.163,0.581l-0.582,-0.871l0.874,-0.291l0.000,-1.161l0.578,-0.872l0.874,-0.580l0.871,0.291l0.873,-0.873l1.452,0.000l0.292,0.582l0.871,0.580l1.744,-1.741l1.456,-1.454l0.870,-0.870l-0.289,-2.033l1.162,-2.903l1.453,-1.162l1.746,-1.452l0.290,-0.871l0.000,-1.162l0.581,-0.871l-0.292,-1.451l0.292,-2.614l0.579,-1.451l0.874,-1.744l0.291,-1.452l0.289,-2.032l0.874,-1.452l1.452,-0.870l2.326,0.870l1.745,1.162l2.033,0.290l2.036,0.580l0.871,-1.742l0.291,-0.290l1.454,0.290l2.907,-1.160l1.163,0.579l0.871,-0.290l0.291,-0.580l1.163,-0.291l2.034,0.291l1.744,0.000l0.873,-0.291l1.743,2.323l1.161,0.291l0.873,-0.291l1.166,0.000l1.450,-0.581l0.874,1.162l-2.325,-2.032z",
						"CF" : "M515.918,210.638l2.325,-0.290l0.293,-0.871l0.579,0.291l0.582,0.580l3.488,-1.162l1.163,-1.161l1.454,-0.872l-0.292,-0.870l0.871,-0.291l2.618,0.291l2.617,-1.452l2.034,-2.905l1.452,-1.161l1.744,-0.581l0.292,1.162l1.452,1.742l0.000,1.162l-0.289,1.163l0.000,0.870l0.871,0.870l2.327,1.162l1.452,1.162l0.000,0.871l1.743,1.452l1.163,1.161l0.873,1.743l2.034,0.871l0.292,0.871l-0.873,0.291l-1.744,0.000l-2.034,-0.291l-1.163,0.291l-0.291,0.580l-0.871,0.290l-1.163,-0.579l-2.907,1.160l-1.454,-0.290l-0.291,0.290l-0.871,1.742l-2.036,-0.580l-2.033,-0.290l-1.745,-1.162l-2.326,-0.870l-1.452,0.870l-0.874,1.452l-0.289,2.032l-1.744,-0.290l-2.036,-0.290l-1.452,1.451l-1.455,2.325l-0.289,-0.581l-0.292,-1.453l-1.163,-0.872l-1.161,-1.452l0.000,-0.870l-1.454,-1.452l0.289,-0.870l-0.289,-1.162l0.289,-2.033l0.581,-0.581l-1.455,2.614z",
						"CG" : "M509.523,244.033l-0.874,-0.871l-0.870,0.581l-1.163,1.163l-2.325,-2.906l2.035,-1.742l-0.872,-1.743l0.872,-0.580l1.745,-0.291l0.289,-1.451l1.454,1.451l2.616,0.000l0.581,-1.162l0.582,-1.741l-0.291,-2.324l-1.454,-1.452l1.163,-3.194l-0.581,-0.580l-2.036,0.000l-0.871,-1.162l0.291,-1.451l3.488,0.289l2.034,0.581l2.327,0.871l0.289,-1.741l1.455,-2.325l1.452,-1.451l2.036,0.290l1.744,0.290l-0.291,1.452l-0.874,1.744l-0.579,1.451l-0.292,2.614l0.292,1.451l-0.581,0.871l0.000,1.162l-0.290,0.871l-1.746,1.452l-1.453,1.162l-1.162,2.903l0.289,2.033l-0.870,0.870l-1.456,1.454l-1.744,1.741l-0.871,-0.580l-0.292,-0.582l-1.452,0.000l-0.873,0.873l0.871,0.291z",
						"CH" : "M500.22,100.292l0.000,0.580l-0.289,0.581l1.162,0.581l1.452,0.000l-0.289,1.162l-1.163,0.290l-2.034,-0.290l-0.583,1.161l-1.453,0.000l-0.291,-0.290l-1.744,0.871l-1.160,0.000l-1.165,-0.581l-0.871,-1.161l-1.454,0.580l0.000,-1.451l2.034,-1.453l0.000,-0.580l1.163,0.291l0.873,-0.582l2.324,0.000l0.582,-0.580l-2.906,-0.871z",
						"CI" : "M465.919,217.317l-1.162,0.000l-2.034,-0.580l-1.744,0.000l-3.197,0.580l-2.036,0.581l-2.615,1.162l-0.582,0.000l0.289,-2.323l0.293,-0.291l-0.293,-1.162l-1.162,-1.161l-0.871,-0.290l-0.582,-0.581l0.582,-1.452l-0.291,-1.162l0.000,-0.870l0.581,0.000l0.000,-1.162l-0.290,-0.581l0.290,-0.290l1.162,-0.290l-0.871,-2.323l-0.581,-1.163l0.290,-0.871l0.581,-0.290l0.292,-0.292l0.870,0.582l2.037,0.000l0.582,-0.871l0.581,0.000l0.582,-0.291l0.579,1.162l0.583,-0.290l1.161,-0.292l1.165,0.582l0.579,0.871l1.164,0.581l0.872,-0.581l1.452,-0.291l1.744,0.872l0.874,3.775l-1.164,2.323l-0.872,3.195l1.162,2.323l0.000,-1.161z",
						"CL" : "M284.825,375.578v6.389h2.907h1.745l-0.872,1.162l-2.326,0.87l-1.454-0.291l-1.744-0.289l-1.744-0.582l-2.907-0.58l-3.487-1.451l-2.907-1.453l-3.779-3.193l2.326,0.58l3.778,2.033l3.78,0.87l1.453-1.16l0.872-2.033l2.326-1.162L284.825,375.578zM285.987,289.915l1.163,4.065l2.035-0.582l0.291,0.872l-1.163,2.613l-2.907,1.451v4.646l-0.582,0.87l0.872,1.163l-1.744,1.741l-2.035,2.324l-0.872,2.614l0.291,2.612l-1.744,2.904l1.163,4.646l0.873,0.58v2.613l-1.744,2.613l0.29,2.323l-2.326,1.742l0.292,2.613l0.581,2.615l-1.453,0.87l-0.872,2.613l-0.582,2.904l0.582,3.193l-1.164,0.581l0.582,3.194l1.162,1.162l-0.873,1.162l1.454,0.289l0.29,1.162l-1.452,0.58l0.291,1.451l-0.872,3.775l-1.455,2.323l0.292,1.453l-0.873,1.741l-2.035,1.161l0.291,2.904l0.873,0.873h1.744v2.03l1.163,1.453l6.685,0.58l2.617,0.29h-2.617l-1.163,0.581l-2.616,1.162l-0.291,2.612h-1.162l-3.198-0.87l-3.198-2.032l-3.488-1.453l-0.872-1.74l0.872-1.744l-1.454-1.742l-0.291-4.646l1.163-2.614l2.907-2.323l-4.07-0.581l2.617-2.612l0.872-4.357l2.907,0.873l1.453-5.808l-1.744-0.581l-0.872,3.484l-1.744-0.582l0.872-3.773l0.872-5.228l1.454-1.742l-0.872-2.905l-0.291-2.902l1.163-0.29l1.744-4.356l1.744-4.356l1.162-4.064l-0.581-4.065l0.872-2.323l-0.292-3.485l1.744-3.192l0.292-5.518l0.872-5.519l0.871-6.388v-4.356l-0.582-3.774l1.163-0.872l0.872-1.45l1.454,2.032l0.291,2.031l1.454,1.163l-0.872,2.612L285.987,289.915z",
						"CM" : "M509.814,224.578l-0.291,0.000l-1.744,0.289l-1.744,-0.289l-1.163,0.000l-4.652,0.000l0.582,-2.034l-1.163,-1.742l-1.163,-0.582l-0.581,-1.160l-0.872,-0.581l0.000,-0.581l0.872,-2.032l1.164,-2.614l0.872,0.000l1.743,-1.743l0.871,0.000l1.746,1.161l1.744,-0.870l0.291,-1.162l0.580,-1.161l0.581,-1.452l1.455,-1.161l0.581,-1.742l0.582,-0.582l0.289,-1.452l0.873,-1.742l2.326,-2.323l0.000,-0.872l0.289,-0.580l-1.163,-0.871l0.292,-0.871l0.582,-0.291l1.162,1.742l0.292,1.743l-0.292,2.032l1.453,2.324l-1.453,0.000l-0.581,0.289l-1.455,-0.289l-0.579,1.161l1.742,1.743l1.165,0.581l0.289,1.161l0.872,1.743l-0.290,0.870l-1.455,2.614l-0.581,0.581l-0.289,2.033l0.289,1.162l-0.289,0.870l1.454,1.452l0.000,0.870l1.161,1.452l1.163,0.872l0.292,1.453l0.289,0.581l-0.289,1.741l-2.327,-0.871l-2.034,-0.581l3.488,0.289z",
						"CN" : "M777.533,179.567l-2.325,1.451l-2.326-0.871v-2.323l1.163-1.453l3.196-0.581h1.455l0.581,0.872l-1.163,1.451L777.533,179.567zM825.204,94.194l4.651,0.871l3.488,1.742l0.871,2.614h4.361l2.325-0.872l4.651-0.871l-1.454,2.323l-1.163,1.162l-0.871,2.904l-2.034,2.613l-3.198-0.291l-2.325,0.871l0.581,2.324l-0.29,3.194l-1.454,0.291v1.161l-1.744-1.451l-1.163,1.451l-4.067,1.162l0.289,1.453h-2.325l-1.452-0.872l-1.745,2.032l-3.198,1.453l-2.033,1.742l-3.781,0.871l-2.033,1.162l-3.197,0.871l1.452-1.453l-0.58-1.16l2.325-1.742l-1.455-1.453l-2.324,1.162l-3.197,1.742l-1.745,1.742l-2.615,0.291l-1.452,1.16l1.452,1.743l2.326,0.581v1.162l2.325,0.872l2.906-2.033l2.616,1.162h1.744l0.289,1.452l-3.777,0.871l-1.454,1.452l-2.615,1.453l-1.453,1.742l3.196,1.742l0.872,2.614l1.743,2.613l1.745,2.033v2.033l-1.745,0.581l0.873,1.453l1.455,0.87l-0.292,2.324l-0.873,2.323h-1.452l-2.034,3.194l-2.326,3.484l-2.327,3.195l-3.778,2.613l-4.069,2.323l-2.905,0.291l-1.744,1.162l-0.873-0.871l-1.743,1.452l-3.779,1.451l-2.906,0.291l-0.872,2.904l-1.454,0.29l-0.873-2.033l0.584-1.162l-3.488-0.872l-1.455,0.581l-2.615-0.87l-1.454-0.873l0.581-1.742l-2.615-0.581l-1.452-0.871l-2.328,1.451l-2.615,0.291h-2.034l-1.454,0.58l-1.453,0.582l0.29,2.903h-1.455l-0.289-0.581v-1.161l-2.034,0.87l-1.163-0.581l-2.035-1.162l0.872-2.033l-1.743-0.581l-0.873-2.613l-2.905,0.58l0.29-3.484l2.615-2.323l0.291-2.033l-0.291-2.323l-1.161-0.581l-0.873-1.452h-1.455l-3.194-0.291l1.161-1.161l-1.455-1.743l-2.034,1.162l-2.033-0.581l-3.198,1.742l-2.615,2.033l-2.326,0.29l-1.162-0.872h-1.453l-2.035-0.58l-1.454,0.58l-1.743,2.033l-0.292-2.033l-1.744,0.582L713,154.013l-2.906-0.581l-2.326-1.162l-2.034-0.581l-1.162-1.452l-1.454-0.291l-2.615-1.742l-2.326-0.871l-1.162,0.581l-3.781-2.033l-2.615-1.742l-0.873-2.904l2.036,0.291v-1.453l-1.163-1.161l0.293-2.324l-2.908-3.194l-4.361-1.161l-0.87-2.033l-2.036-1.451l-0.58-0.582l-0.292-1.742v-1.161l-1.743-0.582l-0.874,0.291l-0.579-2.324l0.579-0.871l-0.289-0.581l2.615-1.162l2.036-0.58l2.906,0.291l0.871-1.744l3.489-0.29l1.162-1.162l4.362-1.451l0.289-0.581l-0.289-1.743l2.033-0.581l-2.617-4.646l5.524-1.162l1.452-0.58l2.034-4.938l5.232,0.873l1.744-1.162v-2.904l2.328-0.291l2.033-1.742l1.163-0.29l0.581,2.032l2.326,1.452l4.067,0.872l1.746,2.323l-0.873,3.194l0.873,1.162l3.197,0.582l3.778,0.29l3.488,1.742l1.743,0.291l1.163,2.613l1.455,1.453h3.196l5.522,0.58l3.78-0.291l2.615,0.291l4.069,1.743h3.489l1.162,0.871l3.197-1.451l4.361-0.873l4.359-0.29l3.198-0.871l1.745-1.452l2.033-0.871l-0.581-0.872l-0.873-1.161l1.454-1.742l1.745,0.29l2.614,0.581l2.908-1.452l4.069-1.162l2.034-1.742l2.035-0.872l4.07-0.29l2.034,0.29l0.291-1.162l-2.325-1.741l-2.326-0.872l-2.036,0.872l-2.904-0.291l-1.455,0.291l-0.581-1.162l1.744-2.613l1.453-2.324l3.197,1.162l4.068-1.742v-1.162l2.328-2.903l1.452-0.872v-1.452l-1.452-0.871l2.325-1.162l3.486-0.58h3.491l4.067,0.58l2.617,1.162l1.744,2.903l0.871,1.161l0.874,1.453L825.204,94.194z",
						"CO" : "M266.221,231.256l-1.163,-0.582l-1.163,-0.870l-0.871,0.290l-2.326,-0.290l-0.582,-1.161l-0.580,0.000l-2.907,-1.452l-0.291,-0.872l1.162,-0.290l-0.290,-1.451l0.582,-0.873l1.452,-0.289l1.164,-1.744l1.161,-1.452l-1.161,-0.580l0.580,-1.452l-0.580,-2.613l0.580,-0.580l-0.580,-2.325l-1.164,-1.451l0.582,-1.451l0.872,0.289l0.582,-0.871l-0.872,-1.741l0.290,-0.292l1.454,0.000l2.034,-2.031l1.163,-0.291l0.000,-0.872l0.581,-2.322l1.744,-1.162l1.745,0.000l0.000,-0.582l2.325,0.291l2.035,-1.451l1.163,-0.582l1.454,-1.451l0.872,0.290l0.580,0.581l-0.290,0.871l-2.035,0.581l-0.581,1.452l-1.163,0.580l-0.581,1.162l-0.582,2.033l-0.581,1.452l1.453,0.290l0.291,1.161l0.580,0.582l0.292,1.161l-0.292,1.161l0.000,0.581l0.583,0.000l0.872,1.162l3.488,-0.291l1.453,0.291l2.035,2.323l1.163,-0.290l2.034,0.290l1.454,-0.290l0.872,0.290l-0.291,1.452l-0.872,0.871l0.000,2.033l0.581,2.033l0.582,0.580l0.291,0.580l-1.454,1.453l0.872,0.580l0.873,1.162l0.872,2.614l-0.581,0.290l-0.582,-1.452l-0.873,-0.871l-0.871,0.871l-5.233,0.000l0.000,1.742l1.745,0.290l-0.291,0.871l-0.582,-0.290l-1.453,0.581l0.000,2.033l1.162,0.871l0.582,1.743l-0.291,1.161l-1.163,7.551l-1.452,-1.454l-0.582,-0.290l1.744,-2.613l-2.326,-1.452l-1.452,0.290l-1.164,-0.579l-1.453,0.870l-2.035,-0.291l-1.744,-2.903l-1.163,-0.870l-0.872,-1.163l-1.744,-1.452l0.872,-0.291z",
						"CR" : "M245.292,208.315l-1.453,-0.580l-0.582,-0.582l0.291,-0.580l0.000,-0.581l-0.872,-0.579l-0.872,-0.582l-1.163,-0.291l0.000,-0.872l-0.872,-0.580l0.291,0.871l-0.582,0.581l-0.581,-0.581l-0.872,-0.291l-0.291,-0.580l0.000,-0.871l0.291,-0.871l-0.872,-0.291l0.581,-0.580l0.581,-0.291l1.745,0.581l0.581,-0.290l0.871,0.290l0.583,0.581l0.872,0.000l0.581,-0.581l0.580,1.452l1.164,1.162l1.162,1.161l-0.872,0.291l0.000,1.161l0.583,0.291l-0.583,0.581l0.291,0.289l-0.291,0.582l0.290,-0.580z",
						"CU" : "M247.326,167.081l2.326,0.290l2.326,0.000l2.325,0.871l1.163,1.161l2.616,-0.290l0.873,0.581l2.325,1.743l1.744,1.161l0.871,0.000l1.744,0.581l-0.290,0.871l2.035,0.000l2.325,1.161l-0.581,0.581l-1.744,0.291l-1.745,0.290l-2.035,-0.290l-3.778,0.290l1.743,-1.452l-1.161,-0.871l-1.744,0.000l-0.872,-0.871l-0.582,-1.742l-1.744,0.289l-2.616,-0.870l-0.582,-0.581l-3.779,-0.291l-0.872,-0.581l0.872,-0.580l-2.616,-0.290l-2.034,1.451l-1.163,0.000l-0.292,0.580l-1.452,0.292l-1.163,0.000l1.454,-0.872l0.581,-1.161l1.453,-0.581l1.163,-0.581l2.325,-0.290l-0.581,0.290z",
						"CY" : "M567.37,134.557l0.000,0.291l-2.909,1.161l-1.162,-0.581l-0.874,-1.161l1.456,0.000l0.580,0.290l0.582,-0.290l0.582,0.000l0.290,0.290l0.581,0.000l0.581,0.000l-0.293,0.000z",
						"CZ" : "M520.57,97.388l-1.455,-0.581l-1.163,0.000l-2.326,-0.581l-0.871,0.000l-1.453,1.162l-2.035,-0.871l-1.744,-1.161l-1.163,-0.582l-0.289,-1.161l-0.584,-0.872l2.036,-0.580l0.871,-0.871l2.036,-0.291l0.581,-0.581l0.871,0.290l1.165,-0.290l1.453,0.872l2.036,0.291l-0.293,0.580l1.454,0.580l0.581,-0.580l1.746,0.290l0.290,0.872l2.034,0.290l1.454,1.161l-0.874,0.000l-0.580,0.582l-0.582,0.000l-0.292,0.581l-0.289,0.289l-0.290,0.291l-0.871,0.290l-1.165,0.000l0.289,-0.581z",
						"DE" : "M501.093,79.674l0.000,1.161l2.906,0.582l0.000,0.872l2.617,-0.291l1.744,-0.872l2.907,1.163l1.452,0.870l0.583,1.452l-0.872,0.581l1.163,1.162l0.581,1.452l-0.292,0.870l1.165,1.742l-1.165,0.290l-0.871,-0.290l-0.581,0.581l-2.036,0.291l-0.871,0.871l-2.036,0.580l0.584,0.872l0.289,1.161l1.163,0.582l1.744,1.161l-1.162,1.162l-0.872,0.580l0.290,1.742l-0.290,0.291l-0.584,-0.581l-1.452,0.000l-2.034,0.581l-2.326,-0.291l-0.292,0.871l-1.452,-0.871l-0.873,0.291l-2.906,-0.871l-0.582,0.580l-2.324,0.000l0.290,-2.032l1.455,-1.743l-4.070,-0.580l-1.166,-0.581l0.000,-1.452l-0.579,-0.581l0.290,-1.742l-0.290,-2.904l1.454,0.000l0.871,-1.162l0.581,-2.323l-0.581,-1.161l0.581,-0.581l2.327,0.000l0.582,0.581l1.742,-1.451l-0.581,-0.872l0.000,-1.743l2.035,0.581l-1.744,0.581z",
						"DJ" : "M592.368,196.119l0.581,0.871l0.000,1.161l-1.453,0.582l1.161,0.580l-1.161,1.452l-0.583,-0.290l-0.581,0.000l-1.743,0.000l0.000,-0.871l0.000,-0.581l0.871,-1.452l0.872,-1.162l1.164,0.291l-0.872,0.581z",
						"DK" : "M508.649,77.933l-1.743,2.323l-2.615-1.452l-0.582-1.162l4.07-0.872L508.649,77.933zM503.708,75.609l-0.581,1.162l-0.871-0.291l-2.036,2.033l0.873,1.161l-1.744,0.582l-2.035-0.582l-1.161-1.451v-2.904l0.289-0.581l0.872-0.871h2.325l1.163-0.871l2.035-0.871v1.453l-0.872,0.87l0.291,0.871L503.708,75.609z",
						"DO" : "M276.396,176.664l0.290,-0.291l2.034,0.000l1.744,0.580l0.872,0.000l0.291,0.872l1.454,0.000l0.000,0.871l1.162,0.000l1.454,1.162l-0.872,1.161l-1.453,-0.871l-1.164,0.290l-0.872,-0.290l-0.581,0.581l-1.163,0.290l-0.290,-0.871l-0.873,0.581l-1.161,1.743l-0.872,-0.291l0.000,-0.871l0.000,-0.872l-0.582,-0.580l0.582,-0.582l0.290,-1.161l0.290,1.451z",
						"DZ" : "M506.906,166.5l-9.592,5.226l-7.849,5.227l-4.070,1.453l-2.906,0.000l0.000,-1.742l-1.452,-0.291l-1.454,-0.872l-0.873,-1.161l-9.301,-6.098l-9.301,-6.098l-10.176,-6.679l0.000,-0.291l0.000,-0.290l0.000,-3.194l4.361,-2.032l2.906,-0.581l2.036,-0.581l1.162,-1.452l3.197,-1.162l0.000,-2.032l1.744,-0.291l1.162,-0.870l3.782,-0.582l0.289,-0.871l-0.582,-0.580l-0.871,-2.905l-0.291,-1.742l-1.163,-1.742l2.907,-1.452l2.907,-0.581l1.744,-1.161l2.617,-0.872l4.650,-0.289l4.651,-0.291l1.162,0.291l2.615,-1.162l2.911,0.000l1.160,0.871l2.035,-0.290l-0.581,1.451l0.290,2.614l-0.579,2.323l-1.745,1.451l0.290,2.034l2.325,1.742l0.000,0.581l1.745,1.162l1.163,4.936l0.871,2.322l0.000,1.453l-0.291,2.033l0.000,1.451l-0.291,1.452l0.291,1.743l-1.162,1.161l1.744,2.033l0.000,1.162l1.163,1.451l1.163,-0.580l2.035,1.451l-1.452,-1.743z",
						"EC" : "M252.85,240.258l1.453,-2.033l-0.581,-1.162l-1.163,1.162l-1.744,-1.162l0.581,-0.581l-0.291,-2.613l0.873,-0.580l0.581,-1.454l0.872,-2.031l0.000,-0.872l1.454,-0.581l1.744,-1.160l2.907,1.452l0.580,0.000l0.582,1.161l2.326,0.290l0.871,-0.290l1.163,0.870l1.163,0.582l0.581,2.324l-0.872,1.741l-3.198,2.904l-3.196,0.871l-1.744,2.613l-0.582,1.742l-1.454,1.162l-1.162,-1.451l-1.163,-0.290l-1.163,0.290l0.000,-1.162l0.873,-0.582l0.291,1.160z",
						"EE" : "M540.626,72.125l0.291,-1.743l-0.872,0.290l-1.744,-0.870l-0.291,-1.743l3.489,-0.581l3.488,-0.582l2.906,0.582l2.906,0.000l0.291,0.291l-1.745,1.742l0.582,2.614l-1.163,0.871l-2.034,0.000l-2.614,-1.162l-1.165,-0.290l2.325,-0.581z",
						"EG" : "M569.987,149.947l-0.874,0.872l-0.581,2.323l-0.873,1.162l-0.582,0.580l-0.870,-0.871l-1.164,-1.161l-2.034,-4.066l-0.291,0.291l1.163,2.903l1.744,2.904l2.034,4.065l0.873,1.743l0.871,1.452l2.618,2.904l-0.584,0.580l0.000,1.743l3.198,2.613l0.581,0.580l-10.755,0.000l-10.755,0.000l-11.045,0.000l0.000,-10.162l0.000,-9.873l-0.871,-2.324l0.579,-1.451l-0.289,-1.162l0.871,-1.452l3.779,0.000l2.615,0.581l2.615,0.871l1.456,0.580l2.033,-0.870l1.165,-0.872l2.323,-0.290l2.036,0.290l0.872,1.452l0.580,-0.870l2.036,0.580l2.327,0.290l1.161,-0.870l-2.038,-4.935z",
						"ER" : "M590.332,196.409l-0.872,-0.871l-1.162,-1.452l-1.163,-1.162l-0.871,-0.870l-2.326,-1.162l-1.744,0.000l-0.873,-0.580l-1.453,0.870l-1.743,-1.452l-0.873,2.033l-3.198,-0.581l-0.290,-0.870l1.161,-4.065l0.291,-2.033l0.874,-0.873l2.035,-0.289l1.454,-1.742l1.452,3.193l0.871,2.614l1.454,1.452l3.779,2.613l1.454,1.453l1.453,1.742l0.871,0.871l1.455,0.871l-0.872,0.581l1.164,0.291z",
						"ES" : "M448.769,115.683l0.292,-1.743l-1.163,-1.452l3.778,-1.742l3.489,0.290l3.778,0.000l2.908,0.581l2.324,-0.290l4.362,0.290l1.163,0.871l4.940,1.452l1.163,-0.580l2.907,1.161l3.197,-0.292l0.292,1.454l-2.616,2.032l-3.489,0.580l-0.291,0.872l-1.744,1.451l-1.162,2.324l1.162,1.451l-1.453,1.162l-0.581,1.742l-2.325,0.581l-1.744,2.323l-3.489,0.000l-2.616,0.000l-1.743,0.872l-1.165,1.161l-1.452,-0.291l-0.871,-0.870l-0.874,-1.742l-2.615,-0.291l0.000,-1.162l0.871,-0.871l0.291,-0.871l-0.873,-0.581l0.873,-2.032l-1.162,-1.452l1.162,-0.291l0.000,-1.451l0.582,-0.291l0.000,-2.033l1.163,-0.870l-0.581,-1.452l-1.746,0.000l-0.291,0.290l-1.744,0.000l-0.581,-1.162l-1.163,0.291l1.163,-0.581z",
						"ET" : "M578.125,189.73l1.743,1.452l1.453,-0.870l0.873,0.580l1.744,0.000l2.326,1.162l0.871,0.870l1.163,1.162l1.162,1.452l0.872,0.871l-0.872,1.162l-0.871,1.452l0.000,0.581l0.000,0.871l1.743,0.000l0.581,0.000l0.583,0.290l-0.583,1.161l1.163,1.453l0.873,1.452l1.163,0.871l9.010,3.194l2.328,0.000l-7.850,8.421l-3.780,0.000l-2.324,2.033l-1.744,0.000l-0.874,0.870l-1.743,0.000l-1.161,-0.870l-2.618,1.162l-0.581,1.160l-2.036,-0.290l-0.580,-0.290l-0.580,0.000l-0.874,0.000l-3.489,-2.323l-2.033,0.000l-0.873,-0.871l0.000,-1.742l-1.452,-0.290l-1.455,-3.196l-1.454,-0.580l-0.290,-1.161l-1.452,-1.161l-1.746,-0.291l0.872,-1.452l1.455,0.000l0.582,-0.872l0.000,-2.613l0.579,-2.903l1.454,-0.582l0.292,-1.162l1.163,-2.322l1.743,-1.162l0.872,-2.904l0.581,-2.323l3.198,0.581l-0.873,2.033z",
						"FI" : "M552.544,41.053l-0.584,2.033l4.363,1.743l-2.617,2.032l3.198,3.194l-1.744,2.324l2.325,2.033l-1.162,1.742l4.069,2.032l-0.871,1.161l-2.617,1.742l-5.814,3.485l-4.941,0.291l-4.941,0.871l-4.362,0.580l-1.744,-1.451l-2.615,-0.871l0.581,-2.614l-1.452,-2.613l1.452,-1.453l2.616,-1.742l6.106,-3.193l2.033,-0.582l-0.289,-1.160l-4.072,-1.162l-0.872,-1.162l0.000,-4.065l-4.361,-2.033l-3.486,-1.452l1.453,-0.581l3.198,1.452l3.488,0.000l2.908,0.581l2.615,-1.162l1.452,-2.032l4.362,-1.162l3.487,1.162l1.162,-2.032z",
						"FJ" : "M964.732,278.588l0.873,0.871l-0.292,1.452l-1.744,0.291l-1.452-0.291l-0.292-1.162l0.873-0.87l1.455,0.291L964.732,278.588zM969.382,276.557l-1.741,0.579l-2.036,0.582l-0.292-1.161l1.455-0.291l0.873-0.291l1.741-0.871h-0.01h0.58l-0.29,1.162l-0.29,0.291H969.382z",
						"FK" : "M305.173,373.544l3.488,-1.741l2.326,0.870l1.744,-1.161l2.034,1.161l-0.872,0.871l-3.778,0.872l-1.164,-0.872l-2.325,1.162l1.453,1.162z",
						"FR" : "M329.008,223.997l-0.873,1.162h-1.453l-0.29-0.581l-0.582-0.292l-0.872,0.873l-1.162-0.581l0.581-1.162l0.291-1.162l0.582-1.161l-1.164-1.742l-0.289-1.743l1.453-2.612l0.872,0.289l2.034,0.872l2.907,2.323l0.582,1.161l-1.744,2.323L329.008,223.997zM500.22,115.102l-1.161,2.033l-1.164-0.582l-0.581-1.742l0.581-1.162l1.744-0.871L500.22,115.102zM483.652,92.451l2.036,1.162h1.162l2.615,1.162l0.581,0.291h0.871l1.165,0.581l4.07,0.58l-1.455,1.744l-0.29,2.032l-0.873,0.581l-1.163-0.291v0.581l-2.033,1.453v1.452l1.453-0.581l0.871,1.162l-0.291,0.871l0.872,1.162l-0.872,0.871l0.582,2.033l1.454,0.291l-0.291,1.162l-2.325,1.452l-5.523-0.581l-4.069,0.872l-0.292,1.741l-3.196,0.292l-2.907-1.162l-1.163,0.58l-4.94-1.452l-1.163-0.872l1.452-1.742l0.582-5.517l-2.907-2.905l-2.034-1.451l-4.36-0.872v-2.033l3.488-0.581l4.651,0.581l-0.872-2.903l2.615,1.162l6.396-2.324l0.87-2.324l2.325-0.29l0.293,0.872h1.452L483.652,92.451z",
						"GA" : "M504.291,242l-2.908,-2.904l-1.744,-2.322l-1.744,-2.905l0.291,-0.871l0.582,-0.871l0.581,-2.033l0.582,-2.033l0.871,0.000l4.070,0.000l0.000,-3.483l1.163,0.000l1.744,0.289l1.744,-0.289l0.291,0.000l-0.291,1.451l0.871,1.162l2.036,0.000l0.581,0.580l-1.163,3.194l1.454,1.452l0.291,2.324l-0.582,1.741l-0.581,1.162l-2.616,0.000l-1.454,-1.451l-0.289,1.451l-1.745,0.291l-0.872,0.580l0.872,1.743l2.035,-1.742z",
						"GB" : "M458.072,80.835l-1.452,2.033l-2.036-0.58h-1.745l0.582-1.453l-0.582-1.451l2.326-0.291L458.072,80.835zM465.629,69.802l-3.198,2.903l2.907-0.289h2.907l-0.582,2.032l-2.615,2.613h2.907l0.29,0.291l2.325,3.484l2.035,0.291l1.745,3.195l0.581,1.161l3.486,0.291l-0.29,2.033l-1.452,0.58l1.163,1.452l-2.617,1.453h-3.488l-4.94,0.871l-1.164-0.581l-1.744,1.161l-2.616-0.291l-2.034,1.162l-1.453-0.581l4.069-2.904l2.616-0.581l-4.359-0.581l-0.873-0.872l2.906-0.871l-1.454-1.451l0.582-2.033l4.069,0.291l0.291-1.452l-1.744-1.743l-3.488-0.58l-0.582-0.871l0.872-1.162l-0.872-0.581l-1.452,1.162V76.19l-1.454-1.453l0.873-2.904l2.326-2.032h2.033H465.629z",
						"GE" : "M588.298,116.844l0.291,-1.161l-0.582,-2.034l-1.743,-0.871l-1.455,-0.580l-1.162,-0.581l0.581,-0.581l2.325,0.581l3.779,0.581l3.780,1.162l0.581,0.580l1.745,-0.580l2.614,0.580l0.581,1.162l1.745,0.871l-0.582,0.290l1.455,1.452l-0.582,0.290l-1.454,-0.290l-2.034,-0.580l-0.581,0.290l-3.780,0.580l-2.615,-1.452l2.907,-0.291z",
						"GH" : "M476.676,214.704l-4.361,1.452l-1.452,1.161l-2.617,0.581l-2.327,-0.581l0.000,-1.161l-1.162,-2.323l0.872,-3.195l1.164,-2.323l-0.874,-3.775l-0.290,-2.323l0.000,-1.452l4.942,0.000l1.163,0.000l0.872,-0.290l1.163,0.290l0.000,0.872l0.871,1.161l0.000,2.033l0.292,2.322l0.871,0.872l-0.581,2.613l0.000,1.162l0.872,1.742l-0.582,-1.162z",
						"GL" : "M344.996,3.593l9.302,-1.451l9.593,0.000l3.488,-0.871l9.883,-0.291l21.800,0.291l17.442,2.322l-5.232,0.872l-10.465,0.290l-14.824,0.291l1.453,0.289l9.593,-0.289l8.429,0.871l5.232,-0.582l2.326,0.872l-2.907,1.452l6.977,-0.871l13.370,-1.162l8.139,0.581l1.455,1.162l-11.047,2.032l-1.743,0.580l-8.721,0.581l6.395,0.000l-3.196,2.033l-2.326,1.742l0.290,3.195l3.198,1.742l-4.361,0.000l-4.361,0.872l4.943,1.451l0.581,2.323l-2.908,0.291l3.781,2.323l-6.106,0.291l2.906,1.160l-0.871,0.872l-3.780,0.581l-3.777,0.000l3.488,1.742l0.000,1.161l-5.522,-1.161l-1.455,0.871l3.778,0.582l3.488,1.741l1.163,2.324l-4.940,0.580l-2.034,-1.162l-3.489,-1.742l0.871,2.033l-3.197,1.452l7.267,0.000l3.780,0.290l-7.269,2.324l-7.557,2.322l-7.848,0.872l-3.198,0.000l-2.907,0.871l-3.779,2.903l-5.814,2.034l-2.034,0.290l-3.489,0.581l-4.069,0.580l-2.326,1.742l0.000,2.034l-1.453,1.742l-4.360,2.033l0.872,2.323l-1.162,2.323l-1.454,2.613l-3.779,0.000l-4.069,-2.033l-5.524,0.000l-2.615,-1.742l-2.036,-2.614l-4.650,-3.484l-1.454,-1.742l-0.291,-2.324l-3.778,-2.613l0.872,-2.033l-1.744,-0.871l2.617,-3.194l4.359,-1.162l0.872,-1.161l0.582,-2.034l-3.198,0.873l-1.454,0.289l-2.325,0.582l-3.488,-0.871l0.000,-2.034l0.871,-1.452l2.617,0.000l5.523,0.872l-4.651,-1.742l-2.325,-1.162l-2.907,0.581l-2.326,-0.872l3.198,-2.322l-1.744,-1.162l-2.035,-2.033l-3.489,-2.904l-3.488,-0.871l0.000,-1.162l-7.266,-1.742l-5.814,0.000l-7.558,0.000l-6.685,0.290l-3.199,-0.870l-4.649,-1.743l7.266,-0.871l5.523,-0.291l-11.917,-0.580l-6.105,-1.162l0.291,-1.161l10.464,-1.162l10.173,-1.452l0.872,-0.871l-7.266,-1.162l2.326,-1.161l9.592,-1.742l4.070,-0.290l-1.163,-1.162l6.395,-0.872l8.429,-0.289l8.430,0.000l3.199,0.580l7.266,-1.453l6.395,1.162l4.070,0.291l5.523,0.871l-6.395,-1.451l-0.290,1.453z",
						"GM" : "M427.549,194.667l0.291,-1.162l2.909,0.000l0.581,-0.581l0.871,0.000l1.163,0.581l0.873,0.000l0.870,-0.581l0.582,0.872l-1.163,0.581l-1.162,0.000l-1.163,-0.581l-1.163,0.581l-0.582,0.000l-0.580,0.581l2.327,0.291z",
						"GN" : "M450.514,209.768l-0.871,0.000l-0.582,1.161l-0.581,0.000l-0.582,-0.581l0.290,-1.162l-1.162,-1.741l-0.872,0.290l-0.581,0.000l-0.581,0.290l0.000,-1.161l-0.582,-0.581l0.000,-0.870l-0.581,-1.163l-0.582,-0.871l-2.326,0.000l-0.581,0.580l-0.871,0.000l-0.292,0.581l-0.289,0.582l-1.455,1.451l-1.453,-1.742l-0.873,-1.163l-0.870,-0.289l-0.582,-0.581l-0.291,-1.161l-0.582,-0.582l-0.581,-0.580l1.163,-1.162l0.873,0.000l0.581,-0.580l0.582,0.000l0.580,-0.291l-0.291,-0.871l0.291,-0.291l0.000,-0.871l1.453,0.000l2.036,0.581l0.581,0.000l0.000,-0.290l1.744,0.290l0.289,-0.290l0.293,1.162l0.290,0.000l0.581,-0.582l0.582,0.291l0.871,0.580l1.165,0.291l0.579,-0.580l0.873,-0.582l0.871,-0.290l0.581,0.000l0.582,0.581l0.292,0.871l1.162,1.162l-0.582,0.580l-0.291,1.162l0.582,-0.291l0.581,0.291l-0.290,0.871l0.871,0.581l-0.581,0.290l-0.290,0.871l0.581,1.163l0.871,2.323l-1.162,0.290l-0.290,0.290l0.290,0.581l0.000,1.162l0.581,0.000z",
						"GQ" : "M499.931,228.061l-0.582,-0.290l0.871,-3.193l4.652,0.000l0.000,3.483l-4.070,0.000l0.871,0.000z",
						"GR" : "M538.882,132.815l1.744,0.871l2.034-0.29l2.033,0.29v0.582l1.455-0.291l-0.292,0.581l-4.067,0.291v-0.291l-3.199-0.581L538.882,132.815zM547.02,116.553l-0.871,1.742l-0.581,0.291h-1.745l-1.454-0.291l-3.196,0.872l1.744,1.451l-1.454,0.291h-1.452l-1.454-1.16l-0.582,0.58l0.582,1.452l1.454,1.453l-0.872,0.58l1.452,1.162l1.455,0.871v1.452l-2.617-0.581l0.873,1.452l-1.745,0.291l0.872,2.323h-1.744l-2.326-1.161l-0.871-2.324l-0.581-1.742l-1.163-1.162l-1.452-1.742v-0.58l1.16-1.453l0.292-0.87l0.873-0.291v-0.871l1.742-0.291l1.164-0.58h1.452l0.582-0.291l0.29-0.29l2.036,0.29l2.325-0.872l2.034,0.872h2.326v-1.452L547.02,116.553z",
						"GT" : "M225.816,193.215l-1.453,-0.580l-1.744,0.000l-1.163,-0.581l-1.454,-1.162l0.000,-0.871l0.291,-0.581l-0.291,-0.580l1.164,-2.033l3.487,0.000l0.292,-0.871l-0.582,-0.291l-0.291,-0.581l-1.162,-0.581l-0.872,-0.870l1.163,0.000l0.000,-1.743l2.615,0.000l2.617,0.000l0.000,2.324l-0.292,2.903l0.872,0.000l0.872,0.581l0.292,-0.291l0.872,0.291l-1.455,1.162l-1.161,0.580l-0.292,0.581l0.292,0.581l-0.583,0.580l-0.581,0.291l0.000,0.290l-0.580,0.291l-0.873,0.581l0.000,-0.580z",
						"GW" : "M432.201,200.475l-1.452,-1.162l-1.164,0.000l-0.582,-0.871l0.000,-0.291l-0.871,-0.580l-0.292,-0.581l1.453,-0.581l0.874,0.000l0.871,-0.290l4.942,0.290l0.000,0.871l-0.291,0.291l0.291,0.871l-0.580,0.291l-0.582,0.000l-0.581,0.580l-0.873,0.000l1.163,-1.162z",
						"GY" : "M309.243,208.025l1.744,0.871l1.744,1.742l0.000,1.452l1.162,0.000l1.453,1.452l1.163,0.873l-0.582,2.613l-1.453,0.579l0.000,0.872l-0.581,1.161l1.453,2.032l0.872,0.000l0.291,1.744l1.744,2.322l-0.872,0.000l-1.454,-0.290l-0.871,0.871l-1.163,0.581l-0.872,0.000l-0.290,0.581l-1.454,-0.290l-1.743,-1.162l-0.291,-1.162l-0.582,-1.451l0.582,-2.324l0.580,-1.162l-0.580,-1.161l-0.872,-0.290l0.290,-1.451l-0.582,-0.582l-1.453,0.291l-2.035,-2.322l0.873,-0.582l0.000,-1.163l1.743,-0.580l0.582,-0.581l-0.872,-0.871l0.290,-1.161l-2.036,1.452z",
						"HN" : "M233.374,195.248l-0.291,-0.871l-0.872,-0.291l0.000,-1.162l-0.291,-0.289l-0.582,0.000l-1.161,0.289l0.000,-0.289l-0.872,-0.581l-0.582,-0.581l-0.873,-0.291l0.583,-0.580l-0.292,-0.581l0.292,-0.581l1.161,-0.580l1.455,-1.162l0.289,0.000l0.582,-0.291l0.581,0.000l0.291,0.000l0.582,0.000l1.163,0.291l1.162,-0.291l0.873,-0.290l0.581,-0.290l0.872,0.290l0.581,0.000l0.582,0.000l0.581,-0.290l1.454,0.580l0.289,0.000l0.872,0.582l0.873,0.580l0.871,0.291l0.873,0.870l-1.162,0.000l-0.291,0.291l-0.872,0.291l-0.872,0.000l-0.581,0.290l-0.582,0.000l-0.290,-0.290l-0.291,0.000l-0.291,0.580l-0.291,0.000l0.000,0.581l-1.163,0.871l-0.581,0.291l-0.291,0.289l-0.581,-0.580l-0.581,0.871l-0.582,-0.291l-0.871,0.291l0.290,1.162l-0.581,0.000l-0.291,0.871l0.872,0.000z",
						"HR" : "M525.51,104.647l0.871,1.163l0.873,0.870l-1.163,0.872l-1.163,-0.581l-2.033,0.000l-2.325,-0.291l-1.163,0.000l-0.582,0.581l-1.162,-0.581l-0.581,0.872l1.454,1.451l0.579,0.872l1.163,0.871l1.162,0.581l0.874,1.161l2.614,1.161l-0.289,0.580l-2.615,-1.160l-1.746,-0.871l-2.326,-0.871l-2.326,-2.033l0.582,-0.291l-1.453,-1.162l0.000,-0.870l-1.744,-0.291l-0.871,1.161l-0.873,-1.161l0.292,-0.870l1.743,0.000l0.580,-0.291l0.873,0.291l1.163,0.000l0.000,-0.582l0.871,-0.290l0.293,-1.162l2.325,-0.580l0.871,0.290l2.036,1.161l2.325,0.581l-0.871,0.581z",
						"HT" : "M272.326,176.083l1.744,0.290l2.326,0.291l0.290,1.451l-0.290,1.161l-0.582,0.582l0.582,0.580l0.000,0.872l-1.745,-0.581l-1.453,0.290l-1.744,-0.290l-1.163,0.581l-1.454,-0.872l0.291,-0.871l2.326,0.291l2.325,0.290l0.872,-0.581l-1.163,-1.161l0.000,-1.161l-1.744,-0.292l-0.582,0.870z",
						"HU" : "M518.243,102.034l1.164,-1.742l-0.582,-0.581l1.453,0.000l0.292,-1.162l1.454,0.872l0.871,0.290l2.324,-0.581l0.291,-0.291l1.163,-0.290l1.163,-0.290l0.289,0.000l1.455,-0.290l0.582,-0.581l0.870,-0.291l2.908,0.872l0.582,-0.290l1.452,0.870l0.291,0.581l-1.743,0.581l-1.164,2.034l-1.742,1.741l-2.325,0.581l-1.455,0.000l-2.326,0.580l-0.871,0.581l-2.325,-0.581l-2.036,-1.161l-0.871,-0.290l-0.582,-1.162l0.582,0.000z",
						"ID" : "M806.019,259.132h-1.163l-3.488-2.033l2.326-0.289l1.454,0.58l1.162,0.871L806.019,259.132zM816.193,258.842l-2.323,0.581l-0.292-0.291l0.292-0.871l1.16-1.742l2.617-1.16l0.29,0.58l0.29,0.871L816.193,258.842zM798.17,253.326l1.163,0.58l1.745-0.29l0.581,1.161l-3.198,0.582l-1.745,0.58l-1.743-0.291l1.162-1.451h1.455L798.17,253.326zM812.123,253.326l-0.579,1.451l-4.072,0.871l-3.486-0.58v-0.871l2.034-0.581l1.745,0.871l1.743-0.29L812.123,253.326zM772.881,249.55l5.232,0.29l0.582-1.161l4.94,1.452l1.163,1.742l4.07,0.58l3.487,1.452l-3.196,1.162l-3.199-1.162h-2.325h-2.907l-2.615-0.58l-3.199-1.162l-2.033-0.29l-1.163,0.29l-4.942-0.871l-0.58-1.452h-2.325l1.745-2.613h3.488l2.033,1.163l1.162,0.289L772.881,249.55zM844.679,248.098l-1.452,1.742l-0.292-2.032l0.583-0.871l0.58-1.162l0.581,0.871V248.098zM824.043,240.548l-1.163,0.87l-1.745-0.58l-0.581-1.162h2.907L824.043,240.548zM833.053,239.386l0.871,2.032l-2.325-0.87l-2.324-0.29h-1.454h-2.034l0.582-1.452l3.486-0.291L833.053,239.386zM842.935,234.16l0.874,4.355l2.906,1.743l2.325-2.905l3.199-1.741h2.323l2.326,0.87l2.033,1.162l2.909,0.581v8.712l0.29,9.002l-2.615-2.323l-2.91-0.29l-0.578,0.58l-3.489,0.291l1.161-2.323l1.744-0.871l-0.579-2.904l-1.454-2.323l-5.233-2.324l-2.323-0.289l-4.069-2.613L840.901,242l-1.162,0.292l-0.581-1.163v-1.161l-2.034-1.161l2.906-1.162h2.034l-0.289-0.581h-4.072l-1.161-1.742l-2.327-0.58l-1.161-1.161l3.778-0.872l1.455-0.872l4.359,1.162L842.935,234.16zM818.518,226.9l-2.325,2.904l-2.034,0.58l-2.615-0.58h-4.651l-2.325,0.58l-0.292,2.033l2.326,2.323l1.454-1.161l5.23-0.872l-0.29,1.161l-1.162-0.289l-1.163,1.451l-2.326,1.162l2.615,3.483l-0.581,0.872l2.326,3.194v1.742l-1.452,0.872l-0.874-0.872l1.165-2.323l-2.617,1.162l-0.871-0.873l0.579-0.869l-2.033-1.743l0.291-2.613l-2.036,0.871l0.292,3.195v3.773l-1.744,0.581l-1.165-0.871l0.874-2.613l-0.291-2.613h-1.162l-0.871-2.033l1.161-1.741l0.289-2.033l1.455-4.356l0.581-0.871l2.326-2.032l2.033,0.58l3.488,0.582l3.199-0.292l2.615-2.032L818.518,226.9zM828.111,227.771l-0.29,2.323h-1.452l-0.292,1.452l1.162,1.451l-0.87,0.291l-1.165-1.742l-0.871-3.485l0.581-2.032l0.873-1.162l0.29,1.452l1.744,0.291L828.111,227.771zM798.17,226.029l3.197,2.322l-3.197,0.292l-1.162,2.031l0.292,2.614l-2.618,1.742v2.613L793.52,242l-0.581-0.871l-2.908,1.163l-1.161-1.743l-2.034-0.29l-1.163-0.872l-3.488,1.162l-0.871-1.452l-1.744,0.29l-2.328-0.29l-0.581-3.775l-1.163-0.871l-1.452-2.322l-0.292-2.323l0.292-2.613l1.452-1.743l0.584,1.743l2.033,1.741l1.744-0.581h1.744l1.453-1.16l1.454-0.291l2.615,0.581l2.036-0.581l1.452-3.774l1.163-0.872l0.871-3.193h3.198l2.325,0.58l-1.454,2.323l2.036,2.614L798.17,226.029zM765.034,246.937l-2.907,0.29l-2.325-2.321l-3.779-2.324l-1.162-1.743l-2.033-2.323l-1.165-2.033l-2.325-3.774l-2.326-2.323l-0.871-2.323l-0.873-2.032l-2.615-1.743l-1.454-2.322l-2.034-1.743l-2.908-2.903l-0.289-1.451h1.745l4.358,0.58l2.618,2.614l2.033,2.032l1.453,1.161l2.615,2.905h2.908l2.325,2.032l1.454,2.322l2.033,1.161l-0.871,2.323l1.454,0.871h0.872l0.581,2.033l0.873,1.451l2.034,0.291l1.452,1.742l-0.871,3.485V246.937z",
						"IE" : "M456.62,82.869l0.579,2.032l-2.034,2.323l-4.942,1.743l-3.779,-0.581l2.036,-2.904l-1.454,-2.613l3.779,-2.323l2.033,-1.162l0.582,1.451l-0.582,1.454l1.745,0.000l-2.037,-0.580z",
						"IL" : "M572.021,140.946l-0.293,0.870l-1.163,-0.289l-0.578,1.743l0.871,0.289l-0.871,0.581l0.000,0.581l1.160,-0.291l0.000,0.872l-1.160,4.645l-2.038,-4.935l0.873,-0.872l0.581,-1.451l0.584,-2.033l0.289,-0.582l0.289,0.000l0.872,0.000l0.291,-0.580l0.582,0.000l0.000,1.162l-0.289,0.290l0.000,0.000z",
						"IN" : "M688.002,133.396l2.909,3.194l-0.293,2.324l1.163,1.160l0.000,1.453l-2.036,-0.291l0.873,2.904l2.615,1.742l3.781,2.034l-1.745,1.161l-1.163,2.613l2.908,1.162l2.614,1.161l3.490,1.742l3.779,0.291l1.453,1.452l2.325,0.290l3.197,0.581l2.326,0.000l0.291,-1.162l-0.291,-1.742l0.000,-1.161l1.744,-0.582l0.292,2.033l0.000,0.581l2.615,1.162l1.744,-0.581l2.326,0.290l2.326,0.000l0.000,-1.742l-1.163,-0.871l2.326,-0.290l2.615,-2.033l3.198,-1.742l2.033,0.580l2.035,-1.162l1.455,1.743l-1.161,1.162l3.194,0.290l0.000,1.162l-0.871,0.580l0.291,1.452l-2.034,-0.290l-3.489,1.742l0.000,1.742l-1.453,2.323l-0.292,1.162l-1.163,2.322l-2.033,-0.580l-0.290,2.904l-0.583,0.872l0.291,1.161l-1.162,0.581l-1.454,-4.356l-0.872,0.000l-0.581,1.742l-1.454,-1.452l0.872,-1.452l1.163,-0.289l1.454,-2.324l-1.743,-0.291l-2.327,0.000l-2.616,-0.291l-0.291,-2.032l-1.454,0.000l-2.034,-1.451l-1.163,2.032l2.034,1.451l-1.743,0.873l-0.582,1.160l1.744,0.582l-0.579,1.742l1.160,2.032l0.290,2.324l-0.290,1.162l-2.034,-0.291l-3.197,0.580l0.000,2.033l-1.455,1.742l-4.069,1.744l-2.904,3.484l-2.038,1.743l-2.906,1.742l0.000,1.161l-1.163,0.581l-2.615,1.161l-1.162,0.000l-0.874,2.323l0.582,3.484l0.000,2.324l-1.163,2.614l0.000,4.644l-1.454,0.000l-1.160,2.325l0.870,0.871l-2.615,0.581l-0.874,2.032l-1.163,0.581l-2.615,-2.323l-1.163,-4.067l-1.162,-2.613l-0.874,-1.451l-1.452,-2.613l-0.581,-3.485l-0.581,-1.742l-2.618,-3.775l-1.161,-5.227l-0.584,-3.485l0.000,-3.194l-0.581,-2.613l-4.068,1.451l-2.035,-0.290l-3.488,-3.194l1.454,-1.162l-0.873,-0.871l-3.198,-2.323l1.745,-2.033l6.106,0.000l-0.583,-2.324l-1.455,-1.451l-0.579,-2.032l-1.745,-1.162l3.197,-2.904l3.199,0.291l2.904,-2.904l1.745,-2.904l2.618,-2.614l0.000,-2.032l2.325,-1.743l-2.325,-1.161l-0.874,-2.032l-1.160,-2.324l1.453,-1.162l4.069,0.581l3.196,-0.290l-2.617,2.323z",
						"IQ" : "M598.763,131.943l1.744,0.872l0.289,1.742l-1.452,0.871l-0.581,2.033l2.033,2.613l3.200,1.453l1.454,2.323l-0.292,1.742l0.872,0.000l0.000,1.742l1.454,1.452l-1.744,-0.290l-1.744,-0.291l-2.037,2.614l-5.230,0.000l-7.561,-5.517l-4.067,-2.032l-3.488,-0.873l-1.163,-3.193l6.103,-2.904l1.163,-3.195l-0.292,-2.032l1.454,-0.872l1.454,-1.742l1.164,-0.291l3.197,0.291l0.873,0.872l1.452,-0.581l-1.745,-3.193z",
						"IR" : "M622.309,128.75l2.323,-0.582l2.036,-1.742l1.745,0.291l1.162,-0.581l2.034,0.290l2.907,1.452l2.325,0.290l3.200,2.324l2.034,0.000l0.289,2.323l-1.161,3.485l-0.873,2.032l1.163,0.291l-1.163,1.742l0.873,2.032l0.290,1.743l2.036,0.581l0.289,1.742l-2.615,2.323l1.453,1.452l1.162,1.742l2.617,1.162l0.000,2.613l1.453,0.291l0.290,1.452l-4.070,1.162l-1.161,3.193l-4.943,-0.580l-3.197,-0.871l-2.906,-0.291l-1.454,-3.194l-1.163,-0.581l-2.034,0.581l-2.908,1.162l-3.196,-0.872l-2.907,-2.033l-2.617,-0.870l-1.745,-2.614l-2.034,-3.774l-1.744,0.580l-1.744,-0.871l-0.871,1.161l-1.454,-1.452l0.000,-1.742l-0.872,0.000l0.292,-1.742l-1.454,-2.323l-3.200,-1.453l-2.033,-2.613l0.581,-2.033l1.452,-0.871l-0.289,-1.742l-1.744,-0.872l-1.745,-3.193l-1.452,-2.324l0.579,-0.871l-0.870,-2.904l1.743,-0.871l0.582,0.871l1.163,1.453l2.033,0.289l0.873,0.000l3.489,-2.032l0.872,-0.290l0.871,0.871l-0.871,1.451l1.743,1.453l0.582,-0.291l0.873,2.033l2.615,0.580l1.744,1.453l4.069,0.291l4.360,-0.581l-0.293,0.581z",
						"IS" : "M433.944,48.313l-0.870,1.742l3.196,1.742l-3.488,2.033l-8.138,2.033l-2.326,0.581l-3.488,-0.581l-7.849,-0.871l2.906,-1.162l-6.103,-1.451l4.940,-0.291l0.000,-0.871l-5.811,-0.580l1.744,-2.033l4.067,-0.291l4.362,1.742l4.360,-1.451l3.198,0.871l4.649,-1.452l-4.651,-0.290z",
						"IT" : "M516.5,125.846l-0.873,2.033l0.292,0.872l-0.582,1.451l-2.034-0.871l-1.454-0.291l-3.777-1.451l0.289-1.452l3.199,0.29l2.904-0.29L516.5,125.846zM499.059,117.715l1.743,1.742l-0.291,3.775l-1.452-0.291l-1.164,0.871l-0.872-0.58l-0.291-3.195l-0.579-1.742l1.452,0.291L499.059,117.715zM507.779,102.325l4.069,0.581l-0.289,1.452l0.581,1.161l-2.326-0.291l-2.035,0.872v1.452l-0.292,0.871l0.873,1.162l2.615,1.452l1.455,2.324l2.906,2.323h2.326l0.58,0.58l-0.872,0.582l2.617,0.871l2.036,0.871l2.324,1.451l0.291,0.581l-0.581,0.873l-1.455-1.453l-2.325-0.289l-1.163,1.742l2.036,1.16l-0.581,1.453h-0.873l-1.745,2.323l-0.87,0.291v-0.871l0.289-1.453l0.872-0.58l-1.161-1.742l-0.873-1.162l-1.161-0.58l-0.873-1.162l-1.744-0.29l-1.163-1.162l-2.034-0.291l-2.036-1.162l-2.615-1.741l-1.744-1.743l-0.872-2.614l-1.454-0.29l-2.325-0.872l-1.163,0.291l-1.743,1.162l-1.163,0.291l0.291-1.162l-1.454-0.291l-0.582-2.033l0.872-0.871l-0.872-1.162l0.291-0.871l1.165,0.581h1.16l1.744-0.871l0.291,0.29h1.453l0.583-1.162l2.034,0.29l1.163-0.29l0.289-1.162l1.745,0.291l0.291-0.58l2.615-0.292L507.779,102.325z",
						"JM" : "M260.116,180.148l2.036,0.290l1.452,0.581l0.291,0.871l-1.743,0.000l-0.872,0.291l-1.454,-0.291l-1.744,-1.161l0.290,-0.581l1.164,-0.290l-0.580,-0.290z",
						"JO" : "M571.728,141.816l0.293,-0.870l3.195,1.161l5.234,-2.903l1.163,3.193l-0.582,0.582l-5.522,1.451l2.905,2.614l-0.872,0.581l-0.581,0.871l-2.036,0.290l-0.581,1.161l-1.161,0.582l-3.196,-0.291l0.000,-0.291l1.160,-4.645l0.000,-0.872l0.581,-0.871l0.000,1.743z",
						"JP" : "M844.39,137.17l0.289,0.871l-1.452,1.742l-1.163-1.161l-1.454,0.871l-0.58,1.452l-2.035-0.581l0.292-1.452l1.452-1.743l1.452,0.291l1.165-1.161L844.39,137.17zM861.832,128.75l-1.165,2.323l0.584,1.162l-1.455,2.033l-3.488,1.452h-4.94l-3.78,3.195l-1.742-1.162l-0.292-2.033l-4.651,0.582l-3.488,1.451h-3.198l2.909,2.032l-1.745,4.646l-1.743,1.162l-1.454-1.162l0.582-2.323l-1.745-0.871l-1.163-1.742l2.617-0.871l1.452-1.742l2.907-1.453l2.035-2.033l5.523-0.581l2.907,0.291l2.904-4.646l1.746,1.162l4.07-2.614l1.452-1.161l1.744-3.484l-0.292-2.904l1.164-1.742l2.906-0.581l1.454,3.774v2.324l-2.615,2.613V128.75zM869.969,109.584l1.744,0.58l2.036-1.162l0.58,2.904l-4.068,0.871l-2.326,2.613l-4.36-1.742l-1.453,2.904h-3.199l-0.29-2.613l1.454-2.033l2.906-0.291l0.873-3.775l0.581-2.032l3.488,2.613L869.969,109.584z",
						"KE" : "M586.553,233.289l1.745,2.323l-2.034,1.162l-0.582,1.161l-1.163,0.000l-0.291,2.032l-0.872,1.161l-0.581,1.744l-1.162,0.871l-3.780,-2.615l-0.291,-1.742l-9.883,-5.517l-0.582,-0.289l0.000,-2.906l0.872,-1.161l1.164,-1.742l1.163,-2.033l-1.163,-3.194l-0.291,-1.452l-1.452,-1.742l1.743,-1.743l1.745,-1.741l1.452,0.290l0.000,1.742l0.873,0.871l2.033,0.000l3.489,2.323l0.874,0.000l0.580,0.000l0.580,0.290l2.036,0.290l0.581,-1.160l2.618,-1.162l1.161,0.870l1.743,0.000l-2.325,3.196l0.000,-9.873z",
						"KG" : "M669.108,114.811l0.581,-1.162l1.745,-0.580l4.649,0.871l0.292,-1.452l1.745,-0.581l3.779,1.162l1.161,-0.291l4.361,0.000l4.068,0.291l1.455,0.871l1.744,0.581l-0.289,0.581l-4.362,1.451l-1.162,1.162l-3.490,0.290l-0.871,1.744l-2.906,-0.291l-2.036,0.580l-2.615,1.162l0.289,0.580l-0.579,0.871l-5.233,0.291l-3.488,-0.871l-2.908,0.290l0.291,-1.743l2.906,0.582l0.873,-0.871l2.326,0.289l3.488,-2.032l-3.199,-1.451l-2.034,0.580l-2.035,-0.871l2.326,-1.742l0.872,0.291z",
						"KH" : "M758.638,201.637l-1.162,-1.453l-1.454,-2.613l-0.580,-3.485l1.741,-2.323l3.781,-0.581l2.326,0.581l2.326,0.872l1.160,-1.743l2.617,0.871l0.581,2.033l-0.289,3.194l-4.651,2.033l1.162,1.742l-2.906,0.290l-2.326,1.162l2.326,0.580z",
						"KO" : "M531.032,115.392l-0.289,0.581l-0.292,0.000l-0.289,-1.162l-0.582,-0.290l-0.581,-0.581l0.581,-0.871l0.582,0.000l0.289,-0.871l0.581,-0.291l0.293,0.291l0.581,0.290l0.290,0.581l0.583,0.000l0.579,0.580l0.292,0.000l-0.292,0.580l-0.290,0.292l0.000,0.290l-0.581,0.000l1.455,-0.581z",
						"KP" : "M833.343,114.229l0.292,0.582l-0.872,0.000l-1.164,0.872l-0.872,0.870l0.000,2.033l-1.452,0.581l-0.291,0.582l-1.163,0.580l-1.744,0.580l-1.163,0.582l-0.292,1.451l-0.289,0.291l1.163,0.290l1.452,1.161l-0.290,0.871l-1.162,0.000l-2.035,0.291l-0.874,1.161l-1.452,0.000l-1.454,-0.290l-0.289,0.290l-0.874,0.290l0.000,-0.580l-0.581,0.000l-0.871,-0.581l0.871,-1.161l0.581,-0.291l-0.291,-0.580l0.583,-1.453l0.000,-0.580l-1.744,-0.291l-1.162,-0.580l2.033,-1.742l3.198,-1.453l1.745,-2.032l1.453,0.871l2.325,0.000l-0.289,-1.452l4.067,-1.163l1.163,-1.451l-1.744,-1.451z",
						"KR" : "M826.948,124.684l2.617,3.194l0.582,2.034l0.000,2.903l-1.163,1.742l-2.326,0.582l-2.325,0.870l-2.326,0.291l-0.292,-1.452l0.292,-2.033l-1.163,-2.903l2.036,-0.291l-1.745,-2.614l1.452,0.000l0.874,-1.161l2.035,-0.291l1.162,0.000l-0.290,0.871z",
						"KW" : "M605.74,148.496l0.581,1.162l-0.291,0.580l0.871,2.323l-1.743,0.000l-0.873,-1.452l-2.326,-0.290l2.037,-2.614l-1.744,-0.291z",
						"KZ" : "M669.108,114.811l-1.454,0.291l-3.779,2.033l-1.163,2.032l-1.163,0.000l-0.580,-1.452l-3.489,0.000l-0.581,-2.323l-1.453,0.000l0.290,-2.614l-3.196,-2.032l-4.944,0.290l-3.196,0.291l-2.618,-2.614l-2.324,-0.872l-4.071,-2.031l-0.580,-0.291l-6.976,1.742l0.000,10.164l-1.455,0.000l-1.744,-2.033l-2.034,-0.871l-3.199,0.581l-1.160,0.871l0.000,-0.581l0.582,-1.163l-0.582,-0.869l-3.197,-1.162l-1.165,-2.323l-1.453,-0.581l-0.291,-1.161l2.909,0.289l0.000,-2.032l2.324,-0.290l2.326,0.290l0.581,-2.614l-0.581,-1.742l-2.616,0.291l-2.326,-0.872l-3.196,1.452l-2.618,0.581l-1.452,-0.581l0.289,-1.452l-1.743,-1.742l-2.034,0.000l-2.327,-1.742l1.453,-2.323l-0.580,-0.290l2.036,-3.195l2.906,1.742l0.289,-2.032l5.814,-3.195l4.362,0.000l5.812,2.032l3.489,1.163l2.906,-1.163l4.360,-0.290l3.488,1.453l0.871,-0.872l3.781,0.291l0.581,-1.453l-4.362,-1.742l2.618,-1.451l-0.581,-0.582l2.617,-0.870l-2.036,-1.743l1.454,-1.160l10.172,-0.872l1.454,-0.582l6.976,-1.161l2.326,-1.161l4.942,0.580l0.872,2.905l2.906,-0.581l3.488,0.872l-0.290,1.451l2.618,0.000l6.974,-2.614l-0.871,0.872l3.488,2.033l6.104,6.968l1.453,-1.451l3.780,1.742l4.070,-0.872l1.455,0.581l1.160,1.452l2.034,0.581l1.163,1.162l3.488,-0.291l1.455,1.743l-2.034,1.742l-2.328,0.291l0.000,2.904l-1.744,1.162l-5.232,-0.873l-2.034,4.938l-1.453,0.580l-5.524,1.162l2.617,4.646l-2.033,0.580l0.289,1.743l-1.744,-0.581l-1.455,-0.871l-4.068,-0.291l-4.361,0.000l-1.161,0.291l-3.779,-1.162l-1.745,0.581l-0.292,1.452l-4.649,-0.871l-1.745,0.580l0.581,-1.162z",
						"LA" : "M763.29,191.763l0.872,-1.451l0.291,-2.323l-2.327,-2.324l0.000,-2.613l-2.325,-2.323l-2.036,0.000l-0.582,0.871l-1.452,0.000l-0.871,-0.581l-2.907,1.742l0.000,-2.323l0.579,-2.904l-1.743,-0.289l-0.290,-1.744l-1.163,-0.580l0.581,-1.162l2.326,-1.742l0.289,0.581l1.455,0.000l-0.290,-2.904l1.453,-0.581l1.454,2.324l1.161,2.322l3.488,0.000l1.165,2.614l-1.747,0.580l-0.870,0.872l3.197,1.742l2.325,3.194l1.745,2.614l2.036,1.742l0.870,2.032l-0.581,2.614l-2.617,-0.871l-1.160,1.743l2.326,0.872z",
						"LB" : "M572.31,139.494l-0.582,0.000l-0.291,0.580l-0.872,0.000l0.872,-2.323l1.454,-2.032l1.163,0.000l0.581,1.162l-1.452,1.161l0.873,-1.452z",
						"LK" : "M699.047,210.348l-0.579,2.904l-1.165,0.581l-2.323,0.582l-1.455,-2.034l-0.292,-4.066l1.166,-4.356l2.033,1.454l1.162,2.032l-1.453,-2.903z",
						"LR" : "M452.549,219.06l-0.873,0.000l-2.615,-1.453l-2.617,-2.032l-2.324,-1.452l-1.744,-1.742l0.580,-0.872l0.000,-0.871l1.454,-1.452l1.163,-1.451l0.581,0.000l0.872,-0.290l1.162,1.741l-0.290,1.162l0.582,0.581l0.581,0.000l0.582,-1.161l0.871,0.000l0.000,0.870l0.291,1.162l-0.582,1.452l0.582,0.581l0.871,0.290l1.162,1.161l0.293,1.162l-0.293,0.291l0.289,-2.323z",
						"LS" : "M553.416,310.531l1.163,0.872l-0.873,1.451l-0.581,0.871l-1.454,0.292l-0.581,0.869l-0.871,0.291l-2.036,-2.032l1.454,-1.742l1.453,-1.163l1.163,-0.579l-1.163,-0.870z",
						"LT" : "M536.265,81.417l-0.291,-0.582l0.582,-0.870l-1.454,-0.291l-2.906,-0.581l-0.580,-2.322l3.197,-0.871l4.649,0.290l2.618,-0.290l0.581,0.580l1.455,0.291l2.614,1.162l0.290,1.160l-2.326,1.162l-0.578,1.452l-2.908,0.872l-2.907,0.000l-0.582,-0.872l1.454,0.290z",
						"LU" : "M490.338,93.032l0.579,0.581l0.000,1.452l-0.871,0.000l-0.581,-0.291l0.290,-1.451l-0.583,0.291z",
						"LV" : "M531.616,76.771l0.290,-2.033l1.162,-1.742l2.616,-0.871l2.326,2.033l2.035,0.000l0.581,-2.033l2.325,-0.581l1.165,0.290l2.614,1.162l2.034,0.000l1.455,0.581l0.291,1.161l0.871,1.742l-2.906,1.162l-1.745,0.291l-2.614,-1.162l-1.455,-0.291l-0.581,-0.580l-2.618,0.290l-4.649,-0.290l3.197,-0.871z",
						"LY" : "M514.755,167.951l-2.036,1.162l-1.452,-1.452l-4.361,-1.161l-1.452,-1.743l-2.035,-1.451l-1.163,0.580l-1.163,-1.451l0.000,-1.162l-1.744,-2.033l1.162,-1.161l-0.291,-1.743l0.291,-1.452l0.000,-1.451l0.291,-2.033l0.000,-1.453l-0.871,-2.322l1.162,-0.581l0.290,-1.162l-0.290,-1.161l2.034,-1.162l0.872,-0.870l1.164,-0.873l0.291,-2.032l3.195,0.872l1.165,0.000l2.326,0.290l3.486,1.161l1.456,2.614l2.325,0.581l4.067,1.161l2.907,1.162l1.165,-0.581l1.453,-1.452l-0.582,-2.033l0.874,-1.162l1.741,-1.451l2.036,-0.290l3.778,0.580l0.873,1.161l1.163,0.000l0.871,0.582l2.616,0.291l0.582,0.870l-0.871,1.452l0.289,1.162l-0.579,1.451l0.871,2.324l0.000,9.873l0.000,10.162l0.000,5.228l-3.199,0.291l0.000,0.870l-11.045,-5.227l-11.046,-5.226l2.616,-1.451z",
						"MA" : "M459.526,132.525l1.743,1.161l2.616,0.000l2.615,0.581l1.164,0.000l1.163,1.742l0.291,1.742l0.871,2.905l0.582,0.580l-0.289,0.871l-3.782,0.582l-1.162,0.870l-1.744,0.291l0.000,2.032l-3.197,1.162l-1.162,1.452l-2.036,0.581l-2.906,0.581l-4.361,2.032l0.000,3.194l-0.581,0.000l0.292,1.452l-1.745,0.000l-0.872,0.871l-1.161,0.000l-1.165,-0.581l-2.324,0.291l-0.873,2.323l-0.872,0.000l-1.162,3.485l-4.069,3.194l-0.874,3.775l-1.162,1.162l-0.290,0.870l-6.107,0.291l0.000,-1.161l1.165,-0.872l0.871,-1.451l-0.291,-0.872l1.164,-2.033l1.454,-1.742l0.871,-0.291l0.873,-1.742l0.000,-1.451l0.870,-1.742l2.036,-0.872l1.745,-2.904l1.452,-1.162l2.326,-0.289l2.326,-1.743l1.452,-0.871l2.036,-2.323l-0.582,-3.194l1.163,-2.323l0.290,-1.452l1.744,-2.033l2.906,-1.162l2.037,-1.162l1.745,-2.903l0.871,-1.742l-2.035,0.000z",
						"MD" : "M547.02,98.259l0.584,-0.290l2.033,-0.290l2.034,0.870l1.162,0.000l1.166,0.872l-0.293,0.871l1.164,0.580l0.290,1.162l0.873,0.580l0.000,0.291l0.290,0.291l-0.581,0.290l-1.743,0.000l-0.293,-0.581l-0.581,0.291l0.291,0.580l-0.872,0.871l-0.291,0.872l-0.872,0.291l-0.291,-1.163l0.291,-1.161l-0.291,-1.161l-1.453,-1.742l-0.873,-1.162l-0.871,-0.872l0.873,0.290z",
						"ME" : "M528.417,113.94l-0.292,-0.291l-1.163,1.162l0.000,0.872l-0.581,0.000l-0.579,-0.872l-1.163,-0.582l0.289,-0.580l0.291,-1.451l0.872,-0.581l0.582,-0.290l0.873,0.290l0.290,0.581l0.872,0.290l1.162,0.581l-0.290,0.000l-0.581,0.871l0.582,0.000z",
						"MG" : "M610.099,265.23l0.873,1.163l0.582,1.742l0.579,3.485l0.584,1.160l-0.293,1.454l-0.581,0.579l-0.871,-1.451l-0.583,0.872l0.583,2.032l-0.291,1.160l-0.582,0.581l-0.292,2.325l-1.162,3.194l-1.161,3.775l-1.744,5.226l-1.162,3.775l-1.165,3.195l-2.325,0.581l-2.325,1.162l-1.455,-0.582l-2.324,-0.871l-0.872,-1.453l0.000,-2.613l-1.163,-2.032l0.000,-2.033l0.292,-2.032l1.452,-0.582l0.000,-0.871l1.163,-2.032l0.289,-1.742l-0.579,-1.453l-0.582,-1.451l-0.291,-2.614l1.163,-1.743l0.289,-1.742l1.455,0.000l1.452,-0.581l0.872,-0.579l1.454,0.000l1.455,-1.454l2.325,-1.740l0.872,-1.454l-0.580,-1.160l1.161,0.289l1.744,-1.743l0.000,-1.742l0.873,-1.160l-0.871,-1.160z",
						"MK" : "M530.451,115.973l0.292,0.000l0.289,-0.581l1.455,-0.581l0.581,0.000l1.161,-0.290l1.165,0.000l1.452,0.871l0.000,1.743l-0.290,0.290l-0.582,0.290l-1.452,0.000l-1.164,0.580l-1.742,0.291l-1.165,-0.581l-0.289,-1.161l-0.289,0.871z",
						"ML" : "M440.34,190.602l0.871,-0.290l0.583,-1.743l0.872,0.000l1.744,0.871l1.455,-0.580l1.161,0.000l0.581,-0.581l11.046,0.000l0.582,-2.032l-0.582,-0.291l-1.454,-11.906l-1.161,-11.615l4.070,-0.291l9.301,6.098l9.301,6.098l0.873,1.161l1.454,0.872l1.452,0.291l0.000,1.742l2.906,0.000l0.000,6.097l-1.452,2.034l-0.291,1.452l-2.326,0.580l-3.778,0.291l-0.872,0.870l-1.744,0.291l-2.035,0.000l-0.582,-0.581l-1.452,0.290l-2.617,1.162l-0.582,0.871l-2.035,1.161l-0.291,0.872l-1.163,0.581l-1.452,-0.581l-0.872,0.871l-0.291,1.742l-2.034,2.324l0.000,0.871l-0.873,1.161l0.290,1.741l-1.161,0.292l-0.583,0.290l-0.579,-1.162l-0.582,0.291l-0.581,0.000l-0.582,0.871l-2.037,0.000l-0.870,-0.582l-0.292,0.292l-0.871,-0.581l0.290,-0.871l-0.581,-0.291l-0.582,0.291l0.291,-1.162l0.582,-0.580l-1.162,-1.162l-0.292,-0.871l-0.582,-0.581l-0.581,0.000l-0.871,0.290l-0.873,0.582l-0.579,0.580l-1.165,-0.291l-0.871,-0.580l-0.582,-0.291l-0.581,0.582l-0.290,0.000l-0.293,-1.162l0.000,-0.871l0.000,-1.162l-1.162,-0.581l-0.581,-1.742l0.000,1.742z",
						"MM" : "M747.882,175.501l-1.743,1.163l-2.034,0.000l-1.163,3.194l-1.165,0.290l1.455,2.613l1.744,1.742l1.163,2.034l-1.163,2.323l-0.871,0.580l0.582,1.162l1.741,2.322l0.582,1.453l-0.290,1.452l1.162,2.322l-1.454,2.614l-1.452,2.903l-0.289,-2.031l0.870,-2.033l-0.870,-1.742l0.289,-2.904l-1.163,-1.453l-0.871,-3.484l-0.581,-3.484l-1.164,-2.034l-1.743,1.162l-3.200,2.033l-1.454,-0.291l-1.741,-0.580l0.870,-3.486l-0.579,-2.612l-2.036,-2.904l0.290,-1.161l-1.744,-0.291l-1.743,-2.323l-0.291,-2.033l0.871,0.291l0.292,-2.033l1.162,-0.581l-0.291,-1.161l0.583,-0.872l0.290,-2.904l2.033,0.580l1.163,-2.322l0.292,-1.162l1.453,-2.323l0.000,-1.742l3.489,-1.742l2.034,0.290l-0.291,-1.452l0.871,-0.580l0.000,-1.162l1.455,0.000l0.873,1.452l1.161,0.580l0.291,2.324l-0.291,2.032l-2.615,2.323l-0.290,3.484l2.905,-0.580l0.873,2.614l1.743,0.580l-0.872,2.033l2.035,1.162l1.163,0.580l2.035,-0.870l0.000,1.161l-2.326,1.742l-0.581,1.162l1.454,-0.580z",
						"MN" : "M715.327,95.356l2.907,-0.582l5.232,-2.323l4.069,-1.161l2.616,0.871l2.908,0.000l1.741,1.162l2.617,0.290l4.071,0.581l2.617,-2.033l-1.163,-1.453l2.907,-2.902l3.196,1.161l2.327,0.290l3.488,0.580l0.290,2.324l4.069,1.162l2.617,-0.582l3.487,-0.290l2.618,0.290l2.615,1.162l1.743,1.453l2.616,0.000l3.490,0.581l2.616,-0.872l3.488,-0.291l4.070,-2.033l1.745,0.291l1.452,0.871l3.197,-0.290l-1.453,2.324l-1.744,2.612l0.581,1.162l1.455,-0.290l2.904,0.290l2.036,-0.872l2.327,0.872l2.325,1.742l-0.291,1.161l-2.034,-0.289l-4.071,0.289l-2.035,0.872l-2.034,1.742l-4.069,1.162l-2.909,1.451l-2.614,-0.580l-1.745,-0.290l-1.454,1.742l0.873,1.162l0.581,0.871l-2.033,0.871l-1.745,1.452l-3.199,0.871l-4.359,0.289l-4.361,0.873l-3.197,1.451l-1.163,-0.870l-3.489,0.000l-4.069,-1.743l-2.615,-0.291l-3.781,0.291l-5.522,-0.580l-3.196,0.000l-1.456,-1.453l-1.163,-2.613l-1.743,-0.291l-3.488,-1.742l-3.778,-0.290l-3.198,-0.581l-0.873,-1.162l0.873,-3.194l-1.746,-2.323l-4.067,-0.872l-2.326,-1.451l0.581,2.032z",
						"MR" : "M440.34,190.602l-2.034,-1.742l-1.454,-2.033l-2.034,-0.580l-1.163,-0.872l-1.454,0.000l-1.452,0.581l-1.456,-0.291l-0.871,0.872l-0.290,-1.453l0.871,-1.451l0.290,-2.614l-0.290,-2.613l-0.291,-1.453l0.291,-1.161l-0.871,-1.452l-1.454,-1.161l0.582,-0.871l11.046,0.000l-0.581,-4.066l0.581,-1.451l2.615,0.000l0.000,-7.261l9.011,0.290l0.000,-4.355l10.176,6.679l-4.070,0.291l1.161,11.615l1.454,11.906l0.582,0.291l-0.582,2.032l-11.046,0.000l-0.581,0.581l-1.161,0.000l-1.455,0.580l-1.744,-0.871l-0.872,0.000l-0.583,1.743l0.871,-0.290z",
						"MW" : "M568.822,262.618l-0.582,2.032l0.582,3.776l1.165,-0.291l0.871,0.871l1.163,2.034l0.289,3.483l-1.163,0.581l-0.871,2.032l-1.744,-1.742l-0.292,-2.032l0.582,-1.161l-0.290,-1.161l-0.873,-0.582l-0.871,0.291l-1.455,-1.454l-1.452,-0.580l0.580,-2.612l0.872,-0.873l-0.290,-2.323l0.290,-2.322l0.582,-0.582l-0.582,-2.322l-1.452,-1.452l2.907,0.581l0.289,0.871l1.163,1.161l-0.582,-3.776z",
						"MX" : "M206.341,159.82l-1.163,2.324l-0.291,2.033l-0.290,3.774l-0.291,1.162l0.581,1.743l0.872,1.161l0.582,2.033l1.744,2.323l0.581,1.452l1.163,1.451l2.906,0.582l1.163,1.161l2.326,-0.871l2.034,-0.290l2.035,-0.291l1.745,-0.581l1.743,-1.161l0.872,-1.452l0.000,-2.323l0.582,-0.871l2.034,-0.581l2.908,-0.872l2.324,0.291l1.745,-0.291l0.582,0.582l0.000,1.161l-1.454,1.742l-0.873,1.742l0.582,0.581l-0.291,1.162l-0.872,2.033l-0.582,-0.581l-0.581,0.000l-0.580,0.000l-0.872,1.742l-0.582,-0.580l-0.290,0.290l0.000,0.290l-2.617,0.000l-2.615,0.000l0.000,1.743l-1.163,0.000l0.872,0.870l1.162,0.581l0.291,0.581l0.582,0.291l-0.292,0.871l-3.487,0.000l-1.164,2.033l0.291,0.580l-0.291,0.581l0.000,0.871l-3.197,-2.903l-1.454,-0.872l-2.325,-0.870l-1.453,0.290l-2.325,1.161l-1.163,0.291l-2.035,-0.872l-2.035,-0.580l-2.617,-1.162l-2.034,-0.291l-3.198,-1.451l-2.325,-1.161l-0.582,-0.872l-1.453,0.000l-2.906,-0.871l-1.163,-1.453l-2.907,-1.451l-1.454,-1.742l-0.581,-1.453l0.872,-0.290l-0.291,-0.581l0.582,-0.871l0.000,-0.871l-0.873,-1.161l-0.290,-1.162l-0.872,-1.452l-2.325,-2.614l-2.908,-2.322l-1.453,-1.453l-2.325,-1.161l-0.290,-0.872l0.290,-1.451l-1.454,-0.871l-1.453,-1.162l-0.872,-2.032l-1.454,-0.291l-1.453,-1.452l-1.454,-1.161l0.000,-0.871l-1.453,-2.033l-1.162,-2.324l0.290,-0.870l-2.035,-1.162l-0.872,0.000l-1.744,-0.581l-0.290,1.162l0.290,1.161l0.290,2.034l0.872,1.161l2.036,2.032l0.581,0.581l0.291,0.290l0.581,0.872l0.291,0.000l0.581,1.742l0.872,0.580l0.581,1.162l1.745,1.162l0.872,2.613l0.872,1.162l0.872,1.452l0.000,1.452l1.453,0.000l0.872,1.160l1.164,1.454l0.000,0.290l-1.164,1.161l-0.581,0.000l-0.581,-1.742l-2.035,-1.452l-1.744,-1.453l-1.454,-0.580l0.000,-2.033l-0.291,-1.452l-1.453,-0.870l-1.744,-1.453l-0.581,0.581l-0.582,-0.871l-1.743,-0.581l-1.745,-1.742l0.291,0.000l1.163,0.000l1.162,-0.872l0.000,-1.451l-2.034,-1.742l-1.744,-0.871l-0.873,-1.742l-1.162,-1.744l-1.163,-2.322l-1.163,-2.323l3.198,-0.291l3.487,-0.290l-0.290,0.581l4.070,1.452l6.395,1.742l5.232,0.000l2.326,0.000l0.000,-1.162l4.650,0.000l1.163,1.162l1.453,0.871l1.454,1.162l0.872,1.451l0.872,1.453l1.454,0.871l2.325,0.871l1.744,-2.323l2.035,0.000l2.034,1.161l1.454,1.742l0.872,1.742l1.744,1.452l0.582,2.033l0.581,1.162l2.326,0.871l1.744,0.580l-1.163,0.000z",
						"MY" : "M751.953,213.833l0.29,1.451l1.744-0.289l0.873-1.162l0.582,0.29l1.741,1.743l1.165,1.741l0.29,1.743l-0.29,1.452v0.87l0.29,1.453l0.871,0.871l1.162,2.322v1.162h-2.033l-2.616-2.033l-3.195-2.032l-0.295-1.452l-1.452-1.743l-0.581-2.322l-0.871-1.452l0.289-2.031l-0.58-1.162l0.291-0.582L751.953,213.833zM800.205,218.769l-2.034,0.871l-2.325-0.58h-3.198l-0.871,3.193l-1.163,0.872l-1.452,3.774l-2.036,0.581l-2.615-0.581l-1.454,0.291l-1.453,1.16h-1.744l-1.744,0.581l-2.033-1.741l-0.584-1.743l2.036,0.871l2.325-0.581l0.581-2.322l1.163-0.29l3.197-0.581l2.036-2.324l1.162-1.741l1.453,1.451l0.58-0.87h1.163l0.291-1.743v-1.451l2.327-1.743l1.161-2.322h1.162l1.455,1.452v1.162l2.034,0.869l2.325,0.872l-0.29,0.872l-1.744,0.289L800.205,218.769z",
						"MZ" : "M568.822,262.618l2.036,-0.292l3.486,0.872l0.581,-0.291l2.036,-0.289l0.872,-0.581l1.746,0.000l2.907,-1.162l2.323,-1.452l0.292,1.162l0.000,2.613l0.289,2.614l0.000,4.064l0.584,1.453l-0.873,2.033l-0.873,1.742l-1.742,1.742l-2.618,1.161l-3.199,1.163l-2.905,3.194l-1.163,0.290l-2.036,2.033l-1.162,0.580l0.000,2.034l1.162,2.032l0.582,1.741l0.000,0.874l0.581,-0.292l-0.291,2.614l-0.290,1.451l0.581,0.290l-0.291,1.162l-1.161,1.161l-2.327,0.873l-3.198,1.451l-1.452,1.162l0.289,1.161l0.873,0.000l-0.291,1.452l-2.034,0.000l-0.291,-1.162l-0.580,-1.161l0.000,-1.162l0.290,-2.904l-0.582,-2.033l-1.452,-3.774l2.904,-3.195l0.874,-2.033l0.289,-0.290l0.293,-1.452l-0.293,-0.870l0.000,-2.033l0.582,-2.032l0.000,-3.486l-1.452,-0.871l-1.163,-0.289l-0.582,-0.582l-1.452,-0.581l-2.325,0.000l0.000,-0.870l-0.292,-2.033l8.429,-2.325l1.455,1.454l0.871,-0.291l0.873,0.582l0.290,1.161l-0.582,1.161l0.292,2.032l1.744,1.742l0.871,-2.032l1.163,-0.581l-0.289,-3.483l-1.163,-2.034l-0.871,-0.871l-1.165,0.291l-0.582,-3.776l-0.582,2.032z",
						"NA" : "M518.825,309.661l-2.036,-2.325l-1.163,-2.033l-0.579,-2.613l-0.584,-2.032l-1.161,-4.065l0.000,-3.485l-0.291,-1.452l-1.163,-1.162l-1.454,-2.034l-1.452,-3.483l-0.582,-1.743l-2.034,-2.613l-0.291,-2.033l1.452,-0.581l1.455,-0.581l1.743,0.292l1.745,1.161l0.581,-0.291l11.047,0.000l2.033,1.162l6.396,0.582l5.232,-1.162l2.326,-0.582l1.745,0.000l0.871,0.582l0.290,0.289l-1.743,0.582l-0.874,0.000l-1.744,1.162l-0.871,-1.162l-4.361,0.871l-2.033,0.291l0.000,9.582l-2.908,0.289l0.000,7.843l0.000,10.163l-2.326,1.451l-1.452,0.290l-1.744,-0.581l-1.162,-0.290l-0.582,-1.162l-1.163,-0.580l1.163,-1.453z",
						"NC" : "M930.142,289.042l2.325,1.452l1.452,1.454l-1.162,0.579l-1.453,-0.871l-2.036,-1.162l-1.744,-1.452l-1.742,-1.741l-0.582,-1.162l1.161,0.000l1.745,1.162l1.162,0.870l-0.874,-0.871z",
						"NCY" : "M563.881,134.267l0.289,0.000l0.291,-0.581l2.035,0.000l2.326,-0.871l-1.745,1.162l0.293,0.580l-0.293,0.000l-0.581,0.000l-0.581,0.000l-0.290,-0.290l-0.582,0.000l-0.582,0.290l0.580,0.290z",
						"NE" : "M479.583,198.151l0.291,-2.032l-3.198,-0.581l-0.291,-1.161l-1.453,-2.033l-0.292,-1.162l0.292,-1.161l1.744,-0.291l0.872,-0.870l3.778,-0.291l2.326,-0.580l0.291,-1.452l1.452,-2.034l0.000,-6.097l4.070,-1.453l7.849,-5.227l9.592,-5.226l4.361,1.161l1.452,1.452l2.036,-1.162l0.581,4.357l1.164,0.871l0.000,0.871l1.163,0.871l-0.581,1.162l-1.164,5.517l-0.292,3.484l-3.486,2.614l-1.165,3.775l1.165,0.871l0.000,1.742l1.742,0.291l-0.289,1.161l-0.582,0.291l-0.292,0.871l-0.289,0.000l-2.036,-2.904l-0.580,-0.291l-2.327,1.453l-2.033,-0.581l-1.455,-0.291l-0.872,0.291l-1.453,0.000l-1.743,1.161l-1.455,0.000l-3.196,-1.161l-1.452,0.581l-1.165,0.000l-1.163,-1.162l-2.617,-0.872l-3.195,0.291l-0.582,0.581l-0.292,1.452l-0.871,1.161l-0.291,2.324l-2.034,-1.453l-0.874,0.000l1.161,-0.871z",
						"NG" : "M497.023,217.898l-2.615,0.871l-1.164,0.000l-1.161,0.581l-2.037,0.000l-1.452,-1.743l-0.873,-2.032l-2.033,-1.742l-2.036,0.000l-2.615,0.000l0.289,-4.647l0.000,-1.741l0.581,-1.743l0.582,-0.871l1.454,-1.452l-0.291,-0.873l0.580,-1.160l-0.580,-1.453l0.000,-1.160l0.291,-2.324l0.871,-1.161l0.292,-1.452l0.582,-0.581l3.195,-0.291l2.617,0.872l1.163,1.162l1.165,0.000l1.452,-0.581l3.196,1.161l1.455,0.000l1.743,-1.161l1.453,0.000l0.872,-0.291l1.455,0.291l2.033,0.581l2.327,-1.453l0.580,0.291l2.036,2.904l0.289,0.000l1.163,0.871l-0.289,0.580l0.000,0.872l-2.326,2.323l-0.873,1.742l-0.289,1.452l-0.582,0.582l-0.581,1.742l-1.455,1.161l-0.581,1.452l-0.580,1.161l-0.291,1.162l-1.744,0.870l-1.746,-1.161l-0.871,0.000l-1.743,1.743l-0.872,0.000l-1.164,2.614l0.872,-2.032z",
						"NI" : "M237.734,200.475l-0.872,-0.871l-1.163,-1.162l-0.581,-0.871l-1.163,-0.871l-1.454,-1.162l0.291,-0.580l0.291,0.580l0.291,-0.290l0.872,0.000l0.291,-0.871l0.581,0.000l-0.290,-1.162l0.871,-0.291l0.582,0.291l0.581,-0.871l0.581,0.580l0.291,-0.289l0.581,-0.291l1.163,-0.871l0.000,-0.581l0.291,0.000l0.291,-0.580l0.291,0.000l0.290,0.290l0.582,0.000l0.581,-0.290l0.872,0.000l0.872,-0.291l0.291,-0.291l1.162,0.000l-0.291,0.291l-0.290,0.581l0.290,0.871l-0.582,1.162l-0.289,0.870l0.000,1.453l0.000,0.580l0.289,1.162l-0.580,0.290l-0.291,1.161l0.291,0.872l-0.581,0.581l0.000,0.871l0.581,0.290l-0.581,0.581l-0.872,0.000l-0.583,-0.581l-0.871,-0.290l-0.581,0.290l-1.745,-0.581l0.581,-0.291z",
						"NL" : "M490.628,83.74l2.035,0.000l0.581,1.161l-0.581,2.323l-0.871,1.162l-1.454,0.000l0.290,2.904l-1.452,-0.582l-1.745,-1.451l-2.617,0.580l-2.034,0.000l1.452,-0.870l2.618,-4.066l-3.778,1.161z",
						"NO" : "M551.381,35.246l8.43,2.032l-3.488,0.582l3.198,1.742l-4.942,1.161l-2.034,0.29l1.161-2.032l-3.486-1.162l-4.362,1.162l-1.452,2.032l-2.615,1.162l-2.907-0.581h-3.488l-3.198-1.452l-1.453,0.581l-1.744,0.29l-0.582,1.743l-5.231-0.291l-0.582,1.452h-2.615l-1.745,2.033l-2.906,2.903l-4.361,3.775l1.165,1.162l-0.873,0.872h-2.907l-1.744,2.613l0.29,3.775l1.743,1.162l-1.162,3.484l-2.033,1.742l-1.455,1.742l-1.742-1.742l-5.524,3.194l-3.488,0.582l-3.778-1.452l-1.163-2.905l-0.871-6.387l2.615-1.743l7.268-2.323l5.523-2.904l4.941-3.774l6.685-5.228l4.651-2.033l7.559-3.484l5.813-1.162h4.651l4.069-2.324l5.231,0.291L551.381,35.246zM541.79,16.951l-6.105,1.162l-4.941-0.87l2.036-0.582l-1.747-0.872l5.814-0.58l0.873,1.161L541.79,16.951zM524.058,11.724l9.01,2.033l-6.977,1.162l-1.452,2.032l-2.325,0.581l-1.455,2.324h-3.196l-6.104-1.743l2.615-0.87l-4.069-0.873l-5.523-2.323l-2.036-2.033l7.56-1.162l1.454,1.162l3.777-0.291l1.163-0.871h4.07L524.058,11.724zM543.823,9.692l5.522,1.161l-4.358,1.452l-7.849,0.29l-8.14-0.581l-0.582-0.58h-3.777l-3.199-1.453l8.722-0.58l3.778,0.58l2.906-0.871L543.823,9.692z",
						"NP" : "M716.198,154.304l0.000,1.161l0.291,1.742l-0.291,1.162l-2.326,0.000l-3.197,-0.581l-2.325,-0.290l-1.453,-1.452l-3.779,-0.291l-3.490,-1.742l-2.614,-1.161l-2.908,-1.162l1.163,-2.613l1.745,-1.161l1.162,-0.582l2.326,0.871l2.616,1.742l1.454,0.291l1.162,1.452l2.034,0.581l2.326,1.162l2.906,0.580l-3.198,-0.291z",
						"NZ" : "M949.907,343.345l0.873,1.161l1.745-1.161l0.87,1.161v1.161l-0.87,1.452l-2.036,2.033l-1.163,1.161l0.873,1.162h-2.034l-2.327,1.162l-0.871,1.74l-1.455,2.904l-2.323,1.161l-1.165,0.871l-2.615-0.289l-1.742-0.872h-3.198l-0.292-1.162l1.453-2.033l3.49-2.613l1.744-0.58l2.034-1.16l2.325-1.452l1.744-1.453l1.162-2.032l0.872-0.58l0.58-1.452l1.745-1.451L949.907,343.345zM954.559,330.277l1.743,2.904l0.292-1.743l1.16,0.58l0.293,2.324l2.324,0.872h1.745l1.743-0.872l1.453,0.289l-0.871,2.326l-0.873,1.74h-2.033l-0.582,0.581v1.452l-0.289,0.291l-1.165,1.452l-1.163,2.032l-2.325,1.161l-0.29-0.87l-1.162-0.291l1.452-2.322l-0.871-1.453l-2.907-1.16v-0.873l2.035-1.159l0.58-2.034l-0.289-1.743l-1.164-1.743l0.292-0.58l-1.454-1.161l-2.034-2.323l-1.162-2.032l0.87-0.291l1.455,1.453l2.325,0.87L954.559,330.277z",
						"OM" : "M635.678,172.888l-0.871,1.742h-1.163l-0.58,0.581l-0.582,1.452l0.29,1.742l-0.29,0.581l-1.163-0.29l-1.744,1.162l-0.291,1.452l-0.58,0.581h-1.743l-1.165,0.582v1.162l-1.163,0.581l-1.452-0.291l-2.034,1.162h-1.163l-0.873-1.743l-2.325-4.645l8.431-2.613l1.745-5.519l-1.165-2.032v-1.162l0.873-1.162v-1.161l1.162-0.581l-0.581-0.291l0.289-1.742h1.456l1.161,1.742l1.745,1.161l2.036,0.291l1.45,0.581l1.165,1.452l0.871,0.872l0.872,0.58v0.582l-0.872,1.451l-0.582,0.872L635.678,172.888zM628.995,159.82l-0.291,0.291l-0.583-0.871l0.874-0.872l0.289,0.291L628.995,159.82z",
						"PA" : "M259.244,211.219l-0.872,-0.871l-0.580,-1.452l0.872,-0.871l-0.872,-0.290l-0.582,-0.871l-1.163,-0.581l-1.162,0.000l-0.582,1.162l-1.162,0.580l-0.582,0.000l-0.291,0.581l1.163,1.451l-0.581,0.581l-0.582,0.291l-1.163,0.290l-0.581,-1.742l-0.291,0.291l-0.872,0.000l-0.581,-1.162l-1.163,-0.291l-0.580,-0.290l-1.164,0.000l-0.291,0.581l-0.290,-0.291l0.290,-0.580l0.291,-0.582l-0.291,-0.289l0.583,-0.581l-0.583,-0.291l0.000,-1.161l0.872,-0.291l1.163,1.162l0.000,0.581l0.872,0.000l0.291,-0.291l0.872,0.872l1.163,-0.291l1.163,-0.581l1.744,-0.579l0.872,-0.873l1.744,0.000l-0.291,0.291l1.745,0.291l1.163,0.291l0.871,0.870l0.872,0.870l-0.290,0.292l0.872,1.741l-0.582,0.871l-0.872,-0.289l0.582,-1.451z",
						"PE" : "M282.208,279.17l-0.872,1.451l-1.163,0.872l-2.905,-1.743l-0.292,-1.162l-5.232,-2.613l-4.942,-3.195l-2.325,-1.451l-1.163,-2.323l0.581,-0.871l-2.326,-3.485l-2.905,-5.227l-2.326,-5.517l-1.163,-1.161l-0.872,-2.033l-2.325,-1.743l-1.745,-1.161l0.872,-1.162l-1.453,-2.613l0.872,-2.033l2.326,-1.742l0.291,1.160l-0.873,0.582l0.000,1.162l1.163,-0.290l1.163,0.290l1.162,1.451l1.454,-1.162l0.582,-1.742l1.744,-2.613l3.196,-0.871l3.198,-2.904l0.872,-1.741l-0.581,-2.324l0.872,-0.291l1.744,1.452l0.872,1.163l1.163,0.870l1.744,2.903l2.035,0.291l1.453,-0.870l1.164,0.579l1.452,-0.290l2.326,1.452l-1.744,2.613l0.582,0.290l1.452,1.454l-2.324,-0.290l-0.583,0.580l-2.033,0.289l-3.198,2.034l-0.291,1.161l-0.581,1.162l0.290,1.451l-1.744,0.581l0.000,1.162l-0.872,0.581l1.163,2.614l1.744,1.451l-0.581,1.451l1.744,0.000l0.872,1.453l2.616,0.000l2.326,-1.453l-0.292,4.066l1.163,0.292l1.744,-0.292l2.326,4.355l-0.582,0.873l-0.290,2.033l0.000,2.323l-1.163,1.452l0.582,0.872l-0.582,0.869l1.163,2.324l1.745,-2.904z",
						"PG" : "M902.817,249.55l-0.873,0.29l-1.163-0.871l-1.162-1.742l-0.581-2.032l0.581-0.289l0.29,0.579l0.583,0.872l1.452,1.741l1.163,0.871L902.817,249.55zM892.063,246.065l-1.455,0.292l-0.29,0.58l-1.454,0.871l-1.452,0.582h-1.452l-2.328-0.872l-1.453-0.872v-0.871l2.616,0.582l1.454-0.292l0.289-1.159l0.582-0.293l0.292,1.452h1.452l0.873-1.159l1.452-0.873l-0.289-1.741h1.741l0.584,0.58l-0.291,1.452L892.063,246.065zM878.982,251.292l2.326,1.742l1.741,2.904h1.745v1.16l2.035,0.582l-0.87,0.291l2.904,1.16l-0.29,0.871l-1.744,0.292l-0.87-0.872l-2.328-0.291l-2.616-0.29l-2.325-1.743l-1.452-1.451l-1.454-2.613l-3.488-1.161l-2.326,0.871l-1.744,0.871l0.292,2.032l-2.034,0.871l-1.744-0.29l-2.617-0.29l-0.29-9.002v-8.712l4.94,1.742l4.941,1.451l2.036,1.453l1.452,1.452l0.292,1.741l4.649,1.743l0.583,1.451l-2.328,0.291L878.982,251.292zM895.259,243.451l-0.873,0.582l-0.582-1.741l-0.579-0.873l-1.162-0.87l-1.455-1.162l-2.034-0.871l0.579-0.58l1.455,0.58l1.163,0.581l1.163,0.871l0.87,1.161l1.165,0.871L895.259,243.451z",
						"PH" : "M821.715,207.735l0.292,2.033v1.451l-0.872,2.322l-0.871-2.612l-1.454,1.452l0.871,2.033l-0.871,1.16l-3.199-1.452l-0.581-2.032l0.874-1.452l-1.745-1.161l-0.873,1.161l-1.452-0.29l-2.034,1.742l-0.292-0.871l0.871-2.323l1.744-0.871l1.455-0.872l1.163,1.162l2.035-0.87l0.29-1.162h2.033v-2.323l2.036,1.453l0.29,1.451L821.715,207.735zM815.03,202.798l-0.871,0.87l-0.873,1.744l-0.871,0.579l-1.744-1.741l0.582-0.871l0.581-0.581l0.289-1.743l1.455-0.29l-0.292,2.033l2.036-2.614L815.03,202.798zM799.916,205.413l-3.488,2.612l1.163-2.033l2.034-1.741l1.743-1.744l1.454-2.902l0.291,2.322l-1.745,1.453L799.916,205.413zM809.216,198.151l1.743,0.872h1.745v1.161l-1.452,1.162l-1.745,0.871v-1.162l0.292-1.451L809.216,198.151zM819.099,197.571l0.874,2.904l-2.036-0.582v0.872l0.581,1.741l-1.162,0.582l-0.29-2.033h-0.584l-0.578-1.742l1.743,0.291v-1.162l-1.743-2.033h2.614L819.099,197.571zM808.344,194.958l-0.873,2.323l-1.161-1.162l-1.454-2.323l2.615,0.291L808.344,194.958zM807.764,180.148l1.743,0.581l0.871-0.581v0.581l-0.289,1.162l0.87,2.033l-0.581,2.324l-1.744,0.87l-0.29,2.323l0.582,2.033l1.452,0.29l1.165-0.29l3.486,1.451l-0.289,1.743l0.87,0.581l-0.289,1.161l-2.036-1.161l-1.163-1.452l-0.579,0.871l-1.744-1.743l-2.617,0.581l-1.454-0.581l0.291-1.162l0.873-0.871l-0.873-0.58l-0.291,1.162l-1.453-1.743l-0.29-1.161l-0.291-2.613l1.162,0.871l0.292-4.355l0.871-2.324H807.764z",
						"PK" : "M680.735,128.75l2.036,1.451l0.870,2.033l4.361,1.162l-2.617,2.323l-3.196,0.290l-4.069,-0.581l-1.453,1.162l1.160,2.324l0.874,2.032l2.325,1.161l-2.325,1.743l0.000,2.032l-2.618,2.614l-1.745,2.904l-2.904,2.904l-3.199,-0.291l-3.197,2.904l1.745,1.162l0.579,2.032l1.455,1.451l0.583,2.324l-6.106,0.000l-1.745,2.033l-2.033,-0.871l-0.873,-2.033l-2.034,-2.033l-5.234,0.580l-4.360,0.000l-4.068,0.291l1.161,-3.193l4.070,-1.162l-0.290,-1.452l-1.453,-0.291l0.000,-2.613l-2.617,-1.162l-1.162,-1.742l-1.453,-1.452l4.649,1.452l2.907,-0.291l1.455,0.291l0.581,-0.580l2.035,0.289l3.488,-1.161l0.291,-2.323l1.452,-1.742l2.034,0.000l0.292,-0.581l2.036,-0.290l1.160,0.000l0.875,-0.580l0.000,-1.743l1.162,-1.743l1.742,-0.580l-1.161,-1.743l2.616,0.000l0.872,-0.871l-0.289,-1.162l1.450,-1.161l-0.289,-1.452l-0.581,-1.162l1.454,-1.161l3.197,-0.580l2.907,-0.291l1.454,-0.581l-1.743,0.290z",
						"PL" : "M515.047,90.418l-1.165,-1.742l0.292,-0.870l-0.581,-1.452l-1.163,-1.162l0.872,-0.581l-0.583,-1.452l1.744,-0.870l4.362,-1.163l3.489,-1.161l2.614,0.581l0.291,0.580l2.617,0.291l3.489,0.290l4.940,-0.290l1.454,0.290l0.582,0.872l0.289,1.452l0.582,0.870l0.000,1.161l-1.453,0.582l0.871,1.162l0.000,1.161l1.455,2.614l-0.292,0.580l-1.452,0.580l-2.617,2.033l0.872,1.452l-0.582,-0.289l-2.616,-1.163l-2.033,0.582l-1.455,-0.291l-1.453,0.581l-1.455,-1.163l-1.160,0.582l0.000,-0.291l-1.454,-1.161l-2.034,-0.290l-0.290,-0.872l-1.746,-0.290l-0.581,0.580l-1.454,-0.580l0.293,-0.580l-2.036,-0.291l1.453,0.872z",
						"PR" : "M291.219,180.148l1.455,0.000l0.581,0.581l-0.872,0.871l-2.035,0.000l-1.453,0.000l-0.291,-1.162l0.582,-0.290l-2.033,0.000z",
						"PS" : "M571.728,141.816l0.000,1.743l-0.581,0.871l-1.160,0.291l0.000,-0.581l0.871,-0.581l-0.871,-0.289l0.578,-1.743l-1.163,-0.289z",
						"PT" : "M448.769,115.683l1.163,-0.581l1.163,-0.291l0.581,1.162l1.744,0.000l0.291,-0.290l1.746,0.000l0.581,1.452l-1.163,0.870l0.000,2.033l-0.582,0.291l0.000,1.451l-1.162,0.291l1.162,1.452l-0.873,2.032l0.873,0.581l-0.291,0.871l-0.871,0.871l0.000,1.162l-0.874,0.581l-1.452,-0.290l-1.454,0.290l0.292,-2.324l-0.292,-1.451l-1.163,-0.291l-0.581,-1.162l0.291,-1.742l0.871,-1.160l0.292,-0.873l0.582,-1.741l0.000,-1.162l-0.582,-0.871l0.292,1.161z",
						"PY" : "M301.103,292.237l1.163,-3.485l0.000,-1.451l1.453,-2.324l4.652,-0.871l2.616,0.000l2.615,1.451l0.000,0.871l0.872,1.452l-0.291,3.776l2.907,0.581l1.163,-0.581l2.035,0.871l0.291,0.581l0.291,2.613l0.290,1.162l1.163,0.000l0.872,-0.290l1.163,0.290l0.000,1.741l-0.292,1.454l-0.580,1.742l-0.582,2.322l-2.325,2.032l-2.326,0.581l-3.197,-0.581l-2.617,-0.580l2.617,-4.354l-0.291,-1.162l-2.906,-1.161l-3.198,-2.034l-2.326,-0.290l5.232,4.356z",
						"QA" : "M613.587,162.725l0.000,-1.743l0.582,-1.452l0.873,-0.290l0.871,0.871l0.000,1.451l-0.581,1.744l-0.872,0.000l0.873,0.581z",
						"RO" : "M536.265,99.13l1.163,-0.581l1.744,0.581l1.745,0.000l1.163,0.581l1.162,-0.581l2.036,-0.291l0.579,-0.580l1.163,0.000l0.873,0.290l0.871,0.872l0.873,1.162l1.453,1.742l0.291,1.161l-0.291,1.161l0.291,1.163l1.452,0.580l1.166,-0.580l1.161,0.580l0.289,0.581l-1.450,0.581l-0.874,0.000l-0.872,3.194l-1.454,-0.290l-2.035,-0.872l-3.196,0.581l-1.452,0.581l-4.071,0.000l-2.035,-0.581l-1.164,0.291l-0.581,-1.162l-0.581,-0.581l0.581,-0.291l-0.581,-0.289l-0.871,0.580l-1.745,-0.872l-0.289,-1.161l-1.454,-0.580l-0.293,-0.872l-1.741,-1.161l2.325,-0.581l1.742,-1.741l1.164,-2.034l-1.743,0.581z",
						"RS" : "M531.325,106.1l1.454,0.580l0.289,1.161l1.745,0.872l0.871,-0.580l0.581,0.289l-0.581,0.291l0.581,0.581l-0.871,0.581l0.290,1.161l1.454,1.162l-1.164,0.871l-0.580,0.871l0.290,0.289l-0.290,0.292l-1.165,0.000l-1.161,0.290l0.000,-0.290l0.290,-0.292l0.292,-0.580l-0.292,0.000l-0.579,-0.580l-0.583,0.000l-0.290,-0.581l-0.581,-0.290l-0.293,-0.291l-0.581,0.291l-0.289,0.871l-0.582,0.000l0.290,0.000l-1.162,-0.581l-0.872,-0.290l-0.290,-0.581l-0.873,-0.290l0.581,-0.291l0.582,-1.161l-1.455,-1.162l0.581,-1.161l-0.871,0.000l1.163,-0.872l-0.873,-0.870l-0.871,-1.163l2.326,-0.580l1.455,0.000l1.741,1.161l-0.293,-0.872z",
						"RU" : "M869.098,91.29l2.907,4.936l-4.07-0.87l-1.743,4.065l2.614,2.613v2.033l-2.034-1.743l-1.743,2.323l-0.582-2.323l0.292-2.904l-0.292-2.904l0.582-2.033v-3.775l-1.454-2.613l0.291-3.774l2.326-1.162l-0.872-1.452l1.163-0.29l0.58,1.742l1.162,2.614l-0.29,2.903L869.098,91.29zM536.265,81.417l-4.94,0.29l-3.488-0.29l0.58-1.452l3.779-0.872l2.906,0.581l1.454,0.291l-0.582,0.871L536.265,81.417zM969.382,36.116l-3.196,0.291l-0.581-0.871l3.777-1.162h-0.01l0.58-0.29h2.326l3.779,0.872v0.29l-2.907,0.871h-3.778H969.382zM869.098,29.728h-4.069l-5.814-0.29l-0.582-0.29l2.618-1.162h3.488l4.067,0.872L869.098,29.728zM888.574,24.501l-3.198,1.162l-4.36-0.291l-4.942-1.16l0.582-0.873l5.232,0.291L888.574,24.501zM873.167,23.049l-2.324,2.033h-9.884l-4.651,0.58l-5.521-1.742l1.454-1.742l3.778-0.582h7.266L873.167,23.049zM632.19,36.407l-1.743,0.291l-9.012-0.291l-0.581-1.161l-4.941-0.872l-0.581-1.452l2.907-0.582V30.89l5.232-2.323l-2.325-0.291l6.393-2.613l-0.578-1.162l6.104-1.452l9.011-1.742l9.3-0.581l4.653-0.871l5.23-0.581l2.036,1.162l-1.745,0.871l-9.883,1.452l-8.43,1.162l-8.43,2.613l-4.069,2.614l-4.361,2.904l0.584,2.033L632.19,36.407zM969.382,52.379h-0.291l-3.486,1.161l-3.488-0.29l2.615,1.452l1.454,2.323l1.455,0.58l0.289,1.162l-0.873,0.872l-4.94-0.582l-7.849,2.033l-2.325,0.291l-4.362,2.033l-4.069,1.742l-0.871,1.161l-4.069-2.033l-6.977,2.324l-1.452-1.162l-2.618,1.162l-3.488-0.291l-0.871,1.742l-3.486,2.613l0.29,1.162l2.906,0.582l-0.291,4.064h-2.615l-1.163,2.324l1.163,1.161l-4.651,1.452l-1.163,3.194l-4.07,0.582l-0.87,2.903l-3.781,2.613l-1.162-2.032l-1.163-3.775l-1.454-6.389l1.164-3.775l2.324-1.453l0.291-1.451l4.36-0.581l4.942-3.484l4.649-2.904l4.943-2.033l2.326-3.775h-3.489l-1.744,2.324l-6.977,3.194l-2.034-3.485l-7.269,0.872l-6.975,4.646l2.325,1.742l-6.105,0.58l-4.359,0.291l0.291-2.032l-4.358-0.292l-3.199,1.453l-8.431-0.581l-9.01,0.871l-9.013,5.227l-10.463,6.679l4.357,0.29l1.165,1.743l2.615,0.581l1.744-1.452l3.196,0.291l3.78,2.904l0.29,2.323l-2.326,2.904v3.194l-1.452,4.356l-4.07,4.066l-0.87,1.741l-3.781,3.194l-3.777,3.194l-1.744,1.742l-3.488,1.452l-1.744,0.291l-1.744-1.453l-3.78,2.033l-0.579,0.871l-0.292-0.582v-1.161l1.454-0.291l0.29-3.194l-0.581-2.324l2.325-0.871l3.198,0.291l2.034-2.613l0.871-2.904l1.163-1.162l1.454-2.323l-4.651,0.871l-2.325,0.872h-4.361l-0.871-2.614l-3.488-1.742l-4.651-0.871l-1.16-2.904l-0.874-1.453l-0.871-1.161l-1.744-2.903l-2.617-1.162l-4.067-0.58h-3.491l-3.486,0.58l-2.325,1.162l1.452,0.871v1.452l-1.452,0.872l-2.328,2.903v1.162l-4.068,1.742l-3.197-1.162l-3.197,0.291l-1.452-0.871l-1.745-0.291l-4.069,2.033l-3.488,0.291l-2.616,0.872l-3.49-0.581h-2.615l-1.743-1.453l-2.615-1.162l-2.618-0.291l-3.486,0.291l-2.617,0.582l-4.069-1.162l-0.29-2.324l-3.488-0.58l-2.326-0.29l-3.196-1.162l-2.907,2.903l1.163,1.453l-2.617,2.033l-4.07-0.581l-2.617-0.29l-1.741-1.162h-2.908l-2.616-0.871l-4.068,1.161l-5.232,2.324l-2.907,0.582l-1.163,0.29l-1.454-1.742l-3.488,0.291l-1.163-1.162l-2.034-0.582l-1.16-1.452l-1.455-0.581l-4.069,0.872l-3.78-1.742l-1.453,1.451l-6.104-6.968l-3.488-2.033l0.871-0.871l-6.975,2.613h-2.617l0.29-1.451l-3.488-0.872l-2.906,0.581l-0.872-2.904l-4.941-0.581l-2.326,1.161l-6.977,1.162l-1.454,0.582l-10.172,0.872l-1.454,1.161l2.036,1.743l-2.617,0.87l0.581,0.581l-2.617,1.452l4.361,1.742l-0.581,1.453l-3.78-0.291l-0.871,0.872l-3.488-1.452l-4.36,0.29l-2.906,1.162l-3.488-1.162l-5.812-2.032h-4.361l-5.814,3.194l-0.289,2.033l-2.906-1.742l-2.036,3.195l0.58,0.29l-1.452,2.324l2.326,1.742h2.034l1.743,1.741l-0.289,1.453l1.452,0.581l-1.163,1.452l-2.906,0.581l-2.615,2.614l2.615,2.613l-0.289,2.032l2.906,3.194l-1.744,1.162l-0.29,0.581h-1.165l-2.033-1.743h-0.873l-1.745-0.871l-0.581-1.162l-2.614-0.58l-1.745,0.58l-0.581-0.58l-3.78-1.162l-3.778-0.581l-2.325-0.581l-0.581,0.581l-3.488-2.323l-3.197-1.161l-2.326-1.743l2.034-0.29l2.328-2.324l-1.455-1.162l4.07-1.162l-0.292-0.581l-2.323,0.581v-1.161l1.452-0.871l2.615-0.291l0.582-0.871l-0.582-1.452l1.163-1.451l-0.29-0.873l-4.07-0.871h-1.454l-1.744-1.162l-2.034,0.291l-3.488-0.871V91.29l-0.871-1.162h-2.327l-0.29-0.871l0.873-0.581l-1.744-1.742l-2.906,0.29h-0.872l-0.584,0.582h-1.16l-0.583-2.033l-0.871-0.872l0.581-0.291l2.326,0.291l1.163-0.58l-0.872-0.872l-2.036-0.581l0.292-0.29l-1.163-0.581l-1.743-1.742l0.578-0.871l-0.289-1.162l-2.615-0.581l-1.454,0.291l-0.29-0.872l-2.907-0.581l-0.871-1.742l-0.291-1.161l-1.455-0.582l1.163-0.871l-0.582-2.613l1.745-1.742l-0.291-0.291l3.199-1.742l-2.908-1.162l5.813-3.485l2.617-1.742l0.871-1.162l-4.069-2.032l1.162-1.742l-2.325-2.033l1.744-2.324l-3.198-3.194l2.617-2.033l-4.362-1.743l0.584-2.033l2.034-0.29l4.942-1.161l2.615-0.872l4.651,1.743l7.557,0.58l10.465,3.195l2.035,1.162v1.741l-2.906,1.453l-4.651,0.871l-12.21-2.033l-2.033,0.291l4.651,2.033v1.161l0.292,2.904l3.486,0.872l2.036,0.58l0.581-1.161l-1.746-1.162l1.746-1.162l6.685,1.742l2.326-0.581l-1.745-2.033l6.396-2.903l2.323,0.29l2.617,0.871l1.745-1.742l-2.326-1.742l1.163-1.742l-2.034-1.452l7.848,0.872l1.453,1.452l-3.489,0.289v1.453l2.326,1.162l4.361-0.582l0.581-2.033l5.812-1.161l9.594-2.323h2.034l-2.907,1.742l3.488,0.29l2.034-0.871h5.232l4.069-1.161l3.197,1.452l2.906-1.742l-2.906-1.453l1.454-1.162l8.14,0.872l3.778,0.871l10.176,3.194l1.742-1.452l-2.907-1.452v-0.581l-3.197-0.291l0.874-1.162l-1.455-2.323v-0.871l4.943-2.323l1.742-2.613l2.035-0.582l7.268,0.872l0.581,1.451l-2.615,2.324l1.743,0.871l0.872,1.742l-0.581,3.775l3.198,1.743l-1.165,1.742l-5.521,4.066l3.197,0.29l1.161-0.871l2.907-0.872l0.874-1.161l2.325-1.453l-1.744-1.452l1.454-1.742l-3.198-0.291l-0.582-1.451l2.326-2.904l-3.778-2.324l4.94-1.741l-0.581-2.033h1.453l1.454,1.452l-1.163,2.613l2.907,0.581l-1.162-2.033l4.65-0.872l5.522-0.29l5.232,1.451l-2.617-2.032l-0.29-3.195l4.94-0.291h6.688l5.812-0.29l-2.324-1.451l3.197-1.743l3.197-0.29l5.521-1.162l7.27-0.58l0.872-0.582l7.268-0.291l2.325,0.582l6.104-1.452h4.94l0.873-1.161l2.615-1.162l6.396-1.161l4.651,0.87l-3.489,0.872l6.104,0.291l0.874,1.452l2.324-0.871h8.141l6.104,1.452l2.325,1.162l-0.873,1.451l-2.907,0.581l-7.267,1.743l-2.036,0.581l3.49,0.58l4.068,0.581l2.326-0.581l1.452,1.743l1.165-0.581l4.359-0.582l9.013,0.582l0.579,1.161l11.628,0.582v-2.033l5.814,0.291h4.359l4.651,1.451l1.163,1.742l-1.745,1.162l3.488,2.323l4.36,1.161l2.615-2.904l4.653,1.162l4.65-0.871l5.233,0.871l2.034-0.581l4.648,0.29l-2.033-2.614l3.488-1.161l24.998,1.741l2.327,1.743l7.267,2.032l11.045-0.581l5.524,0.581l2.324,1.162l-0.58,2.033l3.486,0.581l3.78-0.581h4.941l4.94,0.581l5.234-0.29l4.938,2.323l3.488-0.872l-2.322-1.742l1.162-1.162l8.721,0.872l5.812-0.292l7.848,1.453l4.069,1.162h-0.01l6.976,2.033l6.977,2.614v1.742l1.744,0.871l-0.581-2.033l7.559,0.291l5.231,2.613l-2.616,1.162l-4.651,0.29v2.613l-1.161,0.581h-2.617l-2.034-0.871l-3.779-0.871l-0.582-1.162l-2.615-0.58l-3.199,0.58l-1.452-1.162l0.581-0.872l-3.198,0.582l1.165,1.452l-1.745,1.162H969.382zM762.998,15.499l-15.406,1.162l4.94-3.484l2.328-0.291h2.034l6.977,1.742L762.998,15.499zM614.46,9.401l-3.488,0.291l-2.617,0.29l-0.289,0.581l-3.199,0.291l-3.197-0.581l1.743-0.871h-6.104l5.233-0.581h4.359l0.291,0.581l1.744-0.581l2.618-0.291l4.067,0.581L614.46,9.401zM748.754,14.047l-5.812,0.29l-7.85-0.87l-4.359-0.872l-2.325-2.033l-3.779-0.581l7.268-1.742L738,7.369l5.232,1.452l6.396,2.614L748.754,14.047z",
						"RW" : "M557.485,234.16l1.163,1.452l-0.289,1.741l-0.582,0.291l-1.454,-0.291l-0.874,1.743l-1.743,-0.290l0.293,-1.453l0.290,-0.290l0.000,-1.742l0.871,-0.580l0.582,0.290l-1.743,0.871z",
						"SA" : "M591.496,185.956l-0.291,-1.162l-0.873,-0.871l-0.290,-1.162l-1.453,-0.871l-1.454,-2.323l-0.582,-2.322l-2.034,-1.744l-1.163,-0.580l-1.743,-2.613l-0.292,-1.744l0.000,-1.741l-1.453,-2.904l-1.454,-1.162l-1.453,-0.580l-0.871,-1.452l0.000,-0.872l-0.581,-1.451l-0.874,-0.582l-1.162,-2.032l-1.452,-2.033l-1.456,-2.033l-1.452,0.000l0.290,-1.451l0.292,-0.871l0.292,-1.162l3.196,0.291l1.161,-0.582l0.581,-1.161l2.036,-0.290l0.581,-0.871l0.872,-0.581l-2.905,-2.614l5.522,-1.451l0.582,-0.582l3.488,0.873l4.067,2.032l7.561,5.517l5.230,0.000l2.326,0.290l0.873,1.452l1.743,0.000l1.165,2.323l1.452,0.581l0.289,0.871l2.036,1.162l0.290,1.162l-0.290,0.870l0.290,0.872l0.584,0.871l0.578,0.871l0.292,0.581l0.873,0.581l0.872,0.000l0.290,0.871l0.291,0.871l0.872,2.613l8.430,1.452l0.580,-0.580l1.165,2.031l-1.745,5.519l-8.430,2.613l-7.849,1.162l-2.615,1.161l-2.036,2.904l-1.163,0.291l-0.580,-0.873l-1.164,0.292l-2.615,-0.292l-0.582,-0.289l-3.197,0.000l-0.582,0.289l-1.161,-0.869l-0.873,1.451l0.289,1.161l1.161,-0.872z",
						"SB" : "M919.968,259.712l0.871,0.873h-2.034l-0.873-1.453l1.452,0.58H919.968zM916.48,257.972l-0.874,0.289l-1.743-0.289l-0.58-0.582v-1.161l2.034,0.581l0.873,0.58L916.48,257.972zM918.805,257.39l-0.291,0.582l-2.034-2.613l-0.582-1.453h0.871l0.873,2.033L918.805,257.39zM913.863,253.906v0.581l-2.034-1.161l-1.454-1.162l-1.161-0.871l0.579-0.29l1.164,0.871l2.326,1.161L913.863,253.906zM907.468,251.002l-0.581,0.29l-1.162-0.58l-1.163-1.162v-0.581l1.744,1.162L907.468,251.002z",
						"SD" : "M567.37,204.831l-0.582,0.000l0.000,-1.452l-0.292,-0.873l-1.453,-1.160l-0.292,-1.742l0.292,-2.033l-1.162,-0.291l-0.293,0.582l-1.452,0.289l0.582,0.582l0.291,1.742l-1.454,1.451l-1.453,2.033l-1.454,0.291l-2.325,-1.744l-1.163,0.582l0.000,0.871l-1.454,0.581l-0.290,0.582l-2.617,0.000l-0.289,-0.582l-2.035,0.000l-1.164,0.291l-0.581,-0.291l-1.452,-1.452l-0.584,-0.871l-2.033,0.581l-0.581,1.161l-0.872,2.324l-0.874,0.581l-0.872,0.289l-0.290,0.000l-0.871,-0.870l0.000,-0.870l0.289,-1.163l0.000,-1.162l-1.452,-1.742l-0.292,-1.162l0.000,-0.580l-1.162,-0.871l0.000,-1.453l-0.582,-1.161l-0.873,0.290l0.293,-1.161l0.580,-1.162l-0.289,-1.162l0.871,-0.870l-0.582,-0.581l0.872,-1.743l1.164,-2.032l2.324,0.291l0.000,-11.036l0.000,-0.870l3.199,-0.291l0.000,-5.228l11.045,0.000l10.755,0.000l10.755,0.000l0.874,2.615l-0.581,0.580l0.289,2.614l1.163,3.485l1.164,0.580l1.454,0.872l-1.454,1.742l-2.035,0.289l-0.874,0.873l-0.291,2.033l-1.161,4.065l0.290,0.870l-0.581,2.323l-0.872,2.904l-1.743,1.162l-1.163,2.322l-0.292,1.162l-1.454,0.582l-0.579,2.903l0.000,-0.291z",
						"SE" : "M534.813,50.346l-2.617,1.742l0.291,1.742l-4.362,2.324l-5.230,2.323l-2.036,3.774l2.036,2.033l2.615,1.452l-2.615,3.194l-2.907,0.581l-0.873,4.647l-1.744,2.613l-3.197,-0.291l-1.455,2.033l-3.196,0.291l-0.874,-2.614l-2.323,-3.194l-2.327,-3.776l1.455,-1.742l2.033,-1.742l1.162,-3.485l-1.743,-1.162l-0.290,-3.775l1.744,-2.612l2.907,0.000l0.873,-0.872l-1.165,-1.162l4.361,-3.774l2.907,-2.904l1.745,-2.033l2.615,0.000l0.582,-1.452l5.232,0.290l0.582,-1.742l1.744,-0.290l3.486,1.452l4.361,2.033l0.000,4.065l0.872,1.162l4.649,-0.871z",
						"SI" : "M511.848,102.905l2.326,0.291l1.162,-0.582l2.616,0.000l0.291,-0.580l0.582,0.000l0.582,1.162l-2.325,0.580l-0.293,1.162l-0.871,0.290l0.000,0.582l-1.163,0.000l-0.873,-0.291l-0.580,0.291l-1.743,0.000l0.581,-0.291l-0.581,-1.162l-0.289,1.452z",
						"SK" : "M525.802,94.774l0.000,0.291l1.160,-0.582l1.455,1.163l1.453,-0.581l1.455,0.291l2.033,-0.582l2.616,1.163l-0.872,0.870l-0.580,0.872l-0.582,0.290l-2.908,-0.872l-0.870,0.291l-0.582,0.581l-1.455,0.290l-0.289,0.000l-1.163,0.290l-1.163,0.290l-0.291,0.291l-2.324,0.581l-0.871,-0.290l-1.454,-0.872l-0.292,-0.870l0.292,-0.291l0.289,-0.581l1.165,0.000l0.871,-0.290l0.290,-0.291l0.289,-0.289l0.292,-0.581l0.582,0.000l0.580,-0.582l-0.874,0.000z",
						"SL" : "M442.376,212.381l-0.873,-0.291l-2.034,-1.161l-1.455,-1.452l-0.289,-0.871l-0.292,-2.033l1.455,-1.451l0.289,-0.582l0.292,-0.581l0.871,0.000l0.581,-0.580l2.326,0.000l0.582,0.871l0.581,1.163l0.000,0.870l0.582,0.581l0.000,1.161l0.581,-0.290l-1.163,1.451l-1.454,1.452l0.000,0.871l0.580,-0.872z",
						"SN" : "M427.84,193.505l-1.162,-2.032l-1.454,-1.161l1.164,-0.291l1.452,-2.032l0.582,-1.452l0.871,-0.872l1.456,0.291l1.452,-0.581l1.454,0.000l1.163,0.872l2.034,0.580l1.454,2.033l2.034,1.742l0.000,1.742l0.581,1.742l1.162,0.581l0.000,1.162l0.000,0.871l-0.289,0.290l-1.744,-0.290l0.000,0.290l-0.581,0.000l-2.036,-0.581l-1.453,0.000l-4.942,-0.290l-0.871,0.290l-0.874,0.000l-1.453,0.581l-0.291,-2.323l2.327,0.291l0.580,-0.581l0.582,0.000l1.163,-0.581l1.163,0.581l1.162,0.000l1.163,-0.581l-0.582,-0.872l-0.870,0.581l-0.873,0.000l-1.163,-0.581l-0.871,0.000l-0.581,0.581l2.909,0.000z",
						"SO" : "M610.681,199.023l1.452,-0.290l1.162,-0.871l1.165,0.000l0.000,0.871l-0.291,1.451l0.000,1.453l-0.582,1.161l-0.581,2.904l-1.452,2.904l-1.747,3.484l-2.323,4.066l-2.326,3.194l-3.199,3.775l-2.907,2.323l-4.068,2.613l-2.616,2.033l-2.908,3.486l-0.582,1.451l-0.580,0.581l-1.745,-2.323l0.000,-9.873l2.325,-3.196l0.874,-0.870l1.744,0.000l2.324,-2.033l3.780,0.000l7.850,-8.421l1.742,-2.323l1.163,-1.742l0.000,-1.452l0.000,-2.614l0.000,-1.161l0.290,0.000l0.873,0.000l-1.163,0.581z",
						"SOL" : "M608.355,204.831l-1.163,1.742l-1.742,2.323l-2.328,0.000l-9.010,-3.194l-1.163,-0.871l-0.873,-1.452l-1.163,-1.453l0.583,-1.161l1.161,-1.452l0.873,0.580l0.582,1.162l1.163,1.162l1.163,0.000l2.614,-0.580l3.199,-0.582l2.327,-0.580l1.452,-0.291l0.871,-0.580l1.744,0.000l-0.290,0.000l0.000,1.161l0.000,2.614l0.000,-1.452z",
						"SR" : "M316.509,214.415l3.198,0.580l0.290,-0.291l2.326,-0.289l2.907,0.580l-1.453,2.612l0.289,1.743l1.164,1.742l-0.582,1.161l-0.290,1.163l-0.581,1.162l-1.745,-0.581l-1.162,0.289l-1.163,-0.289l-0.291,0.870l0.581,0.581l-0.290,0.581l-1.454,-0.291l-1.744,-2.322l-0.291,-1.744l-0.872,0.000l-1.453,-2.032l0.581,-1.161l0.000,-0.872l1.453,-0.579l-0.582,2.613z",
						"SS" : "M567.37,204.831l0.000,2.322l-0.582,0.872l-1.455,0.000l-0.872,1.452l1.746,0.291l1.452,1.161l0.290,1.161l1.454,0.580l1.455,3.196l-1.745,1.741l-1.743,1.743l-1.745,1.162l-1.744,0.000l-2.326,0.580l-1.744,-0.580l-1.163,0.870l-2.325,-2.032l-0.874,-1.162l-1.450,0.581l-1.166,0.000l-0.873,0.291l-1.161,-0.291l-1.743,-2.323l-0.292,-0.871l-2.034,-0.871l-0.873,-1.743l-1.163,-1.161l-1.743,-1.452l0.000,-0.871l-1.452,-1.162l-2.037,-1.162l0.872,-0.289l0.874,-0.581l0.872,-2.324l0.581,-1.161l2.033,-0.581l0.584,0.871l1.452,1.452l0.581,0.291l1.164,-0.291l2.035,0.000l0.289,0.582l2.617,0.000l0.290,-0.582l1.454,-0.581l0.000,-0.871l1.163,-0.582l2.325,1.744l1.454,-0.291l1.453,-2.033l1.454,-1.451l-0.291,-1.742l-0.582,-0.582l1.452,-0.289l0.293,-0.582l1.162,0.291l-0.292,2.033l0.292,1.742l1.453,1.160l0.292,0.873l0.000,1.452l-0.582,0.000z",
						"SV" : "M232.211,194.086l-0.291,0.581l-1.743,0.000l-0.872,-0.290l-1.164,-0.581l-1.452,0.000l-0.873,-0.581l0.000,-0.580l0.873,-0.581l0.580,-0.291l0.000,-0.290l0.581,-0.291l0.873,0.291l0.582,0.581l0.872,0.581l0.000,0.289l1.161,-0.289l0.582,0.000l0.291,0.289l0.000,-1.162z",
						"SY" : "M580.45,139.204l-5.234,2.903l-3.195,-1.161l0.289,-0.290l0.000,-1.162l0.873,-1.452l1.452,-1.161l-0.581,-1.162l-1.163,0.000l-0.290,-2.033l0.582,-1.161l0.871,-0.582l0.581,-0.580l0.290,-1.742l0.873,0.580l2.907,-0.870l1.454,0.581l2.327,0.000l3.196,-0.872l1.453,0.000l3.197,-0.581l-1.454,1.742l-1.454,0.872l0.292,2.032l-1.163,3.195l6.103,-2.904z",
						"SZ" : "M562.136,304.433l-0.581,1.161l-1.744,0.290l-1.452,-1.451l-0.292,-0.871l0.870,-1.161l0.293,-0.581l0.872,-0.290l1.163,0.580l0.580,1.161l-0.291,-1.162z",
						"TD" : "M513.593,195.538l0.289,-1.161l-1.742,-0.291l0.000,-1.742l-1.165,-0.871l1.165,-3.775l3.486,-2.614l0.292,-3.484l1.164,-5.517l0.581,-1.162l-1.163,-0.871l0.000,-0.871l-1.164,-0.871l-0.581,-4.357l2.616,-1.451l11.046,5.226l11.045,5.227l0.000,11.036l-2.324,-0.291l-1.164,2.032l-0.872,1.743l0.582,0.581l-0.871,0.870l0.289,1.162l-0.580,1.162l-0.293,1.161l0.873,-0.290l0.582,1.161l0.000,1.453l1.162,0.871l0.000,0.580l-1.744,0.581l-1.452,1.161l-2.034,2.905l-2.617,1.452l-2.618,-0.291l-0.871,0.291l0.292,0.870l-1.454,0.872l-1.163,1.161l-3.488,1.162l-0.582,-0.580l-0.579,-0.291l-0.293,0.871l-2.325,0.290l0.290,-0.870l-0.872,-1.743l-0.289,-1.161l-1.165,-0.581l-1.742,-1.743l0.579,-1.161l1.455,0.289l0.581,-0.289l1.453,0.000l-1.453,-2.324l0.292,-2.032l-0.292,-1.743l1.162,1.742z",
						"TF" : "M663.583,364.542l1.746,0.872l2.617,0.581l0.000,0.291l-0.584,1.452l-4.360,0.000l0.000,-1.452l0.292,-1.161l-0.289,0.583z",
						"TG" : "M479,214.123l-2.324,0.581l-0.582,-1.162l-0.872,-1.742l0.000,-1.162l0.581,-2.613l-0.871,-0.872l-0.292,-2.322l0.000,-2.033l-0.871,-1.161l0.000,-0.872l2.616,0.000l-0.582,1.452l0.873,0.871l0.872,0.871l0.291,1.454l0.579,0.289l-0.290,6.388l-0.872,-2.033z",
						"TH" : "M756.022,197.571l-2.325,-1.452l-2.325,0.000l0.290,-2.033l-2.326,0.000l-0.291,2.904l-1.454,4.065l-0.871,2.613l0.290,1.745l1.744,0.289l1.163,2.323l0.291,2.613l1.745,1.452l1.453,0.291l1.454,1.452l-0.873,1.162l-1.744,0.289l-0.290,-1.451l-2.326,-1.163l-0.291,0.582l-1.163,-1.162l-0.582,-1.452l-1.452,-1.452l-1.163,-1.161l-0.582,1.452l-0.581,-1.452l0.292,-1.742l0.871,-2.615l1.452,-2.903l1.454,-2.614l-1.162,-2.322l0.290,-1.452l-0.582,-1.453l-1.741,-2.322l-0.582,-1.162l0.871,-0.580l1.163,-2.323l-1.163,-2.034l-1.744,-1.742l-1.455,-2.613l1.165,-0.290l1.163,-3.194l2.034,0.000l1.743,-1.163l1.454,-0.580l1.163,0.580l0.290,1.744l1.743,0.289l-0.579,2.904l0.000,2.323l2.907,-1.742l0.871,0.581l1.452,0.000l0.582,-0.871l2.036,0.000l2.325,2.323l0.000,2.613l2.327,2.324l-0.291,2.323l-0.872,1.451l-2.326,-0.581l-3.781,0.581l-1.741,2.323l-0.580,-3.485z",
						"TJ" : "M669.108,120.329l-0.873,0.871l-2.906,-0.582l-0.291,1.743l2.908,-0.290l3.488,0.871l5.233,-0.291l0.579,2.324l0.874,-0.291l1.743,0.582l0.000,1.160l0.292,1.742l-2.909,0.000l-1.745,-0.290l-1.744,1.162l-1.162,0.291l-1.161,0.581l-0.873,-0.872l0.000,-2.323l-0.581,0.000l0.291,-0.871l-1.454,-0.871l-1.455,1.161l-0.290,1.161l-0.289,0.291l-1.745,0.000l-0.872,1.162l-0.872,-0.582l-2.036,0.872l-0.871,-0.290l1.744,-2.614l-0.582,-2.032l-2.033,-0.871l0.579,-1.162l2.328,0.290l1.452,-1.743l0.872,-1.741l3.488,-0.582l-0.581,1.163l0.581,0.871l-0.873,0.000z",
						"TL" : "M817.647,255.359l0.580,-0.582l2.327,-0.580l1.744,-0.291l0.871,-0.290l1.164,0.290l-1.164,0.871l-2.905,1.162l-2.037,0.871l-0.290,-0.871l0.290,0.580z",
						"TM" : "M642.364,132.815l-0.289,-2.323l-2.034,0.000l-3.200,-2.324l-2.325,-0.290l-2.907,-1.452l-2.034,-0.290l-1.162,0.581l-1.745,-0.291l-2.036,1.742l-2.323,0.582l-0.582,-2.033l0.289,-2.904l-2.033,-0.871l0.581,-2.033l-1.743,0.000l0.578,-2.323l2.617,0.581l2.326,-0.872l-2.033,-1.742l-0.582,-1.451l-2.328,0.581l-0.289,2.032l-0.871,-1.742l1.160,-0.871l3.199,-0.581l2.034,0.871l1.744,2.033l1.455,0.000l3.199,0.000l-0.583,-1.452l2.325,-0.871l2.325,-1.742l3.778,1.451l0.292,2.324l1.163,0.580l2.907,-0.290l0.871,0.580l1.455,2.904l2.906,1.742l2.034,1.453l2.909,1.162l3.487,1.160l0.000,1.742l-0.871,0.000l-1.164,-0.871l-0.580,1.162l-2.326,0.291l-0.583,2.323l-1.454,0.870l-2.325,0.291l-0.581,1.452l-2.034,0.291l2.617,1.162z",
						"TN" : "M499.931,147.625l-1.163,-4.936l-1.745,-1.162l0.000,-0.581l-2.325,-1.742l-0.290,-2.034l1.745,-1.451l0.579,-2.323l-0.290,-2.614l0.581,-1.451l2.908,-1.163l2.034,0.291l-0.291,1.453l2.325,-0.872l0.292,0.291l-1.454,1.451l0.000,1.161l1.162,0.872l-0.580,2.324l-1.745,1.451l0.582,1.452l1.452,0.000l0.583,1.452l1.163,0.290l-0.291,2.032l-1.164,0.873l-0.872,0.870l-2.034,1.162l0.290,1.161l-0.290,1.162l1.162,-0.581z",
						"TR" : "M575.509,117.135l3.777,1.161l3.199-0.291l2.323,0.291l3.489-1.451l2.906-0.291l2.615,1.452l0.292,0.872l-0.292,1.452l2.036,0.58l1.162,0.872l-1.743,0.871l0.87,2.904l-0.579,0.871l1.452,2.324l-1.452,0.581l-0.873-0.872l-3.197-0.291l-1.164,0.291l-3.196,0.581h-1.453l-3.196,0.872h-2.327l-1.454-0.581l-2.906,0.871l-0.873-0.58l-0.29,1.742l-0.581,0.58l-0.871,0.582l-0.873-1.452l0.873-0.872l-1.455,0.291l-2.325-0.871l-2.033,1.742l-4.07,0.29l-2.326-1.452h-2.906l-0.582,1.162l-2.036,0.29l-2.615-1.452h-2.906l-1.744-2.904l-2.034-1.452l1.455-2.033l-1.747-1.452l2.907-2.613h4.361l1.163-2.033l5.232,0.29l3.197-1.742l3.196-0.871h4.65L575.509,117.135zM548.764,119.167l-2.325,1.451l-0.871-1.451v-0.581l0.581-0.291l0.871-1.742l-1.452-0.581l2.907-0.871l2.324,0.29l0.291,1.162l2.615,0.872l-0.58,0.58l-3.198,0.291L548.764,119.167z",
						"TT" : "M304.01,201.346l1.454,-0.291l0.581,0.000l0.000,2.033l-2.326,0.291l-0.581,-0.291l0.872,-0.582l0.000,1.160z",
						"TW" : "M808.926,163.886l-1.744,4.356l-1.163,2.322l-1.452,-2.322l-0.292,-2.033l1.744,-2.614l2.325,-2.322l1.163,0.871l0.581,-1.742z",
						"TZ" : "M567.077,233.58l0.582,0.289l9.883,5.517l0.291,1.742l3.780,2.615l-1.163,3.484l0.000,1.452l1.744,1.161l0.292,0.581l-0.873,1.743l0.289,0.871l-0.289,1.162l0.873,1.742l1.161,2.903l1.162,0.581l-2.323,1.452l-2.907,1.162l-1.746,0.000l-0.872,0.581l-2.036,0.289l-0.581,0.291l-3.486,-0.872l-2.036,0.292l-0.582,-3.776l-1.163,-1.161l-0.289,-0.871l-2.907,-0.581l-1.456,-0.870l-1.743,-0.291l-1.161,-0.581l-1.162,-0.581l-1.455,-3.485l-1.744,-1.452l-0.290,-1.742l0.290,-1.452l-0.581,-2.324l1.163,-0.289l0.872,-0.870l1.163,-1.454l0.582,-0.580l0.000,-0.872l-0.582,-0.871l0.000,-0.871l0.582,-0.291l0.289,-1.741l-1.163,-1.452l0.874,-0.291l3.196,0.000l-5.522,0.289z",
						"UA" : "M561.265,87.806l1.160,0.000l0.584,-0.582l0.872,0.000l2.907,-0.290l1.744,1.742l-0.873,0.581l0.290,0.871l2.327,0.000l0.871,1.162l0.000,0.581l3.488,0.870l2.034,-0.290l1.745,1.162l1.454,0.000l4.070,0.870l0.290,0.873l-1.163,1.451l0.582,1.452l-0.582,0.871l-2.615,0.291l-1.452,0.871l0.000,1.161l-2.329,0.292l-1.744,0.869l-2.615,0.000l-2.323,1.162l0.289,1.743l1.161,0.581l2.907,-0.290l-0.580,1.161l-2.906,0.290l-3.781,1.742l-1.452,-0.581l0.582,-1.451l-3.198,-0.581l0.579,-0.580l2.619,-0.872l-0.874,-0.581l-4.068,-0.871l-0.292,-0.872l-2.614,0.291l-0.874,1.452l-2.325,2.033l-1.161,-0.580l-1.166,0.580l-1.452,-0.580l0.872,-0.291l0.291,-0.872l0.872,-0.871l-0.291,-0.580l0.581,-0.291l0.293,0.581l1.743,0.000l0.581,-0.290l-0.290,-0.291l0.000,-0.291l-0.873,-0.580l-0.290,-1.162l-1.164,-0.580l0.293,-0.871l-1.166,-0.872l-1.162,0.000l-2.034,-0.870l-2.033,0.290l-0.584,0.290l-1.163,0.000l-0.579,0.580l-2.036,0.291l-1.162,0.581l-1.163,-0.581l-1.745,0.000l-1.744,-0.581l-1.163,0.581l-0.291,-0.581l-1.452,-0.870l0.580,-0.872l0.872,-0.870l0.582,0.289l-0.872,-1.452l2.617,-2.033l1.452,-0.580l0.292,-0.580l-1.455,-2.614l1.163,0.000l1.746,-0.581l2.035,-0.291l2.615,0.291l3.196,0.581l2.036,0.290l1.163,0.291l1.162,-0.581l0.583,0.581l2.615,0.000l0.873,0.289l0.290,-1.451l0.870,-0.580l-2.328,0.000z",
						"UG" : "M561.555,233.869l-3.196,0.000l-0.874,0.291l-1.743,0.871l-0.582,-0.290l0.000,-2.324l0.582,-0.871l0.291,-2.324l0.581,-1.161l1.163,-1.451l0.871,-0.872l0.873,-0.871l-1.162,-0.289l0.289,-3.196l1.163,-0.870l1.744,0.580l2.326,-0.580l1.744,0.000l1.745,-1.162l1.452,1.742l0.291,1.452l1.163,3.194l-1.163,2.033l-1.164,1.742l-0.872,1.161l0.000,2.906l5.522,-0.289z",
						"US" : "M45.593,178.406l-0.292,0.581l-0.873-0.581l0.292-0.581l-0.582-1.162l0.29-0.291l0.292-0.29l-0.292-0.582l0.292-0.29h0.291l0.872,0.581l0.582,0.291l0.581,0.29l0.582,0.872v0.29l-1.162,0.581L45.593,178.406zM44.14,174.05l-0.872,0.29l-0.582-0.581l-0.292-0.29l0.292-0.291l0.872,0.291l0.872,0.29L44.14,174.05zM42.395,172.598l-0.29,0.291h-1.453l0.29-0.291H42.395zM39.779,172.308v0.29l-0.291-0.29h-0.873l-0.582-0.582l0.873-0.581v0.291L39.779,172.308zM35.128,170.564l-0.291,0.292l-0.872-0.582v-0.291l0.581-0.29l0.582,0.29V170.564zM212.735,95.065l0.582,1.452l0.871,0.581l1.744,0.291l2.907,0.291l2.616,0.871l2.325-0.291l3.488,0.581h0.872l2.326-0.87l2.617,1.161l2.616,1.162l2.326,0.872l2.035,0.871l0.291,0.58l0.582,0.291v0.291h0.58l0.583-0.291l0.29,0.871l0.583,0.291h0.581l0.581,0.29l-0.581,0.581l2.906,1.162l0.583,2.613l0.58,2.323l-0.872,1.742l-1.163,1.451l-0.581,0.873v0.29l0.292,0.581l0.872,0.29h0.581l3.197-1.452l2.907-0.29l3.488-1.453l0.291-0.291l-0.291-0.871l-0.582-0.581l1.454-0.291h2.616h2.616l0.872-1.162l0.291-0.29l2.907-1.743l1.163-0.581h4.07h5.232l0.292-0.871h0.872l1.162-0.58l0.872-1.162l0.873-2.033l2.035-2.032l0.872,0.581l2.035-0.581l1.163,0.87v3.775l1.744,1.452l0.582,1.161l-2.907,1.162l-2.907,0.872l-2.907,0.872l-1.453,1.742l-0.582,0.581v1.453l0.872,1.451h1.163l-0.291-0.871l0.872,0.581l-0.291,0.871l-1.744,0.291h-1.162l-2.036,0.581h-1.452l-1.454,0.291l-2.326,0.58l4.07-0.291l0.872,0.291l-4.07,0.872H270l0.291-0.29l-0.872,0.872h0.872l-0.582,2.032l-2.035,2.033l-0.291-0.58l-0.582-0.291l-0.872-0.581l0.582,1.452l0.582,0.58v0.873l-0.873,1.161l-1.453,2.033h-0.291l0.873-1.742l-1.454-1.162l-0.291-2.322l-0.58,1.16l0.58,1.743l-1.744-0.291l1.744,0.871l0.291,2.614l0.873,0.291l0.291,0.871l0.291,2.613l-1.745,2.033l-2.907,0.871l-1.743,1.742H257.5l-1.452,1.162l-0.291,0.87l-2.907,1.744l-1.744,1.451l-1.163,1.452l-0.582,2.033l0.582,1.742l0.873,2.614l1.163,1.742v1.161l1.453,3.195v2.032l-0.29,0.871l-0.582,1.742l-0.873,0.291l-1.453-0.291l-0.291-1.161l-1.163-0.582l-1.454-2.323l-1.162-2.032l-0.583-1.161l0.583-1.743l-0.583-1.742l-2.325-2.323l-0.873-0.291l-2.906,1.162h-0.581l-1.163-1.451l-1.744-0.581l-3.197,0.29l-2.326-0.29l-2.326,0.29l-0.872,0.291l0.292,0.87v1.162l0.581,0.582l-0.581,0.29l-0.872-0.581l-1.164,0.581h-2.034l-2.035-1.452l-2.325,0.291l-2.035-0.581l-1.745,0.29l-2.325,0.581l-2.325,2.033l-2.908,1.162l-1.452,1.162l-0.582,1.451v1.742v1.452l0.582,0.871h-1.163l-1.744-0.58l-2.326-0.872l-0.581-1.162l-0.582-2.033l-1.744-1.452l-0.873-1.742l-1.453-1.742l-2.034-1.162h-2.036l-1.743,2.323l-2.326-0.871l-1.454-0.871l-0.872-1.453l-0.872-1.451l-1.454-1.162l-1.454-0.871l-1.163-1.162h-4.65v1.162h-2.326h-5.232l-6.395-1.742l-4.07-1.451l0.29-0.582l-3.487,0.291l-3.198,0.291l-0.581-1.453l-1.744-1.451l-1.163-0.582l-0.291-0.58l-1.743-0.291l-0.872-0.581l-2.616-0.29l-0.582-0.582l-0.291-1.452l-2.908-2.904l-2.034-3.775v-0.582l-1.163-0.871l-2.326-2.323l-0.291-2.322l-1.454-1.453l0.582-2.322v-2.324l-0.872-2.032l0.872-2.614l0.582-2.613l0.291-2.323l-0.581-3.775l-0.873-2.323l-0.872-1.162l0.291-0.58l4.069,0.87l1.454,2.613l0.581-0.87l-0.291-2.033l-0.872-2.324h7.849h8.139h2.616h8.43h8.14h8.138h8.43h9.302h9.302h5.813v-1.161H212.735zM52.569,73.867l-2.616,1.162l-1.454-0.871l-0.581-1.162l2.616-1.162l1.454-0.29l1.744,0.29l1.163,0.871L52.569,73.867zM17.978,66.316l-1.744,0.291l-1.745-0.581l-1.744-0.582l2.907-0.581l2.035,0.291L17.978,66.316zM1.118,55.572l1.744,0.582l1.744-0.291l2.035,0.581l2.907,0.581l-0.291,0.29l-2.035,0.581l-2.326-0.87l-0.872-0.291H1.409l-0.582-0.29L1.118,55.572zM47.046,35.246l1.744,1.161l1.453-0.291h4.651l-0.291,0.582l4.36,0.58l2.617-0.29l5.813,0.871l5.232,0.29l2.326,0.291l3.488-0.291l4.36,0.581l2.907,0.581v10.164v15.681h2.616l2.616,0.872l2.035,1.162L95.3,68.93l2.906-1.452l2.616-0.871l1.454,1.451l1.744,1.162l2.616,1.162l1.744,2.033l2.908,2.903l4.65,1.742v1.743l-1.454,1.452l-1.454-1.162l-2.615-0.871l-0.583-2.323l-3.778-2.323l-1.454-2.324l-2.616-0.291h-4.361l-3.197-0.871l-5.814-2.903l-2.616-0.581l-4.651-0.872l-3.778,0.291l-5.523-1.453l-3.198-1.161l-3.197,0.581l0.581,2.033l-1.454,0.29l-3.196,0.58l-2.326,0.873l-3.198,0.581l-0.291-1.742l1.163-2.614l2.907-0.871l-0.582-0.581l-3.488,1.452l-2.035,1.742l-4.07,2.033l2.035,1.161l-2.617,2.033l-2.907,1.162l-2.616,0.871l-0.872,1.162l-4.07,1.451l-0.872,1.452l-3.198,1.162l-2.035-0.29l-2.615,0.871l-2.617,0.87l-2.326,0.872l-4.65,0.871l-0.581-0.582l2.907-1.162l2.906-0.87l2.907-1.453l3.489-0.291l1.163-1.161l3.779-1.742l0.582-0.581l2.035-0.873l0.58-2.033l1.455-1.742l-3.198,0.872l-0.872-0.582L36,70.382l-1.745-1.453l-0.872,0.872l-1.162-1.162l-2.617,0.871h-1.743l-0.292-1.453l0.581-1.162l-1.744-0.87l-3.487,0.581l-2.326-1.452l-2.035-0.581v-1.452l-2.035-1.162l1.163-1.742l2.035-1.452l1.163-1.452l2.035-0.29l2.034,0.58l2.036-1.451l2.035,0.29l2.326-0.872l-0.583-1.161l-1.743-0.582l2.034-1.162h-1.453l-2.906,0.871l-0.873,0.581l-2.325-0.581l-3.779,0.291l-4.07-0.871l-1.163-0.871l-3.487-1.742l3.778-1.162l6.105-1.451h2.325l-0.29,1.451h5.814l-2.327-1.742l-3.197-1.162l-2.034-1.162l-2.616-1.161l-3.779-0.871l1.455-1.452l4.941-0.291l3.488-1.162l0.582-1.453l2.906-1.161l2.617-0.291L36,36.116h2.616l4.07-1.452L47.046,35.246z",
						"UY" : "M315.056,314.017l1.744,-0.292l2.907,2.033l0.872,0.000l2.907,1.743l2.325,1.451l1.454,2.032l-1.163,1.164l0.872,1.740l-1.453,1.742l-2.907,1.453l-2.035,-0.582l-1.454,0.291l-2.616,-1.162l-2.035,0.000l-1.453,-1.452l0.000,-1.741l0.872,-0.580l-0.291,-2.905l0.872,-2.614l-0.582,2.321z",
						"UZ" : "M656.899,128.168l0.000,-1.742l-3.487,-1.160l-2.909,-1.162l-2.034,-1.453l-2.906,-1.742l-1.455,-2.904l-0.871,-0.580l-2.907,0.290l-1.163,-0.580l-0.292,-2.324l-3.778,-1.451l-2.325,1.742l-2.325,0.871l0.583,1.452l-3.199,0.000l0.000,-10.164l6.976,-1.742l0.580,0.291l4.071,2.031l2.324,0.872l2.618,2.614l3.196,-0.291l4.944,-0.290l3.196,2.032l-0.290,2.614l1.453,0.000l0.581,2.323l3.489,0.000l0.580,1.452l1.163,0.000l1.163,-2.032l3.779,-2.033l1.454,-0.291l0.872,0.291l-2.326,1.742l2.035,0.871l2.034,-0.580l3.199,1.451l-3.488,2.032l-2.326,-0.289l-0.873,0.000l-0.581,-0.871l0.581,-1.163l-3.488,0.582l-0.872,1.741l-1.452,1.743l-2.328,-0.290l-0.579,1.162l2.033,0.871l0.582,2.032l-1.744,2.614l-2.035,-0.582l1.453,0.000z",
						"VE" : "M277.558,198.442l-0.290,0.871l-1.454,0.291l0.872,1.161l0.000,1.452l-1.454,1.451l1.164,2.324l1.162,-0.290l0.582,-1.743l-0.872,-1.161l0.000,-2.033l3.487,-1.161l-0.582,-1.162l1.163,-0.871l0.872,1.742l2.035,0.291l1.744,1.451l0.000,0.871l2.617,0.000l2.907,-0.289l1.452,1.161l2.326,0.290l1.455,-0.582l0.000,-0.869l3.487,0.000l3.198,-0.291l-2.326,0.871l0.872,1.451l2.326,0.000l2.034,1.454l0.291,2.323l1.453,-0.292l1.164,0.872l-2.036,1.452l-0.290,1.161l0.872,0.871l-0.582,0.581l-1.743,0.580l0.000,1.163l-0.873,0.582l2.035,2.322l0.291,0.580l-0.872,1.162l-3.198,0.871l-2.035,0.580l-0.581,0.582l-2.326,-0.582l-2.034,-0.290l-0.582,0.000l1.163,0.872l0.000,1.741l0.292,1.744l2.324,0.289l0.291,0.581l-2.035,0.871l-0.291,1.162l-1.162,0.291l-2.036,0.870l-0.580,0.582l-2.036,0.289l-1.452,-1.451l-0.872,-2.614l-0.873,-1.162l-0.872,-0.580l1.454,-1.453l-0.291,-0.580l-0.582,-0.580l-0.581,-2.033l0.000,-2.033l0.872,-0.871l0.291,-1.452l-0.872,-0.290l-1.454,0.290l-2.034,-0.290l-1.163,0.290l-2.035,-2.323l-1.453,-0.291l-3.488,0.291l-0.872,-1.162l-0.583,0.000l0.000,-0.581l0.292,-1.161l-0.292,-1.161l-0.580,-0.582l-0.291,-1.161l-1.453,-0.290l0.581,-1.452l0.582,-2.033l0.581,-1.162l1.163,-0.580l0.581,-1.452l-2.035,0.581z",
						"VN" : "M771.137,171.726l-3.488,2.324l-2.326,2.614l-0.581,1.742l2.034,2.904l2.617,3.774l2.325,1.743l1.744,2.033l1.163,5.226l-0.290,4.647l-2.327,2.032l-3.195,1.741l-2.037,2.325l-3.486,2.322l-1.164,-1.740l0.872,-1.745l-2.034,-1.451l2.326,-1.162l2.906,-0.290l-1.162,-1.742l4.651,-2.033l0.289,-3.194l-0.581,-2.033l0.581,-2.614l-0.870,-2.032l-2.036,-1.742l-1.745,-2.614l-2.325,-3.194l-3.197,-1.742l0.870,-0.872l1.747,-0.580l-1.165,-2.614l-3.488,0.000l-1.161,-2.322l-1.454,-2.324l1.454,-0.580l2.034,0.000l2.615,-0.291l2.329,-1.451l1.452,0.870l2.615,0.581l-0.581,1.742l1.454,0.872l-2.615,-0.870z",
						"VU" : "M935.666,276.266l-0.872,0.291l-0.874-1.163v-0.871L935.666,276.266zM933.628,271.91l0.583,2.324l-0.874-0.292h-0.58l-0.29-0.58v-2.322L933.628,271.91z",
						"WS" : "M449.643,156.336l-0.292,-1.452l0.581,0.000l0.000,0.290l0.000,0.291l0.000,4.355l-9.011,-0.290l0.000,7.261l-2.615,0.000l-0.581,1.451l0.581,4.066l-11.046,0.000l-0.582,0.871l0.289,-1.162l6.107,-0.291l0.290,-0.870l1.162,-1.162l0.874,-3.775l4.069,-3.194l1.162,-3.485l0.872,0.000l0.873,-2.323l2.324,-0.291l1.165,0.581l1.161,0.000l0.872,-0.871l-1.745,0.000z",
						"YE" : "M619.983,185.084l-2.034,0.872l-0.583,1.161l0.000,0.872l-2.616,1.160l-4.651,1.453l-2.326,1.742l-1.162,0.291l-0.871,-0.291l-1.744,1.161l-1.745,0.581l-2.327,0.291l-0.580,0.000l-0.581,0.871l-0.582,0.000l-0.581,0.871l-1.455,-0.290l-0.870,0.580l-1.745,-0.290l-0.873,-1.452l0.292,-1.452l-0.581,-0.871l-0.581,-2.032l-0.874,-1.163l0.583,-0.289l-0.291,-1.162l0.582,-0.581l-0.291,-1.161l1.161,-0.872l-0.289,-1.161l0.873,-1.451l1.161,0.869l0.582,-0.289l3.197,0.000l0.582,0.289l2.615,0.292l1.164,-0.292l0.580,0.873l1.163,-0.291l2.036,-2.904l2.615,-1.161l7.849,-1.162l2.325,4.645l-0.873,-1.743z",
						"ZA" : "M560.392,311.403l-0.29,0.291l-1.165,1.451l-0.87,1.451l-1.453,2.034l-3.198,2.902l-2.034,1.451l-2.036,1.453l-2.906,0.871l-1.452,0.29l-0.293,0.58l-1.743-0.29l-1.161,0.581l-3.199-0.581l-1.452,0.29h-1.164l-2.906,0.872l-2.325,0.58l-1.744,0.871l-1.162,0.29l-1.163-1.161h-0.871l-1.454-1.161v0.292l-0.29-0.583v-1.741l-0.873-1.742l0.873-0.581v-2.032l-2.034-2.613l-1.165-2.323l-2.034-3.484l1.163-1.453l1.163,0.58l0.582,1.162l1.162,0.29l1.744,0.581l1.452-0.29l2.325-1.451v-10.163l0.874,0.58l1.741,2.613l-0.289,1.741l0.582,0.872l2.033-0.29l1.164-1.162l1.452-0.87l0.582-1.453l1.454-0.58l1.162,0.29l1.162,0.872h2.326l1.744-0.582l0.289-0.87l0.584-1.161l1.452-0.293l0.874-1.16l0.871-1.742l2.324-2.032l4.07-2.033h1.163l1.163,0.581l0.871-0.289l1.454,0.289l1.452,3.774l0.582,2.033l-0.29,2.903v1.162l-1.163-0.58l-0.872,0.29l-0.293,0.581l-0.87,1.161l0.292,0.871l1.452,1.451l1.744-0.29l0.581-1.161h2.034l-0.582,2.031l-0.579,2.323l-0.584,1.162L560.392,311.403zM553.416,310.531l-1.162-0.87l-1.163,0.579l-1.453,1.163l-1.454,1.742l2.036,2.032l0.871-0.291l0.581-0.869l1.454-0.292l0.58-0.871l0.873-1.451L553.416,310.531z",
						"ZM" : "M563.881,256.229l1.452,1.452l0.582,2.322l-0.582,0.582l-0.290,2.322l0.290,2.323l-0.872,0.873l-0.580,2.612l1.452,0.580l-8.429,2.325l0.292,2.033l-2.036,0.289l-1.744,1.162l-0.291,0.871l-0.872,0.291l-2.616,2.322l-1.454,1.744l-0.872,0.000l-0.872,-0.291l-3.197,-0.291l-0.291,-0.291l-0.290,-0.289l-0.871,-0.582l-1.745,0.000l-2.326,0.582l-1.745,-1.744l-2.034,-2.322l0.289,-8.711l5.524,0.000l0.000,-0.873l0.292,-1.161l-0.583,-1.161l0.291,-1.452l-0.291,-0.871l1.164,0.290l0.000,0.872l1.454,-0.291l1.743,0.291l0.871,1.452l2.036,0.291l1.745,-0.873l0.581,1.452l2.325,0.291l0.872,1.162l1.163,1.451l2.033,0.000l-0.289,-2.904l-0.581,0.581l-2.035,-1.160l-0.584,-0.291l0.293,-2.904l0.580,-3.195l-0.873,-1.161l0.873,-1.742l0.873,-0.290l3.490,-0.581l1.163,0.290l1.162,0.581l1.161,0.581l1.743,0.291l-1.456,-0.870z",
						"ZW" : "M559.521,292.237l-1.454,-0.289l-0.871,0.289l-1.163,-0.581l-1.163,0.000l-1.745,-1.162l-2.326,-0.579l-0.580,-1.744l0.000,-0.870l-1.455,-0.292l-2.907,-2.903l-0.870,-1.742l-0.582,-0.580l-1.163,-2.034l3.197,0.291l0.872,0.291l0.872,0.000l1.454,-1.744l2.616,-2.322l0.872,-0.291l0.291,-0.871l1.744,-1.162l2.036,-0.289l0.000,0.870l2.325,0.000l1.452,0.581l0.582,0.582l1.163,0.289l1.452,0.871l0.000,3.486l-0.582,2.032l0.000,2.033l0.293,0.870l-0.293,1.452l-0.289,0.290l-0.874,2.033l2.904,-3.195z"
	
					}
				}
			}
		}
	);
})(jQuery);;var MapaelMapConfig = MapaelMapConfig || {};
MapaelMapConfig["default_config"] = {"map":{"defaultArea":{"attrs":{"fill":"#ffffff","stroke":"#a2c8f7","stroke-width":0.3,"stroke-linejoin":"round"},"attrsHover":{"fill":"#0c468e","animDuration":100},"text":{"position":"inner","margin":2,"attrs":{"font-size":3,"fill":"#0c468e"},"attrsHover":{"fill":"#ffffff","animDuration":100}}},"defaultPlot":{"type":"circle","size":11,"attrs":{"fill":"#73acf3","stroke":"#d1e4fb","stroke-width":2,"stroke-linejoin":"round"},"attrsHover":{"stroke-width":3,"animDuration":100},"text":{"position":"right","margin":10,"attrs":{"font-size":15,"fill":"#000000"},"attrsHover":{"fill":"#555555","animDuration":100}}},"defaultLink":{"factor":0.5,"attrs":{"stroke":"#73acf3","stroke-width":2},"attrsHover":{"animDuration":100},"text":{"position":"right","margin":10,"attrs":{"font-size":15,"fill":"#000000"},"attrsHover":{"fill":"#555555","animDuration":100}}},"hasLinkArea":{"attrs":{"fill":"#ffed86","stroke":"#a2c8f7"}},"selectedArea":{"attrs":{"fill":"#0c468e","stroke":"#a2c8f7"}}}};;var MapaelMap = {
    init: function(){
        var cfg = jQuery.extend(true,{},
            window.MapaelMapConfig.default_config,
            MapaelMapConfig.page_config
        );

        if (typeof window.ThemedMapaelMapConfig != 'undefined') {
            cfg = jQuery.extend(true,{}, cfg, window.ThemedMapaelMapConfig);
        }
        if (cfg) $("#mapael").mapael(cfg);
    }
};

jQuery(document).ready(function() {
    MapaelMap.init();
    return true;
});


