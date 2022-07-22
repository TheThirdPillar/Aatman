import { useRouter } from 'next/router'
import { useState } from 'react'
import Cookies from 'js-cookie'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import DatePicker from 'react-datepicker'
import Button from 'react-bootstrap/Button'
import Toasts from './Toasts'

import { FaFacebookF, FaTwitter, FaLinkedin, FaMediumM, FaYoutube } from 'react-icons/fa'
import { HiDocumentDuplicate } from 'react-icons/hi'

import { domain } from '../config/config'

function PersonalForm(props) {

    const router = useRouter()
    const fullForm = props.fullForm
    let btnText

    if (router.pathname === '/user/onboarding') {
        btnText = 'Submit'
    } else {
        btnText = 'Update'
    }

    const [inputFields, setInputFields] = useState({
        picture: null,
        avatar: "",
        username: (props.formData?.username) ? props.formData?.username : '',
        fullname: '',
        dob: null,
        email: {},
        phone: {},
        social: {},
        profileImage: "",
        ...props.formData?.user
    })

    const [toastShow, setToastShow] = useState(false)
    const [toastType, setToastType] = useState()
    const [toastMessage, setToastMessage] = useState()

    const setDate = (date) => {
        let currentField = {...inputFields}
        currentField["dob"] = date
        setInputFields(currentField)
    }

    const handleChange = (e) => {

        let currentField = {...inputFields}

        if (e.target.name === "username") {
            // Check if username exists
            if (e.target.value.length > 0) {
                fetch(domain + '/application/listen/identity/searchApplicationUserByUsername/?search=' + e.target.value, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('token')
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'SUCCESS') {
                        if (data.user && data.user.length !== 0) {
                            document.getElementById("personalFormUsername").setCustomValidity('Username taken')
                        } else {
                            document.getElementById("personalFormUsername").setCustomValidity('')
                        }
                    }
                })
            }
        }

        if (e.target.name === "email" || e.target.name === "phone") {
            currentField[e.target.name].address = e.target.value
            setInputFields(currentField)
            return
        }

        if (e.target.name === "facebook" || e.target.name === "twitter" || e.target.name === "linkedin" || e.target.name === "medium" || e.target.name === "youtube" || e.target.name === "youtubeDreams" || e.target.name === "youtubeSoftskills" || e.target.name === "youtubeVirtues" ) {
            currentField.social[e.target.name] = e.target.value
            setInputFields(currentField)
            return
        }

        currentField[e.target.name] = e.target.value
        setInputFields(currentField)
    }

    const uploadProfilePhoto = () => {
        let currentField = {...inputFields}
        // Change the avatar
        let photo = document.getElementById('profile-upload').files[0]
        let src = window.URL.createObjectURL(photo)
        // Update inputFields
        currentField["picture"] = src
        setInputFields(currentField)

        var formData = new FormData()
        formData.append('picture', photo)
        formData.append('file', 'profile=picture')

        fetch(domain + '/application/listen/profile/upload', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: formData
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status && data.status === "SUCCESS") {
                // TODO: Profile update handler
                setTimeout(() => {
                    location.reload()
                }, 2000)
            }
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(inputFields)
        if (router.pathname === '/user/onboarding') {
            fetch(domain + '/application/listen/identity/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(inputFields)
            })
            .then(response => response.json())
            .then((data) => {
                if (data.status === 'SUCCESS') {
                    setToastMessage("Successfully added the basic profile. Shield will synchronize soon.")
                    setToastType("success")
                    setToastShow(true) 
                    // TODO: Close the toast - Autoclose not working.
                    // TODO: Next Step
                    setTimeout(() => {
                        props.updateState()
                    }, 3000)
                } else {
                    setToastMessage("Unable to execute transaction at the moment.")
                    setToastType("danger")
                    setToastShow(true)
                }
            })
        } else {
            fetch(domain + '/application/listen/identity/updateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(inputFields)
            })
            .then(response => response.json())
            .then((data) => {
                if (data.status === 'SUCCESS') {
                    setToastMessage("Successfully updated the basic profile. Shield will synchronize soon.")
                    setToastType("success")
                    setToastShow(true) 
                    props.closeModal()
                    setTimeout(() => {
                        location.reload()
                    }, 3000)
                } else {
                    setToastMessage("Unable to execute transaction at the moment.")
                    setToastType("danger")
                    setToastShow(true)
                }
            })
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {fullForm &&
                    <>
                        <Form.Row className="justify-content-center">
                            <Form.Group as={Col} controlId="profilePicture" xs={3} md={3} lg={3}>
                                <Image src={(inputFields.picture) ? (inputFields.picture) : (inputFields.avatar !== "") ? (domain + "/" + inputFields.avatar) : "/userThumbnail.png"} rounded />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} className="align-bottom">
                                <Form.File 
                                    id="profile-upload"
                                    label="Choose new profile picture"
                                    accept="image/png, image/jpeg"
                                    onChange={() => uploadProfilePhoto()}
                                    name="picture"
                                    custom />
                            </Form.Group> 
                        </Form.Row>
                    </>

                }
                <Form.Group controlId="personalFormUsername">
                    <Form.Control type="text" placeholder="Pick a username" value={inputFields.username} name="username" onChange={(e) => handleChange(e)} pattern="^[a-zA-Z\d]+$" required/>
                </Form.Group>
                <Form.Group controlId="personalFormFullname">
                    <Form.Control type="text" placeholder="Enter fullname" value={inputFields.fullname} name="fullname" onChange={(e) => handleChange(e)} required/>
                </Form.Group>
                <Form.Group controlId="personalFormEmail">
                    <Form.Control type="email" placeholder="Enter email" value={inputFields.email.address} name="email" onChange={(e) => handleChange(e)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="personalFormMobile">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" placeholder="Enter phone" value={inputFields.phone.address} name="phone" onChange={(e) => handleChange(e)} pattern="^\d{10}$" required/>
                        </InputGroup>
                    </Form.Group> 
                    <Form.Group as={Col} controlId="personalFormBirthday">
                        <DatePicker 
                            onChange={date => setDate(date)} 
                            className="form-control d-block" 
                            placeholderText="Pick your birthday" 
                            maxDate={new Date()}
                            dateFormat="d MMMM, yyyy"
                            selected={new Date(inputFields.dob)}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            required
                        />
                    </Form.Group>
                </Form.Row>
                {fullForm &&
                    <>
                        <Form.Row>
                            <Form.Group as={Col} controlId="socialFormFacebook">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FaFacebookF /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="url" placeholder="Add facebook profile" value={inputFields.social.facebook} name="facebook" onChange={(e) => handleChange(e)} />
                                </InputGroup>
                            </Form.Group> 
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="socialFormTwitter">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FaTwitter /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Add twitter profile" value={inputFields.social.twitter} name="twitter" onChange={(e) => handleChange(e)} />
                                </InputGroup>
                            </Form.Group> 
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="socialFormLinkedin">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FaLinkedin /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Add linkedin profile" value={inputFields.social.linkedin} name="linkedin" onChange={(e) => handleChange(e)} />
                                </InputGroup>
                            </Form.Group> 
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="socialFormMedium">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FaMediumM /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Add medium profile" value={inputFields.social.medium} name="medium" onChange={(e) => handleChange(e)} />
                                </InputGroup>
                            </Form.Group> 
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="socialFormYoutube">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FaYoutube /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Add a smal introductory video to feature on public profile." value={inputFields.social.youtube} name="youtube" onChange={(e) => handleChange(e)} />
                                </InputGroup>
                            </Form.Group> 
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="socialFormYoutubeDreamsAndVision">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FaYoutube /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Youtube link where you explain your dreams and vision." value={inputFields.social.youtubeDreams} name="youtubeDreams" onChange={(e) => handleChange(e)} />
                                </InputGroup>
                            </Form.Group> 
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="socialFormYoutubeSoftskills">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FaYoutube /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Youtube link where you explain your softskills." value={inputFields.social.youtubeSoftskills} name="youtubeSoftskills" onChange={(e) => handleChange(e)} />
                                </InputGroup>
                            </Form.Group> 
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="socialFormYoutubeVirtues">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FaYoutube /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Youtube link where you explain your virtues." value={inputFields.social.youtubeVirtues} name="youtubeVirtues" onChange={(e) => handleChange(e)} />
                                </InputGroup>
                            </Form.Group> 
                        </Form.Row>
                    </>
                }
                <Form.Group as={Row}>
                    {fullForm &&
                        <>
                            <Col>
                                <Button variant="dark" className="btn m-1" onClick={() => props.handleIdentityDocuments()}>Manage Documents | <HiDocumentDuplicate /></Button>
                            </Col>
                        </>
                    }
                    <Col className="text-right">
                        <Button type="submit" className="btn btn-primary m-1">{btnText}</Button>
                    </Col>
                </Form.Group>
            </Form>
            <Toasts show={toastShow} message={toastMessage} type={toastType} />
        </>
    )
}

export default PersonalForm