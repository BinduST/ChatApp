var assert = require('chai').assert;
var Sender = require('../library/sender.js');

describe('sender',function () {
	it('should have a name',function(){
		var sender = new Sender('Bindu');
		assert.deepEqual(Object.keys(sender),['name']);
	})
});
	