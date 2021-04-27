# react-native-utils-components

## Getting started

`$ yarn add react-native-utils-components`

### Dependencies

`$ yarn add react-native-vector-icons`

## Code example
```js
    import React from 'react';
    import { StyleSheet, View } from 'react-native';
    import { CRecursive, CTimer, CStepProgress, CProgress } from 'react-native-utils-components';

    const recursiveData = [{
        shopReportName: 'HCM1',
        shopCode: '2MFHCM1',
        shopType: '2',
        shopId: 1,
        shopName: 'MobiFone HCM1',
        childs: [{
            shopReportName: 'LQTĐ',
            shopCode: '2MFH10038',
            shopType: '3',
            shopId: 28,
            shopName: 'MBF Liên Quận Thủ Đức: Q.TĐ, Q.2, Q9, Q.Bình Thạnh',
            childs: [
                {
                    shopReportName: 'Q.TĐức',
                    shopCode: 'HCM_TDU',
                    shopType: '4',
                    shopId: 23,
                    shopName: 'Q.Thủ Đức',
                },
                {
                    shopReportName: 'Q.BThạnh',
                    shopCode: 'HCM_BTH',
                    shopType: '4',
                    shopId: 13,
                    shopName: 'Q.Bình Thạnh',
                },
                {
                    shopReportName: 'Q.02',
                    shopCode: 'HCM_002',
                    shopType: '4',
                    shopId: 7,
                    shopName: 'Q.02',
                },
                {
                    shopReportName: 'Q.09',
                    shopCode: 'HCM_009',
                    shopType: '4',
                    shopId: 15,
                    shopName: 'Q.09',
                },
            ],
        },
        ]
    }]

    export interface Props {
    }

    const MainScreen: React.FC<Props> = (props) => {
        return (
            <View style={styles.container}>
                <CRecursive
                    listData={recursiveData}
                    buttonName="Continute"
                    textField="shopCode"
                    childField="childs"
                    selected={(item) => {
                        console.log(`Selected ${item.length} item`);
                    }}
                />

                <CStepProgress
                    data={[
                    { text: 'Step 1', status: true },
                    { text: 'Step 2', status: true },
                    { text: 'Step 3', status: true },
                    { text: 'Step 4', status: false },
                    ]}
                    selectIndex={2}
                    activeColor= '#32C5FF'
                    inActiveColor= '#C6CDD8'
                    selectColor= '#FF9900'
                    textSize= {16}
                />

                <CTimer start={true} />

                <CProgress
                    color={[
                        { color: 'red', percent: 33.33 },
                        { color: 'gray', percent: 33.33 },
                        { color: 'green', percent: 33.33 },
                    ]}
                    percent={20}
                    border
                />
            </View>
        );
    };

    export default MainScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            padding: 20,
        },
    });
```
