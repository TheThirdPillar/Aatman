import Cookies from 'js-cookie'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

import styles from '../styles/Dashboard.module.css'

import { domain } from '../config/config'
import { FaLock } from 'react-icons/fa'

export default function WellBeingCard (props) {


    // TODO: Find better way to do this.
    // TODO: Pre-calculate and change calculateScore implementation.


    let physiologyStack = props.stacks?.find(stack => {
        return stack.stackName === 'physiology'
    })
    let emotionsStack = props.stacks?.find(stack => {
        return stack.stackName === 'emotions'
    })
    let feelingsStack = props.stacks?.find(stack => {
        return stack.stackName === 'feelings'
    })
    let thoughtsStack = props.stacks?.find(stack => {
        return stack.stackName === 'thoughts'
    })
    let habitsStack = props.stacks?.find(stack => {
        return stack.stackName === 'habits'
    })
    let performanceStack = props.stacks?.find(stack => {
        return stack.stackName === 'performance'
    })

    const calculateScore = (ratings) => {
        if (!ratings) return 0
        let score = 0
        for (var q of Object.keys(ratings)) {
            score = score +  Number(ratings[q])
        }
        return ((score * 10) / 4)
    }

    const requestValidation = () => {
        // TODO: Let user pick community for validation
        let validator = 'msp'
        let validatingCommunity = '602bf366af0d03643f769724'

        let requestBody = {}
        requestBody.stacks = props.stacks
        requestBody.validator = validator
        requestBody.validatingCommunity = validatingCommunity

        fetch(domain + '/application/listen/identity/requestStackValidation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status && data.status == "SUCCESS") {
                props.handleValidationRequest(() => data.updatedIdentity?.wellBeingValidation)
            }
        })
    }

    // TODO: Never validated and validated X days ago for button and
    // TODO: footer text.

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={12} lg={12}>
                <CardDeck className="m-2">
                    <Card className="text-center bg-dark text-white">
                        <Card.Body>
                            <Card.Title>Well-Being Score</Card.Title>
                            <Card.Text className={styles.wellBeingScore + " font-weight-bold mt-4"}>
                                {
                                    (props.isPublic)
                                        ? <FaLock />
                                        : <span className={styles.wellBeingScoreTotal}>{Math.ceil(props.score)}/100</span>
                                }
                            </Card.Text>
                            {
                                (props.isPublic) 
                                    ? ""
                                    : <Button size="sm" variant="warning" onClick={() => requestValidation()} disabled={props.validation?.validationStatus == "pending"}>
                                        {(props.validation?.validationStatus == "pending") ? "Pending Validation" 
                                        : "Request Validation"}
                                        </Button> 
                            } 
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Last validated: {(props.validation && props.validation.validationDate) ? new Date(props.validation.validationDate) : "Not validated yet"}  
                        </Card.Footer>
                    </Card>
                    <Card className="bg-dark text-white p-1">
                                <Card.Body>
                                {
                                    (props.isPublic)
                                        ? 
                                        <Card.Text className={styles.wellBeingScore + " font-weight-bold mt-4 text-center"}>
                                            <FaLock />
                                        </Card.Text>
                                        :
                                        <Row>
                                            <Col xs={6} md={6} lg={6}>
                                                <Card.Text className="m-0 mt-2">
                                                    Physiology
                                                </Card.Text>
                                                <ProgressBar now={calculateScore(physiologyStack?.stackRatings)} label={calculateScore(physiologyStack?.stackRatings) + "%"} variant="warning" className="mb-1" />
                                                <Card.Text className="m-0 mt-2">
                                                    Emotions
                                                </Card.Text>
                                                <ProgressBar now={calculateScore(emotionsStack?.stackRatings)} label={calculateScore(emotionsStack?.stackRatings) + "%"} variant="warning" className="mb-1" />    
                                                <Card.Text className="m-0 mt-2">
                                                    Feelings
                                                </Card.Text>
                                                <ProgressBar now={calculateScore(feelingsStack?.stackRatings)} label={calculateScore(feelingsStack?.stackRatings) + "%"} variant="warning" className="mb-1" />   
                                            </Col>
                                            <Col xs={6} md={6} lg={6}>
                                                <Card.Text className="m-0 mt-2">
                                                    Thoughts
                                                </Card.Text>
                                                <ProgressBar now={calculateScore(thoughtsStack?.stackRatings)} label={calculateScore(thoughtsStack?.stackRatings) + "%"} variant="warning" className="mb-1" />    
                                                <Card.Text className="m-0 mt-2">
                                                    Habits
                                                </Card.Text>
                                                <ProgressBar now={calculateScore(habitsStack?.stackRatings)} label={calculateScore(habitsStack?.stackRatings) + "%"} variant="warning" className="mb-1" />
                                                <Card.Text className="m-0 mt-2">
                                                    Performance    
                                                </Card.Text>
                                                <ProgressBar now={calculateScore(performanceStack?.stackRatings)} label={calculateScore(performanceStack?.stackRatings) + "%"} variant="warning" className="mb-1" />
                                            </Col>
                                        </Row>
                                }
                                </Card.Body>
                        <Card.Footer className="text-muted text-center">Well-Being Nodes</Card.Footer>
                    </Card>
                </CardDeck>
            </Col>
        </Row>
    )

}