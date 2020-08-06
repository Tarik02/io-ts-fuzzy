import { integer } from '../src/integer'
import { nullable } from '../src/nullable'
import { string } from '../src/string'

import { assertFailure, assertSuccess } from './helpers'


describe('nullable', () => {
	it('should decode real integer', () => {
		const myType = nullable(integer)

		assertSuccess(myType.decode(15), 15)
	})

	it('should not decode if there\'s an error inside', () => {
		const myType = nullable(integer)

		assertFailure(myType, 15.13, [
			'Invalid value 15.13 supplied to : fuzzy.nullable<fuzzy.integer>/: fuzzy.integer',
		])
	})

	it('should decode null string as null but not as string', () => {
		const myType = nullable(string)

		assertSuccess(myType.decode('null'), null)
	})

	it('should decode null value as null but not as string', () => {
		const myType = nullable(string)

		assertSuccess(myType.decode(null), null)
	})

	it('should decode string "0" as integer', () => {
		const myType = nullable(integer)

		assertSuccess(myType.decode('0'), 0)
	})
})
