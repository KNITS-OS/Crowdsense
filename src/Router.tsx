import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout, AuthLayout, getRoutes } from "./layouts";
import routes from "./routes";

export const Router = () => {
    return (
        <Routes>
            <Route element={<AdminLayout/>}>{getRoutes(routes, "/admin")}</Route>
            <Route element={<AuthLayout/>}>{getRoutes(routes, "/auth")}</Route>
            <Route path="*" element={<Navigate to={"admin/home"} replace/>}/>
        </Routes>
    );
};
