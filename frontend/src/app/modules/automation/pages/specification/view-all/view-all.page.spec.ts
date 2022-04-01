import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllSpecificationPage } from './view-all.page';

describe('ViewAllSpecificationPage', () => {
  let component: ViewAllSpecificationPage;
  let fixture: ComponentFixture<ViewAllSpecificationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllSpecificationPage],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllSpecificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
