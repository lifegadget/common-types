export interface IServerlessPackage {
  browser?: boolean;
  /** Specify the directories and files which should be included in the deployment package */
  include?: string[];
  /** Specify the directories and files which should be excluded in the deployment package */
  exclude?: string[];
  /**
   * Config if Serverless should automatically exclude dev dependencies in the deployment package.
   * Defaults to true
   */
  excludeDevDependencies?: boolean;
  /**
   * If you want to bundle the files yourself -- in the form of a ZIP file -- you can do so and then point
   * this configuration option to the file
   */
  artifact?: string | string[];
  /**
   * Enables individual packaging for each function. If true you must provide package for each
   * function. Defaults to _false_.
   */
  individually?: boolean;
}
