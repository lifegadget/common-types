"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBindDeploymentConfig = void 0;
function createBindDeploymentConfig(config, methodSettings) {
    const defaultMethodSettings = [
        {
            DataTraceEnabled: true,
            HttpMethod: "*",
            LoggingLevel: "INFO",
            ResourcePath: "/*",
            MetricsEnabled: true
        }
    ];
    const stageName = `${config.service}-${config.stage}`;
    const defaultConfig = {
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
exports.createBindDeploymentConfig = createBindDeploymentConfig;
