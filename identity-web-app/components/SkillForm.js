import { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import InputGroup from 'react-bootstrap/InputGroup'
import { AiFillCloseCircle } from 'react-icons/ai'

import Toasts from './Toasts'
import Autosuggest from './Autosuggest'

import { domain } from '../config/config'

function SkillForm(props) {

    const router = useRouter()
    const [inputFields, setInputFields] = useState({
        fieldOfInterest: '',
        skillTag: 'primary',
        associatedSkill: '',
        skillDetails: [],
        endorsements: [],
        skillLevel: 0,
        proofOfWork: '',
        personalEndorsement: '',
        hourlyRate: 0,
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
 
    const handleUpdate = (name, value) => {
        let currentFieldValues = {...inputFields}
        if (name === "skillDetails") {
            if (currentFieldValues[name].includes(value)) return
            if (currentFieldValues[name].length === 5) return
            currentFieldValues[name].push(value)
            setInputFields(currentFieldValues)
            document.getElementsByName('searchSkillDetail')[0].setCustomValidity('')
            return
        } 
        currentFieldValues[name] = value
        setInputFields(currentFieldValues)
        return
    }

    const removeSkillFromList = (detail) => {
        let skillDetails = inputFields.skillDetails
        let newSkillDetails = skillDetails.filter(x => x !== detail)
        setInputFields({...inputFields, skillDetails: newSkillDetails})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // TODO: Add form validation
        fetch(domain + '/application/listen/identity/addSkillRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(inputFields)
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 'SUCCESS') {
                setToastMessage(data.message)
                setToastType("success")
                setToastShow(true) 

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
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="fieldOfInterest">
                    <Col md={8}>
                        <Autosuggest placeholder="Enter your field" value={inputFields.fieldOfInterest} name="fieldOfInterest" handleUpdate={(name, value) => handleUpdate(name, value)} required />
                    </Col>
                    <Col className="mt-2 mt-md-0 mt-lg-0">
                        <Form.Control as="select" placeholder="Choose Skill Type" name="skillTag" value={inputFields.skillTag} onChange={(event) => handleUpdate(event.target.name, event.target.value)} required >
                            <option disabled>Skill Type</option>
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="tertiary">Tertiary</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group controlId="associatedSkill">
                    <Autosuggest placeholder="Name your skillset, Ex: Full stack development" value={inputFields.associatedSkill} name="associatedSkill" handleUpdate={(name, value) => handleUpdate(name, value)} required />
                </Form.Group>
                <Form.Group controlId="searchSkillDetail">
                    <Autosuggest placeholder="Add upto 5 related skills"  name="searchSkillDetail" value="" addToList={(data) => handleUpdate("skillDetails", data)} />
                    <Form.Text>
                        {inputFields.skillDetails.map((detail, index) => (
                            <a onClick={() => removeSkillFromList(detail)} key={index} >
                                <Badge pill variant="dark" className="m-1 btn skillBadge">{detail} <AiFillCloseCircle /></Badge>
                            </a>
                        ))}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="proofOfWork">
                    <Form.Control type='url' placeholder='Enter your ROAM Skill URL' name="proofOfWork" value={inputFields.proofOfWork} onChange={(e) => handleUpdate(e.target.name, e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="persoalEndorsement">
                    <Form.Control type='url' placeholder='Add youtube link for self endorsing skill' name="personalEndorsement" value={inputFields.personalEndorsement} onChange={(e) => handleUpdate(e.target.name, e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Rs/Hour</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type='number' placeholder='Add hourly rate for your skill' name='hourlyRate' value={inputFields.hourlyRate} onChange={(e) => handleUpdate(e.target.name, e.target.value)} required />
                    </InputGroup>
                </Form.Group>
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

export default SkillForm