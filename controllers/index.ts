import { EventEmitter } from 'events';
import { JsonController, Get, InternalServerError } from 'routing-controllers';

const myEmitter = new EventEmitter();

@JsonController('/api/v1')
export class Example {
  @Get('/example')
  async example(): Promise<void | {}> {
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

