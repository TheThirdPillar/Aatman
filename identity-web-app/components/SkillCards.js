import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import styles from '../styles/Home.module.css'
import CardDropdown from './CardDropdown'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import faker from 'faker'

function SkillCards(props) {
  // TODO: This is a temporary demo for endorsements
  // If there are no endorsements, show randomly generated data.
  let totalEndorsements = props.skill.endorsements.length
  let endorsements = []
  if (totalEndorsements == 0) {
    totalEndorsements = Math.floor(Math.random() * 10)
    // Generate equivalent number of transactions to show in overlay
    for (let i = 0; i < totalEndorsements; i++) {
      let endorsement = {
        transactionId: faker.datatype.uuid(),
        transactionDate: faker.date.recent()
      }
      endorsements.push(endorsement)
    }
    console.log(endorsements)
  }

  // This is the worst piece of code I have ever written
  const endorsementsToString = (endorsements) => {
    let endorsementsToString = ''
    endorsements.forEach(endorsement => {
      endorsementsToString += endorsement.transactionId
      endorsementsToString += " "
      endorsementsToString += "on"
      endorsementsToString += " "
      endorsementsToString += endorsement.transactionDate.toLocaleDateString()
      endorsementsToString += "\n"
      endorsementsToString += "\n"
    })
    return endorsementsToString  
  }

  return (
    <>
      <Col xs={12} md={12} lg={4}>
        <Card
          bg={props.skill.data.skillTag == 'tertiary' ? 'dark' : props.skill.data.skillTag}
          text="white"
          className="mt-2 mb-4 p-1 text-center">
          <div className="row">
            <span className="text-left col-8 mt-2">
             Endorsements:&nbsp; 
             <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id='endorsement-tooltip'>
                    {
                      (totalEndorsements == 0)
                        ? <strong> No endorsements </strong>
                        : <strong>{endorsementsToString(endorsements)}</strong>
                    } 
                  </Tooltip>
                }
             >
                <Badge pill variant="light">{totalEndorsements}</Badge>
             </OverlayTrigger>
            </span>
            <span className="text-right col-4">
             {
               (!props.isPublic) ?  <CardDropdown color="#ffffff" data={props.skill.data} handleEdit={props.handleEdit} handleDelete={() => props.handleDelete()} /> : <></>
             }
            </span>
          </div>
          <Card.Header className="text-capitalize">
            {props.skill.data.fieldOfInterest}
          </Card.Header>
          <Card.Body>
            <Card.Title className={styles.cardTitleX1 + ' text-capitalize'}>
              {props.skill.data.associatedSkill}
            </Card.Title>
            <Card.Text className="text-capitalize">
              {props.skill.data.skillDetails.map(((detail, index) => (
                <Badge pill variant="light" className="m-1" key={index} >
                  {detail}
                </Badge>
              )))}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default SkillCards
