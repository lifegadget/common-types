// #autoindex

// #region autoindexed files

// index last changed at: 12th Dec, 2021, 11:54 AM ( GMT-8 )
// export: named; exclusions: index, private.
// files: aws-arn, aws-events, aws-layers, aws-regions, aws-resource-api-gateway, aws-resource-cloudwatch, aws-resource-cognito, aws-resource-dynamodb, aws-resource-eventbridge, aws-resource-iam, aws-resource-s3, aws-resource-types, aws-resource, aws-stage, aws-type-guards, aws.

// local file exports
export * from "./aws-arn";
export * from "./aws-events";
export * from "./aws-layers";
export * from "./aws-regions";
export * from "./aws-resource-api-gateway";
export * from "./aws-resource-cloudwatch";
export * from "./aws-resource-cognito";
export * from "./aws-resource-dynamodb";
export * from "./aws-resource-eventbridge";
export * from "./aws-resource-iam";
export * from "./aws-resource-s3";
export * from "./aws-resource-types";
export * from "./aws-resource";
export * from "./aws-stage";
export * from "./aws-type-guards";
export * from "./aws";

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
