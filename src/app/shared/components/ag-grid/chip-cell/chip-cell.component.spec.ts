import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipCellComponent } from './chip-cell.component';

describe('ChipCellComponent', () => {
  let component: ChipCellComponent;
  let fixture: ComponentFixture<ChipCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
