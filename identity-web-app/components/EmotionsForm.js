import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { domain } from '../config/config'

function EmotionsForm (props) {

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
                stackName: 'emotions',
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
            <Form.Group controlId="energyFormQ1">
                <Form.Label column="sm">
                    My ability on most days to support others, do selfless acts of generosity, put others before myself, be honest & honorable in my actions & words, to display strength & integrity with my choices & be kind to myself about my limitations while managing personal insecurities.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q1" value={inputFields.q1} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="energy-q1" size="sm" />
                    </Col>    
                    <Col>
                        <p id="energy-q1" className="h4 text-center font-weight-bold">{inputFields.q1}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="energyFormQ2">
                <Form.Label column="sm">
                    My ability to engage in extended periods of self reflection, emotionally draining conversations, situations that are out of my comfort zone & complex or nuanced decision making while standing firm & calm in the face of major uncertainties about people & my future.    
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q2" value={inputFields.q2} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="energy-q2" size="sm"/>
                    </Col>    
                    <Col>
                        <p id="energy-q2" className="h4 text-center font-weight-bold">{inputFields.q2}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="energyFormQ3">
                <Form.Label column="sm">
                    My ability to face my faults & weaknesses, accept my mistakes even when it's hard to, avoid suppressing or avoiding troubling thoughts, emotions or ideas, to acknowledge & understand my place in various social hierarchies & what it takes to climb up to the top.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q3" value={inputFields.q3} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="energy-q3" size="sm"/>
                    </Col>    
                    <Col>
                        <p id="energy-q3" className="h4 text-center font-weight-bold">{inputFields.q3}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="energyFormQ4">
                <Form.Label column="sm">
                    My ability to clear my mind, when needed, of lingering thoughts or nervousness which may interfere with healthy functioning (like work or sleep), to manage stress & toxicity, to identify, accept & be aware of my identity & personality as it relates to the key areas of focus in my life.  
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q4" value={inputFields.q4} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="energy-q4" size="sm"/>
                    </Col>    
                    <Col>
                        <p id="energy-q4" className="h4 text-center font-weight-bold">{inputFields.q4}</p>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default EmotionsForm