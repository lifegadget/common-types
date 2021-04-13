/**
 * Provides a string lookup of a AWS region's
 * geographic name based on it's more technical AWS region
 * name.
 *
 * For instance, `us-east-1` looks up to "N. Virginia", etc.
 */
export enum AwsRegionName {
  // US
  "us-east-1" = "N. Virginia",
  "us-east-2" = "Ohio",
  "us-west-1" = "N. California",
  "us-west-2" = "Oregon",
  // Africa
  "af-south-1" = "Cape Town",
  // AP
  "ap-east-1" = "Hong Kong",
  "ap-south-1" = "Mumbai",
  "ap-northeast-1" = "Tokyo",
  "ap-northeast-2" = "Seoul",
  "ap-northeast-3" = "Osaka",
  "ap-southeast-1" = "Singapore",
  "ap-southeast-2" = "Sydney",
  // Canada
  "ca-central-1" = "Canada (central)",
  // EU
  "eu-central-1" = "Frankfurt",
  "eu-west-1" = "Ireland",
  "eu-west-2" = "London",
  "eu-west-3" = "Paris",
  "eu-north-1" = "Stockholm",
  "eu-south-1" = "Milan",
  // Middle East
  "me-south-1" = "Bahrain",
  // South America
  "sa-east-1" = "Sāo Paulo",
}

/**
 * Strong typing of all valid AWS regions.
 *
 * > Note: if you need a more generalized form you can try `AwsRegionPattern`
 */
export type AwsRegion = keyof typeof AwsRegionName;

type Region = "us" | "us" | "ca" | "af" | "ap" | "eu" | "me" | "sa";
type SubRegion =
  | "east"
  | "west"
  | "south"
  | "north"
  | "southeast"
  | "northeast"
  | "central";

/**
 * Reasonable typing of AWS regions based on known patterns.
 *
 * > Note: for explicit regions available use `AwsRegion` instead
 */
export type AwsRegionPattern = `${Region}-${SubRegion}-${"1" | "2" | "3"}`;
