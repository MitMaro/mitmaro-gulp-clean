'use strict';

import gulpUtilStub from '@mitmaro/js-test-stubs/stubs/gulp/util';
import delStub from '@mitmaro/js-test-stubs/stubs/node/del';

describe('Clean', () => {
	let clean;
	let stubs;

	beforeEach(() => {

		stubs = {
			del: delStub(),
			gulpUtil: gulpUtilStub()
		};

		clean = require('../../src/Clean');

		clean.__Rewire__('del', stubs.del);
		clean.__Rewire__('log', stubs.gulpUtil.log);
		clean.__Rewire__('colors', stubs.gulpUtil.colors);
	});

	it('should call delete with pattern', () => {
		let task = clean('pattern');
		task();
		expect(stubs.del).to.be.calledWith('pattern');
	});

	it('should call delete with pattern', () => {
		let task = clean('pattern', undefined);
		task();
		expect(stubs.del).to.be.calledWith('pattern');
		expect(stubs.del).to.be.calledWith('pattern');
	});

	it('should log complete on no matching files', () => {
		let task = clean('pattern');
		stubs.del._promise.then.callsArgWith(0, []);
		task();
		expect(stubs.gulpUtil._log.lines[1]).to.equal('clean: complete');
	});

	it('should log each path deleted', () => {
		let task = clean('pattern');
		stubs.del._promise.then.callsArgWith(0, ['foo', 'bar']);
		task();
		expect(stubs.gulpUtil._log.lines[2]).to.equal('clean: del foo');
		expect(stubs.gulpUtil._log.lines[3]).to.equal('clean: del bar');
	});

	it('should dp nothing on clean disabled', () => {
		let task = clean('pattern', { clean: false });
		task();
		expect(stubs.gulpUtil._log.lines[0]).to.equal('clean: disabled');
		expect(stubs.del).to.not.be.called;
	});
});
