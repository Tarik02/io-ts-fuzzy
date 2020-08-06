import * as t from 'io-ts'


export const integer = new t.Type<number, number>(
	'fuzzy.integer',
	(it): it is number => typeof it === 'number' && Number.isInteger(it),
	(input, context) => {
		switch (typeof input) {
		case 'boolean':
			return t.success(input ? 1 : 0)

		case 'number':
			if (Number.isInteger(input)) {
				return t.success(input)
			}
			break

		case 'bigint': {
			const numberInput = Number(input)
			if (Number.isInteger(numberInput)) {
				return t.success(numberInput)
			}
			break
		}

		case 'string': {
			const numberInput = Number(input)
			if (Number.isInteger(numberInput)) {
				return t.success(numberInput)
			}
			break
		}
		}

		return t.failure(input, context)
	},
	t.identity,
)
