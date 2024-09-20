import React from 'react'
import HeroSection from '@/app/myComponents/HomeComponents/HeroSection'
import FeaturesSection from '@/app/myComponents/HomeComponents/FeaturedSection'
import CallToAction from '@/app/myComponents/HomeComponents/CallToAction'
import TestimonialsSection from '@/app/myComponents/HomeComponents/TestimonialSection'

const Home = () => {
  return (
    <div>
        <HeroSection/>
        <FeaturesSection/>
        <CallToAction/>
        <TestimonialsSection/>
    </div>
  )
}

export default Home