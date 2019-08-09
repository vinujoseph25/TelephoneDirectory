import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOperatorComponent } from './view-operator.component';

describe('ViewOperatorComponent', () => {
  let component: ViewOperatorComponent;
  let fixture: ComponentFixture<ViewOperatorComponent>;
  let expected : string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expected = 'Operator List';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Operator List'`, () => {
    expect(component.appTitle).toEqual(expected);
  });
});
