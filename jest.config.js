module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"  // Asegúrate de que cubre los archivos JS si es necesario
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "node"
};