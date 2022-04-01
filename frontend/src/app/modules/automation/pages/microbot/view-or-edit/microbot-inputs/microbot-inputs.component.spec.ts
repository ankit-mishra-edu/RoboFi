import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrobotInputsComponent } from './microbot-inputs.component';

describe('MicrobotInputsComponent', () => {
  let component: MicrobotInputsComponent;
  let fixture: ComponentFixture<MicrobotInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrobotInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrobotInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
