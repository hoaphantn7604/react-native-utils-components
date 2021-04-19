import { CButton, CText } from 'components';
import React, { useImperativeHandle, useState } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { dimensionsScale, isTablet } from 'react-native-utils-scale';
import { translate } from 'shared/language';

export const globalMessageRef = React.createRef<any>();
export const globalMessage = {
  show: (title: string, content: string) => {
    globalMessageRef?.current?.show(title, content);
  },
};

export interface Props {
  name?: string;
}

const GlobalMessage = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useImperativeHandle(ref, () => {
    return { show: show };
  });

  const show = (title: string, content: string) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  return (
    <Modal style={styles.main} visible={visible} animationType={'none'} transparent>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.main}>
          <View style={styles.boxContent}>
            <View style={styles.content}>
              <CText style={[styles.title]}>{title}</CText>
              <CText style={styles.messgae}>{content}</CText>
              <CButton
                style={styles.button}
                title={translate('common:ok')}
                onPress={() => {
                  setVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

export default GlobalMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    width: dimensionsScale.deviceWidth() / (isTablet() ? 1.5 : 1.3),
    backgroundColor: 'white',
    borderRadius: dimensionsScale.scale(10),
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: dimensionsScale.scale(16),
    justifyContent: 'center',
  },
  title: {
    fontSize: dimensionsScale.scale(18),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: dimensionsScale.scale(16),
    color: '#1F2D3D',
  },
  messgae: {
    fontSize: dimensionsScale.scale(14),
    color: '#1F2D3D',
    textAlign: 'center',
    marginBottom: dimensionsScale.scale(16),
  },
  button: {
    width: dimensionsScale.scale(80),
    height: dimensionsScale.scale(50),
  },
});
