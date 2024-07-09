import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { TableComponent } from "./table/table.component";
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { AccessGroupComponent } from './access-group/access-group.component';
import { ApplicationComponent } from './application/application.component';
import { DivisionComponent } from './division/division.component';
import { MasterDocComponent } from './master-doc/master-doc.component';
import { AppRoleComponent } from './app-role/app-role.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormBAComponent } from './form-ba/form-ba.component';
import { FormDAComponent } from './form-da/form-da.component';
import { FormITCMComponent } from './form-itcm/form-itcm.component';
import { ProductComponent } from './product/product.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    NgbdButtonsComponent,
    TableComponent
  ],
  declarations: [
       AddUserComponent,
       UserComponent,
       AccessGroupComponent,
       ApplicationComponent,
       DivisionComponent,
       MasterDocComponent,
       AppRoleComponent,
       FormListComponent,
       FormBAComponent,
       FormDAComponent,
       FormITCMComponent,
       ProductComponent,
       ProjectComponent
  ],
})
export class ComponentsModule { }
