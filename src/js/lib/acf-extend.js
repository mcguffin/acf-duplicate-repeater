import $ from 'jquery';

const _extend = (obj,extend) => {
	const parent = $.extend({},obj);
	$.each(extend,function(k,v) {
		if ( 'undefined' !== typeof obj[k] ) {
			if ( 'events' === k ) {
				obj.events = $.extend( obj.events, v );
				return;
			} else if ( 'function' === typeof v ) {
				parent[k] = obj[k]; //
			}
		}
		obj[k] = v;
	});
	obj.parent = parent;
	return obj;
}
module.exports = {
	extendACF: ( fieldName, extend ) => {
		_extend( acf.models[fieldName].prototype, extend );
	}
}
