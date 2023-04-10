import Head from 'next/head'
import { Inter } from '@next/font/google'

import HomepageComponent from '@/Components/Homepage/HomepageComponent';
import axios from "axios"

const backendApiUrl = "https://api.novusuniforms.com";

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {

  return (
    <>
      <Head>
        <title>Find out all Uniforms, Shoes & Accessories for your school</title>
        <meta name="description" content="Find out all Uniforms, Shoes & Accessories for your school" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="/static/script.js"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YR6P3S3GZ3"></script>
      </Head>

      <HomepageComponent homepagecategoryList={props.gethomepageData.data.category} schoolList={props.gethomepageData.data.ourSchool} ourParterList={props.gethomepageData.data.OurPartner} faqList={props.gethomepageData.data.faq} testimonialList={props.gethomepageData.data.testimonial} />


    </>
  )
}

export async function getStaticProps(context) {

  let homepageData = await axios.get(backendApiUrl + "/api/customer/homepage_data")
  const gethomepageData = homepageData.data;

  return {
    props: { gethomepageData:gethomepageData},
    revalidate: 60,
  }

}
