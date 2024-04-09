import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RectangleData } from '../interfaces/rectangle.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RectangleService {
  constructor(private http: HttpClient) {}

  API_URL = `${environment.apiUrl}RectangleSVG`;

  getInitialRectangleData(): Observable<RectangleData> {
    return this.http.get<RectangleData>(this.API_URL);
  }

  updateRectangleData(data: RectangleData): Observable<any> {
    return this.http.put(this.API_URL, data);
  }
}
