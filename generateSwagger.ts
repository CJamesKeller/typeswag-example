import * as routingControllers from 'routing-controllers';
import * as typeswag from 'typeswag';

export const generateSwagger = () => {
    typeswag.registerRouteDecorator(routingControllers.JsonController);

    typeswag.generateSwaggerSpec({
        outputDirectory: './dist/',
        entryFile: './index.ts',
        basePath: 'api/v1',
    });

    return;
}
