function generateNumbers(n, k) {
  const number = [1];
  const numLength = n.toString().length;
  let count = 1;
  let direction = 'toRight';

  while (count < k) {
    if (direction === 'toRight' && (number.length < numLength -1 || Number(number.join('') + '0') <= n)) {
      number.push(0);
      count++;
    } else if (direction === 'toRight' && number.slice(-1)[0] < 9 && Number(number.slice(0, -1).join('') + (+number.slice(-1)[0] + 1)) <= n) {
      number[number.length - 1]++;
      count++;
    } else if (direction === 'toRight') {
      direction = 'toLeft';
      number.pop();
    } else if (direction === 'toLeft' && number.slice(-1)[0] < 9 && Number(number.slice(0, -1).join('') + (+number.slice(-1)[0] + 1)) <= n) {
      direction = 'toRight';
      number[number.length - 1]++;
      count++;
    } else if (direction === 'toLeft' && number.length > 1) {
      number.pop();
    }
    console.log(number.join(''));
  }
  return number.join('');
}


function generateNumbers2(n, k) {
  const number = [1];
  for (let i = 1; i <= n; i++) {
    number.push(`${i}`);
  }
  return number.sort((a, b) => a.localeCompare(b))[k - 1];
}


// console.log(calcFirstNumberLessThanTarget(process.argv.slice(2).map(n => +n)));

const generateNumbers3 = (n, k) => {
  const nums = n.toString().split('').map(Number);
  const res = [1];

  let count = 1;
  let index = 0;

  while (count < k) {
    const prefix = Number(nums.slice(0, res.length).join(''));
    const self = Number(res.join(''));

    if (prefix > self) {
      const nextDecimalise = calcDecimalismCount(nums.length - index);
      if (nextDecimalise + count <= k) {
        res[index]++;
        count += nextDecimalise;
      } else {
        res.push(0);
        index++;
        count++;
      }
    } else if (prefix === self) {
      if (res.length < nums.length) {
        res.push(0);
        index++;
        count++;
      } else {
        res.pop();
        index--;
        res[index]++;
        count++;
      }
    } else {
      const nextDecimalise = calcDecimalismCount(nums.length - index - 1);
      if (nextDecimalise + count <= k) {
        for (i = index; res[index] === 9; i--) {
          res.pop();
          index--;
        }
        count += nextDecimalise;
        res[index]++;
      } else {
        res.push(0);
        index++;
        count++;
      }
    }
    console.log(res.join(''));
  }
  
  console.log(res.join(''));
  return res.join(''); 
}

const calcFirstNumberLessThanTarget = (nums) => {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i > 0 ? 0 : 1; j < nums[i]; j++) {
      total += 10 ** (nums.length - i - 1);
    }
  }
  if (nums.length >= 2) {
    for (let i = 0; i < nums[0]; i++) {
      total += calcDecimalismCount(nums.length - 1);
    }
  }
  total += 1; // itself
  return total;
}

const calcDecimalismCount = (n) => {
  let count = 0;
  for (let i = 0; i < n; i++) {
    count += 10 ** i;
  }
  return count;
}

generateNumbers3(+process.argv[2], +process.argv[3]);

// console.log(generateNumbers(1000000000, 1000000000));
// console.log(generateNumbers(10000, 100));