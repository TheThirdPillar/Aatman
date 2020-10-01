import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import styles from '../styles/Home.module.css'
import CardDropdown from './CardDropdown'

function SkillCards(props) {
  return (
    <>
      <Col xs={12} md={12} lg={4}>
        <Card
          bg={props.skill.skillTag == 'tertiary' ? 'dark' : props.skill.skillTag}
          text="white"
          className="m-2 p-1 text-center">
          <p className="text-right">
            <CardDropdown handleEdit={() => props.handleEdit()} />
          </p>
          <Card.Header>
            {props.skill.fieldOfInterest}
          </Card.Header>
          <Card.Body>
            <Card.Title className={styles.cardTitleX1}>
              {props.skill.associatedSkill}
            </Card.Title>
            <Card.Text>
              {props.skill.skillDetails.map(((detail) => (
                <Badge pill variant="light" className="m-1">
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
