import { isLeft, left } from 'fp-ts/lib/Either'
import * as t from 'io-ts'


export const map = <K, V>(keyT: t.Type<K>, valueT: t.Type<V>) => new t.Type<Map<K, V>>(
	`fuzzy.map<${keyT.name}, ${valueT.name}>`,
	(it): it is Map<K, V> => (
		it instanceof Map &&
		[...it.keys()].every(key => keyT.is(key)) &&
		[...it.values()].every(value => valueT.is(value))
	),
	(input, context) => {
		if (typeof input === 'object' && input !== null) {
			const result = new Map<K, V>()
			const failures: t.Errors = [
				{ value: input, context },
			]

			let entries: Iterable<[any, any]>

			if (input instanceof Map) {
				entries = input.entries()
			} else {
				entries = Object.entries(input)
			}

			let i = 0
			for (const [key, value] of entries) {
				const keyResult = keyT.decode(key)
				const valueResult = valueT.decode(value)

				if (isLeft(keyResult) || isLeft(valueResult)) {
					if (isLeft(keyResult)) {
						failures.push(...keyResult.left.map(error => ({
							...error,
							context: [
								...context,
								{
									key: String(i),
									type: keyT,
									actual: key,
								},
								...error.context,
							],
						})))
					}
					if (isLeft(valueResult)) {
						failures.push(...valueResult.left.map(error => ({
							...error,
							context: [
								...context,
								{
									key: String(key),
									type: valueT,
									actual: value,
								},
								...error.context,
							],
						})))
					}

					++i
					continue
				}

				result.set(keyResult.right, valueResult.right)
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
