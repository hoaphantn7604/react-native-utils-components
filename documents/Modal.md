## Modal
#### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/component/modal.png)

#### Props
| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| visible            | Boolean              | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| headerStyle        | ViewStyle            | No        |                  |
| backgroundColor    | String               | No        |                  |
| transparent        | Boolean              | No        |                  |
| maxHeight          | Number               | No        |                  |
|supportedOrientations| Array               | No        |                  |
| onRequestClose     | () => void           | No        |                  |
| renderHeader       | JSX.Element          | No        |                  |

#### Example
```js
    import React, { useState } from 'react';
    import { CButton } from 'components';
    import { StyleSheet, View } from 'react-native';
    import { Modal } from 'react-native-utils-components';
    import { useScale } from 'react-native-utils-toolkit';

    const { scale } = useScale;

    export interface Props {
        name?: string;
    }

    const ModalScreen: React.FC<Props> = _props => {
        const [visible, setVisible] = useState<boolean>(false);
        return (
            <View style={styles.container}>
                <CButton
                    style={styles.button}
                    title="Show modal"
                    onPress={() => {
                        setVisible(!visible);
                    }}
                />
                <Modal
                    visible={visible}
                    supportedOrientations={['landscape', 'portrait']}
                    transparent
                    maxHeight={scale(400)}
                    headerStyle={{
                    borderTopLeftRadius: scale(22),
                    borderTopRightRadius: scale(22),
                    backgroundColor: '#F4A460',
                    }}
                    onRequestClose={() => setVisible(false)}>
                    <View />
                </Modal>
            </View>
        );
    };

    export default ModalScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            marginVertical: scale(5),
            backgroundColor: 'white',
            borderRadius: scale(24),
            width: scale(150),
        },
    });
```