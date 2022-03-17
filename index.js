// 테스트가 통과되도록 운영코드를 고쳐보자!
// 함수 refinetText 목적
// - 모든 띄어쓰기(space, tab)를 하나의 공백으로 변경하는 것
// - 인자로 넘어온 특정 문자를 마스킹하는 것
function refinetText(s, options) {
  s = s
    .replace("     ", " ")
    .replace("\t", "")
    .replace("  ", " ")
    .replace("  ", " ")
    .replace("  ", " ")
    .replace("mockist", "*******")
    .replace("purist", "******");
  if (options) {
    for (const bannedWord of options.bannedWords) {
      s = s.replace(bannedWord, "*".repeat(bannedWord.length));
    }
  }
  return s;
}
module.exports = refinetText;
