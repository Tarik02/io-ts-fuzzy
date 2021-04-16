import { fallback } from '../src/fallback'
import { integer } from '../src/integer'

import { assertFailure, assertSuccess } from './helpers'


describe('fallback', () => {
	it('should decode integer, sometimes with fallback', () => {
		const myType = fallback(integer, () => 5)

		assertSuccess(myType.decode(15), 15)
		assertSuccess(myType.decode(10), 10)
		assertSuccess(myType.decode('3'), 3)
		assertSuccess(myType.decode('null'), 5)
		assertSuccess(myType.decode(5), 5)
		assertSuccess(myType.decode(undefined), 5)
	})

	it('should not decode if there\'s an error inside', () => {
		const myType = fallback(integer, () => 10)

		assertFailure(myType, 15.13, [
			'Invalid value 15.13 supplied to : fuzzy.fallback<fuzzy.integer>/: fuzzy.integer',
		])
	})
})
