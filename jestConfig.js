const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });


// "setupTestFrameworkScriptFile": "jest-enzyme",
//     "testEnvironment": "enzyme",
//     "testEnvironmentOptions": {
//       "enzymeAdapter": "react16"
//     },
//     "moduleNameMapper": {
//       "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jestTests/__mocks__/fileMock.js",
//       "\\.(css|less)$": "<rootDir>/client/src/stylesheets/"
//     },
//     "testPathIgnorePatterns": [
//       "<rootDir>/node_modules/",
//       "<rootDir>/client/src/stylesheets/"
//     ]

// global.fetch = require('jest-fetch-mock');
