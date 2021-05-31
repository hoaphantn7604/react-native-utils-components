## TextInput
#### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/component/textinput.png)

#### Props
| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| value              | String               | No        |                  |
| label              | String               | No        |                  |
| placeholder        | String               | No        |                  |
|placeholderTextColor| String               | No        | #000             |
| style              | ViewStyle            | No        |                  |
| labelStyle         | TextStyle            | No        |                  |
| inputStyle         | TextStyle            | No        |                  |
| iconStyle          | ImageStyle           | No        |                  |
| textErrorStyle     | TextStyle            | No        |                  |
| TextStyle          | String               | No        |                  |
| secureTextEntry    | String               | No        |                  |
| autoCapitalize     | String               | No        |                  |
| keyboardType       | KeyboardTypeOptions  | No        |                  |
| multiline          | Boolean              | No        |                  |
| autoFocus          | Boolean              | No        |                  |
| editable           | Boolean              | No        |                  |
| maxLength          | Number               | No        |                  |
| showIcon           | Boolean              | No        | true             |
| currency           | Boolean              | No        | false            |
| unitCurrency       | String               | No        |                  |
| numeric            | Boolean              | No        | false            |
| onChangeText       | (value) => void      | Yes       |                  |
| onBlur             | (e) => void          | No        |                  |
| onFocus            | (e) => void          | No        |                  |
| renderLeftIcon     | () => JSX.Element    | No        |                  |
| renderRightIcon     | () => JSX.Element   | No        |                  |

#### Example
```js
    import React from 'react';
    import { StyleSheet, View } from 'react-native';
    import { TextInput } from 'react-native-utils-components';
    import { useScale } from 'react-native-utils-toolkit';
    import AntDesign from 'react-native-vector-icons/AntDesign';

    const { scale } = useScale;

    export interface Props {
        name: string;
    }

    const TextInputScreen: React.FC<Props> = _props => {
        return (
            <View style={styles.container}>
                <TextInput
                    label="Normal"
                    placeholder="Placeholder"
                    placeholderTextColor="gray"
                    onChangeText={(text: string) => {
                    console.log(text);
                    }}
                />

                <TextInput
                    style={styles.textinput}
                    label="Password"
                    placeholder="Placeholder"
                    placeholderTextColor="gray"
                    secureTextEntry
                    onChangeText={(text: string) => {
                        console.log(text);
                    }}
                    textError="Error"
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color="gray"
                            name="unlock"
                            size={scale(20)}
                        />
                    )}
                    iconStyle={{ tintColor: 'gray' }}
                />

                <TextInput
                    style={styles.textinput2}
                    label="Currency"
                    placeholder="Placeholder"
                    placeholderTextColor="gray"
                    currency
                    unitCurrency="$"
                    onChangeText={(text: string) => {
                        console.log(text);
                    }}
                />

                <TextInput
                    style={styles.textinput2}
                    labelStyle={{ color: '#F4A460' }}
                    iconStyle={{ tintColor: '#F4A460' }}
                    inputStyle={{ color: '#F4A460' }}
                    label="Numeric"
                    placeholder="Placeholder"
                    placeholderTextColor="gray"
                    numeric
                    onChangeText={(text: string) => {
                        console.log(text);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={'#F4A460'}
                            name="Safety"
                            size={scale(20)}
                        />
                    )}
                    textError="Error"
                />
            </View>
        );
    };

    export default TextInputScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: scale(20),
        },
        textinput: {
            marginTop: scale(20),
            borderBottomWidth: scale(0.5),
            borderBottomColor: 'gray',
        },
        textinput2: {
            marginTop: scale(20),
            backgroundColor: 'white',
            borderRadius: scale(8),
            padding: scale(12),
        },
        icon: {
            marginRight: scale(5),
        },
    });
```