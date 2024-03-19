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
}

export interface StepType<T> {
  done: boolean;
  values: T;
}
export interface StepsState {
  ApplicationDetails: StepType<ObjectOfStrings>;
}

interface StepsAction {
  type: Actions;
  payload?: ObjectOfStrings;
}

export const initialState: StepsState = {
  ApplicationDetails: {
    done: false,
    values: {},
  },
};

export const EditApplicationContext = createContext({
  ...initialState,
  Update_ApplicationDetails: (payload: ObjectOfStrings) => {},
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
    default:
      return state;
  }
};

function EditApplicationProvider({ children }: StepsProviderTypeProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const Update_ApplicationDetails = (payload: ObjectOfStrings) => {
    dispatch({
      type: Actions.APPLICATION_DETAILS,
      payload,
    });
  };

  return (
    <EditApplicationContext.Provider
      value={{
        ...state,
        Update_ApplicationDetails,
      }}
    >
      {children}
    </EditApplicationContext.Provider>
  );
}

export default EditApplicationProvider;
