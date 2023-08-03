import React, { useState } from 'react';
import '../CSS/Inquiry.css';
import axios from 'axios';

export default function Inquiry() {

    const [inquiryData, setInquiryData] = useState({
        name: '',
        role: '',
        compeny_name: '',
        email: '',
        mobile_no: '',
        address: '',
        country: '',
        state: '',
        city: '',
        inquiry_type: '',
        message: '',
    });

    const handleInquiryChange = (event) => {
        const { name, value } = event.target;
        setInquiryData((prevProdData) => ({
            ...prevProdData,
            [name]: value
        }));
    };

    const addInguiryData = (e) => {
        e.preventDefault();

        //NAME
    if (inquiryData.name === "") {
        document.getElementById("nameErr").innerHTML = "**Please fill the first name";
        return false;
      }
      if ((inquiryData.name.length < 3) && (inquiryData.name.length < 20)) {
        document.getElementById("nameErr").innerHTML = "**name length is must between 3 and 20";
        return false;
      }
      if (!isNaN(inquiryData.name)) {
        document.getElementById("nameErr").innerHTML = "**do not allow number";
        return false;
      }
      document.getElementById("nameErr").innerHTML = "";

      //ROLE
      if (inquiryData.role === "") {
        document.getElementById("roleErr").innerHTML = "**Please fill the choose";
        return false;
      }

      //COMPENY NAME

      if (inquiryData.compeny_name === "") {
        document.getElementById("compenyErr").innerHTML = "**Please fill the first name";
        return false;
      }
      if (inquiryData.compeny_name.length < 3) {
        document.getElementById("compenyErr").innerHTML = "**name length is must between 3 and 20";
        return false;
      }
      if (!isNaN(inquiryData.compeny_name)) {
        document.getElementById("compenyErr").innerHTML = "**do not allow number";
        return false;
      }
      document.getElementById("compenyErr").innerHTML = "";

      //EMAIL

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (inquiryData.email === "") {
        document.getElementById("emailErr").innerHTML = "**Please fill the email";
        return false;
      }
      if (!emailRegex.test(inquiryData.email)) {
        document.getElementById("emailErr").innerHTML = "**Invalid email format";
        return false;
      }
      document.getElementById("emailErr").innerHTML = "";

      //MOBILE nOMBER

      if (inquiryData.mobile_no === "") {
        document.getElementById("mobileErr").innerHTML = "**Please fill the mobile number";
        return false;
      }
      if (inquiryData.mobile_no.length < 10)  {
        document.getElementById("mobileErr").innerHTML = "**name length is must 10 number";
        return false;
      }

      //address

      if (inquiryData.address === "") {
        document.getElementById("addressErr").innerHTML = "**Please fill the address";
        return false;
      }
      if (inquiryData.address.length < 3) {
        document.getElementById("addressErr").innerHTML = "**name length is must 3";
        return false;
      }
      if (!isNaN(inquiryData.address)) {
        document.getElementById("addressErr").innerHTML = "**do not allow number";
        return false;
      }
      document.getElementById("addressErr").innerHTML = "";

      //COUNTRY

      if (inquiryData.country === "") {
        document.getElementById("countryErr").innerHTML = "**Please fill the country name";
        return false;
      }
      if ((inquiryData.country.length < 3) && (inquiryData.name.length < 20)) {
        document.getElementById("countryErr").innerHTML = "**name length is must between 3 and 20";
        return false;
      }
      if (!isNaN(inquiryData.country)) {
        document.getElementById("countryErr").innerHTML = "**do not allow number";
        return false;
      }
      document.getElementById("countryErr").innerHTML = "";

      //STATE

      if (inquiryData.state === "") {
        document.getElementById("stateErr").innerHTML = "**Please fill the sate name";
        return false;
      }
      if ((inquiryData.state.length < 2) && (inquiryData.name.length < 20)) {
        document.getElementById("stateErr").innerHTML = "**name length is must between 2 and 20";
        return false;
      }
      if (!isNaN(inquiryData.state)) {
        document.getElementById("stateErr").innerHTML = "**do not allow number";
        return false;
      }
      document.getElementById("stateErr").innerHTML = "";

      //CITY

      if (inquiryData.city === "") {
        document.getElementById("cityErr").innerHTML = "**Please fill the city name";
        return false;
      }
      if ((inquiryData.city.length < 2) && (inquiryData.name.length < 20)) {
        document.getElementById("cityErr").innerHTML = "**city length is must between 2 and 20";
        return false;
      }
      if (!isNaN(inquiryData.city)) {
        document.getElementById("cityErr").innerHTML = "**do not allow number";
        return false;
      }
      document.getElementById("cityErr").innerHTML = "";

      //INQUIRY TYPE

      if (inquiryData.inquiry_type === "") {
        document.getElementById("enquiryErr").innerHTML = "**Please fill the choose";
        return false;
      }

      //MESSAGE

      if (inquiryData.message === "") {
        document.getElementById("messageErr").innerHTML = "**Please fill the message";
        return false;
      }
      if (inquiryData.message.length < 3) {
        document.getElementById("messageErr").innerHTML = "**message length is must between 3 and 20";
        return false;
      }
      if (!isNaN(inquiryData.message)) {
        document.getElementById("messageErr").innerHTML = "**do not allow number";
        return false;
      }
      document.getElementById("messageErr").innerHTML = "";

      
      console.log(inquiryData)

        axios.post('http://localhost:1005/inquiry', inquiryData)
            .then(() => {
                window.alert('Your Data submited succesfully');
                e.target.reset();
            })
            .catch((error) => {
                alert("Enter All Details");
                console.log('Error adding brand data in Product.js:', error);
            });
    }
    return (
        <>
            <div className="container-fluid inq-bg">
                <div className="container">
                    <div className="row">
                        <p className='inq-head'>Welocome Dealer</p>
                        <p className='inq-para'>The mission of the ‘Forolly’ is to give youth candy recollections, for example, a way that
                            it celebrates God and His arrangement for our lives. Our objective for each candy arrange
                            is that it results in a “charmed client” who will tell their companions.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <form method='post' onSubmit={addInguiryData}>
                    <div className="row form-main">
                        <div className='form-outer'>
                            <input type="text" className="form-control mb-4" id="exampleFormControlInput1" placeholder="Name" name='name' onChange={handleInquiryChange} />
                            <span style={{ color: "red", fontWeight: 'bold' }} id='nameErr'></span>
                            <div className="row mb-4">
                                <div className="col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                                    <select defaultValue="1" className="form-select" aria-label="Default select example" name='role' onChange={handleInquiryChange}>
                                        <option value="1">Who are you?</option>
                                        <option value="2">Dealer/Distributor</option>
                                        <option value="3">Customer</option>
                                    </select>
                                    <span style={{ color: "red", fontWeight: 'bold' }} id='roleErr'></span>
                                </div>
                                <div className="col-md-6 col-12">
                                    <input type="text" className="form-control" placeholder="Company Name" name="compeny_name" onChange={handleInquiryChange} />
                                    <span style={{ color: "red", fontWeight: 'bold' }} id='compenyErr'></span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={handleInquiryChange} />
                                    <span style={{ color: "red", fontWeight: 'bold' }} id='emailErr'></span>
                                </div>
                                <div className="col-md-6 col-12">
                                    <input type="text" className="form-control" placeholder="Mobile Number" name="mobile_no" onChange={handleInquiryChange} />
                                    <span style={{ color: "red", fontWeight: 'bold' }} id='mobileErr'></span>
                                </div>
                            </div>
                            <input type="text" className="form-control mb-4" id="exampleFormControlInput2" placeholder="address" name='address' onChange={handleInquiryChange} />                            <span style={{ color: "red", fontWeight: 'bold' }} id='addressErr'></span>
                            <span style={{ color: "red", fontWeight: 'bold' }} id='emailErr'></span>
                            <div className="row mb-4">
                                <div className="col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                                    <input type="text" className="form-control" placeholder="Country" name="country" onChange={handleInquiryChange} />
                                    <span style={{ color: "red", fontWeight: 'bold' }} id='countryErr'></span>
                                </div>
                                <div className="col-md-6 col-12">
                                    <input type="text" className="form-control" placeholder="State" name="state" onChange={handleInquiryChange} />
                                    <span style={{ color: "red", fontWeight: 'bold' }} id='stateErr'></span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                                    <input type="text" className="form-control" placeholder="City" name="city" onChange={handleInquiryChange} />
                                    <span style={{ color: "red", fontWeight: 'bold' }} id='cityErr'></span>
                                </div>
                                <div className="col-md-6 col-12">
                                    <select defaultValue="1" className="form-select" aria-label="Default select example" name="inquiry_type" onChange={handleInquiryChange}>
                                        <option value="1">Enquiry Tpye</option>
                                        <option value="2">Customer Queries</option>
                                        <option value="3">Distributor Queries</option>
                                    </select>
                                    <span style={{ color: "red", fontWeight: 'bold' }} id='enquiryErr'></span>
                                </div>
                            </div>
                            <input type="text" className="form-control mb-4" id="exampleFormControlInput3" placeholder="Message" name='message' onChange={handleInquiryChange} />
                            <span style={{ color: "red", fontWeight: 'bold' }} id='messageErr'></span>
                            <button type="submit" className="btn btn-primary">Submit Form</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
