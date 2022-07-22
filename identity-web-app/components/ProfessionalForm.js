import { useRouter } from 'next/router'
import { useState } from 'react'
import Cookies from 'js-cookie'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DatePicker from 'react-datepicker'
import Button from 'react-bootstrap/Button'
import Toasts from './Toasts'

import { domain } from '../config/config'

function ProfessionalForm(props) {

    const router = useRouter()
    const [inputFields, setInputFields] = useState({
        organizationName: "",
        workType: "",
        position: "",
        startDate: null, 
        endDate: null,
        active: false,
        documents: [],
        ...props.formData
    })

    let btnText

    if (router.pathname === '/user/onboarding') {
        btnText = 'Submit'
    } else {
        btnText = 'Update'
    }

    const [toastShow, setToastShow] = useState(false)
    const [toastType, setToastType] = useState()
    const [toastMessage, setToastMessage] = useState()

    const setDate = (date, name) => {
        let currentField = {...inputFields}
        currentField[name] = date
        setInputFields(currentField)
    } 

    const handleChange = (e) => {
        let currentField = {...inputFields}
        if (e.target && e.target.name && e.target.name === "active") {
            currentField[e.target.name] = !(currentField.active)
            setInputFields(currentField)
            return              
        }
        currentField[e.target.name] = e.target.value
        setInputFields(currentField)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(domain + '/application/listen/identity/addProfessionalRecord', {
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
                setToastMessage(data.message)
                setToastType("success")
                setToastShow(true) 

                // TODO: Close the toast - Autoclose not working.
                if (router.pathname === '/user/onboarding') {
                    // TODO: Next Step
                    setTimeout(() => {
                        props.updateState()
                    }, 3000)
                } else {
                    props.closeModal()
                    setTimeout(() => {
                        location.reload()
                    }, 3000)
                }

            } else {
                setToastMessage("Unable to execute transaction at the moment.")
                setToastType("danger")
                setToastShow(true)
            }
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group controlId="professionalFormInstitute">
                    <Form.Control type="text" placeholder="Enter company name" name="organizationName" value={inputFields.organizationName} onChange={(e) => handleChange(e)} required />
                </Form.Group>
                <Form.Group controlId="professionalFormEmploymentType">
                    <Form.Control as="select" placeholder="Choose Employment Type" name="workType" value={inputFields.workType} onChange={(e) => handleChange(e)} required>
                        <option value="fulltime">Full Time</option>
                        <option value="parttime">Part Time</option>
                        <option value="selfemployed">Self Employed</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                        <option value="apprenticeship">Apprenticeship</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="professionalFormPosition">
                    <Form.Control type="text" placeholder="Position Ex: Sales Manager" name="position" value={inputFields.position} onChange={(e) => handleChange(e)} required />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="professionalFormStartDate">
                        <DatePicker 
                            onChange={(date) => setDate(date, "startDate")} 
                            selected={new Date(inputFields.startDate)}
                            className="form-control d-block" 
                            placeholderText="Start date Ex. August 2009" 
                            dateFormat="MM/yyyy"
                            name="startDate"
                            maxDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="professionalFormEndDate">
                        <DatePicker 
                            onChange={(date) => setDate(date, "endDate")} 
                            selected={new Date(inputFields.endDate)}
                            className="form-control d-block" 
                            placeholderText="End date Ex. June 2013" 
                            dateFormat="MM/yyyy"
                            name="endDate"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            disabled={inputFields.active}
                        />
                        <Form.Check type="switch" label="Currently Active" checked={(inputFields.active) ? "checked" : ""} onChange={(e) => handleChange(e)} name="active" />
                    </Form.Group>
                </Form.Row>
                <Form.Group as={Row}>
                    <Col className="text-right">
                        <Button type="submit">{btnText}</Button>
                    </Col>
                </Form.Group>
            </Form>
            <Toasts show={toastShow} message={toastMessage} type={toastType} />
        </>
    )
}

export default ProfessionalForm