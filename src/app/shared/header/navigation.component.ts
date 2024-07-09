import { Component, AfterViewInit, EventEmitter, Output, Inject } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';



declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  user_uuid = '';
  user_name = '';
  role_code = '';

  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  private apiUrl: string;

  constructor(private modalService: NgbModal, private cookieService: CookieService, private router: Router, @Inject('apiUrl') apiUrl: string ) {
    this.apiUrl = apiUrl;
  }

  ngOnInit() {
    this.fetchProfileData();
  }
  ngAfterViewInit() { }

  onProfile() {
    this.router.navigateByUrl('/main/profile');
  }

  goToProfile() {
    this.router.navigateByUrl('/main/profile');
  }

  fetchProfileData() {
    const token = this.cookieService.get('userToken');
    
    axios.get(`${this.apiUrl}/auth/my/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      this.user_uuid = response.data.user_uuid;
      this.user_name = response.data.user_name;
      this.role_code = response.data.role_code;
    })
    .catch((error) => {
      if (error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }
  onLogout() {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performLogout();
      }
    });
  }

  goToChangePassword() {
    this.router.navigateByUrl('/main/profile/change-password');
  }

  performLogout() {
    const token = this.cookieService.get('userToken');
    axios
      .post(`${this.apiUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.cookieService.delete('userToken');
        console.log(response.data.message);
        Swal.fire({
          title: 'Success',
          text: 'Logout Berhasil',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
          });
        }
      });
  }
}
