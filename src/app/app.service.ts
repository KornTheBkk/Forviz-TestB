import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

  private url: string = 'https://uinames.com/api/?ext&amount=25';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any[]>(this.url);
  }

}
