import * as path from 'path'
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'

type CORSConfig = {
  allowOrigins: string[]
  allowMethods: ('GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS')[]
}

export class CdkZodStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const withoutZodLambda = new lambdaNode.NodejsFunction(this, 'without-zod', {
      entry: 'lambda/without-zod/src/index.ts',
      handler: 'handler',
      memorySize: 512,
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {
        minify: true,
        sourceMap: true,
        tsconfig: path.resolve('lambda/without-zod/src/index.ts', '../../tsconfig.json'),
      },
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
    })

    const withZodLambda = new lambdaNode.NodejsFunction(this, 'with-zod', {
      entry: 'lambda/with-zod/src/index.ts',
      handler: 'handler',
      memorySize: 512,
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {
        minify: true,
        sourceMap: true,
        tsconfig: path.resolve('lambda/with-zod/src/index.ts', '../../tsconfig.json'),
      },
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        EXAMPLE: 'EXAMPLE',
        API_URL: 'https://trpc.io/docs/v9/aws-lambda',
      },
    })

    const withTRPCLambda = new lambdaNode.NodejsFunction(this, 'with-trpc', {
      entry: 'lambda/with-trpc/src/index.ts',
      handler: 'handler',
      memorySize: 512,
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {
        minify: true,
        sourceMap: true,
        tsconfig: path.resolve('lambda/with-trpc/src/index.ts', '../../tsconfig.json'),
      },
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
    })

    const cors = this.getCORS({
      allowMethods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'],
      allowOrigins: ['*'],
    })

    const api = new apigateway.RestApi(this, 'town-hall')
    const withoutZod = api.root.addResource('without-zod')
    withoutZod.addCorsPreflight(cors)
    withoutZod.addMethod('POST', new apigateway.LambdaIntegration(withoutZodLambda))
    const withZod = api.root.addResource('with-zod')
    withZod.addCorsPreflight(cors)
    withZod.addMethod('POST', new apigateway.LambdaIntegration(withZodLambda))
    api.root
      .addResource('with-trpc', {
        defaultIntegration: new apigateway.LambdaIntegration(withTRPCLambda),
      })
      .addProxy()
  }

  getCORS({ allowOrigins, allowMethods }: CORSConfig) {
    const cors: apigateway.CorsOptions = {
      allowMethods,
      allowOrigins,
      allowCredentials: true,
      allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
    }

    return cors
  }
}
