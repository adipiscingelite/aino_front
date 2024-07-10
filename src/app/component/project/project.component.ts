import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProjectService } from '../component-service/project-service/project-service.service';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

declare var $: any;

interface Project {
  project_uuid: string;
  product_name: string;
  project_name: string;
  project_code: string;
  project_manager: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

interface Product {
  product_uuid: string;
  product_name: string;
}
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  searchText: string = '';

  product!: FormGroup;

  itemProduct!: FormGroup;
  project_uuid: string = '';
  product_uuid: string = '';
  product_name: string = '';
  project_name: string = '';
  project_code: string = '';
  project_manager: string = '';
  created_by: string = '';
  created_at: string = '';
  updated_by: string = '';
  updated_at: string = '';
  deleted_by: string = '';
  deleted_at: string = '';

  dataListProduct: Product[] = [];
  user_uuid: any;
  user_name: any;
  role_code: any;

  constructor(
    private cookieService: CookieService,
    public projectService: ProjectService,
    private fb: FormBuilder,
    private formGroupDirective: FormGroupDirective,
    @Inject('apiUrl') private apiUrl: string
  ) {
    this.apiUrl = apiUrl;
  }

  dataListProject: any[] = [];

  ngOnInit(): void {
    this.fetchDataProject();
    this.fetchDataProduct();
    this.profileData();

    this.product = this.fb.group({
      product_uuid: [''],
      product_name: [''],
    });

    this.fetchDataProduct();
  }

  matchesSearch(item: any): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.product_name.toLowerCase().includes(searchLowerCase) ||
      item.project_name.toLowerCase().includes(searchLowerCase) ||
      item.project_code.toLowerCase().includes(searchLowerCase) ||
      item.project_manager.toLowerCase().includes(searchLowerCase)
    );
  }

  profileData(): void {
    const token = this.cookieService.get('userToken');

    axios
      .get(`${this.apiUrl}/auth/my/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  fetchDataProject(): void {
    axios
      .get(`${environment.apiUrl2}/project`)
      .then((response) => {
        this.dataListProject = response.data;
        this.projectService.updateDataListProject(this.dataListProject);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
  }

  fetchDataProduct(): void {
    axios
      .get(`${environment.apiUrl2}/product`)
      .then((response) => {
        this.dataListProduct = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error);
        }
      });
  }

  addProjectModal() {
    $('#addProjectModal').modal('show');
    this.fetchDataProduct();
    this.project_name = '';
    this.project_code = '';
    this.project_manager = '';
  }

  addProject(): void {
    axios
      .post(
        `${environment.apiUrl2}/superadmin/project/add`,
        {
          product_uuid: this.product_uuid,
          project_name: this.project_name,
          project_code: this.project_code,
          project_manager: this.project_manager,
        },
        {
          headers: {
            Authorization: `Bearer ${this.cookieService.get('userToken')}`,
          },
        }
      )
      .then((response) => {
        this.dataListProject = response.data;
        this.fetchDataProject();
        $('#addProjectModal').modal('hide');
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Project baru ditambahkan',
        });
        this.fetchDataProduct();
        this.project_name = '';
        this.project_code = '';
        this.project_manager = '';
      })
      .catch((error) => {
        if (
          error.response.status === 500 ||
          error.response.status === 400 ||
          error.response.status === 422
        ) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
    console.log(this.product_uuid);
    console.log(this.project_name);
    console.log(this.project_code);
    console.log(this.project_manager);
  }

  getSpecificProject(project_uuid: string) {
    axios
      .get(`${environment.apiUrl2}/project/${project_uuid}`)
      .then((response) => {
        this.project_uuid = response.data.project_uuid;
        this.project_name = response.data.project_name;
        this.project_code = response.data.project_code;
        this.project_manager = response.data.project_manager;

        const existingProduct = this.dataListProduct.find(
          (product) => product.product_name === response.data.product_name
        );

        this.product.patchValue({
          product_uuid: existingProduct ? existingProduct.product_uuid : '',
        });

        console.log(response.data);

        $('#editProjectModal').modal('show');
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
  }

  updateProject(): void {
    const productFormValue = this.product.value;
    axios
      .put(
        `${environment.apiUrl2}/superadmin/project/update/${this.project_uuid}`,
        {
          product_uuid: productFormValue.product_uuid,
          project_code: this.project_code,
          project_manager: this.project_manager,
        },
        {
          headers: {
            Authorization: `Bearer ${this.cookieService.get('userToken')}`,
          },
        }
      )
      .then((response) => {
        this.dataListProject = response.data;
        this.fetchDataProject();
        $('#editProjectModal').modal('hide');
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Project berhasil diperbarui',
        });
      })
      .catch((error) => {
        if (
          error.response.status === 500 ||
          error.response.status === 400 ||
          error.response.status === 422 ||
          error.response.status === 404
        ) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
  }
}

export { Project };
