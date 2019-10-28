import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReviewRenterComponent } from './delete-review-renter.component';

describe('DeleteReviewRenterComponent', () => {
  let component: DeleteReviewRenterComponent;
  let fixture: ComponentFixture<DeleteReviewRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReviewRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReviewRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
