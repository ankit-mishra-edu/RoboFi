import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomationHomePage } from './home.page';

describe('AutomationHomePage', () => {
  let component: AutomationHomePage;
  let fixture: ComponentFixture<AutomationHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationHomePage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
