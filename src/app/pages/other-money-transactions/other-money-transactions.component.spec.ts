import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMoneyTransactionsComponent } from './other-money-transactions.component';

describe('OtherMoneyTransactionsComponent', () => {
  let component: OtherMoneyTransactionsComponent;
  let fixture: ComponentFixture<OtherMoneyTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OtherMoneyTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherMoneyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
