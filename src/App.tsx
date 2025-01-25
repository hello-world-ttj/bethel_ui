import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
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
import UserSubTable from "./components/Tables/UserSubTable";
import ChurchUserList from "./pages/Church/ChurchUserList";

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
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Bethal Patrika" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/user"
          element={
            <>
              <PageTitle title="Bethal Patrika || User" />
              <UserList />
            </>
          }
        />
        <Route
          path="/church"
          element={
            <>
              <PageTitle title="Bethal Patrika || Church" />
              <ChurchList />
            </>
          }
        />
        <Route
          path="/plan"
          element={
            <>
              <PageTitle title="Bethal Patrika || Plan" />
              <PlanList />
            </>
          }
        />
        <Route
          path="/subscription"
          element={
            <>
              <PageTitle title="Bethal Patrika || Subscription" />
              <SubscriptionList />
            </>
          }
        />
        <Route
          path="/add-user"
          element={
            <>
              <PageTitle title="Bethal Patrika || User" />
              <AddUser />
            </>
          }
        />
        <Route
          path="/add-church"
          element={
            <>
              <PageTitle title="Bethal Patrika || Church" />
              <AddChurch />
            </>
          }
        />
        <Route
          path="/church/:id"
          element={
            <>
              <PageTitle title="Bethal Patrika || Church" />
              <ChurchUserList />
            </>
          }
        />
        <Route
          path="/add-plan"
          element={
            <>
              <PageTitle title="Bethal Patrika || Plan" />
              <AddPlan />
            </>
          }
        />

        <Route
          path="/add-subscription"
          element={
            <>
              <PageTitle title="Bethal Patrika || Subscription" />
              <AddSubscription />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
