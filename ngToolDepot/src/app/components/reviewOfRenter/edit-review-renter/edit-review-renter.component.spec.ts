import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewRenterComponent } from './edit-review-renter.component';

describe('EditReviewRenterComponent', () => {
  let component: EditReviewRenterComponent;
  let fixture: ComponentFixture<EditReviewRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReviewRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReviewRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
