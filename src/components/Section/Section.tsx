import React,{useState} from "react";
import Filter from "@/components/CriacaoDashboard/Filter/filter"; 
import DashboardPrincipal from "@/components/CriacaoDashboard/DashboardPrincipal/principal";
import DashboardUnidade from "@/components/CriacaoDashboard/Dashboards";


export function Section () {
  const [showDashboards, setShowDashboards] = useState(false);

  return (
    <>
      <Filter setShowDashboards={setShowDashboards} />
      {showDashboards && (
        <>
          <DashboardPrincipal />
          <DashboardUnidade />
        </>
      )}
    </>
  );
};

