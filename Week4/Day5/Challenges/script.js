function areAnagrams(str1, str2) {
  const normalize = str => 
    str.toLowerCase().replace(/\s+/g, '').split('').sort().join('');
  return normalize(str1) === normalize(str2);
}

console.log(areAnagrams("Astronomer", "Moon starer")); 
console.log(areAnagrams("School master", "The classroom")); 
console.log(areAnagrams("Hello", "Olelh")); 
console.log(areAnagrams("Test", "Taste")); 