import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrandparentService {
  private apiUrl = 'http://localhost:8080/parents';

  constructor(private http: HttpClient) { }

  getAllParents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
