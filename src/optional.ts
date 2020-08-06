import { isLeft, left } from 'fp-ts/lib/Either'
import * as t from 'io-ts'


export const optional = <T>(type: t.Type<T>) => new t.Type<T | undefined>(
	`fuzzy.optional<${type.name}>`,
	(it): it is T | undefined => it === undefined || type.is(it),
	(input, context) => {
		if (input === null || input === undefined || input === 'null') {
			return t.success(undefined)
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
	value => value === undefined ? undefined : type.encode(value),
)
