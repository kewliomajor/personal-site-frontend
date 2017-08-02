import {Component, Injector, OnInit} from '@angular/core';
import {LoginRegisterComponent} from '../../content/login-register/login-register.component';
import {Modal, overlayConfigFactory} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {JwtUser} from "../../model/jwt_user";
import {ProfileComponent} from "../../content/profile/profile.component";
import {User} from "../../model/user";

@Component({
  providers: [AuthenticationService],
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  UserText: string;
  loggedIn: boolean;
  Name: string;
  JoinDate: string;

  constructor(private authenticationService: AuthenticationService, private injector: Injector, public modal: Modal) {
    this.loggedIn = false;
    this.UserText = 'Login/Register';
    this.Name = localStorage.getItem('name');
    this.JoinDate = localStorage.getItem('created_at');
    if (authenticationService.userIsLoggedIn()) {
      this.loggedIn = true;
      this.UserText = localStorage.getItem('name');
    }
  }

  ngOnInit() {
  }

  showLoginPopup() {
    if (!this.loggedIn) {
      return this.modal.open(LoginRegisterComponent, overlayConfigFactory({}, BSModalContext))
        .then((dialog: any) => dialog.result)
        .then((jwtUser: JwtUser) => {
          if (jwtUser !== null) {
            this.loggedIn = true;
            localStorage.setItem('name', jwtUser.first_name + ' ' + jwtUser.last_name);
            localStorage.setItem('created_at', jwtUser.created_at);
            this.UserText = localStorage.getItem('name');
            location.reload();
          }
        })
    }
  }

  showProfilePopup() {
    return this.modal.open(ProfileComponent, overlayConfigFactory({}, BSModalContext))
      .then((dialog: any) => dialog.result)
      .then((user: User) => {
        if (user !== null) {
          localStorage.setItem('name', user.first_name + ' ' + user.last_name);
          this.UserText = localStorage.getItem('name');
          this.Name = localStorage.getItem('name');
        }
      })
  }

  handleLogout() {
     this.loggedIn = false;
     this.authenticationService.clearCookies();
     this.UserText = 'Login/Register';
     localStorage.clear();
     const router = this.injector.get(Router);
     router.navigate(['/home']);
  }

}
