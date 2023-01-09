import { Modal, View } from 'react-native';
import { Loading } from '@components/Loading';

type Props = {
  visible: boolean;
}

export function ModalLoading({visible=false}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading />
      </View>
    </Modal>
  );
}
