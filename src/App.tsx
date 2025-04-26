import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import ECommerce from "./pages/Dashboard/ECommerce";
import DefaultLayout from "./layout/DefaultLayout";
import UserList from "./pages/User/UserList";
import AddUser from "./pages/User/AddUser";
import ChurchList from "./pages/Church/ChurchList";
import AddChurch from "./pages/Church/AddChurch";
import PlanList from "./pages/plan/PlanList";
import AddPlan from "./pages/plan/AddPlan";
import AddSubscription from "./pages/subscription/AddSubscription";
import SubscriptionList from "./pages/subscription/SubscriptionList";
import ChurchUserList from "./pages/Church/ChurchUserList";
import SignIn from "./pages/authentication/SignIn";
import PrivateRouter from "./layout/PrivateRouter";
import NotificationPage from "./pages/notification/NotificationPage";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Bethel Patrika" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika" />
              <ECommerce />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || User" />
              <UserList />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
      <Route
        path="/church"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || Church" />
              <ChurchList />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
      <Route
        path="/plan"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || Plan" />
              <PlanList />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
        <Route
        path="/notifications"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || Plan" />
              <NotificationPage/>
            </DefaultLayout>
          </PrivateRouter>
        }
      />
      <Route
        path="/subscription"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || Subscription" />
              <SubscriptionList />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
      <Route
        path="/add-user"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || User" />
              <AddUser />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
      <Route
        path="/add-church"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || Church" />
              <AddChurch />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
      <Route
        path="/church/:id"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || Church" />
              <ChurchUserList />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
      <Route
        path="/add-plan"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || Plan" />
              <AddPlan />
            </DefaultLayout>
          </PrivateRouter>
        }
      />

      <Route
        path="/add-subscription"
        element={
          <PrivateRouter>
            <DefaultLayout>
              <PageTitle title="Bethel Patrika || Subscription" />
              <AddSubscription />
            </DefaultLayout>
          </PrivateRouter>
        }
      />
    </Routes>
  );
}

export default App;
