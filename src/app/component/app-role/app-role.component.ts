import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { AppRoleService } from '../component-service/app-role-service/app-role-service.service';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';


declare var $: any;

interface AppRole {
  application_role_uuid: string;
  application_title: string;
  role_title: string;
  created_by: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

interface Application {
  application_uuid: string;
  application_title: string;
}

interface Role {
  role_uuid: string;
  role_title: string;
}
@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.scss']
})
export class AppRoleComponent implements OnInit {

  searchText: string = '';

  form!: FormGroup;

  dataListApplication: Application[] = [];
  dataListRole: Role[] = [];

  application_role_uuid: string = '';
  application_uuid: string = '';
  application_title: string = '';
  role_uuid: string = '';
  role_title: string = '';
  role_code: any;

  constructor(
    private cookieService: CookieService,
    public appRoleService: AppRoleService,
    @Inject('apiUrl') private apiUrl: string,
    private fb: FormBuilder
  ) {

    this.apiUrl = apiUrl;
  }

  dataListAppRole: AppRole[] = [];


  ngOnInit(): void {
    this.fetchDataAppRole();
    this.profileData();

    this.form = this.fb.group({
      application_uuid: [''],
      application_title: [''],
      role_uuid: [''],
      role_title: ['']
    });

    this.appData();
    this.roleData();
  }

  matchesSearch(item: AppRole): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.application_title.toLowerCase().includes(searchLowerCase) ||
      item.role_title.toLowerCase().includes(searchLowerCase)
    );
  }

  fetchDataAppRole(): void {
    axios
      .get(`${this.apiUrl}/application/role/all`)
      .then(response => {
        this.dataListAppRole = response.data;
        this.appRoleService.updateDataListAppRole(this.dataListAppRole);
      })
      .catch(error => {
        if (error.response.status === 500) {
          console.log(error.response.data.message);
          Swal.fire({
            icon: 'error',
            title: 'Kesalahan',
            text: error.response.data.message
          })
        } else {
          console.log(error.response.data.message);
        }
      });
  }

  
  profileData(): void {
    const token = this.cookieService.get('userToken');

    axios.get(`${this.apiUrl}/auth/my/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        this.role_code = response.data.role_code;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openModalAdd() {
    $('#addAppRoleModal').modal('show');
    this.form.patchValue({
      application_uuid: '',
      role_uuid: ''
    })
  }

  appData(): void {
    axios.get(`${this.apiUrl}/application/all`)
      .then((response) => {
        this.dataListApplication = response.data;
        console.log(this.dataListApplication);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }

  roleData(): void {
    axios.get(`${this.apiUrl}/role/all`)
      .then((response) => {
        this.dataListRole = response.data;
        console.log(this.dataListRole);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }

  addAppRole() {
    const token = this.cookieService.get('userToken');

    axios.post(`${this.apiUrl}/superadmin/application/role/add`,
      { application_uuid: this.form.value.application_uuid, role_uuid: this.form.value.role_uuid },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data.message);
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        $('#addAppRoleModal').modal('hide');
        this.fetchDataAppRole();
        this.application_title = '';
        this.role_title = '';
        this.application_title = '';
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Terjadi Kesalahan',
            icon: 'error'
          });
        }
      })
  }

  getSpecAppRole(application_role_uuid: string) {
    axios.get(`${this.apiUrl}/application/role/${application_role_uuid}`)
      .then((response) => {
        const appRoleData = response.data;
        console.log(appRoleData);
        this.application_role_uuid = application_role_uuid;

        const existingApp = this.dataListApplication.find(app => app.application_title
          === appRoleData.application_title
        );
        const existingRole = this.dataListRole.find(role => role.role_title === appRoleData.role_title);

        this.form.patchValue({
          application_uuid: existingApp ? existingApp.application_uuid : '',
          role_uuid: existingRole ? existingRole.role_uuid : ''
        });

        $('#editAppRoleModal').modal('show');
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Terjadi Kesalahan',
            icon: 'error'
          });
        }
      });
  }


  updateAppRole(): void {
    const token = this.cookieService.get('userToken');
    const appRoleFormValue = this.form.value;
    const appRoleUuid = this.application_role_uuid;
    const sendUpdateData = {
      application_uuid: appRoleFormValue.application_uuid,
      role_uuid: appRoleFormValue.role_uuid
    }

    axios.put(`${this.apiUrl}/superadmin/application/role/update/${appRoleUuid}`,
      sendUpdateData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data.message);;
        this.fetchDataAppRole();
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        $('#editAppRoleModal').modal('hide');
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Terjadi Kesalahan',
            icon: 'error'
          });
        }
      })
  }

  onDeleteAppRole(application_role_uuid: string): void {
    Swal.fire({
      title: "Konfirmasi",
      text: "Anda yakin ingin menghapus App Role ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        this.performDeleteAppRole(application_role_uuid);
      }
    })
  }

  performDeleteAppRole(application_role_uuid: string): void {
    const token = this.cookieService.get('userToken');

    axios.put(`${this.apiUrl}/superadmin/application/role/delete/${application_role_uuid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data.message);
        this.fetchDataAppRole();
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .catch((error) => {
        if (error.response.status === 404 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error'
          })
        }
      })
  }
}

export { AppRole };
