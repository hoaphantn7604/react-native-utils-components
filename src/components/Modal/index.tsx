import React from 'react';
import {
  Modal,
  View
} from 'react-native';
import { useDetectDevice } from 'react-native-utils-toolkit';
import CurtainView from '../CurtainView';
import { CModal } from './type';

const { height: h } = useDetectDevice;

const defaultProps = {
  visible: false,
  transparent: false,
  height: h / 2,
  styles: {},
  headerStyle: {},
  backgroundColor: 'white',
};

const ModalComponent: CModal = props => {
  const {
    visible,
    maxHeight = h / 2,
    onRequestClose,
    style,
    backgroundColor,
    headerStyle,
    renderHeader,
  } = props;

  return (
    <Modal
      {...props}
      visible={visible}
      style={{ flex: 1 }}
    >
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
          style,
        ]}>
        <CurtainView
          position='bottom'
          backgroundColor={backgroundColor}
          maxHeight={maxHeight}
          show={visible}
          headerStyle={headerStyle}
          renderHeader={renderHeader}
          onShow={(status) => {
            if(!status){
              if (onRequestClose) {
                onRequestClose();
              }
            }
          }}
        >{props?.children}
        </CurtainView>
      </View>
    </Modal>
  );
};

ModalComponent.defaultProps = defaultProps;
export default ModalComponent;
