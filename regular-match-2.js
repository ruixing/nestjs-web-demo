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
      if (last === '.' && pattern.slice(-1)[0] !== '.*') {
        pattern.push('.*');
      } else if (last.length > 1) {
        pattern.push(last.slice(0, -1));
        pattern.push(`${last.slice(-1)}*`);
      } else if (pattern.slice(-1)[0] !== `${last}*`) {
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

const isPatternMatch = function(s, pattern) {
  let start = 0;
  let end = 0;

  console.log(s, pattern);

  while(pattern.length) {
    const part = pattern[0];
    if (part === '.') {
      start++;
      end < s.length && end++;
      pattern.shift();
    } else if (part === '.*') {
      end = s.length;
      pattern.shift();
    } else if (part.slice(-1) === '*') {
      for ( let j = Math.max(start, end); s[j] === part[0] && j < s.length && end < s.length; j++) {
        end++;
      }
      pattern.shift();
    } else if (part.slice(-1) !== '*' && part !== '.') {
      const matchStr = s.substring(start, Math.min(s.length, end + part.length));
      let matched = false;

      for (let j = matchStr.indexOf(part); j !== -1; j = matchStr.indexOf(part, j + 1)) {
        if (isPatternMatch(s.substring(start + j + part.length), pattern.slice(1))) {
          return true;
        }
      }
      if (!matched) {
        return false;
      }
    }
  }

  return start <= end && end === s.length;
};

console.log(isMatch(process.argv[2], process.argv[3]));
// console.log(splitPattern(process.argv[2]));
