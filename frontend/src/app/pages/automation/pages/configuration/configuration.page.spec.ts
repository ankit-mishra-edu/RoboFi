import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomationConfigurationPage } from './configuration.page';

describe('AutomationConfigurationPage', () => {
  let component: AutomationConfigurationPage;
  let fixture: ComponentFixture<AutomationConfigurationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationConfigurationPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationConfigurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
