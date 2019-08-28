import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { TopSidebarComponent } from './components/top-sidebar/top-sidebar.component';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';
import { InputTextComponent } from './shared/form-controls/input-text/input-text.component';
import { InputPasswordComponent } from './shared/form-controls/input-password/input-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    ListComponent,
    TopSidebarComponent,
    LangSwitcherComponent,
    InputTextComponent,
    InputPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
