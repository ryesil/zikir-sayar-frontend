import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZikirListComponent } from './zikir-list.component';

describe('ZikirListComponent', () => {
  let component: ZikirListComponent;
  let fixture: ComponentFixture<ZikirListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZikirListComponent]
    });
    fixture = TestBed.createComponent(ZikirListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
