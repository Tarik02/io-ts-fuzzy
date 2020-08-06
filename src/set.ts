import { isLeft, left } from 'fp-ts/lib/Either'
import * as t from 'io-ts'


export const set = <V>(valueT: t.Type<V>) => new t.Type<Set<V>>(
	`fuzzy.set<${valueT.name}>`,
	(it): it is Set<V> => (
		it instanceof Set &&
		[...it].every(value => valueT.is(value))
	),
	(input, context) => {
		if (typeof input === 'object' && input !== null) {
			const result = new Set<V>()
			const failures: t.Errors = [
				{ value: input, context },
			]

			let items: Iterable<any>

			if (input instanceof Set) {
				items = input.values()
			} else if (input instanceof Array) {
				items = input
			} else {
				return t.failure(input, context)
			}

			let i = 0
			for (const value of items) {
				const valueResult = valueT.decode(value)

				if (isLeft(valueResult)) {
					failures.push(...valueResult.left.map(error => ({
						...error,
						context: [
							...context,
							{
								key: String(i),
								type: valueT,
								actual: value,
							},
							...error.context,
						],
					})))

					++i
					continue
				}

				result.add(valueResult.right)
				++i
			}

			if (failures.length > 1) {
				return left(failures)
			}

			return t.success(result)
		}

		return t.failure(input, context)
	},
	t.identity,
)
