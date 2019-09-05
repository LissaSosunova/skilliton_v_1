import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http'; 
import { InputPasswordComponent } from './shared/form-controls/input-password/input-password.component';
import { InputTextComponent } from './shared/form-controls/input-text/input-text.component';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule,
          MatSelectModule,
          MatNativeDateModule,
          MatDatepickerModule,
          MatRadioModule,
          MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './components/registration/registration.component';
import { TopSidebarComponent } from './components/top-sidebar/top-sidebar.component';
import { InputEmailComponent } from './shared/form-controls/input-email/input-email.component';
import { InputDatepickerComponent } from './shared/form-controls/input-datepicker/input-datepicker.component';
import { MatSelectComponent } from './shared/form-controls/mat-select/mat-select.component';
import { SelectComponent } from './shared/form-controls/select/select.component';


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
    InputPasswordComponent,
    InputEmailComponent,
    InputDatepickerComponent,
    MatSelectComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
