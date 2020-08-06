import { assert } from 'chai'
import { isRight } from 'fp-ts/lib/Either'

import { integer } from '../src/integer'
import { set } from '../src/set'
import { string } from '../src/string'

import { assertSuccess } from './helpers'


describe('set', () => {
	it('should decode from array', () => {
		const result = set(string).decode([
			'hello',
			'world',
			123,
			null,
		])

		assertSuccess(result)

		if (isRight(result)) {
			const resultValue = result.right

			assert.equal(resultValue.size, 4)
			assert.deepEqual([...resultValue].sort(), ['hello', 'world', '123', 'null'].sort())
		}
	})

	it('should decode from set', () => {
		const result = set(integer).decode(new Set([
			false,
			5,
			'13',
			'-14',
		]))

		assertSuccess(result)

		if (isRight(result)) {
			const resultValue = result.right

			assert.equal(resultValue.size, 4)
			assert.deepEqual([...resultValue].sort(), [0, 5, 13, -14].sort())
		}
	})
})
