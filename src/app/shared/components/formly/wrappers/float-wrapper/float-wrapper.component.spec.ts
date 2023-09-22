import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatWrapperComponent } from './float-wrapper.component';

describe('FloatWrapperComponent', () => {
  let component: FloatWrapperComponent;
  let fixture: ComponentFixture<FloatWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
