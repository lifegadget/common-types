import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

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
      tsconfig: `tsconfig-es.json`,
      outDir: `dist/${moduleSystem}`
    }),
    ...(moduleSystem === "cjs" ? [commonjs()] : [])
  ],
});

export default () => {
  return [
    moduleRun("es"),
    moduleRun("cjs"),
  ]
};
