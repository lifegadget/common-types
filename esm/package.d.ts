import { IDictionary, url } from "./basics";
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
    typings: string;
    license?: string;
    author?: IPackageJsonPerson;
    contributors?: IPackageJsonPerson[];
    files?: string[];
    main?: string;
    module?: string;
    browser?: string;
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
    repository?: string;
    scripts?: IDictionary<string>;
    config?: {
        name: string;
        config: IDictionary<string>;
    };
    dependencies?: IDictionary<string>;
    devDependencies?: IDictionary<string>;
    peerDependencies?: IDictionary<string>;
    bundledDependencies?: string[];
    optionalDependencies?: IDictionary<string>;
    engines?: IDictionary<string>;
    os?: string[];
    cpu?: string[];
}
