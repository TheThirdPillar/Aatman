import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'
import Table from 'react-bootstrap/Table'

import ExternalAccountCard from './ExternalAccountCard'

import styles from '../styles/Dashboard.module.css'

function WalletContainer(props) {
  return (
    <>
      <Col xs={12} lg={9}>
        <Row>
          <Col xs={12} lg={12}>
            <CardDeck className={styles.externalAccountSection}>
              <ExternalAccountCard title="Bank Account" />
              <ExternalAccountCard title="Bitcoin Address" />
              <ExternalAccountCard title="Ethereum Address" />
            </CardDeck>
          </Col>
        </Row>
        <Table hover responsive>
          <thead>
            <tr>
              <th>To/From</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transactiod Id</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td><Link href="#">Moses Sam Paul</Link></td>
              <td><Badge variant="success">Credit</Badge></td>
              <td>1400</td>
              <td>January 3rd, 2020</td>
              <td>293054u23j4n2j34u2ih34j</td>
            </tr>
            <tr>
              <td><Link href="#">Self</Link></td>
              <td><Badge variant="danger">Debit</Badge></td>
              <td>200</td>
              <td>January 3rd, 2020</td>
              <td>293054u23j4n2w34u2ih34j</td>
            </tr> */}
          </tbody>
        </Table>
      </Col>
    </>
  )
}

export default WalletContainer
