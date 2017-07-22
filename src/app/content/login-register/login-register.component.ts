import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidation} from '../../service/validation/custom-validation';

export class CustomModalContext extends BSModalContext {

}

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html'
})
export class LoginRegisterComponent implements CloseGuard, ModalComponent<CustomModalContext>, OnInit {
  busy: Subscription;
  context: CustomModalContext;
  loginForm: FormGroup;
  newRegistration = false;
  resetFields = ['password-verify', 'first-name', 'last-name'];

  constructor(private fb: FormBuilder, public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    this.buildForm();
  }

  ngOnInit() {
    this.loginForm.get('register').valueChanges.subscribe(
      (register) => {
        this.newRegistration = register;
        if (register) {
          this.loginForm.get('password-verify').setValidators([
            Validators.required,
            Validators.minLength(8),
            CustomValidation.equalValidation(this.loginForm.get('password'), this.loginForm.get('password-verify'))
          ]);
          this.loginForm.get('first-name').setValidators([
            Validators.required,
          ]);
          this.loginForm.get('last-name').setValidators([
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
      'first-name': '',
      'last-name': '',
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      'password-verify': '',
      'register': ''
    });
  }

  onSubmit(post) {
    console.log('submitted');
    this.dialog.close(true);
  }

  onClose() {
    console.log('closed');
    this.dialog.close(false);
  }

}
