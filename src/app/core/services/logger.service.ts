import { environment } from '@environment';
import { Injectable } from '@angular/core';

class Log {
  info: LogItem[];
  error: LogItem[];

  constructor() {
    this.info = [];
    this.error = [];
  }
}

class LogItem {
  constructor(private date: string, private source: string, private message: string) {}
}

@Injectable()
export class LoggerService {
  private isActivated: boolean;

  private log: Log;

  constructor() {
    this.log = new Log();
  }

  print(category) {
    console.log(this.log[category]);
  }

  info(message: string, sources: string | string[] = ['UNKNOWN']) {
    const source = this.concatSources(sources);
    if (!environment.production || this.isActivated) {
      if (source.includes('UNKNOWN')) {
        console.log(`{Source: ${source} | Message: ${message}}`);
      } else {
        console.log(`{Source: ${source} | Message: ${message}}`);
      }
    }

    this.log.info.push(new LogItem(new Date().toLocaleString(), source, message));

    this.flush();
  }

  error(message: string, sources: string | string[] = ['UNKNOWN']) {
    const source = this.concatSources(sources);
    if (!environment.production || this.isActivated) {
      if (source.includes('UNKNOWN')) {
        console.log(`{Source: ${source} | Message: ${message}}`);
      } else {
        console.log(`${message}`);
      }
    }

    this.log.error.push(new LogItem(new Date().toLocaleString(), source, message));

    this.flush();
  }

  private concatSources(sources: string | string[]) {
    if (typeof sources === 'string') {
      sources = [sources];
    }
    return sources.join(`\:\:`);
  }

  flush() {
    localStorage.setItem('log', JSON.stringify(this.log));
  }

  clear() {
    localStorage.removeItem('log');
  }

  setEnabled(isEnabled: boolean) {
    this.isActivated = isEnabled;
    // console.log(`log is ${isEnabled}`);

    if (this.isActivated) {
      this.flush();
    }

    if (!this.isActivated) {
      this.clear();
    }
  }
}
