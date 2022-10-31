import { createContext, useReducer } from 'react';

export const AnimalsContext = createContext();

export const animalsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ANIMALS':
      return {
        animals: action.payload,
      };
    case 'CREATE_ANIMAL':
      return {
        animals: [action.payload, ...state.animals],
      };
    case 'DELETE_ANIMAL':
      return {
        animals: state.animals.filter(
          (animal) => animal._id !== action.payload
        ),
      };
    case 'UPDATE_ANIMAL':
      return {
        animals: state.animals.map((animal) =>
          animal._id === action.payload._id ? action.payload : animal
        ),
      };
    // CASE TO HANDLE IF ANIMALS.LENGTH === 0
    case 'EMPTY_ARRAY':
      return {
        animals: [],
      };

    default:
      return state;
  }
};

export const AnimalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(animalsReducer, {
    animals: [],
  });

  return (
    <AnimalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AnimalsContext.Provider>
  );
};
