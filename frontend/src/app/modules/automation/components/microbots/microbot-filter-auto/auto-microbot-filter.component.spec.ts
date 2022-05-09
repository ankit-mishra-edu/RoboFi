import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutoMicrobotComponent } from './microbot-filter-auto.component';

describe('FilterAutoMicrobotComponent', () => {
  let component: FilterAutoMicrobotComponent;
  let fixture: ComponentFixture<FilterAutoMicrobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterAutoMicrobotComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAutoMicrobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
