import { url } from "./aliases";
import { IDictionary } from "./basics";

export interface IPackageJsonPerson {
  name: string;
  email?: string;
  url?: string;
}

export interface ExportBlock {
  import?: string;
  require?: string;
}

export interface IPackageJson extends IDictionary {
  name: string;
  /**
   * If true, the package is considered private and pkg mgr will refuse to publish it regardless of the circumstances.
   * Setting this flag also unlocks some features that wouldn't make sense in published packages, such as workspaces.
   */
  private?: boolean;
  version: string;
  description?: string;
  keywords?: string[];
  homepage?: url;
  bugs?: {
    url: string;
    email: string;
  };
  /**
   * points to the TypeScript type file for the modules
   */
  typings: string;
  /**
   * points to the TypeScript type file for the modules
   * > **note:** the modern alternative to "typings"
   */
  types: string;
  /**
   * Indicates the module system exported; the default is _commonjs_
   */
  type?: "module" | "commonjs";
  exports?: Record<string, ExportBlock>;
  /** the full list of SPDX license IDs (https://spdx.org/licenses/) */
  license?: string;
  author?: IPackageJsonPerson;
  contributors?: IPackageJsonPerson[];
  /**
   * The optional "files" field is an array of file patterns that describes the entries to be included when your package is installed as a dependency. If the files array is omitted, everything except automatically-excluded files will be included in your publish. If you name a folder in the array, then it will also include the files inside that folder (unless they would be ignored by another rule in this section.).
   */
  files?: string[];
  /**
   * The main field is a module ID that is the primary entry point to your program. That is, if your package is named foo, and a user installs it, and then does require("foo"), then your main module's exports object will be returned. This is typically a module transpiled to CommonJS format.
   */
  main?: string;
  /**
   * The entrypoint for ES6/ES2015/etc. module formats
   */
  module?: string;
  /**
   * The entrypoint for browsers, typically in UMD module format.
   */
  browser?: string;
  /**
   * A lot of packages have one or more executable files that they'd like to install into the PATH. npm makes this pretty easy (in fact, it uses this feature to install the "npm" executable.)
   */
  bin?: any;
  man?: string | string[];
  directories?: {
    lib: string;
    bin: string;
    man: string;
    doc: string;
    example: string;
    test: string;
  };
  /** Specify the place where your code lives */
  repository?: string;
  /** The "scripts" property is a dictionary containing script commands that are run at various times in the lifecycle of your package. The key is the lifecycle event, and the value is the command to run at that point. */
  scripts?: IDictionary<string>;
  /** A "config" object can be used to set configuration parameters used in package scripts that persist across upgrades. */
  config?: {
    name: string;
    config: IDictionary<string>;
  };
  /**
   * This field lists some extra information related to the dependencies listed in the dependencies and devDependencies fields.
   * In the context of a workspaced project most of these settings will affect all workspaces and as such must be specified at
   * the root of the project (except if noted otherwise, the dependenciesMeta field will be ignored if found within a workspace).
   */
  dependenciesMeta?: {
    fsevents: {
      /**
       * If false, the package will never be built (deny-list). This behavior is reversed when the enableScripts yarnrc setting is toggled off
       * - when that happens, only packages with built explicitly set to true will be executed (allow-list), and those with built explicitly
       * set to false will simply see their build script warnings downgraded into simple notices.
       */
      built: boolean;
      /**
       * If true, the build isn't required to succeed for the install to be considered a success, and the dependency may be skipped if its os
       * and cpu fields don't match the current system architecture. It's what the optionalDependencies field compiles down to.
       */
      optional: boolean;
      /**
       * If true, the specified package will be automatically unplugged at install time. This should only be needed for packages that contain
       * scripts in other languages than Javascript (for example nan contains C++ headers).
       */
      unplugged: boolean;
    };
    [key: string]: unknown;
  };
  dependencies?: IDictionary<string>;
  /** If someone is planning on downloading and using your module in their program, then they probably don't want or need to download and build the external test or documentation framework that you use. */
  devDependencies?: IDictionary<string>;
  /** In some cases, you want to express the compatibility of your package with a host tool or library, while not necessarily doing a require of this host. This is usually referred to as a plugin. Notably, your module may be exposing a specific interface, expected and specified by the host documentation. */
  peerDependencies?: IDictionary<string>;
  /** This field lists some extra information related to the dependencies listed in the peerDependencies field. */
  peerDepedenciesMeta?: {
    "react-dom": {
      /** If true, the selected peer dependency will be marked as optional by the package manager and the consumer omitting it won't be reported as an error. */
      optional: boolean;
    };
    [key: string]: unknown;
  };
  /** This defines an array of package names that will be bundled when publishing the package. */
  bundledDependencies?: string[];
  /** If a dependency can be used, but you would like npm to proceed if it cannot be found or fails to install, then you may put it in the optionalDependencies object. This is a map of package name to version or url, just like the dependencies object. The difference is that build failures do not cause installation to fail. */
  optionalDependencies?: IDictionary<string>;
  /** You can specify the version of node that your stuff works on */
  engines?: IDictionary<string>;
  /** You can specify which operating systems your module will run on */
  os?: string[];
  cpu?: string[];
  /**
   * **eslint** lets you configure settings in the package.json
   */
  eslintConfig?: IDictionary;
}
