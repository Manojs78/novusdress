import React from 'react'
import FaqComponent from './FaqComponent';
import FeaturedContentComponent from './FeaturedContentComponent';
import FeatureOfferComponent from './FeatureOfferComponent';
import MainbannersliderComponent from './MainbannersliderComponent';
import OurpartnerComponent from './OurpartnerComponent';
import OurproductComponent from './OurproductComponent';
import SchoolUniformsComponent from './SchoolUniformsComponent';
import TestimonialsComponent from './TestimonialsComponent';
import UspSectionComponent from './UspSectionComponent';

function HomepageComponent(props) {


  return (
    <main>
      
      {/* <!-------------------banner-slider--------------------------> */}
      <MainbannersliderComponent/>

      {/* <!-- =-=-=-=-=-=-= fEATURED CONTENT  section =-=-=-=-=-=-=== --> */}
      <FeaturedContentComponent schoolList={props.schoolList}/>
      

      {/* <!-- =-=-=-=-=-= Our Product =-=-=-=-=-=-=- --> */}
      <OurproductComponent homepagecategoryList={props.homepagecategoryList}/>

       {/* <!-- =-=-=-=-=-= usp properties =-=-=-=-=-=-=- --> */}
      <UspSectionComponent/>

      {/* <!-- =-=-=-=-=-= School Uniform =-=-=-=-=-=-=- --> */}
      <SchoolUniformsComponent/>

      {/* <!-- =-=-=-=-=-=-=-= ad Banner =-=-=-=-=-=-= --> */}
      <FeatureOfferComponent/>


      {/* <!-- =-=-=-=-=-= Testimonial sec =-=-=-=-=-=-=- --> */}
      <TestimonialsComponent testimonialList={props.testimonialList} />

      {/* <!-- =-=-=-=-=-=-=-== FAQ sec =-=-=-=-=-=-== --> */}
      <FaqComponent faqList={props.faqList}/>



      {/* <!----------------------------------------------------> */}

      {/* <!-- =-=-=-=-=-= School Uniform =-=-=-=-=-=-=- --> */}
      <OurpartnerComponent ourParterList={props.ourParterList}/>


      

    </main>
  )
}

export default HomepageComponent