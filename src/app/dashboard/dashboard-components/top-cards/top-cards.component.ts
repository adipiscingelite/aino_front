import { Component, OnInit } from '@angular/core';
import { topcard, topcards } from './top-cards-data';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards: topcard[];
  dataListAllFormDA: any[] = [];
  dataListFormITCM: any[] = [];
  dataListAllBA: any[] = [];

  constructor() {
    this.topcards = topcards;
  }

  ngOnInit(): void {
    this.fetchDataFormDA();
    this.fetchDataFormITCM();
    this.fetchAllDataBA();
  }

  fetchDataFormDA(): void {
    axios.get(`${environment.apiUrl2}/dampak/analisa`)
      .then(response => {
        if (response.data) {
          this.dataListAllFormDA = response.data;
          console.log(response.data);
          this.topcards[0].subtitle = this.dataListAllFormDA.length;
        } else {
          console.log('Data is null');
          this.topcards[0].subtitle = 0;
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 500) {
            console.log(error.response.data.message);
          }
        } else {
          console.error(error);
        }
      });
  }

  fetchDataFormITCM(): void {
    axios.get(`${environment.apiUrl2}/form/itcm`)
      .then(response => {
        if (response.data) {
          this.dataListFormITCM = response.data;
          console.log(response.data);
          this.topcards[1].subtitle = this.dataListFormITCM.length;
        } else {
          console.log('Data is null');
          this.topcards[1].subtitle = 0;
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 500) {
            console.log(error.response.data.message);
          } else if (error.response.status === 404) {
            console.log(error.response.data.message);
          }
        } else {
          console.error(error);
        }
      });
  }

  fetchAllDataBA(): void {
    axios.get(`${environment.apiUrl2}/form/ba`)
      .then(response => {
        if (response.data) {
          this.dataListAllBA = response.data;
          console.log(response.data);
          this.topcards[2].subtitle = this.dataListAllBA.length;
        } else {
          console.log('Data is null');
          this.topcards[2].subtitle = 0;
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 500) {
            console.log(error.response.data.message);
          }
        } else {
          console.error(error);
        }
      });
  }
}
