import { IDictionary, url } from "./basics";
export interface INpmInfo {
    name: string;
    "dist-tags": INpmInfoDistTags;
    versions: string[];
    time: INpmInfoTime;
    maintainers: INpmInfoPerson[];
    description: string;
    homepage: string;
    keywords: string[];
    respository: string | INpmInfoRepository;
    author: string | INpmInfoPerson;
    license: "MIT" | string;
    readmeFilename: "README.md" | string;
    /** latest version published */
    version: string;
    /** code entry point for CJS */
    main: string;
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
/**
 * named times and a time for each version `0.1.2`, etc
 */
export interface INpmInfoTime extends IDictionary<string> {
    created: string;
    modified: string;
}
export interface INpmInfoRepository {
    type: "git" | string;
    /** looks like "git+https://github.com/organization/repo.git" for github */
    url: string;
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
