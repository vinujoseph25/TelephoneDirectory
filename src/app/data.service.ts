import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = {};

 setOption(option, value) {
    this.data[option] = value;
  }

  getOption() {
    return this.data;
  }
}
