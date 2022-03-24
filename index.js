// 코드를 정리(리팩토링)해보자!
// 테스트가 있기 때문에 리팩토링에 있어 기능 유지를 보장할 수 있음
function refineText(source, options) {
  return [normalizeWhitespaces, compactWhitespaces, maskBannedWords].reduce(
    (value, filter) => filter(value, options),
    source
  );
}

function normalizeWhitespaces(value) {
  return value.replace("\t", " ");
}

function compactWhitespaces(value) {
  return value.indexOf("  ") < 0
    ? value
    : compactWhitespaces(value.replace("  ", " "));
}

function maskBannedWords(value, options) {
  return options ? options.bannedWords.reduce(maskBannedWord, value) : value;
}

function maskBannedWord(value, bannedWord) {
  return value.replace(bannedWord, "*".repeat(bannedWord.length));
}

module.exports = refineText;
