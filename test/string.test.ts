import { assert } from 'chai'

import { string } from '../src/string'

import { assertSuccess } from './helpers'


describe('string', () => {
	it('should decode', () => {
		assertSuccess(string.decode(1), '1')
		assertSuccess(string.decode('Hello'), 'Hello')
		assertSuccess(string.decode(null), 'null')
		assertSuccess(string.decode(''), '')
		assertSuccess(string.decode(true), 'true')
	})

	it('should encode', () => {
		assert.equal(string.encode('World'), 'World')
	})
})
