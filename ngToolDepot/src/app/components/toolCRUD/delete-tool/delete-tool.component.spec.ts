import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToolComponent } from './delete-tool.component';

describe('DeleteToolComponent', () => {
  let component: DeleteToolComponent;
  let fixture: ComponentFixture<DeleteToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
