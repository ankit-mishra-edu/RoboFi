import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSpecFilterComponent } from './auto-spec-filter.component';

describe('AutoSpecFilterComponent', () => {
  let component: AutoSpecFilterComponent;
  let fixture: ComponentFixture<AutoSpecFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoSpecFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSpecFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
