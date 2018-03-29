import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { DynamicComponentInterface, DynamicComponentItem } from './interfaces';

@Injectable()
export class DncService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(viewContainerRef: ViewContainerRef, dynamicItem: DynamicComponentItem) {}
}
