import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
<<<<<<< HEAD
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import ReduxProvider from "./redux/ReduxProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>

     <ReduxProvider>

       <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      
     </ReduxProvider>

=======

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
  </StrictMode>
);
