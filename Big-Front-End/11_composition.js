/**
 * refer: https://whatthefuck.is/composition
 *
 * composition is putting two or more different things together, and getting the same “kind” of thing — a combination of the inputs — as a result.
 * The concrete meaning might depend on the context, so we’ll look at a few examples that come up in front-end JavaScript development.
 *
 */

/**
 * @param {Array<(arg: any) => any>} funcs
 * @return {(arg: any) => any}
 */
function pipe(funcs) {
  // 1. We will have to return a function to take a new variable and also a function that can be called when required
  return function (arg) {
    // arg will be the initial argument of result
    // 2. a result that passes as an argument to next function in funcs.
    let result = arg;
    // 3. we will loop through the func with result as parameter and find next result and so on...
    for (const func of funcs) {
      result = func(result);
    }
    return result;
  };
}
