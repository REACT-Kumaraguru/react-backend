import { ReactLenis } from 'lenis/react'
import { NavBar } from './components/NavBar'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { ExistingSolutions } from './sections/ExistingSolutions'
import { CoreIdea } from './sections/CoreIdea'
import { ProductShowcase } from './sections/ProductShowcase'
import { HowItWorks } from './sections/HowItWorks'
import { SimulationValidation } from './sections/SimulationValidation'
import { Impact } from './sections/Impact'
import { FinalCTA } from './sections/FinalCTA'
import './App.css'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.25, smoothWheel: true }}>
      <ScrollProgress />
      <NavBar />
      <main>
        <Hero />
        <Problem />
        <ExistingSolutions />
        <CoreIdea />
        <ProductShowcase />
        <HowItWorks />
        <SimulationValidation />
        <Impact />
        <FinalCTA />
      </main>
    </ReactLenis>
  )
}

export default App
