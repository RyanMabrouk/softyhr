import React, { ReactNode, createContext, useReducer } from "react";
import { ApplicationIniTialQuestions } from "@/constants/Hiring/Hiring";
interface StepsProviderTypeProps {
  children: ReactNode;
}

export interface ObjectOfStrings {
  [key: string]: any;
}

export enum Actions {
  APPLICATION_DETAILS = "APPLICATION_DETAILS",
  INFORMATION_JOB = "INFORMATION_JOB",
  JOB_BOARDS = "JOB_BOARDS",
}

export interface StepType<T> {
  done: boolean;
  values: T;
}
export interface StepsState {
  ApplicationDetails: StepType<ObjectOfStrings>;
  InformationJob: StepType<ObjectOfStrings>;
  JobBoards: StepType<ObjectOfStrings> | undefined;
}

interface StepsAction {
  type: Actions;
  payload?: ObjectOfStrings;
}



export const initialState: StepsState = {
  ApplicationDetails: {
    done: false,
    values: { Questions:{ ...ApplicationIniTialQuestions} },
  },
  InformationJob: {
    done: false,
    values: {},
  },
  JobBoards: { done: false, values: {} },
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
        ApplicationDetails: {
          ...state.ApplicationDetails,
          done: payload?.done,
          values: { ...payload?.values },
        },
      };
    }
    case Actions.INFORMATION_JOB: {
      return {
        ...state,
        InformationJob: {
          ...state.InformationJob,
          done: payload?.done,
          values: { ...payload?.values },
        },
      };
    }
    case Actions.JOB_BOARDS: {
      return {
        ...state,
        JobBoards: {
          ...state.JobBoards,
          done: payload?.done,
          values: { ...payload?.values },
        },
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
