import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTransactionComponent } from './skill-transaction.component';

describe('SkillTransactionComponent', () => {
  let component: SkillTransactionComponent;
  let fixture: ComponentFixture<SkillTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
