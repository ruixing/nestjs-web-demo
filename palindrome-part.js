/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
  const cutCounts = [];

  for (let i = 0; i <= s.length; i++) {
    cutCounts[i] = i - 1;
  }

  for (let i = 0; i < s.length; i++) {
    let continuousOdd = true;
    let continuousEven = true;
    for (let j = 0; i + j < s.length && j <= i; j++) {
      const oddPalindrome = s[i - j] === s[i + j];
      const evenPalindrome = i + j + 1 < s.length && s[i - j] === s[i + j + 1];
      if (continuousOdd && oddPalindrome) {
        cutCounts[i + j + 1] = Math.min(cutCounts[i + j + 1], cutCounts[i - j] + 1);
      } else {
        continuousOdd = false;
      }
      if (continuousEven && evenPalindrome) {
        cutCounts[i + j + 2] = Math.min(cutCounts[i + j + 2], cutCounts[i - j] + 1);
      } else {
        continuousEven = false;
      }
      if (!oddPalindrome && !evenPalindrome) {
        break;
      }
    }
  }

  console.log(cutCounts);
  
  return cutCounts[s.length];
};

/**
 * @param {string} s
 * @return {number}
 */
var minCut2 = function(s) {
  const cutCounts = [];

  for (let i = 0; i <= s.length; i++) {
    cutCounts[i] = i - 1;
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = 0; i + j < s.length && j <= i && s[i - j] === s[i + j]; j++) {
      cutCounts[i + j + 1] = Math.min(cutCounts[i + j + 1], cutCounts[i - j] + 1);
    }
    for (let j = 0; i + j < s.length - 1 && j <= i && s[i - j] === s[i + j + 1]; j++) {
      cutCounts[i + j + 2] = Math.min(cutCounts[i + j + 2], cutCounts[i - j] + 1);
    }
  }

  return cutCounts[s.length];
};

/**
 * @param {string} s
 * @return {number}
 */
var minCut3 = function(s, memo = new Map()) {
  if (isPalindrome(s)) {
    return 0;
  }
  let minCuts = Infinity;
  for (let i = 1; i < s.length; i++) {
    const left = s.substring(0, i);
    const right = s.substring(i);

    const isLeftPalindrome = isPalindrome(left);
    const isRightPalindrome = isPalindrome(right);

    if (isLeftPalindrome && isRightPalindrome) {
      return 1;
    } else if (isLeftPalindrome) {
      const minRight = memo.has(right) ? memo.get(right) : (memo.set(right, minCut(right, memo)), memo.get(right));
      minCuts = Math.min(minCuts, 1 + minRight);
    } else if (isRightPalindrome) {
      const minLeft = memo.has(left) ? memo.get(left) : (memo.set(left, minCut(left, memo)), memo.get(left));
      minCuts = Math.min(minCuts, 1 + minLeft);
    } else if (!isLeftPalindrome && !isRightPalindrome) {
      const minLeft = memo.has(left) ? memo.get(left) : (memo.set(left, minCut(left, memo)), memo.get(left));
      const minRight = memo.has(right) ? memo.get(right) : (memo.set(right, minCut(right, memo)), memo.get(right));
      minCuts = Math.min(minCuts, minLeft + minRight + 1);
    }
  }
  return minCuts;
}

const isPalindrome = (s) => {
  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] !== s[s.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

// console.log(minCut(process.argv[2]));
console.log(minCut('apjesgpsxoeiokmqmfgvjslcjukbqxpsobyhjpbgdfruqdkeiszrlmtwgfxyfostpqczidfljwfbbrflkgdvtytbgqalguewnhvvmcgxboycffopmtmhtfizxkmeftcucxpobxmelmjtuzigsxnncxpaibgpuijwhankxbplpyejxmrrjgeoevqozwdtgospohznkoyzocjlracchjqnggbfeebmuvbicbvmpuleywrpzwsihivnrwtxcukwplgtobhgxukwrdlszfaiqxwjvrgxnsveedxseeyeykarqnjrtlaliyudpacctzizcftjlunlgnfwcqqxcqikocqffsjyurzwysfjmswvhbrmshjuzsgpwyubtfbnwajuvrfhlccvfwhxfqthkcwhatktymgxostjlztwdxritygbrbibdgkezvzajizxasjnrcjwzdfvdnwwqeyumkamhzoqhnqjfzwzbixclcxqrtniznemxeahfozp'));
console.log(minCut('adabdcaebdcebdcacaaaadbbcadabcbeabaadcbcaaddebdbddcbdacdbbaedbdaaecabdceddccbdeeddccdaabbabbdedaaabcdadbdabeacbeadbaddcbaacdbabcccbaceedbcccedbeecbccaecadccbdbdccbcbaacccbddcccbaedbacdbcaccdcaadcbaebebcceabbdcdeaabdbabadeaaaaedbdbcebcbddebccacacddebecabccbbdcbecbaeedcdacdcbdbebbacddddaabaedabbaaabaddcdaadcccdeebcabacdadbaacdccbeceddeebbbdbaaaaabaeecccaebdeabddacbedededebdebabdbcbdcbadbeeceecdcdbbdcbdbeeebcdcabdeeacabdeaedebbcaacdadaecbccbededceceabdcabdeabbcdecdedadcaebaababeedcaacdbdacbccdbcece'));



// console.log(minCut2(process.argv[2]));
console.log(minCut2('apjesgpsxoeiokmqmfgvjslcjukbqxpsobyhjpbgdfruqdkeiszrlmtwgfxyfostpqczidfljwfbbrflkgdvtytbgqalguewnhvvmcgxboycffopmtmhtfizxkmeftcucxpobxmelmjtuzigsxnncxpaibgpuijwhankxbplpyejxmrrjgeoevqozwdtgospohznkoyzocjlracchjqnggbfeebmuvbicbvmpuleywrpzwsihivnrwtxcukwplgtobhgxukwrdlszfaiqxwjvrgxnsveedxseeyeykarqnjrtlaliyudpacctzizcftjlunlgnfwcqqxcqikocqffsjyurzwysfjmswvhbrmshjuzsgpwyubtfbnwajuvrfhlccvfwhxfqthkcwhatktymgxostjlztwdxritygbrbibdgkezvzajizxasjnrcjwzdfvdnwwqeyumkamhzoqhnqjfzwzbixclcxqrtniznemxeahfozp'));
console.log(minCut2('adabdcaebdcebdcacaaaadbbcadabcbeabaadcbcaaddebdbddcbdacdbbaedbdaaecabdceddccbdeeddccdaabbabbdedaaabcdadbdabeacbeadbaddcbaacdbabcccbaceedbcccedbeecbccaecadccbdbdccbcbaacccbddcccbaedbacdbcaccdcaadcbaebebcceabbdcdeaabdbabadeaaaaedbdbcebcbddebccacacddebecabccbbdcbecbaeedcdacdcbdbebbacddddaabaedabbaaabaddcdaadcccdeebcabacdadbaacdccbeceddeebbbdbaaaaabaeecccaebdeabddacbedededebdebabdbcbdcbadbeeceecdcdbbdcbdbeeebcdcabdeeacabdeaedebbcaacdadaecbccbededceceabdcabdeabbcdecdedadcaebaababeedcaacdbdacbccdbcece'));



// console.log(minCut3(process.argv[2]));
console.log(minCut3('apjesgpsxoeiokmqmfgvjslcjukbqxpsobyhjpbgdfruqdkeiszrlmtwgfxyfostpqczidfljwfbbrflkgdvtytbgqalguewnhvvmcgxboycffopmtmhtfizxkmeftcucxpobxmelmjtuzigsxnncxpaibgpuijwhankxbplpyejxmrrjgeoevqozwdtgospohznkoyzocjlracchjqnggbfeebmuvbicbvmpuleywrpzwsihivnrwtxcukwplgtobhgxukwrdlszfaiqxwjvrgxnsveedxseeyeykarqnjrtlaliyudpacctzizcftjlunlgnfwcqqxcqikocqffsjyurzwysfjmswvhbrmshjuzsgpwyubtfbnwajuvrfhlccvfwhxfqthkcwhatktymgxostjlztwdxritygbrbibdgkezvzajizxasjnrcjwzdfvdnwwqeyumkamhzoqhnqjfzwzbixclcxqrtniznemxeahfozp'));
console.log(minCut3('adabdcaebdcebdcacaaaadbbcadabcbeabaadcbcaaddebdbddcbdacdbbaedbdaaecabdceddccbdeeddccdaabbabbdedaaabcdadbdabeacbeadbaddcbaacdbabcccbaceedbcccedbeecbccaecadccbdbdccbcbaacccbddcccbaedbacdbcaccdcaadcbaebebcceabbdcdeaabdbabadeaaaaedbdbcebcbddebccacacddebecabccbbdcbecbaeedcdacdcbdbebbacddddaabaedabbaaabaddcdaadcccdeebcabacdadbaacdccbeceddeebbbdbaaaaabaeecccaebdeabddacbedededebdebabdbcbdcbadbeeceecdcdbbdcbdbeeebcdcabdeeacabdeaedebbcaacdadaecbccbededceceabdcabdeabbcdecdedadcaebaababeedcaacdbdacbccdbcece'));
