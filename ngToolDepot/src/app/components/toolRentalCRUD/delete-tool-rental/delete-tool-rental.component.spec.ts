import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToolRentalComponent } from './delete-tool-rental.component';

describe('DeleteToolRentalComponent', () => {
  let component: DeleteToolRentalComponent;
  let fixture: ComponentFixture<DeleteToolRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteToolRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteToolRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
