import {createContext} from 'react'

export interface ISkill{
    id?: string;
    name?: string;
    yearsExperience?: number;
    seniorityRating? : number;
    seniorityRatingText? : string;
  
  }
  
  export interface IAddress{
    id?: string;
    street?: string;
    city: string;
    postalCode?: string;
    country?: string;
  }
  
  export interface IEmployeeModel {
    id?: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    emailAddress?: string;
    dateOfBirth?: Date | string;
    address?: IAddress;
    skills?: ISkill[] | [];
  
  }

  export interface IEmployeeStateContext {
    employeeInfo?: IEmployeeModel;
    allEmployees?: IEmployeeModel[];
  }

  export interface IEmployeeActionsContext {
    createEmployee: (data: IEmployeeModel) => void;
    getAllEmployees: () => void;
    updateEmployee: (data: IEmployeeModel) => void;
    deleteEmployee: (id: string) => void;
  }

  export const EMPLOYEE_CONTEXT_INITIAL_STATE: IEmployeeStateContext = {};

  export const EmployeeStateContext = createContext<IEmployeeStateContext>(EMPLOYEE_CONTEXT_INITIAL_STATE);
  export const EmployeeActionsContext = createContext<IEmployeeActionsContext>({} as any);