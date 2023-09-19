import { Header } from "@/components/Form/Header";
import {createRoot} from "react-dom/client"
import Filter from "@/components/Filter/filter";
import HTMLComponent from "../../public";
import DashboardPrincipal from "@/components/DashboardPrincipal/principal";
import DashboardRioBranco from "@/components/DashboardRioBranco/rioBranco";
import DashboardUnidade from "@/components/CriacaoDashboard/Dashboards";


export default function Home() {
    return (
        <>
            <HTMLComponent/>
            <Header />
            <Filter />
            <DashboardPrincipal/>
            <DashboardUnidade/>
        </>

    )
}