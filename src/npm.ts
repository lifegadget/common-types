import { url } from "./aliases";
import { IDictionary } from "./basics";
import { isNonNullObject } from "./type-guards";

export interface INpmInfoRepository {
  type: "git" | string;
  /** looks like "git+https://github.com/organization/repo.git" for github */
  url: string;
}

export interface INpmInfo {
  name: string;
  "dist-tags": INpmInfoDistTags;
  versions: string[];
  time: INpmInfoTime;
  maintainers: INpmInfoPerson[];
  description: string;
  homepage: string;
  keywords: string[];
  repository: string | INpmInfoRepository;
  author: string | INpmInfoPerson;
  license: "MIT" | string;
  readmeFilename: "README.md" | string;
  /** latest version published */
  version: string;
  /** code entry point for CJS */
  main?: string;
  /** code entry point for ES modules */
  module?: string;
  /** TS typings entry point */
  typings?: string;
  /** TS typings entry point */
  types?: string;

  type?: "module" | "commonjs";
  /**
   * binary executables this package exports; values are the
   * relative path to the file
   */
  bin: IDictionary<string>;
  /**
   * The scripts which are listed in the package.json
   */
  scripts: IDictionary<string>;
  dependencies: IDictionary<string>;
  devDependencies: IDictionary<string>;
  /** the `git` HEAD at time of last publish */
  gitHead: string;
  dist: INpmInfoDist;
  directories: IDictionary;
}

export interface INpmInfoDistTags extends IDictionary<string> {
  latest: string;
}

/** type guard to distinguish an NPM repository representation */
export function isNpmInfoRepository(
  repository: string | INpmInfoRepository
): repository is INpmInfoRepository {
  return isNonNullObject(repository) && (repository as IDictionary).url;
}

/**
 * named times and a time for each version `0.1.2`, etc
 */
export interface INpmInfoTime extends IDictionary<string> {
  created: string;
  modified: string;
}

export interface INpmInfoPerson {
  name: string;
  email?: string;
}

export interface INpmInfoDist {
  integrity: string;
  shasum: string;
  tarball: url;
  fileCount: number;
  unpackedSize: number;
  "npm-signature": string;
}
