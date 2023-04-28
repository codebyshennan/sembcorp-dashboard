import { Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';
import JSONPretty from 'react-json-pretty';

const ResponseJSONModal = ({
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
      <Modal.Header>Raw JSON Response</Modal.Header>
      <Modal.Body>
        <JSONPretty id="json-pretty" data={data}></JSONPretty>
      </Modal.Body>
    </Modal>
  );
};

export default ResponseJSONModal;
