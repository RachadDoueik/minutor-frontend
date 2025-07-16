import Navbar from './components/Navbar'
import Home from './pages/Home';

function App() {

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        <Home/>
      </main>
    </>
  )
}

export default App
