import { isLeft, left } from 'fp-ts/lib/Either'
import * as t from 'io-ts'


export const nullable = <T>(type: t.Type<T>) => new t.Type<T | null>(
	`fuzzy.nullable<${type.name}>`,
	(it): it is T | null => it === null || type.is(it),
	(input, context) => {
		if (input === null || input === undefined || input === 'null') {
			return t.success(null)
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
	value => value === null ? null : type.encode(value),
)
