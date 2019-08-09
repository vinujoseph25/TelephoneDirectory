import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { OperatorCollection, Item, FinalItem } from '../operator-collection'
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data;
  telephoneNumberForm: FormGroup;
  submitted = false;
  resultHide = false;
  success = false;
  operatorCollection: OperatorCollection;
  item: Item;
  finalArray: FinalItem[];
  finalItem: FinalItem ;
  operatorName: string;

  constructor(private _dataService: DataService, private fb: FormBuilder) {
    this.telephoneNumberForm = this.fb.group({
      telephoneNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.data = this._dataService.getOption();
    if (this.data['operatorCollection']) {
      this.operatorCollection = this.data['operatorCollection'];
    } else if (localStorage.getItem('operatorCollection') != null) {
      this.operatorCollection = JSON.parse(localStorage.getItem('operatorCollection'));
    }
  }

  onSubmit() {
    this.submitted = true;
    this.resultHide = true;
    if (this.telephoneNumberForm.invalid) {
      return;
    }
    this.success = true;
    this.finalArray = null;
    let telephoneNumber: string = this.telephoneNumberForm.controls.telephoneNumber.value;
    for (let outerIndex = 0; outerIndex < this.operatorCollection.priceListCollection.length; outerIndex++) {
      const tempOperator = this.operatorCollection.priceListCollection[outerIndex];
      this.item = null;
      for (let innerIndex = 0; innerIndex < tempOperator.priceList.length; innerIndex++) {
        const tempItem = tempOperator.priceList[innerIndex];
        if (telephoneNumber.indexOf(tempItem.prefix) === 0) {
          if (!this.item) {
            this.item = tempItem;
          } else if (this.item.prefix.length < tempItem.prefix.length) {
            this.item = tempItem;
          }
          this.operatorName = tempOperator.operatorName;
        }
      }
      if (this.item) {
        if (!this.finalArray) {
          this.finalArray = [
            {
              operatorName: this.operatorName,
              prefix: this.item.prefix,
              cost: this.item.cost
            }
          ];
        } else {
          this.finalArray.push({
            operatorName: this.operatorName,
            prefix: this.item.prefix,
            cost: this.item.cost
          });
        }
      }
    }
    if (this.finalArray && this.finalArray[0].operatorName !== '') {
      this.finalItem = null;
      for (let index = 0; index < this.finalArray.length; index++) {
        const element = this.finalArray[index];
        if (!this.finalItem) {
          this.finalItem = element;
        } else if (this.finalItem.cost > element.cost) {
          this.finalItem = element;
        } else if (this.finalItem.cost == element.cost) {
          this.finalItem.operatorName = this.finalItem.operatorName + " & " + element.operatorName;
        }
      }
    } else {
      this.finalItem = null;
    }
    return this.finalItem;
  }

  keyPressPrefix(event: any) {
    this.resultHide = false;
    let pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
