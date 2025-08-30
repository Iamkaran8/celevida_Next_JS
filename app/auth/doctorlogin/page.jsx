import Image from "next/image";

// import styles from "@/app/auth/doctorlogin/page.module.css"

export default function doctorLogin() {
    return (
        <>
            <div>
                <div className="row d-flex flex-md-column  flex-lg-row   Signin-container p-0">
                    <div
                        className="col-12 col-md-12 col-lg-6 d-flex justify-content-center align-items-center container signin-left-container">
                        <div className="d-none d-md-none d-lg-block">
                            <Image src="/images/Signin-left-image.png" alt="singin-left-image" fill/>
                        </div>
                    </div>
                    <div
                        className="col-12 col-md-12 col-lg-6  d-flex justify-content-center align-items-center  signin-right-container">

                        {/* Use THis When Need Proper Auth Flow 
                         Signin With Phone Number  */}
                        {/* <div id="mobile-number-signin-div">
                            <div className="row d-flex flex-column justify-content-center align-items-center gap-lg-4 gap-0">
                                <div className="sign-in-form-container container p-0 p-md-4 ">
                                    <form className="px-4" id="mobile-number-signin-form">
                                        <div className="row d-flex py-4">
                                            <div className="col-8 col-md-7">
                                                <h6>Welcome to Celevida</h6>
                                                <h2 className="mt-2">Sign in</h2>
                                            </div>
                                            <div className="col-4 col-md-5 d-flex justify-content-end">
                                                <img src="./assets/SugarCoach-DigiSlate-img.png" style="height: 50px;width: 107px;"
                                                    alt="logo" />
                                            </div>
                                        </div>
                                        <div className="row py-0 py-md-4 gap-2 gap-md-4">
                                            <p>Enter your Phone Number</p>
                                            <div className="phone-number-input-box d-flex align-items-center">
                                                <span>+91</span>
                                                <input className="phone-number-input" id="mobile-number" type="text"
                                                    placeholder="Enter Here" required pattern="[0-9]{10}" />
                                            </div>
                                        </div>
                                        <div className="row py-2 py-md-0">
                                            <button className="primary-golden-btn" type="submit">Sign in</button>
                                        </div>
                                        <div className="row empty-div">

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>  */}

                        {/* <!-- Use THis When Need Proper Auth Flow -->
                        <!-- OTP Verification  Section --> */}

                        {/* <!-- <div id="Otp-verification-div" style="display: none;"> -->
                            <!-- <div className="row d-flex flex-column justify-content-center align-items-center gap-lg-4 gap-0"> -->
                                <!-- Error Message  Section -->
                                <!-- <div className="row d-flex justify-content-center align-items-center">
                                    <div className="otp-error-msg green-clr">
                                        <p>OTP Send SuccessFully</p>
                                    </div>
                                </div> -->
                                <!-- OTP Verification  -->
                                <!-- <div className="sign-in-form-container container p-0 p-md-4 ">

                                    <form className="px-4" id="verify-otp-form">
                                        <div className="row d-flex py-4">
                                            <div className="">
                                                <h2 className="mt-2 text-center">OTP Verification</h2>
                                                <p className="text-center my-4">Enter the OTP sent to +91 <span
                                                    id="dispaly-mbl-number"></span></p>
                                            </div>

                                        </div>
                                        <div className="row py-0 py-md-4 gap-2 gap-md-4">
                                            <div className="otp-container d-flex gap-2 gap-md-4 justify-content-center">
                                                <input type="text" maxlength="1"
                                                    className="otp-input justify-content-centera align-items-center text-center"
                                                    required />
                                                <input type="text" maxlength="1"
                                                    className="otp-input justify-content-centera align-items-center text-center"
                                                    required />
                                                <input type="text" maxlength="1"
                                                    className="otp-input justify-content-centera align-items-center text-center"
                                                    required />
                                                <input type="text" maxlength="1"
                                                    className="otp-input justify-content-centera align-items-center text-center"
                                                    required />
                                                <input type="text" maxlength="1"
                                                    className="otp-input justify-content-centera align-items-center text-center"
                                                    required />
                                                <input type="text" maxlength="1"
                                                    className="otp-input justify-content-centera align-items-center text-center"
                                                    required />
                                            </div>
                                            <p className="light-gray-txt text-center">Didn’t you receive the OTP ? <button className="btn"
                                                style="color:#E48700;" type="button" id="resend-Otp">Resend OTP</button> </p>
                                        </div>
                                        <div className="row py-2 py-md-4">
                                            <button className="primary-golden-btn" type="submit">Verify OTP</button>
                                        </div>
                                        <div className="row empty-div">

                                        </div>
                                    </form>
                                </div> -->
                                <!-- </div> -->
                            <!-- </div> -->
 */}





                        {/* <!-- For Temp Login Using Email And Password --> */}

                        <div id="mobile-number-signin-div" style={{ width: "85%" }}>
                            <div className="row d-flex flex-column justify-content-center align-items-center gap-lg-4 gap-0">
                                <div className="sign-in-form-container container p-0 p-md-4 ">
                                    <form className="px-4" id="mobile-number-signin-form_temp">
                                        <div className="row d-flex py-4">
                                            <div className="col-8 col-md-7">
                                                <h6>Welcome to Celevida</h6>
                                                <h2 className="mt-2">Sign in</h2>
                                            </div>
                                            <div className="col-4 col-md-5 d-flex justify-content-end">
                                                {/* <img src="./assets/SugarCoach-DigiSlate-img.png" style="height: 50px;width: 107px;"
                                                    alt="logo" /> */}
                                            </div>
                                        </div>
                                        <div className="row py-0 py-md-2 gap-2 gap-md-1">
                                            <p>Email ID</p>
                                            <div className="phone-number-input-box d-flex align-items-center">
                                                <input className="phone-number-input" id="temp_Email_Id" type="text"
                                                    placeholder="Enter Email " required />
                                            </div>
                                        </div>
                                        <div className="row py-0 py-md-2 gap-2 gap-md-1">
                                            <p>Password</p>
                                            <div className="phone-number-input-box d-flex align-items-center">
                                                <input className="phone-number-input" id="temp_Email_Password" type="password"
                                                    placeholder="Enter Password " required />
                                            </div>
                                        </div>
                                        <div className="row py-2 py-md-0 my-2 d-flex justify-content-center align-items-center  mt-2">
                                            <button className="primary-golden-btn" style={{ width: '45%' }} type="submit">Sign in</button>
                                        </div>
                                        <div className="row empty-div">

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}