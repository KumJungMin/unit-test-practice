const { faker } = require("@faker-js/faker");
const sut = require("./index"); // sut === systemUnderTest

// ParameterizedTest
// : 하나의 테스트 메소드로 여러 개의 파라미터에 대해서 테스트 가능
test.each`
  source                  | expected
  ${"hello  world"}       | ${"hello world"}
  ${"hello   world"}      | ${"hello world"}
  ${"hello    world"}     | ${"hello world"}
  ${"hello     world"}    | ${"hello world"}
  ${"hello      world"}   | ${"hello world"}
  ${"hello       world"}  | ${"hello world"}
  ${"hello        world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({ source, expected }) => {
  const result = sut(source);
  expect(result).toBe(expected);
});

test.each`
  source             | expected
  ${"hello\t world"} | ${"hello world"}
  ${"hello \tworld"} | ${"hello world"}
`(
  'sut transforms "$source" that contains tab character to "$expected"',
  ({ source, expected }) => {
    const result = sut(source);
    expect(result).toBe(expected);
  }
);

// ---------------------------------------------------------------
// 테스트 우선 개발을 해보자
// 테스트 코드를 우선 작성하고 -> 운영 코드를 작성
// 이때 테스트할 문자를 하나씩 추가하는 게 아니라, 랜덤문자로 테스트하도록 해야함

// bad case
test.each`
  source             | bannedWords              | expected
  ${"hello mockist"} | ${["mockist", "purist"]} | ${"hello *******"}
  ${"hello purist"}  | ${["mockist", "purist"]} | ${"hello ******"}
`(
  "sut transforms $source to $expected",
  ({ source, bannedWords, expected }) => {
    const result = sut(source, { bannedWords });
    expect(result).toBe(expected);
  }
);

// good case
// facker를 사용해 임의의 문자를 생성해서 테스트하기
describe("given banned word", () => {
  const bannedWord = faker.lorem.word();
  const source = `hello ${bannedWord}`;
  const expected = `hello ${"*".repeat(bannedWord.length)}`;

  test(`${bannedWord} then invoke sut then it returns ${expected}`, () => {
    const result = sut(source, { bannedWords: [bannedWord] });
    expect(result).toBe(expected);
  });
});

// ---------------------------------------------------------------
// 테스트 주도 개발을 해보자
// 1. 테스트 코드 작성
// - 맨 앞 공백을 제거하는 기능을 추가해보자
// - 우선 테스트를 먼저 작성한다(운영 코드에 기능을 추가하지 않았으나, 처음에는 실패하는 게 당연)
// - 실패한 테스트를 통과시키기 위한 최소한의 수정으로 운영코드를 고친다. -> index.js
test.each`
  source            | expected
  ${" hello world"} | ${"hello world"}
`(`sut correctly trims whitespaces`, ({ source, expected }) => {
  const result = sut(source);
  expect(result).toBe(expected);
});
