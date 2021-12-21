import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllMicrobotPage } from './view-all.page';

describe('ViewAllMicrobotPage', () => {
  let component: ViewAllMicrobotPage;
  let fixture: ComponentFixture<ViewAllMicrobotPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllMicrobotPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllMicrobotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
