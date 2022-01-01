import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomationDashboardPage } from './dashboard.page';

describe('AutomationDashboardPage', () => {
  let component: AutomationDashboardPage;
  let fixture: ComponentFixture<AutomationDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationDashboardPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
