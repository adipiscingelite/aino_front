import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProductService } from '../component-service/product-service/product-service.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';


interface Product {
  product_uuid: string;
  product_name: string;
  product_owner: string;
  product_order: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit {

  searchText: string = '';

  product_uuid: string = '';
  product_name: string = '';
  product_owner: string = '';
  product_order: string = '';
  created_by: string = '';
  created_at: string = '';
  updated_by: string = '';
  updated_at: string = '';
  deleted_by: string = '';
  deleted_at: string = '';
  user_uuid: any;
  user_name: any;
  role_code: any;

  constructor(
    private cookieService: CookieService,
    public productService: ProductService,
    @Inject('apiUrl') private apiUrl: string
    ) {
      this.apiUrl = apiUrl;
    }

  dataListProduct: any[] = [];

  ngOnInit(): void {
    this.fetchDataProduct();
    this.profileData();
  }

  matchesSearch(item: any): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.product_name.toLowerCase().includes(searchLowerCase) ||
      item.product_owner.toLowerCase().includes(searchLowerCase)
    );
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
        console.log(error);
      });
  }

  fetchDataProduct(): void {
    axios.get(`${environment.apiUrl2}/product`)
    .then((response) => {
      this.dataListProduct = response.data;
      this.productService.updateDataListProduct(this.dataListProduct);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    });
  }

  addProductModal() {
    $('#addProductModal').modal('show');
    this.product_name = '';
    this.product_owner = '';

  }

  addProduct(): void {
    const token = this.cookieService.get('userToken');
    axios.post(`${environment.apiUrl2}/superadmin/product/add`, {
      product_name: this.product_name,
      product_owner: this.product_owner
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
      this.fetchDataProduct();
      $('#addProjectModal').modal('hide');
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Product baru ditambahkan',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        $('#addProductModal').modal('hide');
      }
    });
  }

  getSpecificProduct(product_uuid: string) {
    axios.get(`${environment.apiUrl2}/product/${product_uuid}`)
    .then((response) => {
      console.log(response.data);
      this.product_uuid = response.data.product_uuid;
      this.product_name = response.data.product_name;
      this.product_owner = response.data.product_owner;
      $('#editProductModal').modal('show');
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        $('#editProductModal').modal('hide');
      }
    });
  }

  updateProduct(): void {
    const token = this.cookieService.get('userToken');
    axios.put(`${environment.apiUrl2}/superadmin/product/update/${this.product_uuid}`, {
      product_name: this.product_name,
      product_owner: this.product_owner
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
      this.fetchDataProduct();
      $('#editProductModal').modal('hide');
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Produk diperbarui',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 500 || error.response.status === 404 || error.response.status === 422 || error.response.status === 400) {
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
}

export { Product };