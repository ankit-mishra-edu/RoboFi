import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMicrobotPage } from './create.page';

describe('AccountPage', () => {
  let component: CreateMicrobotPage;
  let fixture: ComponentFixture<CreateMicrobotPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMicrobotPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMicrobotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
