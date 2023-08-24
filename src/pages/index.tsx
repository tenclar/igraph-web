import { Header } from "@/components/Form/Header";
import Filter from "@/components/Filter/filter";
import DashboardPrincipal from "@/components/DashboardPrincipal/principal";
import DashboardRioBranco from "@/components/DashboardRioBranco/rioBranco";

export default function Home() {
    return (
        <>
            <Header />
            <Filter />
            <DashboardPrincipal/>
            <DashboardRioBranco />
        </>

    )
}