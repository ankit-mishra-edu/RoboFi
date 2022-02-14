import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSpecificationPage } from './create.page';

describe('AccountPage', () => {
  let component: CreateSpecificationPage;
  let fixture: ComponentFixture<CreateSpecificationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSpecificationPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpecificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
