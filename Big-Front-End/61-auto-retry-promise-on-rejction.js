/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  // your code here
  return fetcher().catch((e) => {
    if (maximumRetryCount === 0) throw e;
    return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
  });
}

////////////// OTHER SOLUTIONS THAT MIGHT BE BETTER

/**
 * @param { () => Promise<any> } fetcher
 * @param { number } maximumRetryCount
 * @returns { Promise<any> }
 */
function fetchWithAutoRetryV2(fetcher, maximumRetryCount) {
  return new Promise((resolve, reject) => {
    let retryCount = 0;
    const callFetcher = () =>
      fetcher().then(
        (data) => {
          resolve(data);
        },
        (error) => {
          if (retryCount < maximumRetryCount) {
            callFetcher();
            retryCount += 1;
          } else {
            reject(error);
          }
        }
      );

    callFetcher();
  });
}
