import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { domain } from '../config/config'

function PerformanceForm (props) {

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
                stackName: 'performance',
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
            <Form.Group controlId="resultsFormQ1">
                <Form.Label column="sm">
                    My ability to lay out everything relevant to a decision, eliminate or prioritize options effectively, make a decision in a timely manner instead of being in analysis paralysis, to incorporate information from feedback, changing circumstances & who else is involved & then to analyze its quality later.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q1" value={inputFields.q1} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="results-q1" size="sm" />
                    </Col>    
                    <Col>
                        <p id="results-q1" className="h4 text-center font-weight-bold">{inputFields.q1}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="resultsFormQ2">
                <Form.Label column="sm">
                    My ability to get myself out of a rut, to start a pending task, to bounce back after losing momentum, to isolate behavioral habits that are detrimental, to identify & then edit the important habits & the associated triggers & rewards, to break crippling addictions & avoid just replacing them.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q2" value={inputFields.q2} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="results-q2" size="sm" />
                    </Col>    
                    <Col>
                        <p id="results-q2" className="h4 text-center font-weight-bold">{inputFields.q2}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="resultsFormQ3">
                <Form.Label column="sm">
                    My ability to zoom out & think about a worthy career from the perspectives of what I am good at, what I love, what the world needs & what I can get paid for, to identify low handing fruits, pick up new skills on the job & be ready to switch tracks quickly & smoothly to chase a better fit.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q3" value={inputFields.q3} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="results-q3" size="sm" />
                    </Col>    
                    <Col>
                        <p id="results-q3" className="h4 text-center font-weight-bold">{inputFields.q3}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="resultsFormQ4">
                <Form.Label column="sm">
                    My ability to garner monetary support for my initiatives & attract quality people who are ready to work for/with me, to speak with charm & charisma in public settings, to understand budgets, investments & accounts, to set sensible monetary goals & effectively deal with the related responsibilities.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q4" value={inputFields.q4} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="results-q4" size="sm" />
                    </Col>    
                    <Col>
                        <p id="results-q4" className="h4 text-center font-weight-bold">{inputFields.q4}</p>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default PerformanceForm