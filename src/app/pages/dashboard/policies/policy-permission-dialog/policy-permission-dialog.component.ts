import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PolicyPartsFragment } from '@graphql';

@Component({
  selector: 'app-policy-permission-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './policy-permission-dialog.component.html',
  styles: ``,
})
export class PolicyPermissionDialogComponent {
  public loading = signal<boolean>(false);
  public policy = inject<PolicyPartsFragment>(MAT_DIALOG_DATA);
  
  public savePermissions() {}
}
