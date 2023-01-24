import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalQrComponent } from './paypal-qr.component';

describe('PaypalQrComponent', () => {
  let component: PaypalQrComponent;
  let fixture: ComponentFixture<PaypalQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
