# react-native-utils-components

## Getting started

`$ yarn add react-native-utils-components react-native-utils-scale`

## IOS Setup
    cd ios && pod install && cd ../

## Demo
![](./document/demo.gif?raw=true "Demo")

## CHierarchy
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
        // buttonName="Continute"
        // buttonStyle={{backgroundColor: 'black'}}
        // buttonTextStyle={{color: 'white'}}
        onSelect={item => {
            console.log(`Selected ${item.length} item`);
        }}
    />
```

## CStepProgress, CTooltipProgress, CProgress
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
        renderIcon={require('./assets/check.png')}
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

## CTimer
```js
    import { CTimer } from 'react-native-utils-components';
    
    <CTimer
        style={styles.timer}
        textStyle={styles.timerText}
        start={true}
    />
```

## CDropdown
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
        value={dropdown}
        onChange={item => {
            setDropdown(item);
            console.log('selected', item);
        }}
        textError="Error"
    />
```

## CTextInput
```js
    import { CTextInput } from 'react-native-utils-components';

    // Input normal
    <CTextInput
        style={{backgroundColor: '#F6F7F8'}}
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