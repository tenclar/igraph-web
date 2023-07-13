import { Header } from "@/components/Form/Header";
import Dashboard from "@/components/Dashboard/dashboard";
import Filter from "@/components/Filter/filter";

export default function Home() {
    return (
        <>
            <Header />
            <Filter />
            <Dashboard />
        </>

    )
}