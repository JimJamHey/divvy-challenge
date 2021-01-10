export function Romanize (number) {
  let roman = ''
  const romanNums = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XV: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
  let a

  // loop through all of romanNums key value pairs
  for (let key in romanNums) {
    // takes number passed in and checks how many times the max key:value pair can go into number given
    a = Math.floor(number / romanNums[key])
    if (a >= 0) {
      // loop through and add corresponding letter of max divisble number's key:value pair
      for (let i = 0; i < a; i++) {
        roman += key
      }
    }
    // reduces the number by the key:value pair that was used above --> if number still has remainder, loops through again with the remainder
    number = number % romanNums[key]
  }
  // once the given number === 0, return your roman numeral!
  return roman
}
