import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  activeSubMenu: RouteInfo | null = null;
  public sidebarnavItems: RouteInfo[] = [];
  isDropdownOpen = false;
  isDropdownMenuTitleActive = '';
  role_code = '';
  user_uuid: any;
  user_name: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    @Inject('apiUrl') private apiUrl: string
  ) {}

  // End open close
  ngOnInit(): void {
    this.fetchProfileData();
    console.log('ngOnInit executed');
  }
  fetchProfileData() {
    const token = this.cookieService.get('userToken');
    console.log('Token:', token);

    axios
      .get(`${this.apiUrl}/auth/my/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.sidebarnavItems = ROUTES.filter(
          (sidebarnavItem) =>
            sidebarnavItem &&
            (!sidebarnavItem.role_code ||
              sidebarnavItem.role_code.includes(this.role_code))
        );
        console.log('Filtered Sidebar Items:', this.sidebarnavItems);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message);
        }
      });
  }

  // mockProfileData() {
  //   this.user_uuid = 'mock-uuid';
  //   this.user_name = 'Mock User';
  //   this.role_code = 'SA'; // role yang sesuai untuk testing

  //   this.sidebarnavItems = ROUTES.filter(sidebarnavItem =>
  //     sidebarnavItem &&
  //     (!sidebarnavItem.role_code || sidebarnavItem.role_code.includes(this.role_code))
  //   );

  //   console.log('Filtered Sidebar Items with Mock Data:', this.sidebarnavItems);
  // }

  
  // this is for the open close
  addExpandClass(element: string): void {
    if (element === this.showMenu) {
      this.showMenu = '';
    } else {
      this.showMenu = element;
    }
  }

  toggleSubMenu(sidebarnavItem: RouteInfo): void {
    if (this.isSubMenuActive(sidebarnavItem)) {
      this.activeSubMenu = null;
    } else {
      this.activeSubMenu = sidebarnavItem;
    }
  }

  isSubMenuActive(sidebarnavItem: RouteInfo): boolean {
    return this.activeSubMenu === sidebarnavItem;
  }

  toggleDropdown(sidebarnavItem: RouteInfo): void {
    sidebarnavItem.isDropdownOpen = !sidebarnavItem.isDropdownOpen;
  }
}
