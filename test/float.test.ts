import { assert } from 'chai'

import { float } from '../src/float'

import { assertFailure, assertSuccess } from './helpers'


describe('float', () => {
	it('should decode boolean', () => {
		assertSuccess(float.decode(false), 0)
		assertSuccess(float.decode(true), 1)
	})

	it('should decode integer numbers', () => {
		assertSuccess(float.decode(5), 5)
		assertSuccess(float.decode(-10), -10)
	})

	it('should decode integer strings', () => {
		assertSuccess(float.decode('10'), 10)
		assertSuccess(float.decode('-15'), -15)
	})

	it('should decode floating numbers', () => {
		assertSuccess(float.decode(10.5), 10.5)
		assertSuccess(float.decode(-13.23), -13.23)
	})

	it('should decode floating strings', () => {
		assertSuccess(float.decode('12.1'), 12.1)
		assertSuccess(float.decode('-13.1'), -13.1)
	})

	it('should not decode Infinity', () => {
		assertFailure(float, Infinity, [
			'Invalid value Infinity supplied to : fuzzy.float',
		])
	})

	it('should not decode wrong string values', () => {
		assertFailure(float, 'Hello', [
			'Invalid value "Hello" supplied to : fuzzy.float',
		])
	})

	it('should encode', () => {
		assert.equal(float.encode(5), 5)
		assert.equal(float.encode(-1.34), -1.34)
	})
})
