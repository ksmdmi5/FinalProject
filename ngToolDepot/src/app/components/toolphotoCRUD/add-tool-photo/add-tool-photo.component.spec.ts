import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolPhotoComponent } from './add-tool-photo.component';

describe('AddToolPhotoComponent', () => {
  let component: AddToolPhotoComponent;
  let fixture: ComponentFixture<AddToolPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToolPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToolPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
