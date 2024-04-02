import { Button, Modal } from 'antd';
import { StyledButton } from '../../styles/overrides';

const Dialog = ({
  title = "",
  isOpen = false,
  onOpen = () => { },
  children
}) => {

  const handleOk = () => {
    onOpen(false);
  };

  const handleCancel = () => {
    onOpen(false);
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      width={"60%"}
      maskClosable={false}
    >
      {children}
    </Modal>
  )
}

export default Dialog