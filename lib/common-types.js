"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAGE_MAP = {
    prod: "prod",
    stage: "stage",
    test: "test",
    dev: "dev",
    production: "prod",
    staging: "stage",
    testing: "test",
    development: "dev"
};
function STAGE(stage) {
    if (new Set(Object.keys(exports.STAGE_MAP)).has(stage)) {
        return exports.STAGE_MAP[stage];
    }
    else {
        console.warn(`An invalid stage was passed in: "${stage}"; will use "dev" as default`);
        return "dev";
    }
}
exports.STAGE = STAGE;
//# sourceMappingURL=common-types.js.map