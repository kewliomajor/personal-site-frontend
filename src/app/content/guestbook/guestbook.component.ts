import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {GuestbookService} from '../../service/guestbook.service';
import {GuestNote} from '../../model/guest_note';
import {AuthenticationService} from '../../service/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  providers: [GuestbookService, AuthenticationService],
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
})
export class GuestbookComponent implements OnInit {
  busy: Subscription;
  guestNotes: GuestNote[];
  addNoteForm: FormGroup;
  LoginText: string;
  isLoggedIn: boolean;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private guestbookService: GuestbookService) {
    this.LoginText = 'You need to log in to view this content';
    this.isLoggedIn = false;
    if (authenticationService.userIsLoggedIn()) {
      this.LoginText = '';
      this.isLoggedIn = true;
    }
    this.buildForm();
  }

  ngOnInit() {
    this.busy = this.guestbookService
      .getAll()
      .subscribe(guestNotes => {
        this.guestNotes = guestNotes;
      });
  }

  buildForm(): void {
    this.addNoteForm = this.fb.group({
      'text': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  onSubmit(post) {
    this.busy = this.guestbookService
      .submitNote(post)
      .subscribe(guestNote => {
        location.reload();
      });
  }
}
