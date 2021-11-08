import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import styles from '../styles/Home.module.css'

function ExternalAccountCard(props) {
  return (
    <>
        <Card
            bg="secondary"
            text="white"
            className="p-2 w-100 text-center">
            <Card.Header>
            {props.title}
            </Card.Header>
            <Card.Body>
            <Card.Title className={styles.cardTitle}>
                <Badge pill bg="primary">Coming Soon</Badge>
            </Card.Title>
            </Card.Body>
        </Card>
    </>
  )
}

export default ExternalAccountCard
