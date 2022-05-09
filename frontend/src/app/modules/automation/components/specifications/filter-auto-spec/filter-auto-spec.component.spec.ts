import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutoSpecComponent } from './filter-auto-spec.component';

describe('FilterAutoSpecComponent', () => {
  let component: FilterAutoSpecComponent;
  let fixture: ComponentFixture<FilterAutoSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAutoSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAutoSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
