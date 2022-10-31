import { AnimalsContext } from '../context/AnimalContext';
import { useContext } from 'react';

export const useAnimalsContext = () => {
  const context = useContext(AnimalsContext);

  if (!context) {
    throw Error('userAnimalContext must be used inside a AnimalProvider');
  }

  return context;
};
