import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataListUsers = new BehaviorSubject<Users[]>([]);
  dataListUser$ = this.dataListUsers.asObservable();

  updateDataListUsers(dataList: Users[]) {
    this.dataListUsers.next(dataList);
  }

  constructor() { }
}