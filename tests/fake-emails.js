const allEmptyStrings = ["", "", "", "", ""];

const allNonEmptyStrings = [
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",

  "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",

  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",

  "abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !\"§ $ %& /() =?* '<> #|; ²³~ @` ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !\"§ $%& /() =?* '<> #|; ²³~ @ ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !\"§ $%& /() =?* ' <> # |; ²³~ @` ©«» ¤¼× {} abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS"
];

const someEmptyStrings = allEmptyStrings.concat(allNonEmptyStrings);

const mixedWithoutValid = [
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  "",
  undefined,
  null,
  true,
  false,
  0,
  42,
  -42,
  4.2,
  BigInt(9007199254740991n),
  Infinity,
  -Infinity,
  NaN,
  { a: 9, b: 6 },
  {},
  [],
  [{ x: 0 }]
];

const mixedWithSomeValidObj = [
  ...structuredClone(mixedWithoutValid),
  ...allNonEmptyStrings.map(str => ({ body: str }))
];

const allValidObj = allNonEmptyStrings.map(str => ({ body: str }));


module.exports = {
  allEmptyStrings,
  allNonEmptyStrings,
  someEmptyStrings,
  mixedWithoutValid,
  mixedWithSomeValidObj,
  allValidObj
};