import * as t from 'io-ts'


export const string = new t.Type<string, string>(
	'fuzzy.string',
	(it): it is string => typeof it === 'string',
	(input, context) => {
		switch (typeof input) {
		case 'object':
			if (input === null) {
				return t.success('null')
			}
			break

		case 'boolean':
			return t.success(input ? 'true' : 'false')

		case 'number':
			return t.success(input.toString())

		case 'bigint':
			return t.success(input.toString())

		case 'string':
			return t.success(input)
		}

		return t.failure(input, context)
	},
	t.identity,
)
