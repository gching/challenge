// lcs.js
// April 23, 2014
// Gavin Ching'
// Solving the LCS problem in javascript.


function lcs(a, b){
  // Get the lengths of the two strings inputted.
  var n = a.length;
  var m = b.length;

  // Create an array that stores the lengths of the subproblems, eventually finding
  // the solution.
  // Array will be two-dim with n+1 rows and m+1 columns.
  var commonLength = new Array(n+1);
  for (var i = 0; i<=n; i++){
    commonLength[i] = new Array(m+1);
  }
  // Preset the base case when it reaches the 0 indexes to be a 0\
  for(var i = 1; i<=n; i++){
    commonLength[i][0] = 0;
  }
  for(var i = 0; i<=m; i++){
    commonLength[0][i] = 0;

  }


  // Go through the 2 strings using two for loops and iterate through depending
  // on the case. Depending on the situation, it will go into another subproblem.
  // Start at indexes [1][1] for the two dim array to incorporate the base case
  // of 0.
  for(var i = 0; i<n; i++){
    for(var j = 0; j<m; j++){
      // Case when the two letters are the same. Add 1 to the length.
      if (a[i] == b[j]){
        commonLength[i+1][j+1] = commonLength[i][j] + 1;
      }
      // Case when they do not equal, so take on the previous greater length.
      // If the case when the decremented string a has a larger common seq than
      // the decremented string b, then get that value of the length as it is
      // the max of the 2 choices/cases.
      else if(commonLength[i][j+1] >= commonLength[i+1][j] ){
        commonLength[i+1][j+1] = commonLength[i][j+1];

      }
      // Case when decremented string b has a higher common sequence compared to
      // the case of the decremented string a.
      else{
        commonLength[i+1][j+1] = commonLength[i+1][j];
      }
    }
  }

  // Last index of the two dimensional array contains the LCS.
  return commonLength[n][m];
}
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
 lines = chunk.split('\n');
 console.log(lcs(lines[0],lines[1]));
});
