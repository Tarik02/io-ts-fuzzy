import * as t from 'io-ts'


const BOOLEAN_TRUE_STRING_VALUES = [
	'1',
	'true', 'True', 'TRUE',
	'yes', 'Yes', 'YES',
	'on', 'On', 'ON',
]

const BOOLEAN_FALSE_STRING_VALUES = [
	'0',
	'false', 'False', 'FALSE',
	'no', 'No', 'NO',
	'off', 'Off', 'OFF',
]

export const boolean = new t.Type<boolean, boolean>(
	'fuzzy.boolean',
	(it): it is boolean => typeof it === 'boolean',
	(input, context) => {
		switch (typeof input) {
		case 'boolean':
			return t.success(input)

		case 'number':
			if (input === 0) {
				return t.success(false)
			}
			if (input === 1) {
				return t.success(true)
			}
			break

		case 'string':
			if (BOOLEAN_FALSE_STRING_VALUES.indexOf(input) !== -1) {
				return t.success(false)
			}
			if (BOOLEAN_TRUE_STRING_VALUES.indexOf(input) !== -1) {
				return t.success(true)
			}
			break
		}

		return t.failure(input, context)
	},
	t.identity,
)
