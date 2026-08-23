import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Ticker from "./components/Ticker"
import Dashboard from "./components/Dashboard"
import AIAssistant from "./components/AIAssistant"
import Features from "./components/Features"
import News from "./components/News"
import Footer from "./components/Footer"

export default function home(){
  return(

    <div>
    <Navbar/>
    <Hero/>
    <Ticker/>
    <Dashboard/>
    <AIAssistant />
    <Features/>
    <News/>
    <Footer/>
    
    </div>
  )
}
