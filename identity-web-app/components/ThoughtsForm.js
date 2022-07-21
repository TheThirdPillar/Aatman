import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { domain } from '../config/config'

function ThoughtsForm (props) {

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
                stackName: 'thoughts',
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
            <Form.Group controlId="thinkingFormQ1">
                <Form.Label column="sm">
                    My ability to balance my intuitions with my rationale, to optimize the amount of irregularities & opportunities for serendipity against fixed routines, to notice & codify patterns or create frameworks from details, to apply/ reuse/ extend / evolve the created mental models in a useful way.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q1" value={inputFields.q1} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="thinking-q1" size="sm" />
                    </Col>    
                    <Col>
                        <p id="thinking-q1" className="h4 text-center font-weight-bold">{inputFields.q1}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="thinkingFormQ2">
                <Form.Label column="sm">
                    My ability to enlist, acknowledge & articulate the biases in my decisions or in a situation, to identify logical fallacies & conflicts of interest, to mitigate the effects of such biases & fallacies in the moment, to systematically study my behavior & find permanent fixes for effects in the long term.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q2" value={inputFields.q2} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="thinking-q2" size="sm" />
                    </Col>    
                    <Col>
                        <p id="thinking-q2" className="h4 text-center font-weight-bold">{inputFields.q2}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="thinkingFormQ3">
                <Form.Label column="sm">
                    My ability to think deeply about philosophical questions (eg. what is "purpose"?), to enlist & articulate the various philosophical or moral perspectives / schools of thought that apply to a situation, to clearly define my values, boundaries of moral codes & personal philosophy to live a good life.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q3" value={inputFields.q3} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="thinking-q3" size="sm" />
                    </Col>
                    <Col>
                        <p id="thinking-q3" className="h4 text-center font-weight-bold">{inputFields.q3}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="thinkingFormQ4">
                <Form.Label column="sm">
                    My ability to think & judge independently from the expectations & standards of broader society, to resist herd mentality & peer pressure from affecting me, to visualize impact of  indirect factors or far reaching consequences of my day to day choices or actions & put them on paper.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q4" value={inputFields.q4} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="thinking-q4" size="sm" />
                    </Col>
                    <Col>
                        <p id="thinking-q4" className="h4 text-center font-weight-bold">{inputFields.q4}</p>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default ThoughtsForm