import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolphotoComponent } from './toolphoto.component';

describe('ToolphotoComponent', () => {
  let component: ToolphotoComponent;
  let fixture: ComponentFixture<ToolphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
