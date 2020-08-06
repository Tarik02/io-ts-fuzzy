import * as t from 'io-ts'


const isValid = (it: number): boolean => !Number.isNaN(it) && Number.isFinite(it)

export const float = new t.Type<number, number>(
	'fuzzy.float',
	(it): it is number => typeof it === 'number' && isValid(it),
	(input, context) => {
		switch (typeof input) {
		case 'boolean':
			return t.success(input ? 1 : 0)

		case 'number':
			if (isValid(input)) {
				return t.success(input)
			}
			break

		case 'bigint': {
			const numberInput = Number(input)
			if (isValid(numberInput)) {
				return t.success(numberInput)
			}
			break
		}

		case 'string': {
			const numberInput = Number(input)
			if (isValid(numberInput)) {
				return t.success(numberInput)
			}
			break
		}
		}

		return t.failure(input, context)
	},
	t.identity,
)
