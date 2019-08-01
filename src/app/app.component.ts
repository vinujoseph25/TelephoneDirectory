import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { OperatorCollection, Operator, Item, FinalItem } from './operator-collection'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  telephoneNumberForm: FormGroup;
  submitted = false;
  resultHide = false;
  success = false;
  priceListCollectionForm: FormGroup;
  operatorCollection: OperatorCollection;
  storedOperatorCollection: OperatorCollection;
  item: Item;
  finalArray: FinalItem[];
  finalItem: FinalItem;
  operatorName: string;

  constructor(private fb: FormBuilder) {
    this.telephoneNumberForm = this.fb.group({
      telephoneNumber: ['', Validators.required]
    })
  }

  logToConsole(object: any) {
    console.log(object);
  }

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
  }

  addItem(item) {
    item.get("priceList").push(this.priceList);
  }

  deleteItem(item, index) {
    item.get("priceList").removeAt(index);
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

  saveOperator() {
    if (this.priceListCollectionForm.invalid) {
      return;
    }
    this.operatorCollection = this.priceListCollectionForm.value;
    localStorage.setItem('operatorCollection', JSON.stringify(this.operatorCollection));
  }

  findAllOperatorCollection(): OperatorCollection {
    if (localStorage.getItem('operatorCollection') != null) {
      return JSON.parse(localStorage.getItem('operatorCollection'));
    }
    return null;
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
        } else if (this.finalItem.cost = element.cost) {
          this.finalItem.operatorName = this.finalItem.operatorName + " & " + element.operatorName;
        }
      }
    } else {
      this.finalItem = null;
    }
  }
}
