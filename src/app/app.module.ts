import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';

import { AppComponent } from './app.component';
import { HeaderComponent } from './admin-components/header/header.component';
import { FooterComponent } from './admin-components/footer/footer.component';
import { MenuComponent } from './admin-components/menu/menu.component';
import { SettingsComponent } from './admin-components/settings/settings.component';
import { PostComponent } from './content/post/post.component';
import { AboutComponent } from './content/about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpModule} from '@angular/http';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import { LoginRegisterComponent } from './content/login-register/login-register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DefaultErrorHandler} from './service/errors/default_error_handler';
import { HomeComponent } from './content/home/home.component';
import { GuestbookComponent } from './content/guestbook/guestbook.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'content', component: PostComponent },
  { path: 'guestbook', component: GuestbookComponent },
  { path: 'about', component: AboutComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'index',   redirectTo: 'home', pathMatch: 'prefix' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SettingsComponent,
    PostComponent,
    AboutComponent,
    PageNotFoundComponent,
    LoginRegisterComponent,
    HomeComponent,
    GuestbookComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    BusyModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: DefaultErrorHandler}
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginRegisterComponent]
})
export class AppModule { }
