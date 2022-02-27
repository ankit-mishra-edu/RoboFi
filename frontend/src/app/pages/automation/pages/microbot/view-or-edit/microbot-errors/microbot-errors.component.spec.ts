import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MicrobotErrorsComponent } from './microbot-errors.component';

describe('MicrobotErrorsComponent', () => {
  let component: MicrobotErrorsComponent;
  let fixture: ComponentFixture<MicrobotErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicrobotErrorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrobotErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
