import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { documents } from '../../master-doc/master-doc.component';

@Injectable({
  providedIn: 'root'
})
export class MasterDocServiceService {
  private dataListDocSubject = new BehaviorSubject<documents[]>([]);
  dataListDoc$ = this.dataListDocSubject.asObservable();

  updateDataListDoc(dataList: documents[]) {
    this.dataListDocSubject.next(dataList);
  }

  constructor() { }
}
