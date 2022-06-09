import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrobotListByCategoryComponent } from './microbot-list-by-category.component';

describe('MicrobotListByCategoryComponent', () => {
  let component: MicrobotListByCategoryComponent;
  let fixture: ComponentFixture<MicrobotListByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrobotListByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrobotListByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
