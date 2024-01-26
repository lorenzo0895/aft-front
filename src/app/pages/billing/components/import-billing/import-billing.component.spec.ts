import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBillingComponent } from './import-billing.component';

describe('ImportBillingComponent', () => {
  let component: ImportBillingComponent;
  let fixture: ComponentFixture<ImportBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportBillingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
