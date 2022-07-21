import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { domain } from '../config/config'

function FeelingsForm (props) {

    const [inputFields, setInputFields] = useState({
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        ...props.values
    })

    const [hasChanged, toggleHasChanged] = useState(false)

    useEffect(() => {
        if (hasChanged) {

            let formData = {
                stackName: 'feelings',
                stackRatings: inputFields
            }
            fetch(domain + '/application/listen/identity/handleProductivityStack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then((data) => {
                if (data.status && data.status === 'SUCCESS') {
                    props.updateStack(data.updatedStack)
                    toggleHasChanged(false)
                }
            })
        }
    }, [inputFields])

    const handleChange = (e) => {
        let currentField = {...inputFields}
        currentField[e.target.name] = e.target.value
        toggleHasChanged(true)
        setInputFields(currentField)
        return
    }

    return (
        <Form>
            <Form.Group controlId="feelingFormQ1">
                <Form.Label column="sm">
                    My ability to effectively decide if some content is good or harmful, to arrange all options in an order of preference, to consciously choose what I consume as content, avoiding guilty pleasures & going with the highest priority option while developing a sophisticated personal taste.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q1" value={inputFields.q1} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="feeling-q1" size="sm" />
                    </Col>    
                    <Col>
                        <p id="feeling-q1" className="h4 text-center font-weight-bold">{inputFields.q1}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="feelingFormQ2">
                <Form.Label column="sm">
                    My ability to concentrate for extend periods on time while avoiding distractions or falling prey to addictive behaviors (comfort food/ porn/checking phone notifs etc), to stick to self imposed deadlines & plans with long attention spans dedicated consistently to my goals.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q2" value={inputFields.q2} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="feeling-q2" size="sm" />
                    </Col>    
                    <Col>
                        <p id="feeling-q2" className="h4 text-center font-weight-bold">{inputFields.q2}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="feelingFormQ3">
                <Form.Label column="sm">
                    My ability to triangulate, verify & identify patterns in the original sources of the media I consume as news or information, to validate "truth" & see through deliberate attempts to misguide, to be aware & conscious of how online activity & decisions affect my privacy & data access.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q3" value={inputFields.q3} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="feeling-q3" size="sm" />
                    </Col>    
                    <Col>
                        <p id="feeling-q3" className="h4 text-center font-weight-bold">{inputFields.q3}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="feelingFormQ4">
                <Form.Label column="sm">
                    My ability to manage ToDo lists, anniversaries & other short term items that need remembering, to pick up new skills or directions to a place, to learn about a new topic or equipment, to pin down which learning path (tools, approach, environment, etc) will suit me best from multiple options.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q4" value={inputFields.q4} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="feeling-q4" size="sm" />
                    </Col>    
                    <Col>
                        <p id="feeling-q4" className="h4 text-center font-weight-bold">{inputFields.q4}</p>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default FeelingsForm