import React,{useEffect, useState} from "react";
import Filter from "@/components/Filter/filter"; 
import DashboardPrincipal from "@/components/Dashboard/DashboardPrincipal/principal";
import DashboardUnidade from "@/components/Dashboard/Dashboards";


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

