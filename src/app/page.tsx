import { getData } from '@/lib/data'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Education from '@/components/sections/Education'
import Projects from '@/components/sections/Projects'
import Certificates from '@/components/sections/Certificates'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const data = getData()

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        <About about={data.about} />
        <Education education={data.education} />
        <Projects projects={data.projects} />
        <Certificates certificates={data.certificates} />
        <Skills skills={data.skills} />
        <Contact profile={data.profile} />
      </main>
      <Footer />
    </>
  )
}
