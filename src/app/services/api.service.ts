import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public isLoading = new BehaviorSubject(false);

 

}
