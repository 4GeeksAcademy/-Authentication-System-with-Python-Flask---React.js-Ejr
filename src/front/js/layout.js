import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import { BackendURL } from "./components/backendURL";
import injectContext from "./store/appContext";

import HomePage from "./pages/home/index.jsx";
import UserRegisterPage from "./pages/userRegister/index.jsx";
import CompanyRegisterPage from "./pages/companyRegister/index.jsx";
import CompanyRegisterPage2 from "./pages/companyRegisterStep2/index.jsx";
import LoginPage from "./pages/login/index.jsx";
import UserDashboard from "./pages/userDashboard/index.jsx";
import AdminDashboard from "./pages/adminDashboard/index.jsx";
import WorkerDashboard from "./pages/workerDashboard/index.jsx";
import Profile from "./pages/profile/index.jsx";
import { UpdatePassword } from "./pages/updatePassword/index.jsx";
import RecoveryPassword from "./pages/RecoveryPassword/index.jsx";
import { CreateService } from "./pages/createService/index.jsx";
import CompaniesList from "./pages/companiesList/index.jsx";
import CompanyDetails from "./pages/companyDetails/index.jsx";
import ServicesWorkers from "./pages/servicesWorkers/index.jsx";
import { ListService } from "./pages/serviceList/index.jsx";
import UpdateCompany from "./pages/updateCompany/index.jsx";
import { UpdateService } from "./pages/updateService/index.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<UserRegisterPage />} path="/user-register" />
            <Route element={<CompanyRegisterPage />} path="/company-register" />
            <Route
              element={<CompanyRegisterPage2 />}
              path="/company-register-2"
            />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<AdminDashboard />} path="/admin-dashboard" />
            <Route element={<UserDashboard />} path="/user-dashboard" />
            <Route element={<WorkerDashboard />} path="/worker-dashboard" />
            <Route element={<Profile />} path="/profile/:userId" />
            <Route element={<UpdatePassword />} path="/update" />
            <Route element={<RecoveryPassword />} path="/recovery" />
            <Route
              element={<CreateService />}
              path="/create-service/:companyID"
            />
            <Route element={<CompaniesList />} path="/companies-list" />
            <Route
              element={<CompanyDetails />}
              path="/company-details/:companyId"
            />
            <Route
              element={<UpdateCompany />}
              path="/update-company/:company_id"
            />
            <Route
              element={<ServicesWorkers />}
              path="/assign-services/:company_id"
            />
            <Route element={<ListService />} path="/service-list/:companyID" />
            <Route
              element={<UpdateService />}
              path="/update-service/:serviceID"
            />

            <Route
              element={<ServiceDetail />}
              path="/service-detail/:serviceID"
            />

            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
