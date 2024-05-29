import { Component } from '@angular/core';
import { Employee } from './Employee';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    public employees!: Employee[];
  title = "employee";
  
  constructor(private employeeService : EmployeeService){
    
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  public getEmployees() :void {
    this.employeeService.getEmployees().subscribe(
    (response : Employee[]) =>{
      this.employees = response;
      console.log(this.employees);
    },
    (error : HttpErrorResponse) =>{
      alert(error.message);
    }
    );
  }

  public onOpenForm(employee:Employee | null, mode:string):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-toggle','modal');
    button.style.display='none';
    if(mode == 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode == 'edit'){
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode == 'delete'){
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
