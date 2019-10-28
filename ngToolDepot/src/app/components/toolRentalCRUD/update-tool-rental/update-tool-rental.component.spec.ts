import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateToolRentalComponent } from './update-tool-rental.component';

describe('UpdateToolRentalComponent', () => {
  let component: UpdateToolRentalComponent;
  let fixture: ComponentFixture<UpdateToolRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateToolRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateToolRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
