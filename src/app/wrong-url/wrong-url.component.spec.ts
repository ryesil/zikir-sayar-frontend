import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongUrlComponent } from './wrong-url.component';

describe('WrongUrlComponent', () => {
  let component: WrongUrlComponent;
  let fixture: ComponentFixture<WrongUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrongUrlComponent]
    });
    fixture = TestBed.createComponent(WrongUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
