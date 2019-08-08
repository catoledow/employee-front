import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { IEmployee } from './models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialog } from './dialogs/add-employee.dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: IEmployee[] = new Array<IEmployee>();

  constructor(private service: EmployeeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadEmployees();
  }

  openDialog(emp?: IEmployee): void {
    const config: { width: string, data?: IEmployee} = {
      width: '500px',
    };

    if (emp) {
      config.data = emp;
    }

    const dialogRef = this.dialog.open(AddEmployeeDialog, config);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  loadEmployees() {
    this.service.getAll().subscribe(data => this.employees = data);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => this.loadEmployees());
  }
}
