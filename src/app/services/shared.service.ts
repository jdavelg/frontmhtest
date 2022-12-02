import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = 'https://localhost:7000/api/';
  }

  updateStudent(data: any): Observable<any> {
    return this._http.put(this.url+'students/'+data.id, data);
  }

  saveStudent(data: any): Observable<any> {
    return this._http.post(this.url+'students', data);
  }
  getStudents(): Observable<any> {
    return this._http.get(this.url+'students');
  }

  getStudent(id?: any): Observable<any> {
    return this._http.get('url');
  }

  deleteStudent(id: any) {
    return this._http.delete(this.url+'students/'+id);
  }
  updateScore(data: any): Observable<any> {
    return this._http.put(this.url+'scores/'+data.id, data);
  }

  saveScore(data: any): Observable<any> {
    return this._http.post(this.url+'scores/', data);
  }
  getScores(): Observable<any> {
    return this._http.get(this.url+"scores");
  }

  getScore(id?: any): Observable<any> {
    return this._http.get('url');
  }

  deleteScore(id: any) {
    return this._http.delete(this.url+'scores/'+id);
  }
}
