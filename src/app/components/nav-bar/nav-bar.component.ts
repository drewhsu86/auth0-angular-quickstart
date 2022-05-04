import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { filter, mergeMap } from "rxjs/operators";
import { GenericError } from '@auth0/auth0-spa-js';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    // this.auth.getAccessTokenSilently();
    this.auth.error$.pipe(
      filter((e) => e instanceof GenericError && e.error === 'login_required'),
      mergeMap(() => this.auth.loginWithRedirect())
    ).subscribe();
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
