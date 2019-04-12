import * as cors from 'cors';
import { Route } from 'typeswag';
import { EventEmitter } from 'events';
import { JsonController, Get, UseBefore, InternalServerError } from 'routing-controllers';

const myEmitter = new EventEmitter();

const corsOpts = { optionsSuccessStatus: 200 }; // for IE11

const example = 'example';

@Route('Example')
@JsonController('/api/v1')
@UseBefore(cors(corsOpts))
export class Example {
    @Get(`/${example}`)
    [example] = async (): Promise<void | {}> => {
        try {
            await setTimeout(() => this.handleData('Here is the data'), 100);
            return await new Promise(resolve => myEmitter.on('gotData', (data) => resolve(data)));
        } catch (err) {
            throw new InternalServerError('Oh no!');
        }
    }

    handleData = (data: string): void => {
        if (data) {
            myEmitter.emit('gotData', data);
            return;
        }
    }
}

