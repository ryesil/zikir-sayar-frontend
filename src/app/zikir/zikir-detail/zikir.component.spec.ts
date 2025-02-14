import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZikirComponent } from './zikir.component';

describe('ZikirComponent', () => {
  let component: ZikirComponent;
  let fixture: ComponentFixture<ZikirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZikirComponent]
    });
    fixture = TestBed.createComponent(ZikirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
