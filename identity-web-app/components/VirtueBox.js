import dynamic from 'next/dynamic'
import Cookies from 'js-cookie'

const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect),{
    ssr: false
})

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { domain } from '../config/config'

export default function VirtueBox(props) {

    const virtues = ['honesty', 'hardwork', 'integrity', 'acceptance', 'assertiveness', 'authenticity', 'caring', 'courage', 'compassion', 'curiosity', 'empathy', 'perseverence', 'prudence', 'self-respect', 'resilience']

    const handleSelect = (list) => {
        if (list.length > 0) {
            fetch(domain + '/application/listen/identity/handleVirtues', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify({virtues: list})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status && data.status === 'SUCCESS') {
                    // Update virtues
                    props.updateVirtues(data.identity.virtues)
                } else {
                    // Show error log
                }
            })
        }
    }

    return (
        <>
            <Row className="justify-content-center">
                <Col xl={10} md={10} sm={10}>
                    <h4>Select upto 3 Virtues</h4>
                    <Multiselect
                        options={virtues.map((virtue) => {
                            return virtue.toLocaleUpperCase()
                        })}
                        showCheckbox={true}
                        isObject={false}
                        placeholder="Select virtues"
                        selectionLimit="3"
                        avoidHighlightFirstOption={true}
                        onSelect={(list) => handleSelect(list)}
                        onRemove={(list) => handleSelect(list)}
                        selectedValues={props.virtues}
                    />
                </Col>
            </Row>
        </>
    )
}