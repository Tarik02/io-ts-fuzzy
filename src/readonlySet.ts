import * as t from 'io-ts'

import { set } from './set'


// I know what I'm doing
export const readonlySet = <V>(valueT: t.Type<V>) => set(valueT) as any as t.Type<ReadonlySet<V>>
