import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUnauthorized = true;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isUnauthorized = !user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onFetchRecipe() {
    this.dataStorageService.fetchRecipe().subscribe();
  }
  onSaveRecipe() {
    this.dataStorageService.saveRecipe().subscribe();
  }
}
