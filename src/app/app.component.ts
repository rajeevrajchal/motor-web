import { Component, OnInit } from '@angular/core';
import { AuthService } from './moudle/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'motor-web';
  constructor(private readonly auth: AuthService) {}

  ngOnInit() {
    this.auth.authChanges((_, session) =>
      this.auth.updateSession(session as any)
    );
  }
}
