import { Modal } from 'flowbite-react';
import MeteoHumidityChart from '../charts/MeteoHumidityChart';
import MeteoRadiationChart from '../charts/MeteoRadiationChart';
import { Dispatch, SetStateAction } from 'react';

const MeteoChartModal = ({
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
      <Modal.Header>Humidity & Radiation</Modal.Header>
      <Modal.Body>
        <div>
          <MeteoHumidityChart data={data} />
        </div>
        <div>
          <MeteoRadiationChart data={data} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MeteoChartModal;
