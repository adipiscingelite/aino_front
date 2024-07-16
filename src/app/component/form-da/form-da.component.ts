import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FormDaService } from '../component-service/form-da-service/form-da-service.service';
import { DatePipe } from '@angular/common';



declare var $: any;

interface formsDA {
  form_uuid: string;
  form_name: string;
  form_number: string;
  form_ticket: string;
  form_status: string;
  document_name: string;
  project_name: string;
  nama_analis: string;
  jabatan: string;
  departemen: string;
  jenis_perubahan: string;
  detail_dampak_perubahan: string;
  rencana_pengembangan_perubahan: string;
  rencana_pengujian_perubahan_sistem: string;
  rencana_rilis_perubahan_dan_implementasi: string;

  is_sign: boolean

  created_by: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

interface Documents {
  document_uuid: string;
  document_name: string;
}

interface Projects {
  project_uuid: string;
  project_name: string;
}

interface Users {
  user_id: string;
  personal_name: string;
}

interface Detail {
  form_number: string;
  form_ticket: string;
  form_status: string;
  document_name: string;
  project_name: string;
  nama_analis: string;
  approval_status: string;
  reason: string;
  jabatan: string;
  departemen: string;
  jenis_perubahan: string;
  detail_dampak_perubahan: string;
  rencana_pengembangan_perubahan: string;
  rencana_pengujian_perubahan_sistem: string;
  rencana_rilis_perubahan_dan_implementasi: string;
  name: string;
  position: string;
  role_sign: string;
  is_sign: boolean
}

@Component({
  selector: 'app-form-da',
  templateUrl: './form-da.component.html',
  styleUrls: ['./form-da.component.scss']
})
export class FormDAComponent implements OnInit {

  searchText: string = '';

  form!: FormGroup;
  dataListAllDoc: Documents[] = [];
  dataListAllProject: Projects[] = [];
  dataListAllUser: Users[] = [];

  form_uuid: string = '';
  form_number: string = '';
  form_ticket: string = '';
  form_status: string = '';
  document_uuid: string = '';
  document_name: string = '';
  project_uuid: string = '';
  project_name: string = '';
  approval_status: string = '';
  reason: string = '';
  created_by: string = '';
  created_at: string = '';
  updated_by: string = '';
  updated_at: string = '';
  deleted_by: string = '';
  deleted_at: string = '';

  isPublished: boolean = false;

  nama_analis: string = '';
  jabatan: string = '';
  departemen: string = '';
  jenis_perubahan: string = '';
  detail_dampak_perubahan: string = '';
  rencana_pengembangan_perubahan: string = '';
  rencana_pengujian_perubahan_sistem: string = '';
  rencana_rilis_perubahan_dan_implementasi: string = '';

  personal_name: string = '';
  name: string = '';
  position: string = '';
  role_sign: string = '';
  is_sign: boolean = false;


  user_uuid: any;
  user_name: any;
  role_code: any;

  maxDate: string = '';

  signatories = [];
  name1: string = '';
  name2: string = '';
  name3: string = '';
  name4: string = '';
  name5: string = '';

  position1: string = '';
  position2: string = '';
  position3: string = '';
  position4: string = '';
  position5: string = '';

  roleSign1: string = 'Pemohon';
  roleSign2: string = 'Atasan Pemohon';
  roleSign3: string = 'Penerima';
  roleSign4: string = 'Atasan Penerima';
  roleSign5: string = 'Atasan Pemohon';


  dataListFormDADetail: Detail[] = [];

  constructor(
    private cookieService: CookieService,
    private fb: FormBuilder,
    public formDaService: FormDaService,
    private datePipe: DatePipe,
    @Inject('apiUrl') private apiUrl: string
  ) {
    this.apiUrl = apiUrl;
  }

  dataListAllFormDA: formsDA[] = [];
  dataListAdminFormDA: formsDA[] = [];
  dataListUserFormDA: formsDA[] = [];


  ngOnInit(): void {
    this.profileData();

    this.listAllDoc();
    this.listAllProject();
    this.fetchAllUser();

    this.fetchDataFormDA();
    this.fetchDataAdminFormDA();
    this.fetchDataUserFormDA();
    this.fetchDocumentUUID();

    let auxDate = this.substractYearsToDate(new Date(), 0);
    this.maxDate = this.getDateFormateForSearch(auxDate);
  }

  substractYearsToDate(date: Date, years: number): Date {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

  getDateFormateForSearch(date: Date): string {
    let year = date.toLocaleDateString('es', { year: 'numeric' });
    let month = date.toLocaleDateString('es', { month: '2-digit' });
    let day = date.toLocaleDateString('es', { day: '2-digit' });
    return `${year}-${month}-${day}`;
  }


  matchesSearch(item: any): boolean {
    const searchText = this.searchText.toLowerCase();
    return (
      item.form_name && item.form_name.toLowerCase().includes(searchText) ||
      item.form_number && item.form_number.toLowerCase().includes(searchText) ||
      item.form_ticket && item.form_ticket.toLowerCase().includes(searchText) ||
      item.document_name && item.document_name.toLowerCase().includes(searchText) ||
      item.project_name && item.project_name.toLowerCase().includes(searchText)
    );
  }


  fetchDataFormDA() {
    axios.get(`${environment.apiUrl2}/dampak/analisa`)
      .then(response => {
        this.dataListAllFormDA = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.status === 500) {
          console.log(error.response.data);
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
        this.user_uuid = response.data.user_uuid;
        this.user_name = response.data.user_name;
        this.role_code = response.data.role_code;
      })
      .catch((error) => {
        if (error.response.status === 500 || error.response.status === 404) {
          console.log(error.response.data);
        }
      });
  }

  listAllDoc(): void {
    axios.get(`${environment.apiUrl2}/document`)
      .then((response) => {
        this.dataListAllDoc = response.data;
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data);
        } else {
          console.log(error.response.data);
        }
      });
  }

  listAllProject(): void {
    axios.get(`${environment.apiUrl2}/project`)
      .then((response) => {
        this.dataListAllProject = response.data;
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data);
        } else {
          console.log(error.response.data);
        }
      });
  }


  fetchDataAdminFormDA() {
    axios.get(`${environment.apiUrl2}/admin/da/all`,
      {
        headers: {
          Authorization: `Bearer ${this.cookieService.get('userToken')}`
        }
      })
      .then(response => {
        this.dataListAdminFormDA = response.data;
        console.log(response.data);

      })
      .catch(error => {
        if (error.response.status === 500) {
          console.log(error.response.data);
        } else {
          console.log(error.response.data);
        }
      });
  }


  fetchDataUserFormDA() {
    axios.get(`${environment.apiUrl2}/api/my/form/da`,
      {
        headers: {
          Authorization: `Bearer ${this.cookieService.get('userToken')}`
        }
      })
      .then(response => {
        this.dataListUserFormDA = response.data;
      })
      .catch(error => {
        if (error.response.status === 500) {
          console.log(error.response.data);
        } else {
          console.log(error.response.data);
        }
      });
  }

  fetchAllUser() {
    axios.get(`${this.apiUrl}/personal/name/all`)
      .then(response => {
        this.dataListAllUser = response.data;
      })
      .catch(error => {
        if (error.response.status === 500) {
          console.log(error.response.data);
        } else {
          console.log(error.response.data);
        }
      });
  }

  fetchDocumentUUID(): void {
    axios.get(`${environment.apiUrl2}/form/da/code`)
      .then(response => {
        this.document_uuid = response.data.document_uuid;
        console.log('Document UUID:', this.document_uuid);
      })
      .catch(error => {
        console.error('Error fetching document UUID:', error);
      });
  }
  
  
  openModalAddFormDA() {
    $('#addModalFormDA').modal('show');
  }

  addFormDA(): void {
    const token = this.cookieService.get('userToken');
    console.log('Document UUID:', this.document_uuid);
    
    const requestDataFormDA = {
      isPublished: false,
      formData: {
        document_uuid: this.document_uuid,
        form_ticket: this.form_ticket,
        project_uuid: this.project_uuid,
      },
      data_da: {
        nama_analis: this.nama_analis,
        jabatan: this.jabatan,
        departemen: this.departemen,
        jenis_perubahan: this.jenis_perubahan,
        detail_dampak_perubahan: this.detail_dampak_perubahan,
        rencana_pengujian_perubahan_sistem: this.rencana_pengujian_perubahan_sistem,
        rencana_rilis_perubahan_dan_implementasi: this.rencana_rilis_perubahan_dan_implementasi,
      },
      signatories: [
        {
          name: this.name1,
          position: this.position1,
          role_sign: this.roleSign1,
        },
        {
          name: this.name2,
          position: this.position2,
          role_sign: this.roleSign2,
        },
        {
          name: this.name3,
          position: this.position3,
          role_sign: this.roleSign3,
        },
        {
          name: this.name4,
          position: this.position4,
          role_sign: this.roleSign4,
        },
        {
          name: this.name5,
          postion: this.position5,
          role_sign: this.roleSign5,
        }
      ],
    }

    console.log(this.document_uuid);
    axios.post(`${environment.apiUrl2}/api/add/da`, requestDataFormDA,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'SUCCESS',
          text: response.data.message
        })
        $('#addModalFormITCM').modal('hide');
        this.fetchDataFormDA();
        this.fetchDataAdminFormDA();
        this.fetchDataUserFormDA();
      })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.status === 401 || error.response.status === 500 || error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: error.response.data.message
          })
        }
      });
  }

  getSpecificFormDA(form_uuid: string) {
    axios.get(`${environment.apiUrl2}/dampak/analisa/${form_uuid}`)
      .then((response) => {
        console.log(response);
        $('#updateModalDA').modal('show');
        const formData = response.data;
        this.form_uuid = formData.form_uuid;
        this.form_number = formData.form_number;
        this.form_ticket = formData.form_ticket;
        this.form_status = formData.form_status;
        this.document_name = formData.document_name;
        this.project_name = formData.project_name;
        this.nama_analis = formData.nama_analis;
        this.jabatan = formData.jabatan;
        this.departemen = formData.departemen;
        this.jenis_perubahan = formData.jenis_perubahan;
        this.detail_dampak_perubahan = formData.detail_dampak_perubahan;
        this.rencana_pengembangan_perubahan = formData.rencana_pengembangan_perubahan;
        this.rencana_pengujian_perubahan_sistem = formData.rencana_pengujian_perubahan_sistem;
        this.rencana_rilis_perubahan_dan_implementasi = formData.rencana_rilis_perubahan_dan_implementasi;
      })
      .catch(error => {
        if (error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        } else {
          console.log(error.response.data);
        }
      });
  }

  updateFormDA() {
    axios.put(`${environment.apiUrl2}/api/dampak/analisa/update/${this.form_uuid}`, {
      formData: {
        document_uuid: this.document_uuid,
        form_ticket: this.form_ticket,
        project_uuid: this.project_uuid,
      },
      data_da: {
        nama_analis: this.nama_analis,
        jabatan: this.jabatan,
        departemen: this.departemen,
        jenis_perubahan: this.jenis_perubahan,
        detail_dampak_perubahan: this.detail_dampak_perubahan,
        rencana_pengujian_perubahan_sistem: this.rencana_pengujian_perubahan_sistem,
        rencana_rilis_perubahan_dan_implementasi: this.rencana_rilis_perubahan_dan_implementasi,
      },
    },
      {
        headers: {
          Authorization: `Bearer ${this.cookieService.get('userToken')}`
        }
      })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'SUCCESS',
          text: response.data.message
        })
        $('#updateModalDA').modal('hide');
        this.fetchDataFormDA();
        this.fetchDataAdminFormDA();
        this.fetchDataUserFormDA();
      })
      .catch(error => {
        if (error.response.status === 404 || error.response.status === 500 || error.response.status === 422 || error.response.status === 400) {
          console.log(error.response)
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'in'
          })
        }
      });
  }

  getSpecificFormDADetail(form_uuid: string) {
    axios.get(`${environment.apiUrl2}/da/${form_uuid}`)
      .then((response) => {
        $('#detailModalDA').modal('show');
        console.log(response);
        const formData = response.data.form;
        this.form_ticket = formData.form_ticket;
        this.form_status = formData.form_status;
        this.form_number = formData.form_number;
        this.document_name = formData.document_name;
        this.project_name = formData.project_name;
        this.approval_status = formData.approval_status;
        this.reason = formData.reason?.String || '';
        this.nama_analis = formData.nama_analis;
        this.jabatan = formData.jabatan;
        this.departemen = formData.departemen;
        this.jenis_perubahan = formData.jenis_perubahan;
        this.detail_dampak_perubahan = formData.detail_dampak_perubahan;
        this.rencana_pengembangan_perubahan = formData.rencana_pengembangan_perubahan;
        this.rencana_pengujian_perubahan_sistem = formData.rencana_pengujian_perubahan_sistem;
        this.rencana_rilis_perubahan_dan_implementasi = formData.rencana_rilis_perubahan_dan_implementasi;

        if (response.data.signatories !== null) {
          const signatories = response.data.signatories;
          this.name1 = signatories.name1 || '';
          this.position1 = signatories.position1 || '';
          this.name2 = signatories.name2 || '';
          this.position2 = signatories.position2 || '';
        } else {
          this.name1 = "lawa";
          this.position1 = "intern";
          this.name2 = "budi";
          this.position2 = "HC";

          console.log('Data signatories kosong');
        }
        
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          console.error(error);
        }
      });
  }


  onDeleteFormDA(form_uuid: string) {
    Swal.fire({
      title: "Konfirmasi",
      text: "Anda yakin ingin menghapus Formulir ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        this.performDeleteFormDA(form_uuid);
      }
    })
  }

  performDeleteFormDA(form_uuid: string) {
    axios.put(`${environment.apiUrl2}/api/form/delete/${form_uuid}`,
      {}, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('userToken')}`
      }
    })
      .then((response) => {
        console.log(response.data.message);
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });
        this.fetchDataFormDA();
        this.fetchDataAdminFormDA();
        this.fetchDataUserFormDA();
      })
      .catch((error) => {
        if (error.response.status === 404 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      })
  }
}

export { formsDA };