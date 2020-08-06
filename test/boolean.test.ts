import { assert } from 'chai'

import { boolean } from '../src/boolean'

import { assertFailure, assertSuccess } from './helpers'


describe('boolean', () => {
	it('should decode boolean values', () => {
		assertSuccess(boolean.decode(false), false)
		assertSuccess(boolean.decode(true), true)
	})

	it('should decode integer values', () => {
		assertSuccess(boolean.decode(0), false)
		assertSuccess(boolean.decode(1), true)
	})

	it('should decode string values', () => {
		assertSuccess(boolean.decode('1'), true)
		assertSuccess(boolean.decode('true'), true)
		assertSuccess(boolean.decode('True'), true)
		assertSuccess(boolean.decode('TRUE'), true)
		assertSuccess(boolean.decode('yes'), true)
		assertSuccess(boolean.decode('Yes'), true)
		assertSuccess(boolean.decode('YES'), true)
		assertSuccess(boolean.decode('on'), true)
		assertSuccess(boolean.decode('On'), true)
		assertSuccess(boolean.decode('ON'), true)

		assertSuccess(boolean.decode('0'), false)
		assertSuccess(boolean.decode('false'), false)
		assertSuccess(boolean.decode('False'), false)
		assertSuccess(boolean.decode('FALSE'), false)
		assertSuccess(boolean.decode('no'), false)
		assertSuccess(boolean.decode('No'), false)
		assertSuccess(boolean.decode('NO'), false)
		assertSuccess(boolean.decode('off'), false)
		assertSuccess(boolean.decode('Off'), false)
		assertSuccess(boolean.decode('OFF'), false)
	})

	it('should not decode invalid string values', () => {
		assertFailure(boolean, 'TrUe', [
			'Invalid value "TrUe" supplied to : fuzzy.boolean',
		])

		assertFailure(boolean, 'Of', [
			'Invalid value "Of" supplied to : fuzzy.boolean',
		])
	})

	it('should encode', () => {
		assert.equal(boolean.encode(true), true)
		assert.equal(boolean.encode(false), false)
	})
})
