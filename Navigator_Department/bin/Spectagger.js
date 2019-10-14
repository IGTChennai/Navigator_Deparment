var _ = require("underscore");

module.exports = function (jasmineobj) {
	var env = jasmineobj;

	var includeSpecsWithoutTags = false;
	env.includeSpecsWithoutTags = function (permit) {
		includeSpecsWithoutTags = permit;
	};

	var includedTags = [];
	env.setIncludedTags = function (tags) {
		if (!tags) {
			tags = [];
		} else if (!Array.isArray(tags)) {
			tags = [tags.toString()];
		}

		includedTags = tags;
	};

	function findTags(spec) {
		var words = spec.getFullName().split(" ");
		var tags = words.filter(function (word) {
			return word.startsWith("·");
		}).map(function (word) {
			return word.substring(1);
		});
		if (!tags) { tags = []; }

		return tags;
	};

	var originalIt = global.it;
	var originaldescribe = global.describe;

	global.it = function () {
		var spec = originalIt.apply(this, arguments);

		if (spec.markedPending) {
			return spec;
		}
		var tags = findTags(spec);
		if (includeSpecsWithoutTags && (tags.length === 0)) {
			return spec;
		}

		// this.console.log("Found tags in :");
		// this.console.log(tags);
		// this.console.log("Given tags in :");
		// this.console.log(includedTags);
		var len = 0;
		for (const record of includedTags) {
			// this.console.log("record having");
			// this.console.log(record);
			// this.console.log("Tags having");
			// this.console.log(tags)
			if (_.intersection(record, tags).length == record.length) { return spec; } 
		}
		
		spec.pend("Doesn't match the tags");

		return spec;
	};

}
