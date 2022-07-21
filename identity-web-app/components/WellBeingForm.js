import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

import PhysiologyForm from './PhysiologyForm'
import EnergyForm from './EnergyForm'
import FeelingForm from './FeelingForm'
import ThinkingForm from './ThinkingForm'
import BehaviorForm from './BehaviorForm'
import ResultsForm from './ResultsForm'

function WellBeingForm (props) {

    // Filter the stack and pass it to relevant cards
    // TODO: Find better way to do this
    let physiologyStack = props.stacks?.find(stack => {
        return stack.stackName === 'physiology'
    })
    let energyStack = props.stacks?.find(stack => {
        return stack.stackName === 'energy'
    })
    let feelingStack = props.stacks?.find(stack => {
        return stack.stackName === 'feeling'
    })
    let thinkingStack = props.stacks?.find(stack => {
        return stack.stackName === 'thinking'
    })
    let behaviorStack = props.stacks?.find(stack => {
        return stack.stackName === 'behavior'
    })
    let resultStack = props.stacks?.find(stack => {
        return stack.stackName === 'result'
    })

    return (
        <>
            <h4 className="text-center">Well Being Form - Powered by <a href='https://wellbeingprotocol.org/' target="_blank">Well Being Protocol</a></h4>
            <Accordion className="mt-2">
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Physiology
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <PhysiologyForm values={physiologyStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="1">
                        Energy
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <EnergyForm values={energyStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="2">
                        Feeling
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <FeelingForm values={feelingStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="3">
                        Thinking
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <ThinkingForm values={thinkingStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="4">
                        Behavior
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                    <Card.Body>
                        <BehaviorForm values={behaviorStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="5">
                        Results
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                    <Card.Body>
                        <ResultsForm values={resultStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default WellBeingForm