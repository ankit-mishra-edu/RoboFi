import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewOrEditMicrobotPage } from './view-or-edit.page';

describe('ViewOrEditMicrobotPage', () => {
  let component: ViewOrEditMicrobotPage;
  let fixture: ComponentFixture<ViewOrEditMicrobotPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOrEditMicrobotPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrEditMicrobotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
