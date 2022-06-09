import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkflowHomePage } from './home.page';

describe('WorkflowHomePage', () => {
  let component: WorkflowHomePage;
  let fixture: ComponentFixture<WorkflowHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowHomePage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
