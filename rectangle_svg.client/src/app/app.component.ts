import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
interface RectangleData {
  x: number;
  y: number;
  width: number;
  height: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // public forecasts: WeatherForecast[] = [];

  // constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getForecasts();

    // this.getDatwa();
  }

  // getForecasts() {
  //   this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
  //     (result) => {
  //       this.forecasts = result;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  // getData(): Observable<any> {
  //   return this.http.get('/api/rectanglesvg', { responseType: 'text' });
  // }
  // getDatwa() {

  //   this.getData().subscribe(
  //     (result: any) => {
  //       console.log(result);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  // title = 'rectangle_svg.client';
}
