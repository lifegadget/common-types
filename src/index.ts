// #autoindex:named

// #region autoindexed files

// index last changed at: 12th Dec, 2020, 08:38 AM ( GMT-8 )
// export: named; exclusions: index, private.
// files: LambdaEventParser, async, aws-layers, aws, basics, geography, github-commit, github-event, github-release, github-webhooks, github, http, netlify, npm, nullable, package, serverless-constants, serverless-http, serverless.
// directories: aliases, serverless-plugins.

// local file exports
export * from "./LambdaEventParser";
export * from "./async";
export * from "./aws-layers";
export * from "./aws";
export * from "./basics";
export * from "./geography";
export * from "./github-commit";
export * from "./github-event";
export * from "./github-release";
export * from "./github-webhooks";
export * from "./github";
export * from "./http";
export * from "./netlify";
export * from "./npm";
export * from "./nullable";
export * from "./package";
export * from "./serverless-constants";
export * from "./serverless-http";
export * from "./serverless";

// directory exports
export * from "./aliases/index";
export * from "./serverless-plugins/index";

// Note:
// -----
// This file was created by running: "do devops autoindex"; it assumes you have
// the 'do-devops' pkg installed as a dev dep.
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
// Also be aware that all of your content outside the defined region in this file
// will be preserved in situations where you need to do something paricularly awesome.
// Keep on being awesome.

// #endregion
