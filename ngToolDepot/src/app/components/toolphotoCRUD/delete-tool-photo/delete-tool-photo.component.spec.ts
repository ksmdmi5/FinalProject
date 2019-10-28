import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToolPhotoComponent } from './delete-tool-photo.component';

describe('DeleteToolPhotoComponent', () => {
  let component: DeleteToolPhotoComponent;
  let fixture: ComponentFixture<DeleteToolPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteToolPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteToolPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
