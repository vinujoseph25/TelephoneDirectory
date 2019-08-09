import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let expected : string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expected = 'Telephone Directory';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Telephone Directory'`, () => {
    expect(component.appTitle).toEqual(expected);
  });
});
