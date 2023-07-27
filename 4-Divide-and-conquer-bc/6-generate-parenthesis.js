// Given n pair of parentheses, write a function to generate all combinations of well-formed parentheses.
function solve(ans, n, open, close, output) {
  //base case
  if (open === 0 && close === 0) {
    ans.push(output);
    return;
  }
  //include open bracket
  if (open > 0) {
    output.push("(");
    solve(ans, n, open - 1, close, output);
    //backtrack
    output.pop();
  }

  //include closing bracket
  if (close > open) {
    output.push(")");
    solve(ans, n, open, close - 1, output);
    //backtrack
    output.pop();
  }
}

function generateParantheses(n) {
  let ans;
  let open = n;
  let close = n;
  let output = "";
  solve(ans, n, open, close, output);
  return ans;
}
