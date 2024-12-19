import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {


  roleForm!: FormGroup;
  availablePermissions: string[] = ['delete_event', 'approved_event', 'view_event', 'create_event', 'join_event'];

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { _id: string, type: string; permissions: string[] },
    private _roleService: RoleService,
    private _modelRef: MatDialog) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      type: [this.data?.type || '', Validators.required],
      permissions: [this.data?.permissions || []],
    });
  }

  onPermissionToggle(permission: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const permissions = this.roleForm.get('permissions')?.value || [];
    if (isChecked) {
      permissions.push(permission);
    } else {
      const index = permissions.indexOf(permission);
      if (index > -1) {
        permissions.splice(index, 1);
      }
    }
    this.roleForm.get('permissions')?.setValue(permissions);
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      if (this.data) {
        this._roleService.updateRoles(this.data._id, this.roleForm.value)
          .subscribe((res) => {
            this._modelRef.closeAll()
          })
      } else {
        this._roleService.createRoles(this.roleForm.value)
          .subscribe((res) => {
            this._modelRef.closeAll()
          })
      }

    }
  }
}
