## Hierarchy
#### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/component/hierarchy.png)

#### Props

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

### Example

```js
    import React from 'react';
    import { StyleSheet, View } from 'react-native';
    import { Hierarchy } from 'react-native-utils-components';
    import { useScale } from 'react-native-utils-toolkit';

    const { scale } = useScale;

    export interface Props {
        name: string;
    }

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

    const RecursiveScreen: React.FC<Props> = _props => {
        return (
            <View style={styles.container}>
                <Hierarchy
                    data={recursiveData}
                    textField="shopCode"
                    childField="childs"
                    textStyle={styles.text}
                    iconColor="black"
                    onSelect={item => {
                        console.log(`Selected ${item.length} item`);
                    }}
                />
            </View>
        );
    };

    export default RecursiveScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: scale(20),
        },
        text: {
           color: 'black' 
        }
    });
```