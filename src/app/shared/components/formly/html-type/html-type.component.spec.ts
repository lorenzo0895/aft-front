import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlTypeComponent } from './html-type.component';

describe('HtmlTypeComponent', () => {
  let component: HtmlTypeComponent;
  let fixture: ComponentFixture<HtmlTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
