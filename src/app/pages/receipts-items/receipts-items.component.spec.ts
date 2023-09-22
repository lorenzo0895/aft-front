import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsItemsComponent } from './receipts-items.component';

describe('ReceiptsItemsComponent', () => {
  let component: ReceiptsItemsComponent;
  let fixture: ComponentFixture<ReceiptsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReceiptsItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
