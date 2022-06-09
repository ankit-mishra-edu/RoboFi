import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkflowEditorPage } from './editor.page';

describe('WorkflowEditorPage', () => {
  let component: WorkflowEditorPage;
  let fixture: ComponentFixture<WorkflowEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowEditorPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
