import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';

import { AppComponent } from './app.component';
import { HeaderComponent } from './admin-components/header/header.component';
import { FooterComponent } from './admin-components/footer/footer.component';
import { MenuComponent } from './admin-components/menu/menu.component';
import { SettingsComponent } from './admin-components/settings/settings.component';
import { PostComponent } from './content/post/post.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpModule} from '@angular/http';

const appRoutes: Routes = [
  { path: 'content', component: PostComponent },
  { path: 'about', component: AboutComponent },
  { path: '',   redirectTo: 'content', pathMatch: 'full' },
  { path: 'index',   redirectTo: 'content', pathMatch: 'prefix' },
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
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    BusyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
