import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { ModuleRestApi } from '../../presentation/rest-api/ModuleRestApi';
import bodyParser from 'body-parser';
import cors from 'cors';
import { googleAuth } from '../../GoogleAuthentication';

export type AuthorizedUser = {
  userId: string;
};

export function restApiExpressServer(modules: ModuleRestApi[] = []): Express {
  const swaggerDocument = YAML.load('./src/rest-api-docs.yaml');
  const server = express();
  server.use(bodyParser.json());
  server.use(cors());
  //googleAuthorizationFor(server);

  modules.forEach((restApiModule) => {
    server.use('/rest-api' + restApiModule.path, restApiModule.router);
  });

  server.use(process.env.API_DOCS_ENDPOINT_URL || '/rest-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  process.on('uncaughtException', function (err) {
    console.error('[RestApi] Global exception handler (uncaughtException):', err.message);
  });

  process.on('unhandledRejection', function (reason: any, promise: Promise<any>) {
    console.error('[RestApi] Global exception handler (unhandledRejection):', reason.message || reason);
  });

  return server;
}

// function googleAuthorizationFor(server: Express) {
//   if (process.env.GOOGLE_CLIENT_ID !== undefined) {
//     server.use(async (request, response, next) => {
//       const googleTokenId: string | undefined = request.headers.authorization;
//       const googleAuthorizedUser = await googleAuth(googleTokenId);
//       request.authenticatedUser = googleAuthorizedUser;
//       next();
//     });
//   }
// }
