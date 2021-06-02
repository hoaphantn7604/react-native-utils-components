## Dropdown
#### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/component/dropdown.png)

#### Props
| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| data               | Array                | Yes       |                  |
| labelField         | String               | Yes       |                  |
| valueField         | String               | Yes       |                  |
| onChange           | (item) => void       | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| labelStyle         | TextStyle            | No        |                  |
| textStyle          | TextStyle            | No        |                  |
| iconColor          | String               | No        |                  |
| activeColor        | String               | No        |                  |
| headerStyle        | ViewStyle            | No        |                  |
| textErrorStyle     | TextStyle            | No        |                  |
| search             | Boolean              | No        | false            |
| searchStyle        | ViewStyle            | No        |                  |
| searchPlaceholder  | String               | No        |                  |
| value              | Item                 | No        |                  |
| label              | String               | No        |                  |
| placeholder        | String               | No        |                  |
| maxHeight          | Number               | No        |                  |
| textError          | String               | No        |                  |
| renderLeftIcon     | () => JSX.Element    | No        |                  |
| renderTickIcon     | () => JSX.Element    | No        |                  |

#### Example
```js
    import React, { useState } from 'react';
    import { StyleSheet, View } from 'react-native';
    import { Dropdown } from 'react-native-utils-components';
    import { useScale } from 'react-native-utils-toolkit';
    import AntDesign from 'react-native-vector-icons/AntDesign';

    const { scale } = useScale;
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    export interface Props {
        name: string;
    }

    const DropdownScreen: React.FC<Props> = _props => {
        const [dropdown, setDropdown] = useState(null);
        const [dropdown1, setDropdown1] = useState(null);
        const [dropdown2, setDropdown2] = useState(null);

        return (
            <View style={styles.container}>
                <Dropdown
                    data={data}
                    labelField="label"
                    valueField="value"
                    label="Title"
                    placeholder="Select item"
                    value={dropdown}
                    onChange={item => {
                        setDropdown(item);
                    }}
                />

                <Dropdown
                    style={styles.dropdown2}
                    data={data}
                    labelField="label"
                    valueField="value"
                    label="Title"
                    placeholder="Select item"
                    value={dropdown1}
                    onChange={item => {
                        setDropdown1(item);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color="black"
                            name="Safety"
                            size={scale(20)}
                        />
                    )}
                    renderTickIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color="black"
                            name="checkcircleo"
                            size={scale(20)}
                        />
                    )}
                    textError="Error"
                />

                <Dropdown
                    style={styles.dropdown}
                    labelStyle={{ color: '#F4A460' }}
                    textStyle={{ color: '#F4A460' }}
                    iconColor={'#F4A460'}
                    textErrorStyle={{ color: '#F4A460' }}
                    data={data}
                    search
                    searchPlaceholder="Search"
                    labelField="label"
                    valueField="value"
                    label="Title"
                    placeholder="Select item"
                    value={dropdown2}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={'#F4A460'}
                            name="Safety"
                            size={scale(20)}
                        />
                    )}
                    renderTickIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={'#F4A460'}
                            name="checkcircleo"
                            size={scale(20)}
                        />
                    )}
                    onChange={item => {
                        setDropdown2(item);
                    }}
                    textError="Error"
                />
            </View>
        );
    };

    export default DropdownScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: scale(20),
        },
        dropdown: {
            marginTop: scale(20),
            backgroundColor: 'white',
            borderRadius: scale(12),
            padding: scale(12),
        },
        dropdown2: {
            backgroundColor: 'transparent',
            borderBottomColor: 'gray',
            borderBottomWidth: scale(0.5),
            marginTop: scale(20),
        },
        icon: {
            marginRight: scale(5),
        },
    });
```