import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomationConfigEntryComponent } from './entry.component';

describe('AutomationConfigEntryComponent', () => {
  let component: AutomationConfigEntryComponent;
  let fixture: ComponentFixture<AutomationConfigEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationConfigEntryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationConfigEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
