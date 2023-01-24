import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalBtnComponent } from './paypal-btn.component';

describe('PaypalBtnComponent', () => {
  let component: PaypalBtnComponent;
  let fixture: ComponentFixture<PaypalBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
