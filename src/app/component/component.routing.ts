import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { TableComponent } from './table/table.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { AccessGroupComponent } from './access-group/access-group.component';
import { ApplicationComponent } from './application/application.component';
import { DivisionComponent } from './division/division.component';
import { MasterDocComponent } from './master-doc/master-doc.component';
import { AppRoleComponent } from './app-role/app-role.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormITCMComponent } from './form-itcm/form-itcm.component';
import { FormBAComponent } from './form-ba/form-ba.component';
import { FormDAComponent } from './form-da/form-da.component';
import { ProductComponent } from './product/product.component';
import { ProjectComponent } from './project/project.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			},
			{
				path: 'add-user',
				component: AddUserComponent
			},
			{
				path: 'user-control',
				component: UserComponent
			},
			{
				path: 'grup-akses',
				component: AccessGroupComponent
			},
			{
				path: 'application',
				component: ApplicationComponent
			},
			{
				path: 'division',
				component: DivisionComponent
			},
			{
				path: 'otoritas',
				component: AppRoleComponent
			},
			{
				path: 'document-control',
				component: MasterDocComponent
			},
			{
				path: 'form-list',
				component: FormListComponent
			},
			{
				path: 'ba-itcm',
				component: FormBAComponent
			},
			{
				path: 'form-da',
				component: FormDAComponent
			},
			{
				path: 'form-itcm',
				component: FormITCMComponent
			},
			{
				path: 'product',
				component: ProductComponent
			},
			{
				path: 'project',
				component: ProjectComponent
			}
		]
	}
];
