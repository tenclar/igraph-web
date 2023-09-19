import React, { useState } from "react";
import { Header } from "@/components/Form/Header";
import Filter from "@/components/Filter/filter";
import HTMLComponent from "../../public";
import DashboardPrincipal from "@/components/DashboardPrincipal/principal";
import DashboardUnidade from "@/components/CriacaoDashboard/Dashboards";

export default function Home() {
  const [showDashboards, setShowDashboards] = useState(true); // Estado para controlar a visibilidade dos Dashboards

  return (
    <>
      <HTMLComponent />
      <Header />
      <Filter setShowDashboards={setShowDashboards} />
      {showDashboards && (
        <>
          <DashboardPrincipal />
          <DashboardUnidade />
        </>
      )}
    </>
  );
}
