import { assert } from 'chai'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { inspect } from 'util'


const dump = (v: any) => inspect(v, {
	colors: true,
	depth: null,
})

export function assertStrictEqual<T>(result: t.Validation<T>, expected: any): void {
	if (isRight(result)) {
		assert.deepStrictEqual(result.right, expected)
	} else {
		throw new Error(`${dump(result)} is not a right`)
	}
}

export function assertSuccess<T>(result: t.Validation<T>, expected?: T): void {
	if (isRight(result)) {
		if (expected !== undefined) {
			assert.deepStrictEqual(result.right, expected)
		}
	} else {
		throw new Error(`${dump(result)} is not a right`)
	}
}

export function assertStrictSuccess<T>(result: t.Validation<T>, expected: T): void {
	if (isRight(result)) {
		if (expected !== undefined) {
			assert.strictEqual(result.right, expected)
		}
	} else {
		throw new Error(`${dump(result)} is not a right`)
	}
}

export function assertFailure(codec: t.Any, value: unknown, errors: Array<string>): void {
	const result = codec.decode(value)
	if (isLeft(result)) {
		assert.deepStrictEqual(PathReporter.report(result), errors)
	} else {
		throw new Error(`${dump(result)} is not a left`)
	}
}
