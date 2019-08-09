import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HomeComponent } from './home.component';
import { FinalItem, OperatorCollection } from '../operator-collection';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let expected: string;
  let expectedOperatorCollection: OperatorCollection;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    expected = "1234567890";
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expectedOperatorCollection = {
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

  it('Telephone Number form invalid when empty', () => {
    expect(component.telephoneNumberForm.valid).toBeFalsy();
    let telephoneNumber = component.telephoneNumberForm.controls['telephoneNumber'];
    expect(telephoneNumber.valid).toBeFalsy();

    let errors = {};
    errors = telephoneNumber.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Telephone Number Form should update from form changes', () => {
    expect(component.telephoneNumberForm.valid).toBeFalsy();
    component.telephoneNumberForm.controls['telephoneNumber'].setValue(expected);
    expect(component.telephoneNumberForm.value.telephoneNumber).toEqual(expected);
  });

  it('Submitting telephone Number form with no Operator Collection', () => {
    expect(component.telephoneNumberForm.valid).toBeFalsy();
    component.telephoneNumberForm.controls['telephoneNumber'].setValue(expected);
    expect(component.telephoneNumberForm.valid).toBeTruthy();

    let searchResult: FinalItem;
    component.operatorCollection = {
      priceListCollection: []
    };
    searchResult = component.onSubmit();
    expect(searchResult).toBeNull();
  });

  it('Submitting telephone Number form with 1 Operator Collection', () => {
    expect(component.telephoneNumberForm.valid).toBeFalsy();
    component.telephoneNumberForm.controls['telephoneNumber'].setValue(expected);
    expect(component.telephoneNumberForm.valid).toBeTruthy();

    let searchResult: FinalItem;
    component.operatorCollection = expectedOperatorCollection;
    searchResult = component.onSubmit();
    expect(searchResult.operatorName).toEqual(expectedOperatorCollection.priceListCollection[0].operatorName);
  });
});
