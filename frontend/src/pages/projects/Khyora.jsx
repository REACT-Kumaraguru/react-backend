import React from "react";
import "../../components/projectCom/khyoraCom/disappearing/khyora.css";
import { Nav } from "../../components/projectCom/khyoraCom/disappearing/Nav";
import { Hero } from "../../components/projectCom/khyoraCom/disappearing/Hero";
import { ProblemSection } from "../../components/projectCom/khyoraCom/disappearing/ProblemSection";
import { SolutionSection } from "../../components/projectCom/khyoraCom/disappearing/SolutionSection";
import { HowItWorks } from "../../components/projectCom/khyoraCom/disappearing/HowItWorks";
import { Science } from "../../components/projectCom/khyoraCom/disappearing/Science";
import { Impact } from "../../components/projectCom/khyoraCom/disappearing/Impact";
import { Team } from "../../components/projectCom/khyoraCom/disappearing/Team";
import { Footer } from "../../components/projectCom/khyoraCom/disappearing/Footer";

export const Khyora = () => (
  <main className="relative khyora-page">
    <Nav />
    <Hero />
    <ProblemSection />
    <SolutionSection />
    <HowItWorks />
    <Science />
    <Impact />
    <Team />
    <Footer />
  </main>
);

export default Khyora;
