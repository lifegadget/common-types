// #autoindex

// #region autoindexed files

// index last changed at: 6th Jun, 2021, 10:32 AM ( GMT-7 )
// export: named; exclusions: index, private.
// files: color, datetime, fileTypeContent, network, numeric, other, stringAliases, uuid.

// local file exports
export * from "./color";
export * from "./datetime";
export * from "./fileTypeContent";
export * from "./network";
export * from "./numeric";
export * from "./other";
export * from "./stringAliases";
export * from "./uuid";

// Note:
// -----
// This file was created by running: "dd devops autoindex"; it assumes you have
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
