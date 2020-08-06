import * as t from 'io-ts'


export const undefinedValue = new t.Type<undefined, undefined>(
	'fuzzy.undefined',
	(it): it is typeof undefined => it === undefined,
	(input, context) => {
		switch (typeof input) {
		case 'boolean':
			if (input === false) {
				return t.success(undefined)
			}
			break

		case 'number':
			if (input === 0) {
				return t.success(undefined)
			}
			break

		case 'bigint':
			if (input === BigInt(0)) {
				return t.success(undefined)
			}
			break

		case 'string':
			if (['', 'false', 'False', 'FALSE', '0', 'undefined', 'null'].indexOf(input) !== -1) {
				return t.success(undefined)
			}
			break

		case 'object':
			if (input === null) {
				return t.success(undefined)
			}
			break

		case 'undefined':
			return t.success(undefined)
		}

		return t.failure(input, context)
	},
	t.identity,
)
