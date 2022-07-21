import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { domain } from '../config/config'

function HabitsForm (props) {

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
                stackName: 'habits',
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
            <Form.Group controlId="behaviorFormQ1">
                <Form.Label column="sm">
                    My ability to articulate feelings, ideas or thoughts in a lucid & streamlined way, to refine & evolve my them through writing & editing, to summarize or paraphrase them suitably, to leverage personal or other stories for more efficient communication & deeper connection or impact.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q1" value={inputFields.q1} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="behavior-q1" size="sm" />
                    </Col>
                    <Col>
                        <p id="behavior-q1" className="h4 text-center font-weight-bold">{inputFields.q1}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="behaviorFormQ2">
                <Form.Label column="sm">
                    My ability to understand what being productive looks like vs what's a farce, to appreciate how willpower works like a muscle & needs to be invested into habits, systems & accountability, to identity what harms my execution & priority of fixing them, to extract peak performance when needed.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q2" value={inputFields.q2} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="behavior-q2" size="sm" />
                    </Col>
                    <Col>
                        <p id="behavior-q2" className="h4 text-center font-weight-bold">{inputFields.q2}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="behaviorFormQ3">
                <Form.Label column="sm">
                    My ability to think of more number of solutions to a problem which are more unusual, more unrelated & more detailed, to apply the 6 Thinking Hats of facts, emotion, benefit, ideas, planning & judgement to create high quality art, designs or products in some category that solves some problem.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q3" value={inputFields.q3} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="behavior-q3" size="sm" />
                    </Col>
                    <Col>
                        <p id="behavior-q3" className="h4 text-center font-weight-bold">{inputFields.q3}</p>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="behaviorFormQ4">
                <Form.Label column="sm">
                    My ability to be clear, concise & crisp in my words, to adjust my voice (pitch, volume, prosody, register, etc) to communicate with more impact, to negotiate tricky & awkward conversations successfully & to steer arguments or fights into a productive direction without avoiding them.
                </Form.Label>
                <Row className="m-1 p-1">
                    <Col lg={10} md={10} sm={10} className="mt-2">
                        <Form.Control type="range" name="q4" value={inputFields.q4} onChange={(e) => handleChange(e)} min="0" max="10" step="0.5" aria-describedby="behavior-q4" size="sm" />
                    </Col>
                    <Col>
                        <p id="behavior-q4" className="h4 text-center font-weight-bold">{inputFields.q4}</p>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default HabitsForm