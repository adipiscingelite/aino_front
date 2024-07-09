import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { forms } from '../../form-list/form-list.component';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private dataListFormSubject = new BehaviorSubject<forms[]>([]);
  dataListForm$ = this.dataListFormSubject.asObservable();

  updateDataListForm(dataList: forms[]) {
    this.dataListFormSubject.next(dataList);
  }
}
