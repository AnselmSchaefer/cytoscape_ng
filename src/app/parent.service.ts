import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = 'http://localhost:8080/children';

  constructor(private http: HttpClient) { }

  getAllChildren(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
