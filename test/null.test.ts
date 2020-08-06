import { assert } from 'chai'

import { nullValue } from '../src/null'

import { assertFailure, assertSuccess } from './helpers'


describe('null', () => {
	it('should decode false value', () => {
		assertSuccess(nullValue.decode(false), null)
	})

	it('should decode 0 integer value', () => {
		assertSuccess(nullValue.decode(0), null)
	})

	it('should decode string values', () => {
		assertSuccess(nullValue.decode(''), null)
		assertSuccess(nullValue.decode('false'), null)
		assertSuccess(nullValue.decode('False'), null)
		assertSuccess(nullValue.decode('FALSE'), null)
		assertSuccess(nullValue.decode('0'), null)
		assertSuccess(nullValue.decode('undefined'), null)
		assertSuccess(nullValue.decode('null'), null)
	})

	it('should decode null value', () => {
		assertSuccess(nullValue.decode(null), null)
	})

	it('should decode null value', () => {
		assertFailure(nullValue, 'none', [
			'Invalid value "none" supplied to : fuzzy.null',
		])
	})

	it('should encode', () => {
		assert.equal(nullValue.encode(null), null)
	})
})
