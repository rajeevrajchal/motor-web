import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
})
export class LoadingViewComponent {
  @Input() loading: boolean = false;

  constructor() {
    console.log('loading', this.loading);
  }
}
