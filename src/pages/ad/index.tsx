import DashboardPrincipal from "@/components/CriacaoDashboard/DashboardPrincipal/principal";
import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Section } from "@/components/Section/Section";
import { Text } from "@chakra-ui/react";
import { Login } from "../login";

export default function AdminDashboard() {
    return (
        <>
        <HeaderAdmin />
        <Section />
        < Footer/>
        </>
    )
}