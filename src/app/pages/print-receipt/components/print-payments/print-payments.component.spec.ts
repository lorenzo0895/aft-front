import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPaymentsComponent } from './print-payments.component';

describe('PrintPaymentsComponent', () => {
  let component: PrintPaymentsComponent;
  let fixture: ComponentFixture<PrintPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
