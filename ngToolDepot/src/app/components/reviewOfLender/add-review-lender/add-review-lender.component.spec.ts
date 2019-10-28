import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewLenderComponent } from './add-review-lender.component';

describe('AddReviewLenderComponent', () => {
  let component: AddReviewLenderComponent;
  let fixture: ComponentFixture<AddReviewLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReviewLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
