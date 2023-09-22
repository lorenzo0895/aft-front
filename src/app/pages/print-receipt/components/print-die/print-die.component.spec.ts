import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDieComponent } from './print-die.component';

describe('PrintDieComponent', () => {
  let component: PrintDieComponent;
  let fixture: ComponentFixture<PrintDieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintDieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
