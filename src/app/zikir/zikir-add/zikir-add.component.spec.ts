import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZikirAddComponent } from './zikir-add.component';

describe('ZikirAddComponent', () => {
  let component: ZikirAddComponent;
  let fixture: ComponentFixture<ZikirAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZikirAddComponent]
    });
    fixture = TestBed.createComponent(ZikirAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
