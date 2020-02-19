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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverlayModule } from '@angular/cdk/overlay';
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { SelectComponent } from './shared/form-controls/select/select.component';
import { StoreModule } from '@ngrx/store';
import { TopSidebarComponent } from './components/top-sidebar/top-sidebar.component';
import { userReducer} from './state/reducers/user';
import { locationsReducer} from './state/reducers/locations.reducer';
import { filtersReducer} from './state/reducers/filters.reducer';
import { langsReducer } from './state/reducers/langs.reducer';
import { globalSearchReducer } from './state/reducers/global-search.reducer';
import { mateReducer } from './state/reducers/mate.reducer';
import { chatsReducer } from './state/reducers/chats.reducer';
import { AlertModalComponent } from './components/modals/alert-modal/alert-modal.component';
import { LeavePopupComponent } from './components/registration/leave-popup/leave-popup.component';
import { PopupComponent } from './components/modals/popup/popup.component';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutMeComponent } from './components/profile/about-me/about-me.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effects';
import { FiltersEffects } from './state/effects/filters.effects';
import { LocationsEffects } from './state/effects/locations.effects';
import { PostsComponent } from './components/posts/posts.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { SetExactdataPageComponent } from './components/set-exactdata-page/set-exactdata-page.component';
import { InputSearchComponent } from './shared/form-controls/input-search/input-search.component';
import {DemoMaterialModule} from './material-module';
import { InputTrimDirective } from './shared/directives/input-trim.directive';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SkillsToObtainComponent } from './components/profile/skills-to-obtain/skills-to-obtain.component';
import { WeekDaysComponent } from './shared/components/week-days/week-days.component';
import { InputTextareaComponent } from './shared/form-controls/input-textarea/input-textarea.component';
import { SkillToShareComponent } from './components/profile/skill-to-share/skill-to-share.component';
import { SkillToShareCardComponent } from './components/profile/skill-to-share-card/skill-to-share-card.component';
import { SkillToObtainCardComponent } from './components/profile/skill-to-obtain-card/skill-to-obtain-card.component';
import { LeftBarComponent } from './components/profile/left-bar/left-bar.component';
import { ServicesComponent } from './components/profile/services/services.component';
import { StoViewComponent } from './components/profile/sto-view/sto-view.component';
import { ServiceCardComponent } from './components/profile/service-card/service-card.component';
import { InterestsCardComponent } from './components/profile/interests-card/interests-card.component';
import { StsViewComponent } from './components/profile/sts-view/sts-view.component';
import { LangsEffects } from './state/effects/langs.effects';
import { ChatsEffects} from './state/effects/chats.effects';
import { PricesTypesPipe } from './shared/pipes/prices-types.pipe';
import { SkillLevelsPipe } from './shared/pipes/skill-levels.pipe';
import { LangsPipe } from './shared/pipes/langs.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ResendCodeComponent } from './components/resend-code/resend-code.component';
import { MyMatchesComponent } from './components/profile/my-matches/my-matches.component';
import { SearchComponent } from './components/search/search.component';
import { InputGlobalSearchComponent } from './shared/form-controls/input-global-search/input-global-search.component';
import { SkillsCardComponent } from './components/search/skills-card/skills-card.component';
import { PeopleCardComponent } from './components/search/people-card/people-card.component';
import { PostsCardComponent } from './components/search/posts-card/posts-card.component';
import { VeiwProfileComponent } from './components/mates/veiw-profile.component';
import { MateInterestCardComponent } from './components/mates/interest-card/interest-card.component';
import { MateSkillToShareCardComponent } from './components/mates/skill-to-share-card/skill-to-share-card.component';
import { MateSkillToObtainCardComponent } from './components/mates/skill-to-obtain-card/skill-to-obtain-card.component';
import { MateServiceCardComponent } from './components/mates/service-card/service-card.component';
import { GeneralComponent } from './components/profile/about-me/general/general.component';
import { PlacesOfResidenceComponent } from './components/profile/about-me/places-of-residence/places-of-residence.component';
import { WorkComponent } from './components/profile/about-me/work/work.component';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { EducationComponent } from './components/profile/about-me/education/education.component';
import { EducationLevelsPipe } from './shared/pipes/education-levels.pipe';
import { IncomingMatchesCardComponent } from './components/profile/my-matches/incoming-matches-card/incoming-matches-card.component';
import { OutcomingMatchesCardComponent } from './components/profile/my-matches/outcoming-matches-card/outcoming-matches-card.component';
import { ActiveMatchesCardComponent } from './components/profile/my-matches/active-matches-card/active-matches-card.component';
import { CustomChipsComponent } from './shared/components/custom-chips/custom-chips.component';
import { InterestedPersonsComponent } from './components/profile/my-matches/interested-persons/interested-persons.component';
import { CongratsPopupComponent } from './components/modals/congrats-popup/congrats-popup.component';
import { PostViewComponent } from './components/posts/post-view/post-view.component';
import { PostCardComponent } from './components/posts/post-card/post-card.component';
import { ToastSuccessComponent } from './shared/toasts/toast-success/toast-success.component';
import { ToastWarningComponent } from './shared/toasts/toast-warning/toast-warning.component';
import { ToastFailComponent } from './shared/toasts/toast-fail/toast-fail.component';
import { SkillDropDownComponent } from './components/search/skills-card/skill-drop-down/skill-drop-down.component';
import { ChatsComponent } from './components/chats/chats.component';
import { ChatListComponent } from './components/chats/chat-list/chat-list.component';
import { LastMessagePipe } from './shared/pipes/last-message.pipe';
import { ChatWindowComponent } from './components/chats/chat-window/chat-window.component';
import { ChatItemComponent } from './components/chats/chat-list/chat-item/chat-item.component';
import { RequestItemComponent } from './components/chats/chat-list/request-item/request-item.component';
import { MessagesComponent } from './components/chats/chat-window/messages/messages.component';
import { TextareaChatComponent } from './shared/form-controls/textarea-chat/textarea-chat.component';
import { MessageLogComponent } from './components/chats/chat-window/message-log/message-log.component';


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
    SelectComponent,
    AlertModalComponent,
    LeavePopupComponent,
    PopupComponent,
    ErrorModalComponent,
    ProfileComponent,
    AboutMeComponent,
    PostsComponent,
    SetExactdataPageComponent,
    InputSearchComponent,
    InputTrimDirective,
    ProgressBarComponent,
    SkillsToObtainComponent,
    WeekDaysComponent,
    InputTextareaComponent,
    SkillToShareComponent,
    SkillToShareCardComponent,
    SkillToObtainCardComponent,
    LeftBarComponent,
    ServicesComponent,
    StoViewComponent,
    ServiceCardComponent,
    InterestsCardComponent,
    StsViewComponent,
    PricesTypesPipe,
    SkillLevelsPipe,
    LangsPipe,
    PageNotFoundComponent,
    ConfirmComponent,
    ResendCodeComponent,
    MyMatchesComponent,
    SearchComponent,
    InputGlobalSearchComponent,
    SkillsCardComponent,
    PeopleCardComponent,
    PostsCardComponent,
    VeiwProfileComponent,
    MateInterestCardComponent,
    MateSkillToShareCardComponent,
    MateSkillToObtainCardComponent,
    MateServiceCardComponent,
    GeneralComponent,
    PlacesOfResidenceComponent,
    WorkComponent,
    ClickOutsideDirective,
    EducationComponent,
    EducationLevelsPipe,
    IncomingMatchesCardComponent,
    OutcomingMatchesCardComponent,
    ActiveMatchesCardComponent,
    CustomChipsComponent,
    InterestedPersonsComponent,
    CongratsPopupComponent,
    PostViewComponent,
    PostCardComponent,
    ToastSuccessComponent,
    ToastWarningComponent,
    ToastFailComponent,
    SkillDropDownComponent,
    ChatsComponent,
    ChatListComponent,
    LastMessagePipe,
    ChatWindowComponent,
    ChatItemComponent,
    RequestItemComponent,
    MessagesComponent,
    TextareaChatComponent,
    MessageLogComponent
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
    HttpClientModule,
    OverlayModule,
    AngularMyDatePickerModule,
    StoreModule.forRoot({
      user: userReducer,
      filters: filtersReducer,
      langs: langsReducer,
      globalSearch: globalSearchReducer,
      mateProfile: mateReducer,
      locations: locationsReducer,
      chats: chatsReducer}),
    EffectsModule.forRoot([UserEffects, FiltersEffects, LangsEffects, LocationsEffects, ChatsEffects])
  ],
  entryComponents: [
    ToastSuccessComponent,
    ToastFailComponent,
    ToastWarningComponent
  ],
  providers: [
    AlertModalComponent,
    LeavePopupComponent,
    PopupComponent,
    ErrorModalComponent,
    CongratsPopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
