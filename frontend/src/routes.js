import { useRoutes } from 'react-router-dom';

import Home from './pages/Home';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import CreateNewAnimal from './pages/CreateAnimal/CreateNewAnimal';
import Animals from './pages/AnimalCards/Animals';
import PageNotFound from './pages/PageNotFound';

export default function Router() {
  let element = useRoutes([
    {
      element: <AuthLayout />,
      children: [
     
      ],
    },
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'upload', element: <CreateNewAnimal /> },
        { path: 'all-animals', element: <Animals /> },
      ],
    },
    { path: '*', element: <PageNotFound />},
  ]);

  return element;
}
