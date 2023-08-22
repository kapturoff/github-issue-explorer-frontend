import { configure } from 'axios-hooks';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store/store';
import './styles/main.scss';
import axios from './utils/axios';

import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import IssueExplorer from './pages/IssueExplorer/IssueExplorer';
import ErrorPage from './pages/ErrorPage/ErrorPage';

// Sets up Axios instance for useAxios() hook
configure({ axios });

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route
      path="/"
      element={<MainLayout />}
      errorElement={<ErrorPage />}
    >
      <Route index element={<HomePage />} />
      <Route path="/:owner/:repositoryName/:issueId" element={<IssueExplorer />} />
    </Route>,
  ),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>,
);
