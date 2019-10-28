import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewLenderComponent } from './edit-review-lender.component';

describe('EditReviewLenderComponent', () => {
  let component: EditReviewLenderComponent;
  let fixture: ComponentFixture<EditReviewLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReviewLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReviewLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
