import { useState } from 'react'
// import './App.css'
import Navbar from './pages/Navbar'
import { Routes , Route } from 'react-router-dom'
import NewsApp from './NewsApp'
import OnlineGame from './component/OnlineGame'
import WeatherApp from './component/WeatherApp'
import MovieHouse from './component/MovieHouse'
// import BookApp from './component/BookApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='container'>
    <Routes>
    <Route path='/' element={<MovieHouse/>}/>
      {/* <Route path='/' element={<MovieHouse/>}/> */}
      <Route path='/news' element={<NewsApp/>}/>
      <Route path='/onlinegame' element={<OnlineGame/>}/>
      <Route path='/weather' element={<WeatherApp/>}/>
      {/* <Route path='/book' element={<BookApp/>}/> */}
      
    </Routes>
    </div>
    {/* <MovieHouse/> */}
    </>
  )
}

export default App
