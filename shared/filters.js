(function() {
	'use strict';

	var _;
	var filters = {};


	/**
	 * import
	 */
	if(typeof require !== 'undefined') {
		_ = require('lodash');
	}
	else {
		_ = window._;
	}


	filters.affordable = function(targets, me) {
		return _.filter(targets, function(target) {
			return target.card.pride <= me.pride;
		});
	};


	filters.empty = function(targets, me) {
		return _.filter(targets, function(target) {
			return !target.card;
		});
	};


	filters.full = function(targets, me) {
		return _.filter(targets, function(target) {
			return !!target.card;
		});
	};


	filters.friend = function(targets, me) {
		return _.filter(targets, function(target) {
			return target.player.team === me.team;
		});
	};


	filters.enemy = function(targets, me) {
		return _.filter(targets, function(target) {
			return target.player.team !== me.team;
		});
	};


	// should probably run after filters.full
	filters.front = function(targets, me) {
		// find the highest row value in each column
		var fronts = {};
		_.each(targets, function(target) {
			if(!fronts[target.column] || fronts[target.column].row < target.row) {
				fronts[target.column] = target;
			}
		});

		// convert to an array
		var ret = [];
		_.each(fronts, function(front) {
			ret.push(front);
		});

		//
		return ret;
	};


	filters.male = function(targets, me) {
		return _.filter(targets, function(target) {
			return target.card && target.card.abilities.indexOf('male') !== -1;
		});
	};


	filters.female = function(targets, me) {
		return _.filter(targets, function(target) {
			return target.card && target.card.abilities.indexOf('feml') !== -1;
		});
	};


	filters.owned = function(targets, me) {
		return _.filter(targets, function(target) {
			return target.player._id === me._id;
		});
	};


	/**
	 * export
	 */
	if (typeof module !== 'undefined') {
		module.exports = filters;
	}
	else {
		window.futurismShared = window.futurismShared || {};
		window.futurismShared.filters = filters;
	}

}());