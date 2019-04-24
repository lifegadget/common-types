export interface IServerlessBindDeploymentIdPlugin {
  resources: {
    Resources: {
      PathMapping: {
        Type: string;
        DependsOn: string;
        Properties: {
          BasePath: string;
          /**
           * e.g., `${self:provider.stage}`
           */
          DomainName: string;
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
      ApiGatewayStage: IServerlessBindDeploymentStage;
      ApiGatewayStage2?: IServerlessBindDeploymentStage;
      ApiGatewayStage3?: IServerlessBindDeploymentStage;
      ApiGatewayStage4?: IServerlessBindDeploymentStage;
      ApiGatewayStage5?: IServerlessBindDeploymentStage;
    };
  };
}

export interface IServerlessBindDeploymentMethodSetting {
  DataTraceEnabled: boolean;
  HttpMethod: string;
  LoggingLevel: "INFO" | "DEBUG" | "WARN" | "ERROR";
  ResourcePath: string;
  MetricsEnabled: boolean;
}

export interface IServerlessBindDeploymentStage {
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
    MethodSettings?: IServerlessBindDeploymentMethodSetting[];
  };
}

export function createBindDeploymentConfig(
  config: Partial<IServerlessBindDeploymentIdPlugin> = {}
) {
  const defaultConfig: IServerlessBindDeploymentIdPlugin = {
    resources: {
      Resources: {
        PathMapping: {
          Type: "AWS::ApiGateway::BasePathMapping",
          DependsOn: "ApiGatewayStage",
          Properties: {
            BasePath: "basePath",
            DomainName: "${self:provider.domain}",
            RestApiId: {
              Ref: "ApiGatewayRestApi"
            },
            Stage: "${self:provider.stage}"
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
            StageName: "${self:provider.stage}",
            MethodSettings: [
              {
                DataTraceEnabled: true,
                HttpMethod: "*",
                LoggingLevel: "INFO",
                ResourcePath: "/*",
                MetricsEnabled: true
              }
            ]
          }
        }
      }
    }
  };
  return { ...defaultConfig, ...config };
}
