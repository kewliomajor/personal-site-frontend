import {Component, Injector, OnInit} from '@angular/core';
import {LoginRegisterComponent} from '../../content/login-register/login-register.component';
import {Modal, overlayConfigFactory} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  providers: [AuthenticationService],
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  UserText: string;
  loggedIn: boolean;

  constructor(private authenticationService: AuthenticationService, private injector: Injector, public modal: Modal) {
    this.loggedIn = false;
    this.UserText = 'Login/Register';
    if (authenticationService.userIsLoggedIn()) {
      this.loggedIn = true;
      this.UserText = 'Logout';
    }
  }

  ngOnInit() {
  }

  showLoginPopup() {
    if (this.loggedIn) {
      this.loggedIn = false;
      localStorage.clear();
      this.UserText = 'Login/Register';
      const router = this.injector.get(Router);
      router.navigate(['/home']);
    } else {
      return this.modal.open(LoginRegisterComponent, overlayConfigFactory({}, BSModalContext))
        .then((dialog: any) => dialog.result)
        .then((loggedIn: any) => {
          if (loggedIn) {
            this.loggedIn = true;
            this.UserText = 'Logout';
            location.reload();
          }
        })
    }
  }

}
