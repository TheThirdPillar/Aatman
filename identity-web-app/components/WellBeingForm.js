import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

import PhysiologyForm from './PhysiologyForm'
import EmotionsForm from './EmotionsForm'
import FeelingsForm from './FeelingsForm'
import ThoughtsForm from './ThoughtsForm'
import HabitsForm from './HabitsForm'
import PerformanceForm from './PerformanceForm'

function WellBeingForm (props) {

    // Filter the stack and pass it to relevant cards
    // TODO: Find better way to do this
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
                        Emotions
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <EmotionsForm values={emotionsStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="2">
                        Feelings
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <FeelingsForm values={feelingsStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="3">
                        Thoughts
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <ThoughtsForm values={thoughtsStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="4">
                        Habits
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                    <Card.Body>
                        <HabitsForm values={habitsStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Card.Header}  eventKey="5">
                        Performance
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                    <Card.Body>
                        <PerformanceForm values={performanceStack?.stackRatings} updateStack={(updatedStack) => props.updateStack(updatedStack)} />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default WellBeingForm