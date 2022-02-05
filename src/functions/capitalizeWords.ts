function capitalizeWord(word: string) {
  return word
    .split('')
    .map((letter, index) => index === 0 ? letter.toUpperCase() : letter)
    .join('');
};

export function capitalizeWords(string: string) {
  if (string.includes('/')) {
    string = string
      .split('/')
      .map((word) => capitalizeWord(word))
      .join('/');
  };

  if (string.includes('-')) {
    string = string
      .split('-')
      .map((word) => capitalizeWord(word))
      .join('-');
  };

  return string
    .split(' ')
    .map((word, index, array) => {
      if (array.length === 1) return capitalizeWord(word); // Capitalize only word
      if (index === 0) return capitalizeWord(word); // Capitalize first word in sentence
      if (word.length > 2) return capitalizeWord(word); // Capitalize words greater than 2 letters
      return word;
    })
    .join(' ');
};