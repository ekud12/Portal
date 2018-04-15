import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, forwardRef, Inject } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { BackendService } from './backend.service';
import { PropertyModel } from 'app/shared/global-models/propModel';
import { httpRoutes } from '@http-routes';

const propertiesId = 'properties';
const labelsId = 'labels';

@Injectable()
export class ConfigService {
  // no need for an interface, since the properties file's structure is dynamic
  properties: object = undefined;

  // same goes for the labels
  labels: object = undefined;

  propertiesSubject: BehaviorSubject<object> = new BehaviorSubject(null);

  constructor(private backendService: BackendService, private translate: TranslateService) {}

  load() {
    return new Promise((resolve, reject) => {
      // this.log.info('loading config from server..');

      const propertiesResource$ = this.backendService
        .get(httpRoutes.CONFIG_API)
        .take(1)
        .subscribe(data => {
          this.buildObject(data);
          resolve();
        });

      // const labelsResource$ = this.backendService
      //   .get(httpRoutes.CONFIG_API, { params: { propertiesType: 'labels' } })
      //   .map(data => this.buildObject(data));

      // propertiesResource$.subscribe(
      //   props => {
      //     this.properties = props;
      //     this.saveResourceToCache(propertiesId, props);
      //   }
      //   // errors => {
      //   //   this.log.error('error loading the properties from the server => ' + errors, 'configService');
      //   // }
      // );

      // labelsResource$.subscribe(
      //   labels => {
      //     this.labels = labels;
      //     this.propertiesSubject.next(labels);
      //     this.saveResourceToCache(labelsId, labels);
      //     this.configureTranslator(labels);
      //     resolve();
      //   }
      //   // errors => {
      //   //   this.log.error('error loading the labels from the server => ' + errors, 'configService');
      //   // }
      // );
    });
  }

  get(key: string): string {
    // try to find the key in the properties
    return (
      this.findValueInObject(key, this.properties) ||
      // try to find the key in the environment
      this.findValueInObject(key, environment)
    );
  }

  getLabel(key: string): string {
    return this.findValueInObject(key, this.labels);
  }

  private loadResourceFromCache(key: string): any {
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) : value;
  }

  private saveResourceToCache(key: string, data: any) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  private configureTranslator(dictionary: any): any {
    this.translate.setTranslation('he', this.labels);
    this.translate.use('he');
  }

  private findValueInObject(key: string, object: any): string {
    return key
      .replace(/\[/g, '.')
      .replace(/\]/g, '')
      .split('.')
      .reduce((o, k) => (o || {})[k], object);
  }

  getAllLabels(): Observable<object> {
    return this.propertiesSubject.asObservable();
  }

  private buildObject(data): any {
    const object: any = {};

    for (const i of data) {
      if (!object[i.category]) {
        object[i.category] = {};
      }

      if (i.subcategory) {
        if (!object[i.category][i.subcategory]) {
          object[i.category][i.subcategory] = {};
        }

        object[i.category][i.subcategory][i.key] = i.value;
      } else {
        object[i.category][i.key] = i.value;
      }
    }

    return object;
  }
}
