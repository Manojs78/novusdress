import React from 'react'
import axios from "axios"
import { ContactUsApi } from "../../Api/Api"
import { toast } from "react-toastify"
import Link from 'next/link'


const backendApiUrl = "https://api.novusuniforms.com";
function Blog(props) {
 const blogeDetail = props.blogeDetail.data;
 
 const handleContactUsSubmit = async (event) => {
    event.preventDefault()

    var name = event.target.full_name.value;
    var email = event.target.email.value;
    var message = event.target.message.value;
    var phone = event.target.phone.value;
    
    if(name == ''){
        toast.error("Please fill Full Name");
        return;
    }else if(email == ''){
        toast.error("Please fill Full Name");
        return;
    }else if(message == ''){
        toast.error("Please fill Message");
        return;
    }else if(phone == ''){
        toast.error("Please fill Phone");
        return;
    }
    

    var formdata = new FormData();

    formdata.append('email', email);
    formdata.append('name', name);
    formdata.append('phone', phone);
    formdata.append('message', message);

    ContactUsApi(formdata).then((response) => {
        toast.success("You query submited Successfully")
        window.location.href = "/";
        
  
      }).catch((error) => {
        toast.error("Something went wrong please try again", {
          position: "top-right",
          autoClose: 1000,
        })
      })

}

  return (
    <>

<section class="Breadcrub_sec">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
              <li class="breadcrumb-item" aria-current="page"><a href="/blogs">Blog</a></li>
              <li class="breadcrumb-item active" aria-current="page">{blogeDetail.title}</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </section>
      <section class="Products_grid_with_sidebar  blog_section">
    <div class="container">
      <div class="row">

        <div class="col-lg-9 col-sm-12 col-12">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div class="author-details mb-3">
                <div style={{height:"30rem",overflow:"hidden"}}>
                <img src={blogeDetail.image} class="w-100" />
                </div>
                <div class="blog-detail d-block d-sm-flex justify-content-end expert fw-medium mt-3">
                  <span class="date">{blogeDetail.created_at} </span>
                </div>
                <h1 class="fw-bold h2">{blogeDetail.title}</h1>
              </div>
              <div class="blog-content w-100 overflow-hidden product-name mt-2 mb-2" dangerouslySetInnerHTML={{ __html: blogeDetail.content }}>
        
              </div>
            </div>

          </div>

        </div>
        
        <div class="col-12 col-lg-3">
          <div class="form border p-2 p-sm-3 enquiry-form">
            <h5 class="text-uppercase fw-bold mb-4 mt-2">Enquire Now</h5>
            <form onSubmit={handleContactUsSubmit}>
              <div class="form-group">
                <input type="text" class="form-control mb-2" placeholder="Name" name="full_name" />
              </div>
              <div class="form-group">
                <input type="email" class="form-control mb-2" placeholder="E-Mail" name="email" />
              </div>
              <div class="form-group">
                <input type="tel" class="form-control mb-2" placeholder="Phone" name="phone" />
              </div>
              <div class="form-group mb-5">
                <textarea class="form-control border-0" rows="5" placeholder="Message" name="message"></textarea>
              </div>
              <div class="form-group mb-4">
                <input type="submit" class="btn btn-lg btn-dark w-100" value="Submit" />
              </div>
              
            </form>
          </div>
          <div class="social-enquiry mt-5">
            <h5 class="text-uppercase fw-bold mb-4 mt-2">Follow Us</h5>
            <ul class="social-icon ps-sm-4 list-unstyled ">
              <li><a href="https://www.instagram.com/novusuniforms/" target="_blank"><img src={"/"+"assets/images/insta.png"} alt="insta"/></a></li>
              <li><a href="https://www.facebook.com/profile.php?id=100090860678344" target="_blank"><img src={"/"+"assets/images/fb.png"} alt="fb"/></a></li>
            </ul> 
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default Blog

export async function getServerSideProps(context) {

    const { blog_id } = context.query;

    let blogeDetails = await axios.get(backendApiUrl + "/api/customer/get_blog_details/" + blog_id);

    const blogeDetail = blogeDetails.data;

    if (blogeDetail.data == null) {
        return {
          notFound: true,
        }
      }

    return {
        props: { blogeDetail: blogeDetail }, // will be passed to the page component as props
    }

}