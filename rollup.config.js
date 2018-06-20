import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/common-types.cjs.js",
      format: "cjs",
      name: "common-types",
      sourcemap: true
    },
    {
      file: "dist/common-types.umd.js",
      format: "umd",
      name: "common-types",
      sourcemap: true
      // globals: {
      //   lodash: "lodash",
      //   "firebase-key": "fbKey",
      //   "wait-in-parallel": "Parallel",
      //   "common-types": "common-types",
      //   "serialized-query": "serialized-query"
      // }
    },
    {
      file: "dist/common-types.es2015.js",
      format: "es",
      sourcemap: true
    }
  ],
  // external: [
  //   "firebase-key",
  //   "reflect-metadata",
  //   "serialized-query",
  //   "lodash",
  //   "common-types"
  // ],
  plugins: [
    typescript({
      tsconfig: "tsconfig-esm.json"
    })
  ]
};
