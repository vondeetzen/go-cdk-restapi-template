import * as cdk from '@aws-cdk/core';
import {ApiKey, EndpointType, LambdaIntegration, Period, RestApi} from "@aws-cdk/aws-apigateway";
import {Code, Function as LambdaFunction, Runtime} from "@aws-cdk/aws-lambda";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restApi = new RestApi(this, 'Sample-Go-Rest-API', {
      endpointConfiguration: {
        types: [EndpointType.REGIONAL]
      }
    });

    const apiKey = new ApiKey(this, 'devkey', {
      apiKeyName: 'samplegorestapikey',
      enabled: true,
    });

    restApi.addUsagePlan('devUsage', {
      name: 'Sample-Go-Rest-API-Plan',
      apiKey: apiKey,
      apiStages: [{api: restApi, stage: restApi.deploymentStage}],
      quota: {
        limit: 100,
        period: Period.DAY
      }
    });

    const firstResource = restApi.root.addResource('first');
    const firstFunction = new LambdaFunction(this, 'firstFunction', {
      runtime: Runtime.GO_1_X,
      code: Code.fromAsset('../../dist/first.zip'),
      handler: 'first',
      memorySize: 256,
    });
    const firstIntegration = new LambdaIntegration(firstFunction);
    firstResource.addMethod('GET', firstIntegration, {apiKeyRequired: true})
  }
}
