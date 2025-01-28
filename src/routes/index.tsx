import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  Route,
  Routes as Switch,
  useLocation,
} from "react-router-dom";
import { constants } from "../utils/constants/constants";
import { Authenticated } from "../utils/redux";
// screens
import {
  Analytics,
  Appointments,
  Customers,
  Dashboard,
  Sales,
} from "../screens/Authenticated";
import AddNewAppointment from "../screens/Authenticated/Appointments/AddNewAppointment";
import AddNewCustomer from "../screens/Authenticated/Customers/AddNewCustomer";
import AddNewSale from "../screens/Authenticated/Sales/AddNewSale";
import AddNewShop from "../screens/Authenticated/Shops/AddNewShop";
import Shops from "../screens/Authenticated/Shops/Shops";
import AddNewUser from "../screens/Authenticated/Users/AddNewUser";
import Users from "../screens/Authenticated/Users/Users";
import ForgotPassword from "../screens/Authentication/ForgotPassword/ForgotPassword";
import Login from "../screens/Authentication/Login/Login";
import AuthenticatedLayout from "./AuthenticatedLayout/AuthenticatedLayout";
import Services from "../screens/Authenticated/Services/Services";
import AddNewService from "../screens/Authenticated/Services/AddNewService";
import { User } from "../utils/redux/reducer/user-slice";
import { authTokenDecodedDataType, UserInfoType } from "../utils/types/types";
import { jwtDecode } from "jwt-decode";
import { updateAuthState } from "../utils/redux/reducer/authentication-slice";

const Root: FC = () => {
  let location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = useSelector(Authenticated);
  const dispatch = useDispatch();

  const verifyToken = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem(constants.localStorageItems.token);
    try {
      if (token) {
        const decodedUserData: authTokenDecodedDataType = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (currentTime <= decodedUserData.exp) {
          dispatch(
            updateAuthState({
              authenticated: true,
              userId: decodedUserData?.userId,
            })
          );
        }
      }
    } catch (error) {
      console.log("error", error);
      dispatch(
        updateAuthState({
          authenticated: false,
          userId: "",
        })
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [dispatch]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  let { from } = location.state || {
    from: {
      pathname: constants.routeNames.dashboard,
    },
  };

  return !loading && isAuthenticated ? (
    <Navigate to={from} />
  ) : (
    <Navigate to={constants.routeNames.login} />
  );
};

const PrivateRoute: FC<{ Component: FC }> = ({ Component }) => {
  const isLogin = useSelector(Authenticated);

  return isLogin ? (
    <AuthenticatedLayout Component={Component} />
  ) : (
    <Navigate to={"/"} />
  );
};

const Routes = () => {
  const { role } = useSelector(User);
  return (
    <>
      <Switch>
        <Route path={constants.routeNames.root} element={<Root />} />
        <Route path={constants.routeNames.login} element={<Login />} />
        <Route
          path={constants.routeNames.forgotPassword}
          element={<ForgotPassword />}
        />
        {/* Wrapper for protected routes */}
        <Route
          path={constants.routeNames.root}
          element={<PrivateRoute Component={() => <Outlet />} />} // Outlet placeholder for any child routes.
        >
          {/* Protected routes */}
          <Route
            path={constants.routeNames.dashboard}
            element={<Dashboard />}
          />
          <Route path={constants.routeNames.customers} element={<Outlet />}>
            <Route
              index
              path={constants.routeNames.customers}
              element={<Customers />}
            />
            <Route
              index
              path={constants.routeNames.addNewCustomer}
              element={<AddNewCustomer />}
            />
          </Route>
          <Route path={constants.routeNames.sales} element={<Outlet />}>
            <Route
              index
              path={constants.routeNames.sales}
              element={<Sales />}
            />
            <Route
              path={constants.routeNames.addNewSale}
              element={<AddNewSale />}
            />
          </Route>
          <Route path={constants.routeNames.appointments} element={<Outlet />}>
            <Route
              index
              path={constants.routeNames.appointments}
              element={<Appointments />}
            />
            <Route
              path={constants.routeNames.addNewAppointment}
              element={<AddNewAppointment />}
            />
          </Route>
          <Route path={constants.routeNames.services} element={<Outlet />}>
            <Route
              index
              path={constants.routeNames.services}
              element={<Services />}
            />
            <Route
              path={constants.routeNames.addNewService}
              element={<AddNewService />}
            />
          </Route>
          {/* Super Admin routes Temporary Fix */}
          {role === constants.roles.super_admin && (
            <Route path={constants.routeNames.shops} element={<Outlet />}>
              <Route
                index
                path={constants.routeNames.shops}
                element={<Shops />}
              />
              <Route
                path={constants.routeNames.addNewShop}
                element={<AddNewShop />}
              />
            </Route>
          )}
          {role === constants.roles.super_admin && (
            <Route path={constants.routeNames.users} element={<Outlet />}>
              <Route
                index
                path={constants.routeNames.users}
                element={<Users />}
              />
              <Route
                path={constants.routeNames.addNewUser}
                element={<AddNewUser />}
              />
            </Route>
          )}
          <Route
            path={constants.routeNames.analytics}
            element={<Analytics />}
          />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
