import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import useStore from "./hook/useStore";
import "./App.css";

const router = createBrowserRouter(routes);
function App() {
  const { setupApp } = useStore();
  useEffect(() => {
    setupApp();
  }, [setupApp]);

  return <RouterProvider router={router} />;
}

export default App;
