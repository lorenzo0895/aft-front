import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTypeComponent } from './dropdown-type.component';

describe('DropdownTypeComponent', () => {
  let component: DropdownTypeComponent;
  let fixture: ComponentFixture<DropdownTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
