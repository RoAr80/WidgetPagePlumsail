export function delayResult<T>(result: any, timeout: number): Promise<T> {
  return new Promise((res) => {
    // setTimeout(() => res(result), timeout);
    // setTimeout(() => res(result), 3000);
    setTimeout(() => res(result), timeout);
  });
}
