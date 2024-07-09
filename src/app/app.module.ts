import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, DatePipe, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { AuthGuard } from './auth/auth.guard';

import { environment } from 'src/environments/environment';

import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';




@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    PagenotfoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
      
    },
    AuthGuard,
    {
      provide: 'apiUrl',
      useValue: environment.apiUrl
    },
    DatePipe,
    FormGroupDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
