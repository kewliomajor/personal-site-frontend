import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {

}

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html'
})
export class LoginRegisterComponent implements CloseGuard, ModalComponent<CustomModalContext>, OnInit {
  busy: Subscription;
  context: CustomModalContext;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submitted');
    this.dialog.close(true);
  }

  onClose() {
    console.log('closed');
    this.dialog.close(false);
  }

}
