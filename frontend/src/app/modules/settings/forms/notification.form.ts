import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';

export class NotificationForm {
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
  ) {}

  notificationForm!: FormGroup;

  public InitForm(): FormGroup {
    this.notificationForm = this._formBuilder.group({
      sender: [this._authService.loggedInUser.id, [Validators.required]],
      receivers: [],
      content: [null, [Validators.required]],
    });
    return this.notificationForm;
  }
}
