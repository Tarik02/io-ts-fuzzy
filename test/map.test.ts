import { assert } from 'chai'
import { isRight } from 'fp-ts/lib/Either'

import { integer } from '../src/integer'
import { map } from '../src/map'
import { string } from '../src/string'

import { assertSuccess } from './helpers'


describe('map', () => {
	it('should decode from object', () => {
		const result = map(string, integer).decode({
			'hello': '15',
			'world': -3,
		})

		assertSuccess(result)

		if (isRight(result)) {
			const resultValue = result.right

			assert.equal(resultValue.size, 2)
			assert.equal(resultValue.get('hello'), 15)
			assert.equal(resultValue.get('world'), -3)
		}
	})

	it('should decode from map', () => {
		const result = map(string, integer).decode(new Map([
			['hello', '15'],
			['world', -3],
		] as Array<[string, string | number]>))

		assertSuccess(result)

		if (isRight(result)) {
			const resultValue = result.right

			assert.equal(resultValue.size, 2)
			assert.equal(resultValue.get('hello'), 15)
			assert.equal(resultValue.get('world'), -3)
		}
	})
})
