import { Component, Inject, OnInit } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { FormServiceService } from '../component-service/form-service/form-service.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';


declare var $: any;

interface forms {
  form_uuid: string;
  form_name: string;
  form_number: string;
  form_ticket: string;
  form_status: string;
  document_uuid: string;
  document_name: string;
  document_order: number;
  created_by: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

interface documents {
  document_uuid: string;
  document_code: string;
  document_name: string;
  document_format_number: string;
}

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  searchText: string = '';

  form!: FormGroup;
  dataListForm: forms[] = [];
  dataListDocument: documents[] = [];

  form_uuid: string = '';
  form_name: string = '';
  form_number: string = '';
  form_ticket: string = '';
  form_status: string = '';
  document_uuid: string = '';
  selectedDocumentUuid: string = '';
  document_name: string = '';
  form_code: string = '';
  document_format_number: string = '';

  isPublished: boolean = true;
  user_uuid: any;
  user_name: any;
  role_code: any;

  constructor(
    private cookieService: CookieService,
    public formService: FormServiceService,
    private fb: FormBuilder,
    private formGroupDirective: FormGroupDirective
  ) {
  }

  ngOnInit(): void {
    this.profileData();
    this.fetchDataAllForm();
    this.form = this.fb.group({
      form_uuid: [''],
      form_name: [''],
      form_number: [''],
      form_ticket: [''],
      form_status: [''],
      document_uuid: [''],
      document_name: [''],
      form_code: [''],
      document_format_number: [''],
    });

    this.fetchDataDocument();
  }

  matchesSearch(item: forms): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.form_uuid.toLowerCase().includes(searchLowerCase) ||
      item.form_number.toLowerCase().includes(searchLowerCase) ||
      item.form_ticket.toLowerCase().includes(searchLowerCase) ||
      item.form_status.toLowerCase().includes(searchLowerCase)
    );
  }

  profileData(): void {
    const token = this.cookieService.get('userToken');

    axios.get(`http://localhost:8080/auth/my/profile`, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        this.user_uuid = response.data.user_uuid;
        this.user_name = response.data.user_name;
        this.role_code = response.data.role_code;
        const role_code = response.data.role_code;
        if (role_code === 'SA') {
          this.fetchDataAllForm();
        } else if (role_code === 'M') {
          this.fetchDataUserForm();
        } else if (role_code === 'A') {
          this.fetchDataUserDivisionForm();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  fetchDataAllForm(): void {
    axios.get(`${environment.apiUrl2}/form`)
      .then((response) => {
        console.log(response.data);
        this.dataListForm = response.data;
        this.formService.updateDataListForm(this.dataListForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchDataUserForm(): void {
    axios.get(`${environment.apiUrl2}/api/my/form`,
    {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('userToken')}`
      }
    })
      .then((response) => {
        console.log(response.data);
        this.dataListForm = response.data;
        this.formService.updateDataListForm(this.dataListForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchDataUserDivisionForm(): void {
    axios.get(`${environment.apiUrl2}/admin/my/form/division`,
    {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('userToken')}`
      }
    })
      .then((response) => {
        console.log(response.data);
        this.dataListForm = response.data;
        this.formService.updateDataListForm(this.dataListForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openModalAddForm() {
    this.fetchDataDocument();
    $('#addFormModal').modal('show');
    this.form_number = '';
    this.form_name = '';
    this.form_ticket = '';
    this.document_name = '';
    this.isPublished = false;
  }

  fetchDataDocument(): void {
    axios.get(`${environment.apiUrl2}/document`)
      .then((response) => {
        this.dataListDocument = response.data;
        console.log(this.dataListDocument);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addForm() {
    const token = this.cookieService.get('userToken');

    axios.post(`${environment.apiUrl2}/api/form/add`, {
      isPublished: this.isPublished ? true : false,
      formData: {
        form_ticket: this.form_ticket,
        form_name: this.form_name,
        document_uuid: this.document_uuid,
      }
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        this.fetchDataAllForm();
        Swal.fire({
          icon: 'success',
          title: 'Formulir baru ditambahkan',
          showConfirmButton: false,
          timer: 1500
        })
        $('#addFormModal').modal('hide');
        this.form_number = '';
        this.form_name = '';
        this.form_ticket = '';
        this.document_uuid = '';
        this.isPublished = false;
      })
      .catch((error) => {
        if (error.response.status === 422 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
  }

  getSpecificForm(form_uuid: string) {
    axios.get(`${environment.apiUrl2}/form/` + form_uuid)
      .then((response) => {
        console.log(response.data)
        const form = response.data;
        this.form_uuid = form.form_uuid;
        this.form_name = form.form_name;
        this.form_number = form.form_number;
        this.form_ticket = form.form_ticket;
        this.form_status = form.form_status;
        this.document_uuid = form.document_uuid;
        this.document_name = form.document_name;
        this.selectedDocumentUuid = form.document_uuid;
        this.isPublished = form.isPublished;

        $('#editFormModal').modal('show');
      })
      .catch((error) => {
        if (error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
  }

  updateForm() {
    const token = this.cookieService.get('userToken');
    const formUuid = this.form_uuid;

    axios.put(`${environment.apiUrl2}/api/form/update/` + formUuid, {
      isPublished: this.isPublished ? true : false,
      formData: {
        form_ticket: this.form_ticket,
        form_name: this.form_name,
        document_uuid: this.document_uuid,
      }
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        console.log(response.data);
        this.fetchDataAllForm();
        $('#editFormModal').modal('hide');
        Swal.fire({
          icon: 'success',
          title: 'Formulir diperbarui',
          showConfirmButton: false,
          timer: 1500
        });

        $('#editFormModal').modal('hide');
      })
      .catch((error) => {
        if (error.response.status === 422 || error.response.status === 404 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
  }
}

export { forms };
