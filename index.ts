import 'module-alias/register';
import 'reflect-metadata';
import './controllers/example/index.ts';
import * as express from 'express';
import * as helmet from 'helmet';
import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import { generateSwagger } from './generateSwagger';
import { CustomErrorHandler } from './ErrorHandler';
import { Example } from '@controllers/index';

const port = process.env.PORT || 3000;

const app: Express = express();
app.set('port', port);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const serverConfig = {
  controllers: [Example],
  defaultErrorHandler: false,
  middlewares: [CustomErrorHandler]
}

useExpressServer(app, serverConfig);
generateSwagger();

app.listen(port, () => console.info(`Listening on port ${port}`));

export { app };
