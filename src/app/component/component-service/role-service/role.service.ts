import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../../access-group/access-group.component';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private dataListRole = new BehaviorSubject<Role[]>([]);
  dataListRole$ = this.dataListRole.asObservable();

  updateDataListRole(dataList: Role[]) {
    this.dataListRole.next(dataList);
  }
  constructor() { }
}
