import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect),{
    ssr: false
})

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker'

import { domain } from '../config/config'

function CommunityForm(props) {

    const [inputFields, setInputFields] = useState({
        communityId: '',
        powURL: '',
        ...props.formData
    })
    const [selectedCommunity, updateSelectedCommunity] = useState([])
    const [communities, updateCommunities] = useState([])

    useEffect(() => {
        if (communities.length == 0) {
            fetch(domain + '/community', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                if (data.status && data.status === 'SUCCESS') {
                    updateCommunities(data.communities)
                    console.info(inputFields)
                    if (inputFields.communityId !== '') {
                        if (inputFields.communityId !== '') {
                            console.info('Edit mode')
                            console.info(data.communities.filter((community) => community._id === inputFields.communityId))
                            updateSelectedCommunity(data.communities.filter((community) => community._id === inputFields.communityId))
                        }
                    }
                }
            })
        }
    }, [communities])

    const handleSelect = (list) => {
        updateSelectedCommunity(list)
        setInputFields({...inputFields, communityId: list[0]._id})
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

    const handleSubmit = () => {
        fetch(domain + '/application/listen/identity/addUserCommunities', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(inputFields)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status && data.status == "SUCCESS") {
                // Update parent
                props.updateUserCommunities(data.communities)
                props.closeModal()
            } else {
                setLogText('Unable to add community to profile at the moment.')
            }
        })
    }

    const [logText, setLogText] = useState('')

    return (
        <>
            <Form onSubmit={() => handleSubmit()} autoComplete="off" lg={10} xs={10} md={10} className="m-2 p-1">
                <Form.Group as={Row} controlId="community">
                    <Multiselect
                        options={communities}
                        selectedValues={selectedCommunity}
                        displayValue="name"
                        singleSelect={true}
                        onSelect={(list) => handleSelect(list)}
                        placeholder="Select a community"
                        id="_id"
                    />
                </Form.Group>
                <Form.Group as={Row} controlId="powURL">
                    <Form.Control type="url" placeholder="Enter ROAM Community profile URL" name="powURL" value={inputFields.powURL} onChange={(e) => handleChange(e)} required />
                </Form.Group>
                <Form.Group as={Row}>
                    <Col className="text-right">
                        <Button type="submit" disabled={inputFields.powURL == '' || inputFields.communityId == ''}>Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
            <Row>
                <Col classname="text-danger">
                    {logText}
                </Col>
            </Row>
        </>
    )
}

export default CommunityForm