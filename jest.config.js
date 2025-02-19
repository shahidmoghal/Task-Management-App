export default {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", 
    },
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
      "/node_modules/(?!react-dnd|react-dnd-html5-backend|dnd-core).+" 
    ],
    moduleNameMapper: {
      "^react-dnd$": "<rootDir>/node_modules/react-dnd/dist/cjs",
      "^react-dnd-html5-backend$": "<rootDir>/node_modules/react-dnd-html5-backend/dist/cjs"
    },
  };
  