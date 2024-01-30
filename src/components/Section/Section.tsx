import React,{useEffect, useState} from "react";
import Filter from "@/components/CriacaoDashboard/Filter/filter"; 
import DashboardPrincipal from "@/components/CriacaoDashboard/DashboardPrincipal/principal";
import DashboardUnidade from "@/components/CriacaoDashboard/Dashboards";


export function Section () {
  const [showDashboards, setShowDashboards] = useState(false);

  useEffect(() => {
    setShowDashboards(true)
  }, []);

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

