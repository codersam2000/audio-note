import Card from 'react-bootstrap/Card';
import {NavLink} from 'react-router-dom';

function NoData({content}) {
  return (
    <Card className='mt-2'>
      <Card.Header>{content?.heading}</Card.Header>
      <Card.Body>
        <Card.Title>{content?.title}</Card.Title>
        <Card.Text>
          {content?.text}
        </Card.Text>
        <NavLink className="btn border"  to="/">
            Back To  Home
        </NavLink>
      </Card.Body>
    </Card>
  );
}

export default NoData;