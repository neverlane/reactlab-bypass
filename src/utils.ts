export const createPromise = <T>() => {
  let resolve: (value: T | PromiseLike<T>) => void = () => void 0;
  let reject: (reason?: unknown) => void = () => void 0;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve,
    reject
  };
};