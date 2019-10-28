import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReviewLenderComponent } from './delete-review-lender.component';

describe('DeleteReviewLenderComponent', () => {
  let component: DeleteReviewLenderComponent;
  let fixture: ComponentFixture<DeleteReviewLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReviewLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReviewLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
