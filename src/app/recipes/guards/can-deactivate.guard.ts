import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
  canDecativate: () => Promise<boolean> | Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ): Promise<boolean> | Observable<boolean> | boolean {
    return component.canDecativate();
  }
}
