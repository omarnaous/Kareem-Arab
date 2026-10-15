import { useEffect } from 'react'
import Hero from '../sections/Hero'
import Story from '../sections/Story'
import Fit from '../sections/Fit'
import HowItWorks from '../sections/HowItWorks'
import Results from '../sections/Results'
import Offers from '../sections/Offers'
import Local from '../sections/Local'
import Steps from '../sections/Steps'
import FAQ from '../sections/FAQ'
import Apply from '../sections/Apply'
import FinalCTA from '../sections/FinalCTA'

export default function Home() {
  useEffect(() => {
    document.title = 'BUILTBYARAB — Personal Fitness Mentorship by Karim Al Arab'
  }, [])
  return (
    <>
      <Hero />
      <Story />
      <Fit />
      <HowItWorks />
      <Results />
      <Offers />
      <Local />
      <Steps />
      <FAQ />
      <Apply />
      <FinalCTA />
    </>
  )
}
