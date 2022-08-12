import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import styles from '../styles/Home.module.css'
import CardDropdown from './CardDropdown'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { AiFillYoutube } from 'react-icons/ai'

function SkillCards(props) {

  let totalEndorsements = props.skill.endorsements.length
  let endorsements = []

  return (
    <>
      <Col xs={12} md={6} lg={4}>
        <Card
          bg={props.skill.data.skillTag == 'tertiary' ? 'dark' : props.skill.data.skillTag}
          text="white"
          className="mt-2 mb-4 p-1 text-center">
          <div className="row">
            <div className="text-left col-8 mt-2">
              <a href={props.skill.data.proofOfWork} target="_blank" className={styles.cardLink}>   
                <span className='m-2'>
                Skill Level:&nbsp;<Badge pill variant="light">{props.skill.data.skillLevel}</Badge>
                </span>
              </a>
              <span className='m-2'>
                  {
                    (props.skill.data.personalEndorsement)
                      ? <a href={props.skill.data.personalEndorsement} target="_blank" className={styles.cardLink}><AiFillYoutube size={24}/></a>
                      : ''
                  }
              </span>
            </div>
            <span className="text-right col-4">
             {
               (!props.isPublic) ?  <CardDropdown color="#ffffff" data={props.skill.data} handleEdit={() => props.handleEdit()} handleDelete={() => props.handleDelete()} /> : <></>
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
            <Card.Footer>
              Hourly Rate: {(props.skill.data.hourlyRate) ? props.skill.data.hourlyRate : 0} Rs/Hour
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default SkillCards
