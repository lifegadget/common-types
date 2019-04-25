import { IServerlessStage } from "./serverless";

export interface IServerlessBindDeploymentIdPlugin {
  resources: {
    Resources: {
      PathMapping: {
        Type: string;
        DependsOn: string;
        Properties: {
          BasePath?: string;
          /**
           * e.g., `${self:provider.stage}`
           */
          DomainName?: string;
          RestApiId: {
            /** default: `ApiGatewayRestApi` */
            Ref: string;
          };
          /** default: `${self:provider.stage}` */
          Stage: string;
        };
      };
      __deployment__: {
        Properties: {
          Description: string;
        };
      };
      ApiGatewayStage: IApiGatewayStage;
      ApiGatewayStage2?: IApiGatewayStage;
      ApiGatewayStage3?: IApiGatewayStage;
      ApiGatewayStage4?: IApiGatewayStage;
      ApiGatewayStage5?: IApiGatewayStage;
    };
  };
}

export interface IApiGatewayMethodSetting {
  DataTraceEnabled: boolean;
  HttpMethod?: string;
  LoggingLevel: "INFO" | "DEBUG" | "WARN" | "ERROR" | "OFF";
  ResourcePath?: string;
  MetricsEnabled?: boolean;
}

/**
 * **IApiGatewayStage**
 *
 * The AWS::ApiGateway::Stage resource creates a stage for
 * an Amazon API Gateway (API Gateway) deployment.
 */
export interface IApiGatewayStage {
  /** example: `AWS::ApiGateway::Stage` */
  Type: string;
  Properties: {
    DeploymentId: {
      /** default: `__deployment__` */
      Ref: string;
    };
    RestApiId: {
      /** default: `ApiGatewayRestApi` */
      Ref: string;
    };
    /** default: `${self:provider.stage}` */
    StageName: string;
    MethodSettings?: IApiGatewayMethodSetting[];
  };
}

export interface IServerlessApiGatewayLoggingConfig {
  /** the service name */
  service: string;
  stage: IServerlessStage;
  /** custom domain name */
  domainName?: string;
}

export function createBindDeploymentConfig(
  config: IServerlessApiGatewayLoggingConfig,
  methodSettings?: IApiGatewayMethodSetting[]
) {
  const defaultMethodSettings: IApiGatewayMethodSetting[] = [
    {
      DataTraceEnabled: true,
      HttpMethod: "*",
      LoggingLevel: "INFO",
      ResourcePath: "/*",
      MetricsEnabled: true
    }
  ];
  const stageName = `${config.service}-${config.stage}`;
  const defaultConfig: IServerlessBindDeploymentIdPlugin = {
    resources: {
      Resources: {
        PathMapping: {
          Type: "AWS::ApiGateway::BasePathMapping",
          DependsOn: "ApiGatewayStage",
          Properties: {
            DomainName: config.domainName ? config.domainName : undefined,
            RestApiId: {
              Ref: "ApiGatewayRestApi"
            },
            Stage: stageName
          }
        },
        __deployment__: {
          Properties: {
            Description: "(default deployment description)"
          }
        },
        ApiGatewayStage: {
          Type: "AWS::ApiGateway::Stage",
          Properties: {
            DeploymentId: {
              Ref: "__deployment__"
            },
            RestApiId: {
              Ref: "ApiGatewayRestApi"
            },
            StageName: stageName,
            MethodSettings: methodSettings || defaultMethodSettings
          }
        }
      }
    }
  };
  return { ...defaultConfig, ...config };
}
