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
import { InputDatepickerComponent } from './shared/form-controls/input-datepicker/input-datepicker.component';
import { InputEmailComponent } from './shared/form-controls/input-email/input-email.component';
import { MatSelectComponent } from './shared/form-controls/mat-select/mat-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverlayModule } from "@angular/cdk/overlay";
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { SelectComponent } from './shared/form-controls/select/select.component';
import { StoreModule }  from '@ngrx/store';
import { TopSidebarComponent } from './components/top-sidebar/top-sidebar.component';
import { userReducer} from './state/reducers/user';
import { filtersReducer} from './state/reducers/filters.reducer';
import { AlertModalComponent } from './components/modals/alert-modal/alert-modal.component';
import { LeavePopupComponent } from './components/registration/leave-popup/leave-popup.component';
import { PopupComponent } from './components/modals/popup/popup.component';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutMeComponent } from './components/profile/about-me/about-me.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effects';
import { FiltersEffects } from './state/effects/filters.effects';
import { PostsComponent } from './components/home/posts/posts.component';
import { InputCustomDatepickerComponent } from './shared/form-controls/input-custom-datepicker/input-custom-datepicker.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { SetExactdataPageComponent } from './components/home/set-exactdata-page/set-exactdata-page.component';
import { InputSearchComponent } from './shared/form-controls/input-search/input-search.component';

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
    SelectComponent,
    AlertModalComponent,
    LeavePopupComponent,
    PopupComponent,
    ErrorModalComponent,
    ProfileComponent,
    AboutMeComponent,
    PostsComponent,
    InputCustomDatepickerComponent,
    SetExactdataPageComponent,
    InputSearchComponent
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
    FormsModule,
    HttpClientModule,
    OverlayModule,
    AngularMyDatePickerModule,
    StoreModule.forRoot({user: userReducer, filters: filtersReducer}),
    EffectsModule.forRoot([UserEffects, FiltersEffects])
  ],
  providers: [
    AlertModalComponent,
    LeavePopupComponent,
    PopupComponent,
    ErrorModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
