import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {GuestbookService} from '../../service/guestbook.service';
import {GuestNote} from '../../model/guest_note';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  providers: [GuestbookService, AuthenticationService],
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
})
export class GuestbookComponent implements OnInit {
  busy: Subscription;
  guestNotes: GuestNote[];
  LoginText: string;

  constructor(private authenticationService: AuthenticationService, private guestbookService: GuestbookService) {
    this.LoginText = 'You need to log in to view this content';
    if (authenticationService.userIsLoggedIn()) {
      this.LoginText = '';
    }
  }

  ngOnInit() {
    this.busy = this.guestbookService
      .getAll()
      .subscribe(guestNotes => {
        this.guestNotes = guestNotes;
      });
  }
}
