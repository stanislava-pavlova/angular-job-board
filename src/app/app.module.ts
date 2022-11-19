import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FieldErrorMessageComponent } from './core/components/field-error-message/field-error-message.component';
import { Route, RouterModule } from '@angular/router';
import { AboutSectionComponent } from './about-section/about-section.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobsSectionComponent } from './jobs-section/jobs-section.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OrganisationOffersComponent } from './organisation-offers/organisation-offers.component';
import { OrganisationGuard } from './guards/organisation.guard';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicantsComponent } from './applicants/applicants.component';

const routes: Route[] = [
  {
    path: 'home',
    component: HomeSectionComponent,
  },
  {
    path: 'jobs',
    component: JobsSectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutSectionComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'applicants',
    component: ApplicantsComponent,
    canActivate: [AuthGuard, OrganisationGuard],
  },
  {
    path: 'create-offer',
    component: CreateOfferComponent,
    canActivate: [AuthGuard, OrganisationGuard],
  },
  {
    path: 'my-offers',
    component: OrganisationOffersComponent,
    canActivate: [AuthGuard, OrganisationGuard],
  },
  {
    path: 'edit/:id',
    component: CreateOfferComponent,
    canActivate: [AuthGuard, OrganisationGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ItemCardComponent,
    LoginComponent,
    RegisterComponent,
    FieldErrorMessageComponent,
    AboutSectionComponent,
    HomeSectionComponent,
    ProfileComponent,
    JobsSectionComponent,
    CreateOfferComponent,
    OrganisationOffersComponent,
    ApplicationsComponent,
    ApplicantsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
