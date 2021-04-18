import { DevelopmentStage } from "../aliases";

/**
 * An AWS _stage_ is identified typically by a development stage
 * (e.g., "dev", "prod", etc.) but we offer two exceptions
 * for valid typing:
 *
 * 1. **Developer Sandboxes** - if you prefix with `sb-[developer]` it
 * will allow a developer to push their changes to AWS as a "stage name".
 * 2. **Feature Branches** - if you want to push feature branch to AWS
 * you will be allowed to create a stage name called `feature_[branch]`
 * _developer sandbox_ as the stage name where the convention is
 * that the name is a "sb_[name]".
 *
 * Note: development stages are defined as `dev`, `prod`, `test`, and `stage`.
 * We recommend sticking to this but if you wish you use a different set we
 * provide a generic you can add your own type alias to replace this.
 */
export type AwsStage<T = DevelopmentStage> = T | `sb_${string}` | `feature_${string}`;
