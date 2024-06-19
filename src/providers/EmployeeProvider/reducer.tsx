import { IEmployeeStateContext } from "./context";
import { EmployeeActionEnums } from "./action";

const EmployerReducer = (
  state: IEmployeeStateContext,
  action: ReduxActions.Action<IEmployeeStateContext>
): IEmployeeStateContext => {
  const { type, payload } = action;

  switch (type) {
    case EmployeeActionEnums.CreateEmployeeRequest:
    case EmployeeActionEnums.UpdateEmployeeRequest:
    case EmployeeActionEnums.GetAllEmployeesRequest:
    case EmployeeActionEnums.DeleteEmployeeRequest:

      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default EmployerReducer;