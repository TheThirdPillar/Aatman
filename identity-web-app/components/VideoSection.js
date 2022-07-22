import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ReactPlayer from 'react-player/youtube'

import styles from '../styles/Dashboard.module.css'
import SectionTitle from './SectionTitle'

import { GrClose } from 'react-icons/gr'

function VideoSection(props) {
  return (
    <>
        <SectionTitle title={props.title} addButtonEnabled={false} />
        {
          (props.hasClose)
            ?
              <Row className="d-flex justify-content-end">
                  <GrClose onClick={() => props.closeVideo()} />
              </Row>
            : ''
        }
        <Row className={"justify-content-center m-2 " +  styles.section}>
            <Col xs={12} md={6} lg={6}>
                <ReactPlayer url={props.url} />
            </Col>
        </Row>
    </>
  )
}

export default VideoSection
