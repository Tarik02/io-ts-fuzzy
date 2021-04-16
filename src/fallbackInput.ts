import { isLeft, left } from 'fp-ts/lib/Either'
import * as t from 'io-ts'


export const fallbackInput = <T, O = T, I = unknown>(type: t.Type<T, O, I>, factory: (() => I)) => new t.Type<T, O, I>(
	`fuzzy.fallbackInput<${type.name}>`,
	(it): it is T => type.is(it),
	(input, context) => {
		if (input === null || input === undefined || (typeof input === 'string' && input === 'null')) {
			input = factory()
		}

		const result = type.decode(input)

		if (isLeft(result)) {
			return left(result.left.map(error => ({
				...error,
				context: [
					...context,
					...error.context,
				],
			})))
		}

		return result
	},
	value => type.encode(value),
)
