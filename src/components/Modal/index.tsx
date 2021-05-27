import React, { useState } from 'react';
import {
  Animated,
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
  backgroundColor: 'rgba(0,0,0,0.4)',
};

const ModalComponent: CModal = props => {
  const {
    visible,
    maxHeight = h / 2,
    onRequestClose,
    transparent,
    style,
    backgroundColor,
    headerStyle,
    renderHeader,
    supportedOrientations
  } = props;

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      supportedOrientations={supportedOrientations}
      style={{ flex: 1 }}
    >
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: backgroundColor,
          },
          style,
        ]}>
        <CurtainView
          position='bottom'
          backgroundColor='white'
          maxHeight={maxHeight}
          show={visible}
          headerStyle={headerStyle}
          renderHeader={renderHeader}
          onShow={(status) => {
            if (onRequestClose) {
              onRequestClose();
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
