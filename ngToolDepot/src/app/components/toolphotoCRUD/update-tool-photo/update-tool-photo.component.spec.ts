import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateToolPhotoComponent } from './update-tool-photo.component';

describe('UpdateToolPhotoComponent', () => {
  let component: UpdateToolPhotoComponent;
  let fixture: ComponentFixture<UpdateToolPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateToolPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateToolPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
