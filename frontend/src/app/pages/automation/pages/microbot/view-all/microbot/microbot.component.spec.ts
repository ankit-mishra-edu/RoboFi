import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrobotComponent } from './microbot.component';

describe('MicrobotComponent', () => {
  let component: MicrobotComponent;
  let fixture: ComponentFixture<MicrobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrobotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
