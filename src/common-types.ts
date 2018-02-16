/**
 * A Javascript hash which allows for any set of keys
 */
export interface IDictionary<T = any> {
  [key: string]: T;
}
/**
 * A numeric Javascript array
 */
export interface INumericArray<T = any> {
  [key: number]: T;
}

/** A function for sorting JS arrays */
export type SortingFunction = (a: any, b: any) => number;

/** a string of the format: "YYYY-MM-DD" */
export type datestring = string;
/** a string of the format: "HH:mm:ss" */
export type timestring = string;
/** a string of the format: "UTC" */
export type timezone = string;
/** string representation of datetime in format of "2016-07-17T13:29:11.652Z" */
export type datetime = string;
/** unix epoch datetime format (aka, seconds since 1970) */
export type epoch = number;

/** foreign key reference */
export type fk = string;
/** primary key reference */
export type pk = string;
/** universal resource locator */
export type url = string;
/** universal resource indicator */
export type uri = string;

export const STAGE_MAP: IDictionary<string> = {
  prod: "prod",
  stage: "stage",
  test: "test",
  dev: "dev",
  production: "prod",
  staging: "stage",
  testing: "test",
  development: "dev"
};

export function STAGE(stage: string) {
  if (new Set(Object.keys(STAGE_MAP)).has(stage)) {
    return STAGE_MAP[stage];
  } else {
    console.warn(`An invalid stage was passed in: "${stage}"; will use "dev" as default`);
    return "dev";
  }
}

export type AWSGatewayCallback<T = IAWSGatewayResponse> = (
  error: any,
  response: T
) => void;

export interface IAWSGatewayResponse {
  statusCode: number;
  headers?: IDictionary<string>;

  body?: string;
  error?: string;
}

export interface IAWSGatewayRequest {
  callbackWaitsForEmptyEventLoop?: boolean;
  done?: () => void;
  succeed?: () => void;
  fail?: () => void;
  logGroupName?: string;
  logStreamName?: string;
  functionName?: string;
  memoryLimitInMB?: string;
  functionVersion?: string;
  getRemainingTimeInMillis?: string;
  invokeid?: string;
  awsRequestId?: string;
  invokedFunctionArn?: string;
  /* passed explicitly from parent Lambda to child */
  stage?: "dev" | "stage" | "prod";
  /* the parent Lambda's request Id */
  parentRequestId?: string;
}

// DECORATORS

/** A decorator signature for a class property */
export type PropertyDecorator = (target: any, key: string | symbol) => void;
/** A decorator signature for a class */
export type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
export interface ReflectionProperty<T> {
  get: () => T;
  set: (value?: any) => void;
  enumerable: boolean;
  configurable: boolean;
}

export interface IPackageJsonPerson {
  name: string;
  email?: string;
  url?: string;
}

export interface IPackageJson {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  homepage?: url;
  bugs?: {
    url: string;
    email: string;
  };
  /** the full list of SPDX license IDs (https://spdx.org/licenses/) */
  license?: string;
  author?: IPackageJsonPerson;
  contributors?: IPackageJsonPerson[];
  /**
   * The optional "files" field is an array of file patterns that describes the entries to be included when your package is installed as a dependency. If the files array is omitted, everything except automatically-excluded files will be included in your publish. If you name a folder in the array, then it will also include the files inside that folder (unless they would be ignored by another rule in this section.).
   */
  files?: string[];
  /**
   * The main field is a module ID that is the primary entry point to your program. That is, if your package is named foo, and a user installs it, and then does require("foo"), then your main module's exports object will be returned.
   */
  main?: string;
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
  dependencies?: IDictionary<string>;
  /** If someone is planning on downloading and using your module in their program, then they probably don't want or need to download and build the external test or documentation framework that you use. */
  devDependencies?: IDictionary<string>;
  /** In some cases, you want to express the compatibility of your package with a host tool or library, while not necessarily doing a require of this host. This is usually referred to as a plugin. Notably, your module may be exposing a specific interface, expected and specified by the host documentation. */
  peerDependencies?: IDictionary<string>;
  /** This defines an array of package names that will be bundled when publishing the package. */
  bundledDependencies?: string[];
  /** If a dependency can be used, but you would like npm to proceed if it cannot be found or fails to install, then you may put it in the optionalDependencies object. This is a map of package name to version or url, just like the dependencies object. The difference is that build failures do not cause installation to fail. */
  optionalDependencies?: IDictionary<string>;
  /** You can specify the version of node that your stuff works on */
  engines?: IDictionary<string>;
  /** You can specify which operating systems your module will run on */
  os?: string[];
  cpu?: string[];
}
