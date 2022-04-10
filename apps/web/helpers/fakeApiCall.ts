/**
 *  Mocks an API call and returns data after waiting.
 * @param data: Any JSON data to be returned.
 * @param ms Amount of time to wait in milliseconds
 * @returns
 */
export default function mockApiCall<T extends Record<string, any>>(
  data: T,
  ms: number
) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res(data);
    }, 2000);
  });
}
