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
export declare type SortingFunction = (a: any, b: any) => number;
/** a string of the format: "YYYY-MM-DD" */
export declare type datestring = string;
/** a string of the format: "HH:mm:ss" */
export declare type timestring = string;
/** a string of the format: "UTC" */
export declare type timezone = string;
/** string representation of datetime in format of "2016-07-17T13:29:11.652Z" */
export declare type datetime = string;
/** unix epoch datetime format (aka, seconds since 1970) */
export declare type epoch = number;
/** foreign key reference */
export declare type fk = string;
/** primary key reference */
export declare type pk = string;
/** universal resource locator */
export declare type url = string;
/** universal resource indicator */
export declare type uri = string;
export declare const STAGE_MAP: IDictionary<string>;
export declare function STAGE(stage: string): string;
export declare type AWSGatewayCallback<T = IAWSGatewayResponse> = (error: any, response: T) => void;
export declare type AWSLambaCallback<T = IDictionary> = (error: any, response: T) => void;
export interface IAWSGatewayResponse {
    statusCode: number;
    headers?: IDictionary<string>;
    body?: string;
    error?: string;
}
export interface IAWSLambaContext {
    /** The default value is true. This property is useful only to modify the default behavior of the callback. By default, the callback will wait until the Node.js runtime event loop is empty before freezing the process and returning the results to the caller. You can set this property to false to request AWS Lambda to freeze the process soon after the callback is called, even if there are events in the event loop. AWS Lambda will freeze the process, any state data and the events in the Node.js event loop (any remaining events in the event loop processed when the Lambda function is called next and if AWS Lambda chooses to use the frozen process). For more information about callback, see Using the Callback Parameter. */
    callbackWaitsForEmptyEventLoop?: boolean;
    /** Name of the Lambda function that is executing. */
    functionName: string;
    /** The Lambda function version that is executing. If an alias is used to invoke the function, then function_version will be the version the alias points to. */
    functionVersion: string;
    /** The ARN used to invoke this function. It can be a function ARN or an alias ARN. An unqualified ARN executes the $LATEST version and aliases execute the function version it is pointing to. */
    invokedFunctionArn: string;
    /** Memory limit, in MB, you configured for the Lambda function. You set the memory limit at the time you create a Lambda function and you can change it later. */
    memoryLimitInMB: string;
    /** AWS request ID associated with the request. This is the ID returned to the client that called the invoke method. Note: if AWS Lambda retries the invocation (for example, in a situation where the Lambda function that is processing Kinesis records throws an exception), the request ID remains the same.*/
    awsRequestId: string;
    /** The name of the CloudWatch log group where you can find logs written by your Lambda function */
    logGroupName: string;
    /** The name of the CloudWatch log group where you can find logs written by your Lambda function. The log stream may or may not change for each invocation of the Lambda function.  The value is null if your Lambda function is unable to create a log stream, which can happen if the execution role that grants necessary permissions to the Lambda function does not include permissions for the CloudWatch actions. */
    logStreamName: string;
    /** Information about the Amazon Cognito identity provider when invoked through the AWS Mobile SDK. It can be null. */
    identity?: string;
    /** Information about the client application and device when invoked through the AWS Mobile SDK */
    clientContext?: {
        client: {
            installation_id: string;
            app_title: string;
            app_version_name: string;
            app_version_code: string;
            app_package_name: string;
        };
        Custom: IDictionary;
        env: {
            platform: string;
            platform_version: string;
            make: string;
            model: string;
            locale: string;
        };
    };
}
export interface IAWSGatewayRequest {
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
    stage?: "dev" | "stage" | "prod";
    parentRequestId?: string;
}
/** A decorator signature for a class property */
export declare type PropertyDecorator = (target: any, key: string | symbol) => void;
/** A decorator signature for a class */
export declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
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
