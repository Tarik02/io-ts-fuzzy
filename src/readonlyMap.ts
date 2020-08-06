import * as t from 'io-ts'

import { map } from './map'


// I know what I'm doing
export const readonlyMap = <K, V>(keyT: t.Type<K>, valueT: t.Type<V>) => map(keyT, valueT) as any as t.Type<ReadonlyMap<K, V>>
