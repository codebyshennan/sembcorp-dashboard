import { Modal } from 'flowbite-react';
import TemperatureChart from '../charts/TemperatureChart';
import { Dispatch, SetStateAction } from 'react';

const TemperatureChartModal = ({
  show,
  setShow,
  data,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  data: any;
}) => {
  return (
    <Modal show={show} size="7xl" onClose={() => setShow(false)}>
      <Modal.Header>Temperature (C)</Modal.Header>
      <Modal.Body>
        <TemperatureChart data={data} />
      </Modal.Body>
      {/* go to next date */}
      {/* <Modal.Footer>
            <Button onClick={onClick}>I accept</Button>
            <Button color="gray" onClick={onClick}>
              Decline
            </Button>
          </Modal.Footer> */}
    </Modal>
  );
};

export default TemperatureChartModal;
