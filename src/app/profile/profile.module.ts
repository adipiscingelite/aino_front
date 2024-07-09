import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: "",
    data: {
      title: 'profile',
      urls: [{ title: 'profile', url: '/profile' }, { title: 'profile' }]
    },
    component: ProfileComponent,
  },

  {
    path: "change-password",
    data: {
      title: 'change-password',
      urls: [{ title: 'profile', url: '/profile' }, { title: 'change-password' }]
    },
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProfileComponent,
    ChangePasswordComponent
  ]
})
export class ProfileModule { }