import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface CanComponentDeactivate {
  canDecativate: () => Promise<boolean> | Observable<boolean> | boolean;
}

@Injectable({ providedIn: 'any' })
export class CanDeactivateGuard {
  canDeactivate(
    component: CanComponentDeactivate,
  ): Promise<boolean> | Observable<boolean> | boolean {
    return component.canDecativate();
  }
}
