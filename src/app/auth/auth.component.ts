import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { AnchorDirective } from '../shared/anchor.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  error = '';
  isLogin = true;
  isLoading = false;
  loginForm: FormGroup;

  alertSubscription: Subscription;

  @ViewChild(AnchorDirective, { static: false }) alertHost: AnchorDirective;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this._startLoading();
    const authObs = this.isLogin
      ? this.authService.signIn(this.loginForm.value)
      : this.authService.signUp(this.loginForm.value);

    authObs.subscribe({
      next: _ => {
        this.router.navigate(['/recipes']);
        this._stopLoading();
      },
      error: err => {
        this._stopLoading();
        this._showError(err.message);
      },
    });
    this.loginForm.reset();
  }

  private _startLoading(_: void) {
    this.error = '';
    this.isLoading = true;
  }
  private _stopLoading(_: void) {
    this.isLoading = false;
  }

  private _showError(msg: string) {
    this.alertHost.viewContainerRef.clear();

    const { instance: alertInstance } =
      this.alertHost.viewContainerRef.createComponent(AlertComponent);

    alertInstance.msg = msg;

    this.alertSubscription = alertInstance.close.subscribe(() => {
      this.alertHost.viewContainerRef.clear();
      this.alertSubscription.unsubscribe();
    });
  }
}
