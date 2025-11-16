// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

// ============= Your Code Here =============
// try 1 - fail
type MyReadonly2_1<T, K = never> = { readonly [P in keyof T]: T[P] }

// try 2 - ok
type MyReadonly2<
  T,
  K extends keyof T | undefined = undefined
> = undefined extends K
  ? {
      readonly [P in keyof T]: T[P]
    }
  : {
      [P in keyof T as P extends K ? never : P]: T[P]
    } & {
      readonly [P in keyof T as P extends K ? P : never]: T[P]
    }

// try 3 - ok
type MyReadonly2_3<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
} & {
  readonly [P in keyof T as P extends K ? P : never]: T[P]
}
