import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomationNavbarComponent } from './automation-navbar.component';

describe('AutomationNavbarComponent', () => {
  let component: AutomationNavbarComponent;
  let fixture: ComponentFixture<AutomationNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationNavbarComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
