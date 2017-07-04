import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './admin-components/header/header.component';
import { FooterComponent } from './admin-components/footer/footer.component';
import { MenuComponent } from './admin-components/menu/menu.component';
import { SettingsComponent } from './admin-components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
