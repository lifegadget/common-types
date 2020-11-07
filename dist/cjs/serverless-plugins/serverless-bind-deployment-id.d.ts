import { IServerlessStage } from "../serverless";
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
/**
 * @deprecated createBindDeploymentConfig() is deprecated; the `common-types` library
 * aims almost exclusively to provide _types_ and this does not fit this
 * ambition.
 */
export declare function createBindDeploymentConfig(config: IServerlessApiGatewayLoggingConfig, methodSettings?: IApiGatewayMethodSetting[]): {
    /** the service name */
    service: string;
    stage: IServerlessStage;
    /** custom domain name */
    domainName?: string | undefined;
    resources: {
        Resources: {
            PathMapping: {
                Type: string;
                DependsOn: string;
                Properties: {
                    BasePath?: string | undefined;
                    /**
                     * e.g., `${self:provider.stage}`
                     */
                    DomainName?: string | undefined;
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
            ApiGatewayStage2?: IApiGatewayStage | undefined;
            ApiGatewayStage3?: IApiGatewayStage | undefined;
            ApiGatewayStage4?: IApiGatewayStage | undefined;
            ApiGatewayStage5?: IApiGatewayStage | undefined;
        };
    };
};
