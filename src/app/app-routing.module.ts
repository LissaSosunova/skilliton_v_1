import { AboutMeComponent } from './components/profile/about-me/about-me.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { GeneralComponent } from './components/profile/about-me/general/general.component';
import { GetDataUserResolverService } from './resolvers/get-data-user-resolver.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyMatchesComponent } from './components/profile/my-matches/my-matches.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResendCodeComponent } from './components/resend-code/resend-code.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ServicesComponent } from './components/profile/services/services.component';
import { SetExactdataPageComponent } from './components/set-exactdata-page/set-exactdata-page.component';
import { SkillsToObtainComponent } from './components/profile/skills-to-obtain/skills-to-obtain.component';
import { SkillToShareComponent } from './components/profile/skill-to-share/skill-to-share.component';
import { StoViewComponent } from './components/profile/sto-view/sto-view.component';
import { StsViewComponent } from './components/profile/sts-view/sts-view.component';
import { VeiwProfileComponent } from './components/mates/veiw-profile.component';
import { PlacesOfResidenceComponent } from './components/profile/about-me/places-of-residence/places-of-residence.component';
import { WorkComponent } from './components/profile/about-me/work/work.component';
import { EducationComponent } from './components/profile/about-me/education/education.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'confirm_account',
    redirectTo: 'confirm',
    pathMatch: 'prefix'
  },
  {
    path: 'resend_activation_code',
    redirectTo: 'resend-code',
    pathMatch: 'prefix'
  },
  {
    path: 'confirm',
    component: ConfirmComponent
  },
  {
    path: 'resend-code',
    component: ResendCodeComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'set-exactdata',
    component: SetExactdataPageComponent,
    resolve: {
      user$: GetDataUserResolverService
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    resolve: {
      user$: GetDataUserResolverService
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'about-me',
        component: AboutMeComponent,
        resolve: {
          user$: GetDataUserResolverService
        },
        children: [
          {
            path: 'general',
            component: GeneralComponent
          },
          {
            path: 'places-of-residence',
            component: PlacesOfResidenceComponent
          },
          {
            path: 'work',
            component: WorkComponent
          },
          {
            path: 'education',
            component: EducationComponent
          }
        ]
      },
      {
        path: 'sto-view',
        component: StoViewComponent,
        resolve: {
          user$: GetDataUserResolverService
        }
      },
      {
        path: 'skills-to-obtain',
        component: SkillsToObtainComponent,
        resolve: {
          user$: GetDataUserResolverService
        }
      },
      {
        path: 'skill-to-share',
        component: SkillToShareComponent
      },
      {
        path: 'sts-view',
        component: StsViewComponent,
        resolve: {
          user$: GetDataUserResolverService
        }
      },
      {
        path: 'services',
        component: ServicesComponent
      },
      {
        path: 'matches',
        component: MyMatchesComponent
      }
    ]
  },
  {
    path: 'view-profile',
    component: VeiwProfileComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'home',
    component: HomeComponent,
    // Resolver
    resolve: {
      user$: GetDataUserResolverService
    }
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),  RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [GetDataUserResolverService]
})
export class AppRoutingModule { }
