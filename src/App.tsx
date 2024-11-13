import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import { Notes } from "./pages/Notes";
import { Notifications } from "react-push-notification";

function App() {
  return (
    <div id="app" data-theme="dark">
      <Notifications />
      <div id="container">
        <BrowserRouter>
          <Routes>
            <Route element={<Notes />} path="/" />
            <Route element={<LoginRegister />} path="/login" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
