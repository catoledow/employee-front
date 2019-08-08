import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IEmployee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly url = 'http://localhost:3000/employees/';

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<IEmployee[]>(this.url);
  }

  public insert(e: Partial<IEmployee>) {
    return this.http.post<IEmployee>(this.url, e);
  }

  public update(e: Partial<IEmployee>) {
    return this.http.put<IEmployee>(this.url + e.id, e);
  }

  public delete(id: string) {
    return this.http.delete<{}>(this.url + id);
  }
}
