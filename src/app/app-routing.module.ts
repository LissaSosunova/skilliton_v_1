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


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'about-me',
        component: AboutMeComponent,
        resolve: {
          userData: GetDataUserResolverService
        },
      },
      {
        path: 'skills-to-obtaine',
        component: SkillsToObtainComponent,
        resolve: {
          userData: GetDataUserResolverService
        },
      },
      {
        path: 'skills-to-share',
        component: SkillToShareComponent,
        resolve: {
          userData: GetDataUserResolverService
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),  RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
