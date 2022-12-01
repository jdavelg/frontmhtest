import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private _http: HttpClient) {}

  updateStudent(data: any): Observable<any> {
    return this._http.patch('url', {});
  }

  saveStudent(data: any): Observable<any> {
    return this._http.post('url', {});
  }
  getStudents(): Observable<any> {
    return this._http.get('url');
  } 

  getStudent(id?: any): Observable<any> {
    return this._http.get('url');
  }

  deleteStudent(id:any){
    return this._http.delete('deleteurl');
  }
  updateScore(data: any): Observable<any> {
    return this._http.patch('url', {});
  }

  saveScore(data: any): Observable<any> {
    return this._http.post('url', {});
  }
  getScores(): Observable<any> {
    return this._http.get('url');
  }

  getScore(id?: any): Observable<any> {
    return this._http.get('url');
  }

  deleteScore(id:any){
    return this._http.delete('deleteurl');
  }
}
