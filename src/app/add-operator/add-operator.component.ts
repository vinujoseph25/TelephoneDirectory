import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { OperatorCollection, Operator, Item } from '../operator-collection'
import { DataService } from '../data.service'

@Component({
  selector: 'app-add-operator',
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.scss']
})
export class AddOperatorComponent implements OnInit {

  resultHide = false;
  priceListCollectionForm: FormGroup;
  operatorCollection: OperatorCollection;
  storedOperatorCollection: OperatorCollection;

  constructor(private fb: FormBuilder, private _dataService: DataService) { }

  ngOnInit() {
    this.priceListCollectionForm = this.fb.group({
      'priceListCollection': this.fb.array([this.priceListCollection])
    });

    this.storedOperatorCollection = this.findAllOperatorCollection();
    if (this.storedOperatorCollection) {
      this.populateOperatorCollection(this.storedOperatorCollection);
    }
  }

  get priceListCollection(): FormGroup {
    return this.fb.group({
      'operatorName': ['', Validators.required],
      'priceList': this.fb.array([this.priceList])
    });
  }

  get priceList(): FormGroup {
    return this.fb.group({
      'prefix': ['', Validators.required],
      'cost': ['', Validators.required]
    });
  }

  addOperator() {
    (this.priceListCollectionForm.get("priceListCollection") as FormArray).push(this.priceListCollection);
  }

  deleteOperator(index) {
    (this.priceListCollectionForm.get("priceListCollection") as FormArray).removeAt(index);
    this.saveOperator();
  }

  addItem(item) {
    item.get("priceList").push(this.priceList);
  }

  deleteItem(item, index) {
    item.get("priceList").removeAt(index);
  }

  saveOperator() {
    if (this.priceListCollectionForm.invalid) {
      return;
    }
    this.operatorCollection = this.priceListCollectionForm.value;
    this._dataService.setOption('operatorCollection', this.operatorCollection);
    this.saveAllOperatorCollection(this.operatorCollection);
  }

  saveAllOperatorCollection(operatorCollection: OperatorCollection) {
    localStorage.setItem('operatorCollection', JSON.stringify(operatorCollection));
  }

  findAllOperatorCollection(): OperatorCollection {
    if (localStorage.getItem('operatorCollection') != null) {
      return JSON.parse(localStorage.getItem('operatorCollection'));
    }
    return null;
  }

  clearAllOperatorCollection() {
    localStorage.clear();
  }
  populateItem(storedItem: Item[]): FormArray {
    const formArray = new FormArray([]);
    storedItem.forEach(item => {
      formArray.push(this.fb.group({
        'prefix': item.prefix,
        'cost': item.cost
      }));
    });
    return formArray;
  }

  populateOperator(storedOperator: Operator[]): FormArray {
    const formArray = new FormArray([]);
    storedOperator.forEach(operator => {
      formArray.push(this.fb.group({
        'operatorName': operator.operatorName,
        'priceList': this.populateItem(operator.priceList)
      }));
    });
    return formArray;
  }

  populateOperatorCollection(storedOperatorCollection: OperatorCollection) {
    this.priceListCollectionForm.setControl('priceListCollection', this.populateOperator(storedOperatorCollection.priceListCollection));
  }

  keyPressPrefix(event: any) {
    this.resultHide = false;
    let pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressCost(event: any) {
    const pattern = /[0-9\.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
