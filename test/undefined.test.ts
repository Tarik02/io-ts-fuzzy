import { assert } from 'chai'

import { undefinedValue } from '../src/undefined'

import { assertFailure, assertSuccess } from './helpers'


describe('undefined', () => {
	it('should decode false value', () => {
		assertSuccess(undefinedValue.decode(false), undefined)
	})

	it('should decode 0 integer value', () => {
		assertSuccess(undefinedValue.decode(0), undefined)
	})

	it('should decode string values', () => {
		assertSuccess(undefinedValue.decode(''), undefined)
		assertSuccess(undefinedValue.decode('false'), undefined)
		assertSuccess(undefinedValue.decode('False'), undefined)
		assertSuccess(undefinedValue.decode('FALSE'), undefined)
		assertSuccess(undefinedValue.decode('0'), undefined)
		assertSuccess(undefinedValue.decode('undefined'), undefined)
		assertSuccess(undefinedValue.decode('undefined'), undefined)
	})

	it('should decode undefined value', () => {
		assertSuccess(undefinedValue.decode(undefined), undefined)
	})

	it('should decode undefined value', () => {
		assertFailure(undefinedValue, 'none', [
			'Invalid value "none" supplied to : fuzzy.undefined',
		])
	})

	it('should encode', () => {
		assert.equal(undefinedValue.encode(undefined), undefined)
	})
})
