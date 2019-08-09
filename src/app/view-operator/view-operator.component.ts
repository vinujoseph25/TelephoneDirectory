import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { OperatorCollection } from '../operator-collection';

@Component({
  selector: 'app-view-operator',
  templateUrl: './view-operator.component.html',
  styleUrls: ['./view-operator.component.scss']
})
export class ViewOperatorComponent implements OnInit {

  operatorCollection: OperatorCollection;
  public data;
  appTitle: string = 'Operator List';

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.data = this._dataService.getOption();
    if (this.data['operatorCollection']) {
      this.operatorCollection = this.data['operatorCollection'];
    } else if (localStorage.getItem('operatorCollection') != null) {
      this.operatorCollection = JSON.parse(localStorage.getItem('operatorCollection'));
    }
  }

}
