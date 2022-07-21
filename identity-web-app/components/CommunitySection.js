import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'

import styles from '../styles/Dashboard.module.css'
import SectionTitle from './SectionTitle'
import CommunityCard from './CommunityCard'

function CommunitySection(props) {
  return (
    <>
      <SectionTitle title={props.title} addButtonEnabled={!props.isPublic} handleAdd={() => props.handleModalShow({type: "8", data: {}})} />
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <CardDeck className={styles.section}>
            {props.communities?.map(((community, index) => (
              <CommunityCard key={index} isPublic={props.isPublic} community={community} handleEdit={() => props.handleModalShow({type: "8", data: { communityId: community.community._id, powURL: community.powURL }})} handleDelete={() => props.handleModalShow({type: "6", data: community, object: 'community' })} />
            )))}
          </CardDeck>
        </Col>
      </Row>
    </>
  )
}

export default CommunitySection