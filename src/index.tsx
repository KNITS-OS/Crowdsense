import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "quill/dist/quill.core.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./assets/css/argon-dashboard-pro-react.css";
import "./assets/vendor/nucleo/css/nucleo.css";
import { AlertProvider } from "./context";
import { store } from "./redux/app/store";
import "./variables/chartDefaults";
import { createRoot } from "react-dom/client";
import { Router } from "./Router";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AlertProvider>
                <Router/>
            </AlertProvider>
        </BrowserRouter>
    </Provider>,
);
