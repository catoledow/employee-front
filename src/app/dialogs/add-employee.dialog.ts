import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatSnackBar } from '@angular/material';
import { IEmployee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: 'add-employee.dialog.html',
  styleUrls: ['./add-employee.dialog.css']
})
// tslint:disable-next-line: component-class-suffix
export class AddEmployeeDialog {
  public empFormGroup: FormGroup;
  public editId: string;

  constructor(private dialogRef: MatDialogRef<AddEmployeeDialog>,
              fb: FormBuilder,
              private service: EmployeeService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data?: IEmployee) {

    this.empFormGroup = fb.group({
      role: fb.control(data ? data.role : '', Validators.required),
      firstName: fb.control(data ? data.firstName : '', Validators.required),
      lastName: fb.control(data ? data.lastName : '', Validators.required),
      hireDate: fb.control(data ? new Date(data.hireDate) : '', Validators.required),
    });

    this.editId = data ? data.id : undefined;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    let fnToObserve: Observable<IEmployee>;
    const apiEmployee = this.empFormGroup.value;
    apiEmployee.hireDate = apiEmployee.hireDate.toISOString().split('T')[0];

    if (this.editId) {
      apiEmployee.id = this.editId;
      fnToObserve = this.service.update(apiEmployee);
    } else {
      fnToObserve = this.service.insert(apiEmployee);
    }

    fnToObserve.subscribe(data => {
      this.dialogRef.close(true);
    }, error => {
      this.snackBar.open('Error: ' + error.error.message, 'OK', {
        duration: 5 * 1000,
      });
    });
  }
}
