import 'reflect-metadata';
import * as express from 'express';
import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import { generateSwagger } from './generateSwagger';
import { Example } from './controllers/index';

const port = process.env.PORT || 3000;

const app: Express = express();
app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const serverConfig = {
  controllers: [Example]
};

useExpressServer(app, serverConfig);
generateSwagger();

app.use('/swagger', express.static('./dist/swagger.json'));

app.listen(port, () => console.info(`Listening on port ${port}`));

export { app };
