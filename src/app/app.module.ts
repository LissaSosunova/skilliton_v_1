import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { InputPasswordComponent } from './shared/form-controls/input-password/input-password.component';
import { InputTextComponent } from './shared/form-controls/input-text/input-text.component';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule,
          MatSelectModule,
          MatNativeDateModule,
          MatDatepickerModule,
          MatRadioModule,
          MatInputModule,
          MatCommonModule,
          MatIconModule,
          MatBadgeModule,
          MatBottomSheetModule,
          MatButtonToggleModule,
          MatCardModule,
          MatDialogModule,
          MatDividerModule,
          MatExpansionModule,
          MatGridListModule,
          MatListModule,
          MatMenuModule,
          MatPaginatorModule,
          MatProgressBarModule,
          MatProgressSpinnerModule,
          MatRippleModule,
          MatSidenavModule,
          MatSliderModule,
          MatSlideToggleModule,
          MatSnackBarModule,
          MatSortModule,
          MatStepperModule,
          MatTableModule,
          MatTabsModule,
          MatToolbarModule,
          MatTooltipModule,
          MatTreeModule, } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InputDatepickerComponent } from './shared/form-controls/input-datepicker/input-datepicker.component';
import { InputEmailComponent } from './shared/form-controls/input-email/input-email.component';
import { MatSelectComponent } from './shared/form-controls/mat-select/mat-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverlayModule } from '@angular/cdk/overlay';
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { SelectComponent } from './shared/form-controls/select/select.component';
import { StoreModule } from '@ngrx/store';
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
import { SetExactdataPageComponent } from './components/set-exactdata-page/set-exactdata-page.component';
import { InputSearchComponent } from './shared/form-controls/input-search/input-search.component';
import { TagInputModule } from 'ngx-chips';
import { MatDefaultChipsComponent } from './shared/form-controls/mat-default-chips/mat-default-chips.component';
import {DemoMaterialModule} from './material-module';
import { InputTrimDirective } from './shared/directives/input-trim.directive';
import { DropdownItemsComponent } from './shared/components/dropdown-items/dropdown-items.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SkillsToObtainComponent } from './components/profile/skills-to-obtain/skills-to-obtain.component';
import { WeekDaysComponent } from './shared/components/week-days/week-days.component';
import { InputTextareaComponent } from './shared/form-controls/input-textarea/input-textarea.component';
import { SkillToShareComponent } from './components/profile/skill-to-share/skill-to-share.component';
import { SkillToShareCardComponent } from './components/profile/skill-to-share-card/skill-to-share-card.component';
import { SkillToObtainCardComponent } from './components/profile/skill-to-obtain-card/skill-to-obtain-card.component';
import { LeftBarComponent } from './components/profile/left-bar/left-bar.component';


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
    InputSearchComponent,
    MatDefaultChipsComponent,
    InputTrimDirective,
    DropdownItemsComponent,
    ProgressBarComponent,
    SkillsToObtainComponent,
    WeekDaysComponent,
    InputTextareaComponent,
    SkillToShareComponent,
    SkillToShareCardComponent,
    SkillToObtainCardComponent,
    LeftBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GooglePlaceModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    DemoMaterialModule,
    NoopAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    TagInputModule,
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
    ErrorModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
