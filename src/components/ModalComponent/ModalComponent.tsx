
import styles from "./ModalComponent.style";
import { View, Text, TouchableOpacity, Modal } from 'react-native';

interface Props {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  onCancelText?: string;
  onConfirmText?: string;
  modalText?: string;
}

const ModalComponent =
  ({ isVisible, onCancel, onConfirm,
    onCancelText = 'İptal', onConfirmText = 'Evet',
    modalText = 'Emin misiniz?' }
    : Props) => {
    return (
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {modalText}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={styles.button}
                onPress={onCancel}
              >
                <Text style={styles.buttonText}>{onCancelText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>{onConfirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

export default ModalComponent;
