import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { isInValid, isValid } from '@core/validators';
import { MicrobotService } from '@modules/automation/microbot/services/microbot.service';
import { map, Observable } from 'rxjs';
import { WorkflowEditorForm } from '../../forms/editor.form';

@Component({
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class WorkflowEditorPage implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _microbotService: MicrobotService,
  ) {}

  isValid = isValid;
  isInValid = isInValid;

  editorForm!: FormGroup;
  workflowEditorFormObj!: WorkflowEditorForm;

  isEditorSidebarOpen = true;
  microbotsByCategory$!: Observable<IMicrobotByCategory>;

  ngOnInit(): void {
    this.microbotsByCategory$ = this._microbotService.getMicrobots$().pipe(
      map((microbots: IMicrobot[]) => {
        const microbotsByCategory = {} as IMicrobotByCategory;
        microbots.map((microbot: IMicrobot) => {
          const category = microbot.specification.Category;
          microbotsByCategory[category] = [
            ...(microbotsByCategory[category] || []),
            microbot,
          ];
        });
        return microbotsByCategory;
      }),
    );

    this.editorForm = new WorkflowEditorForm(this._formBuilder).InitForm();
  }

  value(controlName: string): AbstractControl {
    return this.editorForm.controls[controlName];
  }

  CreateWorkflow(): void {
    console.log(this.editorForm.value);
  }

  ToggleEditorSidebar(): void {
    this.isEditorSidebarOpen = !this.isEditorSidebarOpen;
  }
}
