const sut = require("./index"); // sut === systemUnderTest

// 1. 테스트 나열
test('sut transform "hello  world" to "hello world"', () => {
  const result = sut("hello  world"); //success
  expect(result).toBe("hello world");
});

test('sut transform "hello    world" to "hello world"', () => {
  const result = sut("hello    world"); // success
  expect(result).toBe("hello world");
});

test('sut transform "hello   world" to "hello world"', () => {
  const result = sut("hello   world"); // fail
  expect(result).toBe("hello world");
});

// 2. 반복문으로 테스트 간략화
// -> 이 경우 실패한 경우에 대한 input값은 알 수 없음;
// -> 우선 실행된 테스트가 실패하면, 그 이후 경우에 대한 테스트가 불가;
// -> 코드를 줄인다고 좋은 게 아님 -> 코드 품질 저하ㅜ
test('sut correctly works"', () => {
  for (const source of ["hello  world", "hello   world", "hello    world"]) {
    const result = sut(source);
    expect(result).toBe("hello world");
  }
});

// 3. ParameterizedTest 사용
// -> 하나의 테스트 메소드로 여러 개의 파라미터에 대해서 테스트 가능
// -> 코드 중복은 줄이되 테스트 품질 보장 가능
// 에러시: sut transforms "hello    world" to "hello world" 로 나옴
test.each`
  source              | expected
  ${"hello  world"}   | ${"hello world"}
  ${"hello   world"}  | ${"hello world"}
  ${"hello    world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({ source, expect }) => {
  const result = sut(source);
  expect(result).toBe(expected);
});
