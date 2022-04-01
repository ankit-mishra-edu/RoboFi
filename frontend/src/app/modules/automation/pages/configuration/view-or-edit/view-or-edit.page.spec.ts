import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomationViewOrEditConfigEntryPage } from './view-or-edit.page';

describe('AccountPage', () => {
  let component: AutomationViewOrEditConfigEntryPage;
  let fixture: ComponentFixture<AutomationViewOrEditConfigEntryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationViewOrEditConfigEntryPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationViewOrEditConfigEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
