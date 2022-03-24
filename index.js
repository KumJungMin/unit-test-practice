// 코드를 정리(리팩토링)해보자!
// 테스트가 있기 때문에 리팩토링에 있어 기능 유지를 보장할 수 있음

function refineText(source, options) {
  // source = source.trim(); -> 2. 최소한의 수정으로 테스트가 통과되도록 하자
  return [
    normalizeWhitespaces,
    compactWhitespaces,
    maskBannedWords,
    trimWhiteSpaces,
  ].reduce((value, filter) => filter(value, options), source);
}

// 3. 최소한으로 작성한 기능을 리팩토링하자(메소드 분리)
function trimWhiteSpaces(value) {
  return value.trim();
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
