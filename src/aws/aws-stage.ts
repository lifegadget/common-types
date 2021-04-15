import { DevelopmentStage } from "../aliases";

/**
 * A AWS _stage_ is identified typically by a development stage
 * (e.g., "dev", "prod", etc.) but alternatively you can use a
 * _developer sandbox_ as the stage name where the convention is
 * that the name is a "sb-[name]".
 */
export type AwsStage = DevelopmentStage | `sb-${string}`;
