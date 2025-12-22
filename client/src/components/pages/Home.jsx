import React from 'react'
import Heropage from '../content/Heropage'
import Collection from '../content/Collection'
import BestSellerColl from '../content/BestSellerColl'
import Slider from '../content/Slider'
import ThreeIcons from '../content/ThreeIcons'
import Gridpage from '../content/Gridpage'
import Footer from '../footer/Footer'

const Home = () => {
  return (
    <div className='lg:mt-17 mt-15'>
      <Heropage/>
      <BestSellerColl/>
      <Slider/>
      <Collection/>
      <ThreeIcons/>
      <Gridpage/>
      <Footer/>
    </div>
  )
}

export default Home
