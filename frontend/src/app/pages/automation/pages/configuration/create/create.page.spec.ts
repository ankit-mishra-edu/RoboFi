import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomationAddConfigEntryPage } from './create.page';

describe('AccountPage', () => {
  let component: AutomationAddConfigEntryPage;
  let fixture: ComponentFixture<AutomationAddConfigEntryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationAddConfigEntryPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationAddConfigEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
