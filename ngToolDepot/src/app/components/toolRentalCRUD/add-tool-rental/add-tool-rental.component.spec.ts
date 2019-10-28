import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolRentalComponent } from './add-tool-rental.component';

describe('AddToolRentalComponent', () => {
  let component: AddToolRentalComponent;
  let fixture: ComponentFixture<AddToolRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToolRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToolRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
