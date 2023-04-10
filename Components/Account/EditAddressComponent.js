import React from 'react'
import { UpdateAddress } from '../../Api/Api'
import { toast } from "react-toastify"
import { useState } from 'react'

function EditAddressComponent(props) {

  


  const addressItem = props.addressItem;
  const [AddressType, setAddressType] = useState(addressItem.address_type);

  const handleUpdateAddress = async (event) => {
    event.preventDefault()

    const full_name = event.target.full_name.value;
    const address_one = event.target.address_one.value;
    const address_two = event.target.address_two.value;
    const city = event.target.city.value;
    const pincode = event.target.pincode.value;
    const state = event.target.state.value;
    const landmark = event.target.landmark.value;
    const address_type = event.target.address_type.value;
    const mobile_number = event.target.mobile_number.value;

    var formdata = new FormData();
    formdata.append('address_id', addressItem.id);
    formdata.append('full_name', full_name);
    formdata.append('mobile_number', mobile_number);
    formdata.append('company_name', '');
    formdata.append('pincode', pincode);
    formdata.append('address_line_1', address_one);
    formdata.append('address_line_2', address_two);
    formdata.append('landmark', landmark);
    formdata.append('town_or_city', city);
    formdata.append('state', state);
    formdata.append('delivery_instructions', 'Deliver Instruction note 1');
    formdata.append('address_type', address_type);
    formdata.append('is_default', 'No');
    const userToken = sessionStorage.getItem('userToken');
    UpdateAddress(userToken,formdata).then((response) => {
        toast.success('Address Updated successfully', {
            position: "top-right",
            classNameName: "app_toast",
            autoClose: 1000,
        })

        window.location.reload(false)

    }).catch((error) => {
        toast.error(error.response.data.message, {
            position: "top-right",
            classNameName: "app_toast",
            autoClose: 1000,
        })
    })


}

const onOptionChange = e => {
  setAddressType(e.target.value)
}

  return (
    <>
          <div class="modal fade" id={'edit_address'+addressItem.id} tabindex="-1" aria-labelledby="add_address_label"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title fs-5" id="add_address_label">Edit Address</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleUpdateAddress}>
                                <div class="mb-3">
                                    <div class="input-group">
                                        <input type="text" name='full_name' defaultValue={addressItem.full_name} class="form-control" id="" placeholder="Full Name*" required />
                                        <input type="text" class="form-control" defaultValue={addressItem.mobile_number} name='mobile_number' id="" placeholder="Mobile*" required />
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="input-group">
                                        <input type="text" name='address_one' defaultValue={addressItem.address_line_1} class="form-control" id="" placeholder="Address Line-1*" required />
                                        <input type="text" name='address_two' defaultValue={addressItem.address_line_2} class="form-control" id="" placeholder="Address Line-2" />
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="input-group">
                                        <input type="text" name='city' defaultValue={addressItem.town_or_city} class="form-control" id="" placeholder="City" />
                                        <input type="text" name='pincode' defaultValue={addressItem.pincode} class="form-control" id="" placeholder="Pincode*" required />


                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="input-group">
                                        <select class="form-select" defaultValue={addressItem.state} aria-label="Default select example" name='state' required>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab" selected>Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                        </select>


                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="input_custom_flex">
               
                                            <textarea name='landmark' placeholder="Landmark (Optional)">{addressItem.landmark}</textarea>
                             
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="" class="form-label"> Address Type*</label>

                                    <div class="input-group form_address_type">
                                        <div>
                                            <input class="form-check-input" onChange={onOptionChange} value='Home' type="radio" name="address_type" id="Home" checked={AddressType == 'Home'} />
                                            <label class="form-check-label mx-2" for="Home">
                                                Home
                                            </label>
                                        </div>
                                        <div>
                                            <input class="form-check-input cursor-pointer" onChange={onOptionChange} value='Office' type="radio" name="address_type" id="Office" checked={AddressType == 'Office'} />
                                            <label class="form-check-label mx-2" for="Office">
                                                Office
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="mb-3">
                                    <input type="submit" class="orange_btn"  value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
    </>
  )
}

export default EditAddressComponent