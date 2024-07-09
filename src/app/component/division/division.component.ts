import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { DivisionService } from '../component-service/division-service/division.service';

declare var $: any;

interface Division {
  division_uuid: string;
  division_order: number;
  division_code: string;
  division_title: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  searchText: string = '';

  division_uuid: string = '';
  division_code: string = '';
  division_title: string = '';  
  user_uuid: any;
  user_name: any;
  role_code: any;

  constructor(
    private cookieService: CookieService,
    public divisionService: DivisionService,
    @Inject('apiUrl') private apiUrl: string
  ) { 

    this.apiUrl = apiUrl;
  }


  dataListDivision: Division[] = [];

  ngOnInit(): void {
    this.fetchDataDivision();
    this.profileData();
  }

  matchesSearch(item: Division): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.division_code.toLowerCase().includes(searchLowerCase) ||
      item.division_title.toLowerCase().includes(searchLowerCase)
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchDataDivision(): void {
    axios.get(`${this.apiUrl}/division/all`)
      .then((response) => {
        this.dataListDivision = response.data;
        this.divisionService.updateDataListDivision(this.dataListDivision);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }

  addDivisionModal() {
    $('#addDivisionModal').modal('show');
    this.division_code = '';
    this.division_title = '';
  }

  addDivision() {
    const token = this.cookieService.get('userToken');

    axios.post(`${this.apiUrl}/superadmin/division/add`,
      { division_code: this.division_code, division_title: this.division_title },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data.message);
        this.fetchDataDivision();
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        $('#addDivisionModal').modal('hide');
        this.division_code = '';
        this.division_title = '';
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
            text: 'Terjadi kesalahan',
            icon: 'error'
          });
        }
      });
  }
  

  getSpecDiv(divisionUuid: string): void {
    axios.get(`${this.apiUrl}/division/` + divisionUuid)
    .then((response) => {
      const divisionData = response.data;
      console.log(divisionData);
      this.division_uuid = divisionData.division_uuid;
      this.division_code = divisionData.division_code;
      this.division_title = divisionData.division_title;

      $('#editDivisionModal').modal('show');
    })
    .catch((error) => {
      if (error.response.status === 500 || error.response.status === 404) {
        console.log(error.response.data.message)
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error.response)
      }
    })
  }

  updateDivision(): void {
    const token = this.cookieService.get('userToken');
    const divisionUuid = this.division_uuid;
  
    axios.put(`${this.apiUrl}/superadmin/division/update/${divisionUuid}`,
      { division_code: this.division_code, division_title: this.division_title },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data.message);
        this.fetchDataDivision();
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
  
        $('#editDivisionModal').modal('hide');
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 422 || error.response.status === 404 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
  
  
}

export { Division };