import { assert } from 'chai'

import { integer } from '../src/integer'

import { assertFailure, assertSuccess } from './helpers'


describe('integer', () => {
	it('should decode boolean', () => {
		assertSuccess(integer.decode(false), 0)
		assertSuccess(integer.decode(true), 1)
	})

	it('should decode integer numbers', () => {
		assertSuccess(integer.decode(5), 5)
		assertSuccess(integer.decode(-10), -10)
	})

	it('should decode integer strings', () => {
		assertSuccess(integer.decode('10'), 10)
		assertSuccess(integer.decode('-15'), -15)
	})

	it('should not decode floating numbers', () => {
		assertFailure(integer, 15.5, [
			'Invalid value 15.5 supplied to : fuzzy.integer',
		])
	})

	it('should not decode floating strings', () => {
		assertFailure(integer, '-13.4', [
			'Invalid value "-13.4" supplied to : fuzzy.integer',
		])
	})

	it('should not decode Infinity', () => {
		assertFailure(integer, Infinity, [
			'Invalid value Infinity supplied to : fuzzy.integer',
		])
	})

	it('should not decode wrong string values', () => {
		assertFailure(integer, 'Hello', [
			'Invalid value "Hello" supplied to : fuzzy.integer',
		])
	})

	it('should encode', () => {
		assert.equal(integer.encode(5), 5)
		assert.equal(integer.encode(-5), -5)
	})
})
