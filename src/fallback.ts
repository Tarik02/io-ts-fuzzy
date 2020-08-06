import { isLeft, left } from 'fp-ts/lib/Either'
import * as t from 'io-ts'


export const fallback = <T>(type: t.Type<T>, factory: (() => T)) => new t.Type<T>(
	`fuzzy.optional<${type.name}>`,
	(it): it is T => type.is(it),
	(input, context) => {
		if (input === null || input === undefined || input === 'null') {
			return t.success(factory())
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
