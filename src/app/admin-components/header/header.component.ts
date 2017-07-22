import { Component, OnInit } from '@angular/core';
import {LoginRegisterComponent} from '../../content/login-register/login-register.component';
import {Modal, overlayConfigFactory} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  UserText = 'Login/Register';
  loggedIn: boolean;

  constructor(public modal: Modal) { }

  ngOnInit() {
  }

  showLoginPopup() {
    if (this.loggedIn) {
      this.loggedIn = false;
      this.UserText = 'Login/Register';
    } else {
      return this.modal.open(LoginRegisterComponent, overlayConfigFactory({}, BSModalContext))
        .then((dialog: any) => dialog.result)
        .then((loggedIn: any) => {
          if (loggedIn) {
            this.loggedIn = true;
            this.UserText = 'Logout';
          }
        })
    }
  }

}
