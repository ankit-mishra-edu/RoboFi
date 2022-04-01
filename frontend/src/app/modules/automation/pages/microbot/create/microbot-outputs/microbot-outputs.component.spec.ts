import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MicrobotOutputsComponent } from './microbot-outputs.component';

describe('MicrobotOutputsComponent', () => {
  let component: MicrobotOutputsComponent;
  let fixture: ComponentFixture<MicrobotOutputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicrobotOutputsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrobotOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
