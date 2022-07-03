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
      <Col xs={12} md={12} lg={4}>
        <Card
          bg={props.skill.data.skillTag == 'tertiary' ? 'dark' : props.skill.data.skillTag}
          text="white"
          className="mt-2 mb-4 p-1 text-center">
          <div className="row">
            <div className="text-left col-8 mt-2">
              <span className='m-2'>
              LT:&nbsp; 
                <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id='endorsement-tooltip'>
                        {
                          (totalEndorsements == 0)
                            ? <strong> No validated POW, No Learning Tokens </strong>
                            : <strong>{}</strong>
                        } 
                      </Tooltip>
                    }
                >
                    <Badge pill variant="light">{totalEndorsements}</Badge>
                </OverlayTrigger>
              </span>
              <span className='m-2'>
              PT:&nbsp; 
                <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id='endorsement-tooltip'>
                        {
                          (totalEndorsements == 0)
                            ? <strong> No validated POW, No Perfomance Tokens </strong>
                            : <strong>{}</strong>
                        } 
                      </Tooltip>
                    }
                >
                    <Badge pill variant="light">{totalEndorsements}</Badge>
                </OverlayTrigger>
              </span>
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
            <Card.Link>
              {
                (props.skill.data.proofOfWork)
                  ? <a href={props.skill.data.proofOfWork} target="_blank" className={styles.cardLink}>Proof of Work</a>
                  : <a href="#" className={styles.cardLink}>No Proof Available</a>
              }
            </Card.Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default SkillCards
