interface Success<T> {
  data: T
  error: null
}

interface Failure<E> {
  data: null
  error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>

/**
 * Wraps a promise and returns a result object with the data or error
 * @param promise - The promise to wrap
 * @returns A result object with the data or error
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as E }
  }
}
