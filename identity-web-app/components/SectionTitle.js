import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

import styles from '../styles/Dashboard.module.css'
import { GrAddCircle } from 'react-icons/gr'
import { Button } from 'react-bootstrap'

function SectionTitle(props) {

  const handleIconClick = (e) => {
    e.preventDefault()
    window.open(props.iconUrl, '_blank')
  }

  return (
    <Row className={"justify-content-center " + styles.sectionTitle}>
      <Col xs={12} md={12} lg={12}>
        <h3>{props.title}
          {
            (props.icon)
              ? <Button variant="light" size="sm" disabled={!props.iconEnabled} onClick={(e) => handleIconClick(e)} className={"ml-2"}>{props.icon}</Button>
              : ''
          }
          <span className={"ml-2 " + styles.sectionSubtitle}>{props.subtitle}</span>
        </h3>
        {
          (props.addButtonEnabled) ?
            <a onClick={props.handleAdd} className="btn">
              <Badge pill>Add </Badge><GrAddCircle className="mb-1" />
            </a>
            : <></>
        }
      </Col>
    </Row>
  )
}

export default SectionTitle
