"use client";
import React, { ReactNode, createContext, useReducer } from "react";

interface StepsProviderTypeProps {
  children: ReactNode;
}

export enum Actions {
  APPLICATION_DETAILS = "APPLICATION_DETAILS",
  INFORMATION_JOB = "INFORMATION_JOB",
  JOB_BOARDS = "JOB_BOARDS",
}

interface StepsState {
  ApplicationDetails: Object;
  InformationJob: Object;
  JobBoards: Object;
}

interface StepsAction {
  type: Actions;
  payload: StepsState;
}

export const initialState = {
  ApplicationDetails: {},
  InformationJob: {},
  JobBoards: {},
};

export const StepsContext = createContext({
  ...initialState,
  Update_ApplicationDetails: (payload: any) => {},
  Update_InformationJob: (payload: any) => {},
  Update_JobBoards: (payload: any) => {},
});

export const reducer = (state: StepsState, action: StepsAction): StepsState => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case Actions.APPLICATION_DETAILS: {
      return {
        ...state,
        ApplicationDetails: payload,
      };
    }
    case Actions.INFORMATION_JOB: {
      return {
        ...state,
        InformationJob: payload,
      };
    }
    case Actions.JOB_BOARDS: {
      return {
        ...state,
        JobBoards: payload,
      };
    }
    default:
      return state;
  }
};

function StepsProvider({ children }: StepsProviderTypeProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const Update_ApplicationDetails = (payload: any) => {
    console.log(payload);
    console.log("-------------------");
    dispatch({
      type: Actions.APPLICATION_DETAILS,
      payload,
    });
  };

  const Update_InformationJob = (payload: any) => {
    dispatch({
      type: Actions.INFORMATION_JOB,
      payload,
    });
  };

  const Update_JobBoards = (payload: any) => {
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
