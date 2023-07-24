import Alert from 'react-bootstrap/Alert';

function AlertBox({alert}) {
    return (
      <Alert className='mt-3' variant={alert.type} >
        <Alert.Heading>{alert.message}</Alert.Heading>
      </Alert>
    );
  }

export default AlertBox;