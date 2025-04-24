import React from 'react'
import BookCategories from './BookCategories'
import FeaturedBooks from './featuredBooks'
import Reviews from './Reviews'
import PromoSection from './PromoSection'

const Home = () => {

  return (
    <>
        
        <BookCategories/>
        <FeaturedBooks/>
        <Reviews/>
        <PromoSection/>
    </>
  )
}

export default Home