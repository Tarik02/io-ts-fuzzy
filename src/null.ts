import * as t from 'io-ts'


export const nullValue = new t.Type<null, null>(
	'fuzzy.null',
	(it): it is null => it === null,
	(input, context) => {
		switch (typeof input) {
		case 'boolean':
			if (input === false) {
				return t.success(null)
			}
			break

		case 'number':
			if (input === 0) {
				return t.success(null)
			}
			break

		case 'bigint':
			if (input === BigInt(0)) {
				return t.success(null)
			}
			break

		case 'string':
			if (['', 'false', 'False', 'FALSE', '0', 'undefined', 'null'].indexOf(input) !== -1) {
				return t.success(null)
			}
			break

		case 'object':
			if (input === null) {
				return t.success(null)
			}
			break

		case 'undefined':
			return t.success(null)
		}

		return t.failure(input, context)
	},
	t.identity,
)
