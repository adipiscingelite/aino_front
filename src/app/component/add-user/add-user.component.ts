import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

interface Application {
  application_uuid: string;
  application_title: string;
}

interface Role {
  role_uuid: string;
  role_title: string;
}

interface Division {
  division_uuid: string;
  division_title: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;
  dataListApplication: Application[] = [];
  dataListRole: Role[] = [];
  dataListDivision: Division[] = [];

  user_name: string = '';
  user_email: string = '';
  user_password: string = '';
  division_uuid: string = '';
  role_uuid: string = '';
  application_uuid: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private cookieService: CookieService, private fb: FormBuilder, @Inject('apiUrl') private apiUrl: string) {
    this.apiUrl = apiUrl;
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      user_name: [''],
      user_email: [''],
      user_password: [''],
      application_uuid: [''],
      role_uuid: [''],
      division_uuid: [''],
    });
    

    this.appData();
    this.roleData();
    this.divisionData();
  }

  onAddUser() {
    const token = this.cookieService.get('userToken');
    const userFormValue = this.form.value;
    const user = {
      user_name: this.user_name,
      user_email: this.user_email,
      user_password: this.user_password,
      applicationRole: {
        application_uuid: userFormValue.application_uuid,
        role_uuid: userFormValue.role_uuid,
        division_uuid: userFormValue.division_uuid,        
      }
    };

    axios.post(`${this.apiUrl}/superadmin/user/add`, user,
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
          icon: 'success'
        });
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
            text: error.response.data.message,
            icon: 'error'
          });
        }
      })
  }

  appData() {
    axios.get(`${this.apiUrl}/application/all`)
      .then((response) => {
        this.dataListApplication = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }

  roleData() {
    axios.get(`${this.apiUrl}/role/all`)
      .then((response) => {
        this.dataListRole = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }

  divisionData() {
    axios.get(`${this.apiUrl}/division/all`)
      .then((response) => {
        this.dataListDivision = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }

}