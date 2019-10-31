import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutMeComponent } from './components/profile/about-me/about-me.component';
import { SkillsToObtainComponent } from './components/profile/skills-to-obtain/skills-to-obtain.component';
import { SkillToShareComponent } from './components/profile/skill-to-share/skill-to-share.component';
import { GetDataUserResolverService } from './resolvers/get-data-user-resolver.service';
import { SetExactdataPageComponent } from './components/set-exactdata-page/set-exactdata-page.component';
import { ServicesComponent } from './components/profile/services/services.component';
import { StoViewComponent } from './components/profile/sto-view/sto-view.component';
import { StsViewComponent } from './components/profile/sts-view/sts-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ResendCodeComponent } from './components/resend-code/resend-code.component';
import { MyMatchesComponent } from './components/profile/my-matches/my-matches.component';
import { SearchComponent } from './components/search/search.component';

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
    resolve: {
      user$: GetDataUserResolverService
    },
    children: [
      {
        path: 'about-me',
        component: AboutMeComponent,
        resolve: {
          user$: GetDataUserResolverService
        }
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
        component: ServicesComponent,
        resolve: {
          user$: GetDataUserResolverService
        }
      },
      {
        path: 'matches',
        component: MyMatchesComponent
      }
    ]
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
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),  RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [GetDataUserResolverService]
})
export class AppRoutingModule { }
