## MultiSelect
#### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/component/multiselect.png)

#### Props
| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| data               | Array                | Yes       |                  |
| labelField         | String               | Yes       |                  |
| valueField         | String               | Yes       |                  |
| onChange           | (item) => void       | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| fontFamily         | String               | No        |                  |
| labelStyle         | TextStyle            | No        |                  |
| textStyle          | TextStyle            | No        |                  |
| iconColor          | String               | No        |                  |
| activeColor        | String               | No        |                  |
| backgroundColor    | String               | No        |                  |
| headerStyle        | ViewStyle            | No        |                  |
| value              | Item                 | No        |                  |
| label              | String               | No        |                  |
| placeholder        | String               | No        |                  |
| maxHeight          | Number               | No        |                  |
| selectedStyle      | ViewStyle            | No        |                  |
| selectedTextStyle  | TextStyle            | No        |                  |
| search             | Boolean              | No        | false            |
| searchStyle        | ViewStyle            | No        |                  |
| searchPlaceholder  | String               | No        |                  |
| textError          | String               | No        |                  |
| textErrorStyle     | TextStyle            | No        |                  |
| renderLeftIcon     | () => JSX.Element    | No        |                  |
| renderTickIcon     | () => JSX.Element    | No        |                  |
| renderHeader       | () => JSX.Element    | No        |                  |

#### Example
```js
    import { COLORS } from 'config';
    import React, { useState } from 'react';
    import { StyleSheet, View } from 'react-native';
    import { MultiSelect } from 'react-native-utils-components';
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

    const MultiSelectScreen: React.FC<Props> = _props => {
    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState([]);
    const [selected2, setSelected2] = useState([]);

    return (
        <View style={styles.container}>
            <MultiSelect
                data={data}
                labelField="label"
                valueField="value"
                label="Title"
                placeholder="Select item"
                value={selected}
                onChange={item => {
                    setSelected(item);
                    console.log('selected', item);
                }}
            />

            <MultiSelect
                style={styles.dropdown2}
                data={data}
                labelField="label"
                valueField="value"
                label="Title"
                placeholder="Select item"
                value={selected1}
                onChange={item => {
                    setSelected1(item);
                    console.log('selected', item);
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
            />

            <MultiSelect
                style={styles.dropdown}
                search
                searchPlaceholder="Search"
                labelStyle={{ color: COLORS.SECONDARY }}
                textStyle={{ color: COLORS.SECONDARY }}
                selectedStyle={{ borderColor: COLORS.SECONDARY }}
                selectedTextStyle={{ color: COLORS.SECONDARY }}
                iconColor={COLORS.SECONDARY}
                data={data}
                labelField="label"
                valueField="value"
                label="Title"
                placeholder="Select item"
                value={selected2}
                renderLeftIcon={() => (
                <AntDesign
                    style={styles.icon}
                    color={COLORS.SECONDARY}
                    name="Safety"
                    size={scale(20)}
                />
                )}
                renderTickIcon={() => (
                <AntDesign
                    style={styles.icon}
                    color={COLORS.SECONDARY}
                    name="checkcircleo"
                    size={scale(20)}
                />
                )}
                onChange={item => {
                    setSelected2(item);
                    console.log('selected', item);
                }}
            />
            </View>
        );
    };

    export default MultiSelectScreen;

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