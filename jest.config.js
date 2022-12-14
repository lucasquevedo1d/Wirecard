const {defaults} = require('jest-config');
module.exports = {
   
   roots: ["<rootDir>/tests"],
   transform: {
      "^.+\\.tsx?$": "ts-jest",
   },
   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
   moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};