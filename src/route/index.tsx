import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Home from "../components/home";
import { useAuth } from "../contexts/auth.tsx";
import NotFound from "../components/notFound";

const Login = lazy(() => import("../components/login"));
const AssessList = lazy(
  () => import("../components/assessWorkstation/assess/index.tsx"),
);
const AssessTreatment = lazy(
  () => import("../components/assessWorkstation/treatment/index.tsx"),
);
const DoctorAssess = lazy(
  () => import("../components/doctorWorkstations/assess/index.tsx"),
);
const DoctorPatient = lazy(
  () => import("../components/doctorWorkstations/patient/index.tsx"),
);
export default function MyRoute() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      >
        <Route
          path="/assessWorkstation/assess"
          element={<AssessList />}
        ></Route>
        <Route
          path="/assessWorkstation/treatment"
          element={<AssessTreatment />}
        ></Route>
        <Route
          path="/doctorWorkstations/assess"
          element={<DoctorAssess />}
        ></Route>
        <Route
          path="/doctorWorkstations/patient"
          element={<DoctorPatient />}
        ></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
