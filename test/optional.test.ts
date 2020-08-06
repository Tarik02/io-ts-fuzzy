import { integer } from '../src/integer'
import { optional } from '../src/optional'
import { string } from '../src/string'

import { assertFailure, assertSuccess } from './helpers'


describe('optional', () => {
	it('should decode real integer', () => {
		const myType = optional(integer)

		assertSuccess(myType.decode(15), 15)
	})

	it('should not decode if there\'s an error inside', () => {
		const myType = optional(integer)

		assertFailure(myType, 15.13, [
			'Invalid value 15.13 supplied to : fuzzy.optional<fuzzy.integer>/: fuzzy.integer',
		])
	})

	it('should decode null string as undefined but not as string', () => {
		const myType = optional(string)

		assertSuccess(myType.decode('null'), undefined)
	})

	it('should decode null value as undefined but not as string', () => {
		const myType = optional(string)

		assertSuccess(myType.decode(null), undefined)
	})

	it('should decode string "0" as integer', () => {
		const myType = optional(integer)

		assertSuccess(myType.decode('0'), 0)
	})
})
