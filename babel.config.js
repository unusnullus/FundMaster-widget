module.export = {
  babel: {
    plugins: [
      [
        "@babel/plugin-transform-react-jsx",
        {
          pragma: "h",
          pragmaFrag: "Fragment",
        },
      ],
      "babel-plugin-styled-components",
    ],
    presets: [
      "@babel/env",
      [
        "@babel/typescript",
        {
          jsxPragma: "h",
        },
      ],
    ],
  },
};
