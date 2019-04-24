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
export declare function createBindDeploymentConfig(config?: Partial<IServerlessBindDeploymentIdPlugin>): void;
