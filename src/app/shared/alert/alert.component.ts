import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

enum AlertType {
  info = 'info',
  dark = 'dark',
  light = 'lignt',
  danger = 'danger',
  success = 'success',
  primary = 'primary',
  warning = 'warning',
  secondary = 'secondary',
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() msg: string;
  @Input() type: AlertType;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
  onClose() {
    this.close.emit();
  }
}
