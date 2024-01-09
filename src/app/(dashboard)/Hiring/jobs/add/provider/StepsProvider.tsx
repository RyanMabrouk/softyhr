// Add "use" to "useReducer" import
import React, { ReactNode, createContext, useReducer } from "react";

interface StepsProviderTypeProps {
  children: ReactNode;
}

export enum Actions {
  APPLICATION_DETAILS = "APPLICATION_DETAILS",
  INFORMATION_JOB = "INFORMATION_JOB",
  JOB_BOARDS = "JOB_BOARDS",
}

interface StepType {
  done: boolean;
  values: Object;
}
interface StepsState {
  ApplicationDetails: StepType;
  InformationJob: StepType;
  JobBoards: StepType;
}

interface StepsAction {
  type: Actions;
  payload: StepType;
}

export const initialState: StepsState = {
  ApplicationDetails: { done: false, values: {} },
  InformationJob: {
    done: false,
      values: {
        "Posting Title": "ssdfgsdfg",
        "Job Status": "Draft",
        "Hiring Lead": "iheb sebai",
        Departement: "Human Resources",
        "Minimum Experience": "Senior Manager/Supervisor",
        "Job Description": "mlqksjdflmqskdjfqlksmdfq",
        "Internal Job Code": "k",
      },
  },
  JobBoards: { done: true, values: {} },
};

export const StepsContext = createContext({
  ...initialState,
  Update_ApplicationDetails: (payload: any) => {},
  Update_InformationJob: (payload: any) => {},
  Update_JobBoards: (payload: any) => {},
});

export const reducer = (state: StepsState, action: StepsAction): StepsState => {
  const { type, payload } = action;

  switch (type) {
    case Actions.APPLICATION_DETAILS: {
      return {
        ...state,
        ApplicationDetails: { ...state.ApplicationDetails, ...payload },
      };
    }
    case Actions.INFORMATION_JOB: {
      return {
        ...state,
        InformationJob: { ...state.InformationJob, ...payload },
      };
    }
    case Actions.JOB_BOARDS: {
      return {
        ...state,
        JobBoards: { ...state.JobBoards, ...payload },
      };
    }
    default:
      return state;
  }
};

function StepsProvider({ children }: StepsProviderTypeProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const Update_ApplicationDetails = (payload: StepType) => {
    dispatch({
      type: Actions.APPLICATION_DETAILS,
      payload,
    });
  };

  const Update_InformationJob = (payload: StepType) => {
    dispatch({
      type: Actions.INFORMATION_JOB,
      payload,
    });
  };

  const Update_JobBoards = (payload: StepType) => {
    dispatch({
      type: Actions.JOB_BOARDS,
      payload,
    });
  };

  return (
    <StepsContext.Provider
      value={{
        ...state,
        Update_ApplicationDetails,
        Update_InformationJob,
        Update_JobBoards,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
}

export default StepsProvider;
