import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {
  CHierarchy,
  CTimer,
  CStepProgress,
  CTooltipProgress,
  CProgress,
} from 'react-native-utils-components';
import {dimensionsScale} from 'react-native-utils-scale';

const {scale} = dimensionsScale;

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

const MainScreen = props => {
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState(2);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Hierarchy</Text>
          <CHierarchy
            data={recursiveData}
            textField="shopCode"
            childField="childs"
            textStyle={{color: 'black'}}
            iconColor="black"
            buttonName="Continute"
            buttonStyle={{backgroundColor: 'black'}}
            buttonTextStyle={{color: 'white'}}
            selected={item => {
              console.log(`Selected ${item.length} item`);
              alert(`Selected ${item.length} item`);
            }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Step Progress</Text>
          <CStepProgress
            data={[
              {text: 'Step 1', status: true},
              {text: 'Step 2', status: true},
              {text: 'Step 3', status: false},
              {text: 'Step 4', status: false},
            ]}
            selectIndex={step}
            onSelectIndex={index => {
              setStep(index);
            }}
            activeColor="#32C5FF"
            inActiveColor="#C6CDD8"
            selectColor="#32C5FF"
            textColor="gray"
            textSize={15}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Tooltip Progress</Text>
          <CTooltipProgress
            data={[
              {stage: 'S1', text: 'Hello S1', status: true},
              {stage: 'S2', text: 'Hello S2', status: true},
              {stage: 'S3', text: 'Hello S3', status: true},
              {stage: 'S4', text: 'Hello S4', status: true},
              {stage: 'S5', text: 'Hello S5', status: true},
              {stage: 'S6', text: 'Hello S6', status: false},
            ]}
            activeColor="#32C5FF"
            inActiveColor="#C6CDD8"
            selectColor="#32C5FF"
            selectIndex={stage}
            onSelectIndex={index => {
              setStage(index);
            }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Progress</Text>
          <CProgress
            data={[
              {color: 'red', percent: 33.33},
              {color: 'gray', percent: 33.33},
              {color: 'green', percent: 33.33},
            ]}
            percent={70}
            border
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Timer</Text>
          <CTimer
            style={styles.timer}
            textStyle={styles.timerText}
            start={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    marginVertical: scale(20),
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  timer: {
    backgroundColor: 'black',
    width: scale(100),
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(50),
    borderWidth: scale(3),
    borderColor: 'white',
  },
  timerText: {
    color: 'white',
  },
});
