'use client'

import { message } from "antd";
import React, { PropsWithChildren, FC, useReducer, useContext } from "react";
import { createEmployeeRequestAction, getAllEmployeesRequestAction, updateEmployeeRequestAction } from "./action";
import {
  EmployeeActionsContext,
  EmployeeStateContext,
  EMPLOYEE_CONTEXT_INITIAL_STATE,
  IEmployeeModel,
} from "./context";
import EmployeeReducer from './reducer'
import axios from "axios";


const EmployeeProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(EmployeeReducer, EMPLOYEE_CONTEXT_INITIAL_STATE);

  const success = (msg: string) => {
    message.success(msg);
  };

  const error = (error: string) => {
    message.error(error);
  };

  const instance = axios.create({
    baseURL: 'https://localhost:44311',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const createEmployee = async (employeeInfo: IEmployeeModel) => {
    try {
      const response = await instance.post('/api/services/app/Employee/CreateEmployee', employeeInfo);
      const data = response.data;
      if (data?.success) {
        dispatch(createEmployeeRequestAction(data?.result));
        success('Employee was created successfully');
        return data.result;  // Return the created employee data
      } else {
        console.error("Failed to create employee");
        return null; // Return null if the creation was not successful
      }
    } catch (error) {
      console.error(error);
      return null; // Return null in case of an error
    }
  };

  const getAllEmployees = async () => {

    const employees = instance.get('/api/services/app/Employee/GetAllEmployees')
      .then(resp => {
        const data = resp.data;
        if (data?.success) {

          dispatch(getAllEmployeesRequestAction(data?.result))
          
          return data?.result;
        }
      }).catch(err => {
        console.error(err);
      });

    return employees

  }

  const updateEmployee = async (employeeInfo: IEmployeeModel) => {
    try {

      const response = await instance.put('/api/services/app/Employee/UpdateEmployee', employeeInfo);
      const data = response.data;

      if (data?.success) {
        dispatch(updateEmployeeRequestAction(data?.result));
        success('Employee details were updated successfully.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteEmployee = async (id: string) => {

    try {
      const response = await instance.post(`/api/services/app/Employee/DeleteEmployee?id=${id}`);
      
      const data = response.data;

      if(data?.success){
        success('Employee was deleted successfully')
      }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <EmployeeStateContext.Provider value={state}>
      <EmployeeActionsContext.Provider
        value={{ createEmployee, updateEmployee, getAllEmployees, deleteEmployee }}>
        {children}
      </EmployeeActionsContext.Provider>
    </EmployeeStateContext.Provider>
  );
};

const useStateContext = () => {

  const context = useContext(EmployeeStateContext);

  if (context === undefined) {
    throw new Error("useEmployeeState must be used within a EmployeeProvider");
  }

  return context;
};

const useActionsContext = () => {

  const context = useContext(EmployeeActionsContext);

  if (context === undefined) {
    throw new Error("useEmployeeState must be used within a EmployeeProvider");
  }

  return context;
};

const useEmployee = () => {
  return {
    ...useStateContext(),
    ...useActionsContext(),
  };
};

export { useEmployee, EmployeeProvider }
