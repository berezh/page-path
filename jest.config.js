module.exports = {
  verbose: true,
  globals: {},
  testURL: "http://localhost/",
  // ---------------------------------------------------------------------------
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  testRegex: ".src/.*.(/tests/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "scss"],
};
