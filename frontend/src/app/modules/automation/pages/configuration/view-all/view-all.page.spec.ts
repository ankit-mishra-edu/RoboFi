import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomationViewAllConfigurationPage } from './view-all.page';

describe('AutomationViewAllConfigurationPage', () => {
  let component: AutomationViewAllConfigurationPage;
  let fixture: ComponentFixture<AutomationViewAllConfigurationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationViewAllConfigurationPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationViewAllConfigurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
