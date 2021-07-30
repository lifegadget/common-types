/**
 * File structure for a Typescript `tsconfig.json` file
 */
export interface ITsConfig {
  extends?: string;
  files?: string[];
  /**
   * Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1 or later.
   */
  typeAcquisition?: {
    enable?: boolean;
    include?: string[];
    exclude?: string[];
  };
  buildOptions?: {
    /**
     * Have recompiles in projects that use incremental and watch mode assume that 
     * changes within a file will only affect files directly depending on it. 
     * See more: https://www.typescriptlang.org/tsconfig#assumeChangesOnlyAffectDirectDependencies
     */
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    dry?: boolean;
    /**
     * Build all projects, including those that appear to be up to date. 
     * See more: https://www.typescriptlang.org/tsconfig#force
     */
    force?: boolean;
    /**
     * Save .tsbuildinfo files to allow for incremental compilation of projects. 
     * See more: https://www.typescriptlang.org/tsconfig#incremental
     */
    incremental?: boolean;
    /**
     * Log paths used during the moduleResolution process. 
     * See more: https://www.typescriptlang.org/tsconfig#traceResolution
     */
    traceResolution?: boolean;
    verbose?: boolean;
  };
  compileOnSave?: boolean;

  compilerOptions?: Record<string, unknown> & {
    alwaysStrict?: boolean;
    /**
     * Specify what module code is generated. 
     * See more: https://www.typescriptlang.org/tsconfig#module
     */
    module?: string;
    baseUrl?: string;
    /**
     * Set the JavaScript language version for emitted JavaScript and 
     * include compatible library declarations.
     * See more: https://www.typescriptlang.org/tsconfig#target
     */
    target?: string;
    lib?: string[];
    /**
     * Enable all strict type checking options. 
     * See more: https://www.typescriptlang.org/tsconfig#strict
     */
    strict?: boolean;
    strictBindCallApply?: boolean;
    strictFunctionTypes?: boolean;
    /** Enable error reporting for expressions and declarations with an implied any type.. */
    noImplicitAny?: boolean;
    /** Disable erasing const enum declarations in generated code. */
    preserveConstEnums?: boolean;
    strictPropertyInitialization?: boolean;
    /**
     * Enable constraints that allow a TypeScript project to be used with project references. 
     * See more: https://www.typescriptlang.org/tsconfig#composite
     */
    composite?: boolean;
    diagnostics?: boolean;
    /**
     * Ensure that each file can be safely transpiled without relying on other imports. 
     * See more: https://www.typescriptlang.org/tsconfig#isolatedModules
     */
    isolatedModules?: false;
    esModuleInterop?: boolean;
    /**
     * Disable emitting comments. 
     * See more: https://www.typescriptlang.org/tsconfig#removeComments
     */
    removeComments?: boolean;
    allowSyntheticDefaultImports?: boolean;
    /** 
     * Enable experimental support for TC39 stage 2 draft decorators. 
     * [link](https://www.typescriptlang.org/tsconfig#experimentalDecorators).
    */
    experimentalDecorators?: boolean;
    /** 
     * Emit design-type metadata for decorated declarations in source files. 
     * [link](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata). 
     */
    emitDecoratorMetadata?: boolean;
    /**
     * Generate .d.ts files from TypeScript and JavaScript files in your project. 
     * See more: https://www.typescriptlang.org/tsconfig#declaration
     */
    declaration?: boolean;
    declarationDir?: string;
    incremental?: boolean;
    skipLibCheck?: boolean;
    noUnusedLocals?: boolean;
    /**
     * Disable strict checking of generic signatures in function types. 
     * See more: https://www.typescriptlang.org/tsconfig#noStrictGenericChecks
     */
    noStrictGenericChecks?: boolean;
    /** Specify how TypeScript looks up a file from a given module specifier. */
    moduleResolution?: "node" | "classic";
    /**
     * Enable importing .json files. 
     * See more: https://www.typescriptlang.org/tsconfig#resolveJsonModule
     */
    resolveJsonModule?: boolean;
    /**
     * When type checking, take into account null and undefined. 
     * See more: https://www.typescriptlang.org/tsconfig#strictNullChecks
     */
    strictNullChecks?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    types?: string[];
    paths?: Record<string, string>;
    plugins?: [{ transform?: string; afterDeclarations?: true }];
    /**
     * Ensure that each file can be safely transpiled without relying on other imports. 
     * See more: https://www.typescriptlang.org/tsconfig#isolatedModules
     */
    traceResolution?: boolean;
  };
  /**
 * ts-node options. 
 * 
 * See also: https://github.com/TypeStrong/ts-node#configuration-options
 * 
 * _`ts-node` offers TypeScript execution and REPL for node.js, with source map support._
 */
  "ts-node"?: {
    compiler?: string;
    compilerHost?: unknown;
    compilerOptions?: Record<string, unknown>;
    emit?: boolean;
    files?: boolean;
    ignore?: string[];
    ignoreDianostics?: unknown[];
    logError?: boolean;
    preferTsExts?: boolean;
    pretty?: boolean;
    require?: string[];
    skipIgnore?: boolean;
    transpileOnly?: boolean;
    typeCheck?: boolean;
  };
  /**
   * Referenced projects. Requires TypeScript version 3.0 or later.
   */
  references?: string[];
  include?: string[];
  exclude?: string[];

  /**
   * Settings for the watch mode in TypeScript.
   */
  watachOptions?: {
    /**
     * Remove a list of directories from the watch process. 
     * See more: https://www.typescriptlang.org/tsconfig#excludeDirectories
     */
    excludeDirectories?: string[];
    /**
     * Remove a list of files from the watch mode's processing. 
     * See more: https://www.typescriptlang.org/tsconfig#excludeFiles
     */
    excludeFiles?: string[];
    /**
     * Specify what approach the watcher should use if the system runs out 
     * of native file watchers. 
     * See more: https://www.typescriptlang.org/tsconfig#fallbackPolling
     */
    fallbackPolling?: string;
    force?: unknown;
    /**
     * Synchronously call callbacks and update the state of directory watchers on platforms 
     * that don`t support recursive watching natively. 
     * See more: https://www.typescriptlang.org/tsconfig#synchronousWatchDirectory
     */
    synchronousWatchDirectory?: string;
    watchDirectory?: string;
    /**
     * Specify how the TypeScript watch mode works. 
     * See more: https://www.typescriptlang.org/tsconfig#watchFile
     */
    watchFile?: string;
  }
}