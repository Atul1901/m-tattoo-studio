import Notification from "./components/Notification/Notification";
import "./assets/css/global.css";
import { Toaster } from "react-hot-toast";
import Routes from "./routes";

const App = () => {
  return (
    <>
      <Notification />
      <Toaster />
      <Routes />
    </>
  );
};

export default App;
