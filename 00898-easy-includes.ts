// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true> // 0 | 3
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false> // 0 | 3
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>, // 0 | 3
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>, // 0 | 3
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>, // 0 | 3
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>, // 0 | 3
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>, // 0 | 3
  Expect<Equal<Includes<[null], undefined>, false>>, // 0 | 3
  Expect<Equal<Includes<[undefined], null>, false>>, // 0 | 3
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>, // 3
  Expect<Equal<Includes<[1], 1 | 2>, false>>, // 3

  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>
]

type ZZZ = boolean extends [true, 2, 3, 5, 6, 7][number] ? true : false
type ZZZ1 = Includes<[true, 2, 3, 5, 6, 7], boolean>

// ============= Your Code Here =============
// We don't want to include a new generic type explicitly, so we should use a function like:
// `<G>() => G extends T`
// And then, by comparing the result of `G extends T` and `G extends U`, we can find out whether `G` is equal to `T`
type IsEqual<T, U> = (<G>() => G extends T ? true : false) extends <
  G
>() => G extends U ? true : false
  ? true
  : false

// First of all, we should check the edge case: `Includes<[], undefined>`
// The expected behavior is: `[]` is an empty array, and it includes nothing
// So if `Value extends []`, we return `false` directly
// In other cases, we travel `Value` and compare each element to `Item`
type Includes<Value extends readonly any[], Item> = Value extends [] // Check if Value is an empty array
  ? false
  : IsEqual<Value[0], Item> extends true
  ? true
  : Value extends [Value[0], ...infer rest]
  ? Includes<rest, Item>
  : false
