import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';

export class CustomModalContext extends BSModalContext {

}

@Component({
  providers: [AuthenticationService],
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements CloseGuard, ModalComponent<CustomModalContext>, OnInit {
  busy: Subscription;
  context: CustomModalContext;
  profileForm: FormGroup;

  constructor(private authService: AuthenticationService, private fb: FormBuilder, public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    this.buildForm();
  }

  ngOnInit() {
    this.busy = this.authService
      .getProfile()
      .subscribe(user => {
        this.profileForm.get('username').setValue(user.username);
        this.profileForm.get('first_name').setValue(user.first_name);
        this.profileForm.get('last_name').setValue(user.last_name);
      });
  }

  buildForm(): void {
    this.profileForm = this.fb.group({
      'username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      'first_name': [null, Validators.compose([
        Validators.required
      ])],
      'last_name': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  onSubmit(post) {
    this.busy = this.authService
      .updateProfile(post)
      .subscribe(user => {
        this.dialog.close(user);
      });
  }

  onClose() {
    this.dialog.close(null);
  }

}
