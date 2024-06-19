import { createAction } from 'redux-actions';
import { IEmployeeModel, IEmployeeStateContext} from "./context";

export enum EmployeeActionEnums {

  CreateEmployeeRequest = "CREATE_EMPLOYEE",
  DeleteEmployeeRequest = "DELETE_EMPLOYEE",
  GetAllEmployeesRequest = "GET_ALL_EMPLOYEES",
  UpdateEmployeeRequest = "UPDATE_EMPLOYEE"

}

export const createEmployeeRequestAction = createAction<IEmployeeStateContext,IEmployeeModel>(
                                           EmployeeActionEnums.CreateEmployeeRequest, 
                                           (employeeInfo) => ({ employeeInfo }));

export const getAllEmployeesRequestAction = createAction<IEmployeeStateContext,IEmployeeModel[]>(
                                            EmployeeActionEnums.GetAllEmployeesRequest, 
                                            (allEmployees) => ({allEmployees} )
                                            );

export const updateEmployeeRequestAction = createAction<IEmployeeStateContext,IEmployeeModel>(
                                           EmployeeActionEnums.UpdateEmployeeRequest, 
                                           (employeeInfo) => ({ employeeInfo }));

