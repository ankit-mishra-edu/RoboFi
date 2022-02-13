import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewOrEditSpecificationPage } from './view-or-edit.page';

describe('ViewOrEditSpecificationPage', () => {
  let component: ViewOrEditSpecificationPage;
  let fixture: ComponentFixture<ViewOrEditSpecificationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOrEditSpecificationPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrEditSpecificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
