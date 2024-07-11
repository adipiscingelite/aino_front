import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    private cookieService: CookieService,
    @Inject('apiUrl') private apiUrl: string
  ) {}

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
        const profileData = response.data;
        const userUuid = profileData.user_uuid;
        this.fetchUserData(userUuid, token);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          console.log(error.response.data.message);
        }
      });
  }

  fetchUserData(userUuid: string, token: string) {
    axios
      .get(`${this.apiUrl}/user/${userUuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          console.log(error.response.data.message);
        }
      });
  }
}
