import { IServerlessEventHttp } from "./index";

export interface IServerlessEventHttpWithDocumentation extends IServerlessEventHttp {
  documentation?: IServerlessOpenApiDocumentation;
}

export interface IServerlessOpenApiDocumentationSchema {
  type: string;
  pattern?: string;
  enum?: "standard" | "premium";
}

export interface IServerlessOpenApiDocumentationParams {
  name: string;
  description: string;
  required?: boolean;
  schema: IServerlessOpenApiDocumentationSchema;
}

export interface IServerlessOpenApiDocumentationMethodResponses {
  statusCode: number;
  responseBody?: {
    description: string;
  };
  responseModels?: {
    "application/json": string;
  };
}

export interface IServerlessOpenApiDocumentation {
  summary: string;
  description: string;
  requestBody?: {
    description: string;
    schema?: IServerlessOpenApiDocumentationSchema;
  };
  requestModels?: {
    "application/json": string;
  };
  pathParams?: IServerlessOpenApiDocumentationParams;
  queryParams?: IServerlessOpenApiDocumentationParams;
  cookieParams?: IServerlessOpenApiDocumentationParams;
  methodResponses?: IServerlessOpenApiDocumentationMethodResponses[];
}

export interface IServerlessOpenApiDocumentationModelSchema {
  $schema: string;
  properties: {};
}

export interface IServerlessOpenApiDocumentationModel {
  name: string;
  description: string;
  contentType: "application/json" | "application/xml" | string;
  schema: IServerlessOpenApiDocumentationModelSchema | string;
}

export interface IServerlessOpenApiDocumentationConfiguration {
  version?: string;
  title: string;
  description: string;
  models: IServerlessOpenApiDocumentationModel[];
}
