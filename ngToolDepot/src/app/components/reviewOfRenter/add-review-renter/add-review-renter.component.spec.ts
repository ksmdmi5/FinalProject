import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewRenterComponent } from './add-review-renter.component';

describe('AddReviewRenterComponent', () => {
  let component: AddReviewRenterComponent;
  let fixture: ComponentFixture<AddReviewRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReviewRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
