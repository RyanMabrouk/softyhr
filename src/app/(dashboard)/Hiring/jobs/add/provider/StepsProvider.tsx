// Add "use" to "useReducer" import
import {  ObjectOfStrings } from "@/types/database.tables.types";
import React, { ReactNode, createContext, useReducer } from "react";

interface StepsProviderTypeProps {
  children: ReactNode;
}

export enum Actions {
  APPLICATION_DETAILS = "APPLICATION_DETAILS",
  INFORMATION_JOB = "INFORMATION_JOB",
  JOB_BOARDS = "JOB_BOARDS",
}

interface StepType<T>{
  done: boolean;
  values: T;
}
interface StepsState {
  ApplicationDetails: StepType<ObjectOfStrings>;
  InformationJob: StepType<ObjectOfStrings>;
  JobBoards: StepType<ObjectOfStrings>;
}



interface StepsAction {
  type: Actions;
  payload?: any;
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
  Update_ApplicationDetails: (payload: ObjectOfStrings) => {},
  Update_InformationJob: (payload: ObjectOfStrings) => {},
  Update_JobBoards: (payload: ObjectOfStrings) => {},
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

  const Update_ApplicationDetails = (payload: ObjectOfStrings) => {
    dispatch({
      type: Actions.APPLICATION_DETAILS,
      payload,
    });
  };

  const Update_InformationJob = (payload: ObjectOfStrings) => {
    dispatch({
      type: Actions.INFORMATION_JOB,
      payload,
    });
  };

  const Update_JobBoards = (payload: ObjectOfStrings) => {
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
