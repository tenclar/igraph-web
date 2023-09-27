import React, { useState } from "react";
import HTMLComponent from "../../public";
import { Section } from "@/components/Section/Section"
import { Header } from "@/components/Form/Header";
import { Footer } from "@/components/Form/Footer";

export default function Home() {

  return (
    <>
      <Header />
      <Section/>
      <Footer/>
    </>
    
  );
  
}
