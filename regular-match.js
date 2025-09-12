/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const pattern = splitPattern(p);

  return isPatternMatch(s, pattern);
};

const splitPattern = (p) => {
  const pattern = [];

  p.split('').forEach((c) => {
    if (c === '.') {
      pattern.push(c);
    } else if (c === '*') {
      const last = pattern.pop();
      if (last === '.') {
        pattern.push('.*');
      } else if (last.length > 1) {
        pattern.push(last.slice(0, -1));
        pattern.push(`${last.slice(-1)}*`);
      } else {
        pattern.push(`${last}*`);
      }
    } else {
      const last = pattern.pop() || '';
      if (last === '.') {
        pattern.push('.');
        pattern.push(c);
      } else if (last && last.slice(-1) === '*') {
        pattern.push(last);
        pattern.push(c);
      } else {
        pattern.push(last + c);
      }
    }
  });

  return pattern;
}

const isPatternMatch = (s, pattern) => {
  const first = pattern[0];

  console.log(s, pattern);

  if (s.length < 1 && pattern.length < 1) {
    return true;
  } else if (pattern.length < 1) {
    return false;
  }

  if (first === '.') {
    if (s.length < 1) {
      return false;
    } else if (s.length === 1 && pattern.length === 1) {
      return true;
    } else if (pattern.length === 1) {
      return false;
    } else {
      return isPatternMatch(s.slice(1), pattern.slice(1));
    }
  } else if (first.slice(-1) !== '*') {
    if (s.startsWith(first)) {
      return isPatternMatch(s.slice(first.length), pattern.slice(1));
    } else {
      return false;
    }
  } else if (first === '.*') {
    if (pattern.length === 1) {
      return true;
    } else {
      for (let i = s.length; i >= 0; i--) {
        if (isPatternMatch(s.slice(i), pattern.slice(1))) {
          return true;
        }
      }
      return false;
    }
  } else {
    if (s[0] !== first[0]) {
      return isPatternMatch(s, pattern.slice(1));
    } else {
      let k = 0;
      while (s[k] === first[0]) {
        k++;
      }
      for (let i = k;  i >= 0; i--) {
        if (isPatternMatch(s.slice(i), pattern.slice(1))) {
          return true;
        }
      }
      return false;
    }
  }
}

console.log(isMatch(process.argv[2], process.argv[3]));
// console.log(splitPattern(process.argv[2]));
