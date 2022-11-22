import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ReactWindow from './pages/ReactWindow';
const router = createBrowserRouter([
  {
    path: "/reactWindow",
    element: <ReactWindow />,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
