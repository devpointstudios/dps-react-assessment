const deDash = (string) => {
  return string.replace("_", " ");
}

const capitalize = (string) => {
  let words = string.split(' ');
  for ( let i in words ) {
    let letters = words[i].split('');
    letters[0] = letters[0].toUpperCase();
    words[i] = letters.join('');
  }

  return words.join(' ');
}

export const fixKey = (key, capAll = false) => {
  let string = deDash(key);
  return capitalize(string)
}
