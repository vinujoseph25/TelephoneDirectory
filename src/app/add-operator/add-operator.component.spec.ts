import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AddOperatorComponent } from './add-operator.component';
import { OperatorCollection } from '../operator-collection';

describe('AddOperatorComponent', () => {
  let component: AddOperatorComponent;
  let fixture: ComponentFixture<AddOperatorComponent>;
  let expected: OperatorCollection;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [AddOperatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expected = {
      priceListCollection: [
        {
          operatorName: 'A',
          priceList: [
            {
              prefix: '1234',
              cost: 1
            }
          ]
        }
      ]
    };
  });

  it('Operator Collection Form invalid when empty', () => {
    expect(component.priceListCollectionForm.valid).toBeFalsy();
    let priceListCollectionForm = component.priceListCollectionForm.controls['priceListCollection'];
    // expect(priceListCollectionForm.valid).toBeFalsy();
  });

  it('Operator Collection Form should update from form changes', () => {
    expect(component.priceListCollectionForm.valid).toBeFalsy();
    component.priceListCollectionForm.setControl('priceListCollection', component.populateOperator(expected.priceListCollection));
    expect(component.priceListCollectionForm.valid).toBeTruthy();
    expect(component.priceListCollectionForm.value).toEqual(expected);
  });

  it('Operator Collection saved/retirved to/from local storage', () => {
    let tempOperatorCollection: OperatorCollection;
    expect(component.priceListCollectionForm.valid).toBeFalsy();
    component.priceListCollectionForm.setControl('priceListCollection', component.populateOperator(expected.priceListCollection));
    component.saveAllOperatorCollection(component.priceListCollectionForm.value);
    expect(component.priceListCollectionForm.valid).toBeTruthy();
    tempOperatorCollection = component.findAllOperatorCollection();
    component.clearAllOperatorCollection();
    expect(tempOperatorCollection).toEqual(expected);
  });

});
