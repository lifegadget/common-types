// #autoindex:named

// #region autoindexed files

// index last changed at: 12th Dec, 2021, 05:33 PM ( GMT-8 )
// export: named; exclusions: index, private.
// files: async, basics, cookies, deprecated, geography, github-commit, github-event, github-release, github-webhooks, github, http, images, netlify, npm, nullable, package, photography, security, tsconfig, type-guards.
// directories: aliases, aws, serverless, serverless-plugins.

// local file exports
export * from "./async";
export * from "./basics";
export * from "./cookies";
export * from "./deprecated";
export * from "./geography";
export * from "./github-commit";
export * from "./github-event";
export * from "./github-release";
export * from "./github-webhooks";
export * from "./github";
export * from "./http";
export * from "./images";
export * from "./netlify";
export * from "./npm";
export * from "./nullable";
export * from "./package";
export * from "./photography";
export * from "./security";
export * from "./tsconfig";
export * from "./type-guards";

// directory exports
export * from "./aliases/index";
export * from "./aws/index";
export * from "./serverless/index";
export * from "./serverless-plugins/index";

// Note:
// -----
// This file was created by running: "dd devops autoindex"; it assumes you have
// the 'do-devops' pkg (that's "dd" on npm) installed as a dev dep.
//
// By default it assumes that exports are named exports but this can be changed by
// adding a modifier to the '// #autoindex' syntax:
//
//    - autoindex:named     same as default, exports "named symbols"
//    - autoindex:default   assumes each file is exporting a default export
//                          and converts the default export to the name of the
//                          file
//    - autoindex:offset    assumes files export "named symbols" but that each
//                          file's symbols should be offset by the file's name
//                          (useful for files which might symbols which collide
//                          or where the namespacing helps consumers)
//
// You may also exclude certain files or directories by adding it to the
// autoindex command. As an example:
//
//    - autoindex:named, exclude: foo,bar,baz
//
// Inversely, if you state a file to be an "orphan" then autoindex files
// below this file will not reference this autoindex file:
//
//    - autoindex:named, orphan
// 
// Also be aware that all of your content outside the "// #region" section in this file
// will be preserved in situations where you need to do something paricularly awesome.
// Keep on being awesome.

// #endregion
