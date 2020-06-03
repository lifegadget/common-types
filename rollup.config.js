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
    },
    {
      dir: "dist/es",
      format: "es",
      sourcemap: true,
    },
  ],

  plugins: [
    typescript({
      tsconfig: "tsconfig-esm.json",
    }),
  ],
};
