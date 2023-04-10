import React from 'react'
import Link from 'next/link'
import { ContactUsApi } from "../Api/Api"
import { toast } from "react-toastify"

function ContactUs() {

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
    <section className="Breadcrub_sec">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <div class="container mt-5 mb-5">
        <div class="row">
          <div class="col-lg-12">
            <div class="help_form">
            <div class="help_support_bg">
                <h2>Help &amp; Support!</h2>
                <p>If you are looking to resolve a lost &amp; found issue, have any query, feedback,
                or complaint, fill in the form below and we will respond to your request at the earliest possible. </p>

                <form onSubmit={handleContactUsSubmit}>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" name='full_name' id="" required placeholder="Full Name*" />
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" name='phone' class="form-control" id="" required placeholder="Mobile Number*" />
                      <input type="email" name='email' class="form-control" id="" required placeholder="Email ID" />
                    </div>
                    <div class="">
                      <textarea class="form-control" name='message' required placeholder="Message"></textarea>
                    </div>
                    <input type="submit" class="submit_btn" name="" value="SUBMIT DETAILS" />
                    </form>
                </div> 

                 
           
                
              </div>
            
          </div>
        </div>
      </div>
      <section class="reach_out_us pt-0">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <h2><span>Reach Out To Us</span></h2>

            <div class="contact_icon_box">
              <img src="assets/images/clocation.png" alt="" />Plot No : 590, 2nd Floor, JLPL, Sector 82, Mohali, Punjab - 160055
            </div>

            <div class="contact_icon_box">
              <a href="#"><img src="assets/images/cemail.png" alt="" />info@novusindia.net</a>
            </div>

            <div class="contact_icon_box">
              <a href="#"><img src="assets/images/ccall.png" alt="" />+91 79425-32257</a>
            </div>
          </div>
          <div class="col-lg-8">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.231089112901!2d76.72872011551175!3d30.65562058166413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fe95915a425a7%3A0xd64895d41351681d!2sNovus%20India!5e0!3m2!1sen!2sin!4v1676109014575!5m2!1sen!2sin" width="100%" height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}

export default ContactUs