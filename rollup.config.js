import typescript from "@rollup/plugin-typescript";
// import typescript from "rollup-plugin-typescript2";

const moduleRun = (moduleSystem) => ({
  input: "src/index.ts",
  output: {
    dir: `dist/${moduleSystem}`,
    format: moduleSystem,
    ...(moduleSystem !== "es" ? { name: "common-types" } : {}),
    sourcemap: true,
  },

  plugins: [
    typescript({
      tsconfig: `tsconfig-${moduleSystem}.json`,
    }),
  ],
});

export default () => {
  moduleRun("es");
  moduleRun("cjs");
  moduleRun("umd");
};
