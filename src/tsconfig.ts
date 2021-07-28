/**
 * File structure for a Typescript `tsconfig.json` file
 */
export interface ITsConfig {
  extends: string;
  compilerOptions: Record<string, unknown> & {
    alwaysStrict?: boolean;
    module?: string;
    baseUrl?: string;
    target?: string;
    lib?: string[];
    strict?: boolean;
    strictBindCallApply?: boolean;
    strictFunctionTypes?: boolean;
    strictPropertyInitialization?: boolean;
    composite?: boolean;
    diagnostics?: boolean;
    /** Ensure that each file can be safely transpiled without relying on other imports. */
    isolatedModules?: false;
    esModuleInterop?: boolean;
    allowSyntheticDefaultImports?: boolean;
    /** Enable experimental support for TC39 stage 2 draft decorators. */
    experimentalDecorators?: boolean;
    emitDecoratorMetadata?: boolean;
    declaration?: boolean;
    declarationDir?: string;
    incremental?: boolean;
    skipLibCheck?: boolean;
    noUnusedLocals?: boolean;
    moduleResolution?: "node" | "classic";
    resolveJsonModule?: boolean;
    strictNullChecks?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    types?: string[];
    paths?: Record<string, string>;
    plugins?: [{ transform?: string; afterDeclarations?: true }];
  };
  include: string[];
  exclude: string[];
}