# react-native-utils-components

## Getting started

`$ yarn add react-native-utils-components react-native-utils-scale`

## Start IOS
    cd ios && pod install && cd ../

### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/component/demo.gif)

### CHierarchy

| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| data               | Array                | Yes       |                  |
| textField          | String               | Yes       |                  |
| childField         | String               | Yes       |                  |
| onSelect           | ()=> void            | Yes       |                  |
| buttonName         | String               | No        |                  |
| style              | ViewStyle            | No        |                  |
| buttonStyle        | ViewStyle            | No        |                  |
| buttonTextStyle    | TextStyle            | No        |                  |
| textStyle          | TextStyle            | No        |                  |
| iconColor          | String               | No        | black            |

```js
    import { CHierarchy } from 'react-native-utils-components';
    const recursiveData = [
        {
            shopReportName: 'HCM1',
            shopCode: '2MFHCM1',
            shopType: '2',
            shopId: 1,
            shopName: 'MobiFone HCM1',
            childs: [
            {
                shopReportName: 'LQTĐ',
                shopCode: '2MFH10038',
                shopType: '3',
                shopId: 2,
                shopName: 'MBF Liên Quận Thủ Đức: Q.TĐ, Q.2, Q9, Q.Bình Thạnh',
                childs: [
                {
                    shopReportName: 'Q.TĐức',
                    shopCode: 'HCM_TDU',
                    shopType: '4',
                    shopId: 3,
                    shopName: 'Q.Thủ Đức',
                    childs: [
                    {
                        shopReportName: 'Q.BThạnh',
                        shopCode: 'HCM_BTH',
                        shopType: '4',
                        shopId: 4,
                        shopName: 'Q.Bình Thạnh',
                    },
                    {
                        shopReportName: 'Q.02',
                        shopCode: 'HCM_002',
                        shopType: '4',
                        shopId: 5,
                        shopName: 'Q.02',
                        childs: [
                        {
                            shopReportName: 'Q.09',
                            shopCode: 'HCM_0099',
                            shopType: '4',
                            shopId: 7,
                            shopName: 'Q.09',
                            childs: [
                            {
                                shopReportName: 'Q.09',
                                shopCode: 'HCM_00999',
                                shopType: '4',
                                shopId: 7,
                                shopName: 'Q.09',
                            },
                            ],
                        },
                        ],
                    },
                    {
                        shopReportName: 'Q.09',
                        shopCode: 'HCM_0099999',
                        shopType: '4',
                        shopId: 8,
                        shopName: 'Q.09',
                    },
                    ],
                },
                ],
            },
            ],
        },
    ];

    <CHierarchy
        data={recursiveData}
        textField="shopCode"
        childField="childs"
        textStyle={{color: 'black'}}
        iconColor="black"
        buttonName="Continute"
        buttonStyle={{backgroundColor: 'black'}}
        buttonTextStyle={{color: 'white'}}
        onSelect={item => {
            console.log(`Selected ${item.length} item`);
        }}
    />
```

### CStepProgress, CTooltipProgress, CProgress

#### CStepProgress

| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| data               | Array                | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| activeColor        | String               | No        | #32C5FF          |
| inActiveColor      | String               | No        | #C6CDD8          |
| textColor          | String               | No        | #C6CDD8          |
| selectColor        | String               | No        | #FF9900          |
| textSize           | Number               | No        | 16               |
| selectIndex        | Number               | No        | 0                |
| onSelectIndex      | (index)=> Void       | No        |                  |
| iconTick           | Path                 | No        |                  |

#### CTooltipProgress

| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| data               | Array                | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| tooltipStyle       | ViewStyle            | No        |                  |
| activeColor        | String               | No        | #32C5FF          |
| inActiveColor      | String               | No        | #C6CDD8          |
| selectColor        | String               | No        | #FF9900          |
| textSize           | Number               | No        | 16               |
| selectIndex        | Number               | No        | 0                |
| onSelectIndex      | (index)=> Void       | No        |                  |

#### CProgress

| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| data               | Array                | Yes       |                  |
| percent            | Number               | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| height             | String               | No        | 6                |
| border             | String               | No        | false            |

```js
    import {
        CStepProgress,
        CTooltipProgress,
        CProgress,
    } from 'react-native-utils-components';

    <CStepProgress
        data={[
            {text: 'Step 1', status: true},
            {text: 'Step 2', status: true},
            {text: 'Step 3', status: false},
            {text: 'Step 4', status: false},
        ]}
        iconTick={require('./assets/check.png')}
        selectIndex={step}
        onSelectIndex={index => {
            setStep(index);
        }}
        activeColor="#32C5FF"
        inActiveColor="#C6CDD8"
        selectColor="#FF9900"
        textColor="gray"
        textSize={15}
    />

    <CTooltipProgress
        data={[
            {stage: 'S1', text: 'Hello S1', status: true},
            {stage: 'S2', text: 'Hello S2', status: true},
            {stage: 'S3', text: 'Hello S3', status: true},
            {stage: 'S4', text: 'Hello S4', status: false},
            {stage: 'S5', text: 'Hello S5', status: false},
            {stage: 'S6', text: 'Hello S6', status: false},
        ]}
        activeColor="#32C5FF"
        inActiveColor="#C6CDD8"
        selectColor="#32C5FF"
        tooltipStyle={{}}
        selectIndex={stage}
        onSelectIndex={index => {
            setStage(index);
        }}
    />

    <CProgress
        data={[
            {color: 'red', percent: 33.33},
            {color: 'gray', percent: 33.33},
            {color: 'green', percent: 33.33},
        ]}
        percent={20}
        border
    />
```

### CTimer

| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| start              | Boolean              | Yes       | false            |
| style              | ViewStyle            | No        |                  |
| textStyle          | TextStyle            | No        |                  |
| onTimes            | (seconds) => void    | No        |                  |
| onEnd              | (seconds) => void    | No        |                  |

```js
    import { CTimer } from 'react-native-utils-components';
    
    <CTimer
        style={styles.timer}
        textStyle={styles.timerText}
        start={true}
        onTimes={seconds => {
            console.log(seconds);
        }}
        onEnd={seconds => {
            console.log(seconds);
        }}
    />
```

### CCountdown

| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| seconds            | Number               | Yes       |                  |
| start              | Boolean              | Yes       | false            |
| style              | ViewStyle            | No        |                  |
| textStyle          | TextStyle            | No        |                  |
| onTimes            | (seconds) => void    | No        |                  |
| onEnd              | (seconds) => void    | No        |                  |

```js
    import { CCountdown } from 'react-native-utils-components';
    
    <CCountdown
        seconds={100}
        style={styles.timer}
        textStyle={styles.timerText}
        start={true}
        onTimes={seconds => {
            console.log(seconds);
        }}
        onEnd={() => {
            console.log('End');
        }}
    />
```

### CDropdown

| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| data               | Array                | Yes       |                  |
| labelField         | String               | Yes       |                  |
| valueField         | String               | Yes       |                  |
| onChange           | (item) => void       | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| iconStyle          | ImageStyle           | No        |                  |
| iconTickStyle      | ImageStyle           | No        |                  |
| headerStyle        | ViewStyle            | No        |                  |
| labelStyle         | TextStyle            | No        |                  |
| textErrorStyle     | TextStyle            | No        |                  |
| value              | Item                 | No        |                  |
| label              | String               | No        |                  |
| placeholder        |                      | No        |                  |
| textError          |                      | No        |                  |
| iconTick           | Path                 | No        |                  |

```js
    import { CDropdown } from 'react-native-utils-components';

    const [dropdown, setDropdown] = useState(null);

    <CDropdown
        style={{backgroundColor: '#F6F7F8'}}
        data={[
            {label: 'Item 1', value: '1'},
            {label: 'Item 2', value: '2'},
            {label: 'Item 3', value: '3'},
            {label: 'Item 4', value: '4'},
            {label: 'Item 5', value: '5'},
            {label: 'Item 6', value: '6'},
            {label: 'Item 7', value: '7'},
            {label: 'Item 8', value: '8'},
        ]}
        labelField="label"
        valueField="value"
        label="Title"
        placeholder="Select item"
        iconTick={require('./assets/check.png')}
        value={dropdown}
        onChange={item => {
            setDropdown(item);
            console.log('selected', item);
        }}
        textError="Error"
    />
```

### CTextInput
```js
    import { CTextInput } from 'react-native-utils-components';

    // Input normal
    <CTextInput
        style={{backgroundColor: '#F6F7F8'}}
        renderLeftIcon={() => (
            <Image
                style={{width: 20, height: 20, marginRight: 10}}
                source={require('./assets/check.png')}
            />
        )}
        label="Normal"
        placeholder="Placeholder"
        placeholderTextColor="gray"
        textError="Error"
    />

    // Input password
    <CTextInput
        style={{backgroundColor: '#F6F7F8'}}
        label="Password"
        placeholder="Placeholder"
        placeholderTextColor="gray"
        secureTextEntry
    />

    // Input currency
    <CTextInput
        style={{backgroundColor: '#F6F7F8'}}
        label="Currency"
        placeholder="Placeholder"
        placeholderTextColor="gray"
        currency
        unitCurrency="$"
    />

    // Input numeric 
    <CTextInput
        style={{backgroundColor: '#F6F7F8'}}
        label="Numeric"
        placeholder="Placeholder"
        placeholderTextColor="gray"
        numeric
    />
```

### Source code exampe
https://github.com/hoaphantn7604/react-native-utils-components/tree/master/example