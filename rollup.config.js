import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      name: "common-types",
      sourcemap: true,
    },
    {
      dir: "dist/umd",
      format: "umd",
      name: "common-types",
      sourcemap: true,
      // globals: {
      //   lodash: "lodash",
      //   "firebase-key": "fbKey",
      //   "wait-in-parallel": "Parallel",
      //   "common-types": "common-types",
      //   "serialized-query": "serialized-query"
      // }
    },
    {
      dir: "dist/es",
      format: "es",
      sourcemap: true,
    },
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
      tsconfig: "tsconfig-esm.json",
    }),
  ],
};
