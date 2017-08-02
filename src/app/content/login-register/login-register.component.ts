import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidation} from '../../service/validation/custom-validation';
import {AuthenticationService} from '../../service/authentication.service';

export class CustomModalContext extends BSModalContext {

}

@Component({
  providers: [AuthenticationService],
  selector: 'app-login-register',
  templateUrl: './login-register.component.html'
})
export class LoginRegisterComponent implements CloseGuard, ModalComponent<CustomModalContext>, OnInit {
  busy: Subscription;
  context: CustomModalContext;
  loginForm: FormGroup;
  newRegistration = false;
  resetFields = ['password_verify', 'first_name', 'last_name'];

  constructor(private authService: AuthenticationService, private fb: FormBuilder, public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    this.buildForm();
  }

  ngOnInit() {
    this.loginForm.get('register').valueChanges.subscribe(
      (register) => {
        this.newRegistration = register;
        if (register) {
          this.loginForm.get('password_verify').setValidators([
            Validators.required,
            Validators.minLength(8),
            CustomValidation.equalValidation(this.loginForm.get('password'), this.loginForm.get('password_verify'))
          ]);
          this.loginForm.get('first_name').setValidators([
            Validators.required,
          ]);
          this.loginForm.get('last_name').setValidators([
            Validators.required,
          ]);
        } else {
          for (const item of this.resetFields) {
            this.loginForm.get(item).clearValidators();
            this.loginForm.get(item).reset();
          }
        }
      }
    )
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      'first_name': '',
      'last_name': '',
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      'password_verify': '',
      'register': ''
    });
  }

  onSubmit(post) {
    if (!post.register) {
      this.busy = this.authService
        .login(post)
        .subscribe(jwtUser => {
          this.dialog.close(jwtUser);
        });
    } else {
      console.log(post);
      this.busy = this.authService
        .register(post)
        .subscribe(jwtUser => {
          this.dialog.close(jwtUser);
        });
    }
  }

  onClose() {
    this.dialog.close(null);
  }

}
