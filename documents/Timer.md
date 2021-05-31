## Timer
#### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/component/timer.png)

#### Props
| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| start              | ref.start()          | Yes       |                  |
| pause              | ref.pause()          | Yes       |                  |
| resume             | ref.resume()         | Yes       |                  |
| stop               | ref.stop()           | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| textStyle          | TextStyle            | No        |                  |
| onTimes            | (seconds) => void    | No        |                  |
| onEnd              | (seconds) => void    | No        |                  |

#### Example
```js
    import { CButton } from 'components';
    import React, { useRef } from 'react';
    import { StyleSheet, View } from 'react-native';
    import { Timer } from 'react-native-utils-components';
    import { useScale } from 'react-native-utils-toolkit';

    const { scale } = useScale;

    export interface Props {
        name: string;
    }

    const TimerScreen: React.FC<Props> = _props => {
        const timerRef: any = useRef(null);

        return (
            <View style={styles.container}>
                <Timer
                    ref={timerRef}
                    style={styles.timer}
                    textStyle={styles.timerText}
                    onTimes={e => {}}
                    onEnd={e => {}}
                />
                <CButton
                    style={styles.button}
                    title={'Start'}
                    onPress={() => {
                    timerRef.current.start();
                    }}
                />
                <CButton
                    style={styles.button}
                    title={'Pause'}
                    onPress={() => {
                    timerRef.current.pause();
                    }}
                />
                <CButton
                    style={styles.button}
                    title={'Resume'}
                    onPress={() => {
                    timerRef.current.resume();
                    }}
                />
                <CButton
                    style={styles.button}
                    title={'Stop'}
                    onPress={() => {
                    timerRef.current.stop();
                    }}
                />
            </View>
        );
    };

    export default TimerScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            padding: scale(20),
        },
        timer: {
            marginVertical: scale(20),
        },
        timerText: {
            fontSize: scale(22),
        },
        button: {
            marginVertical: scale(5),
            backgroundColor: 'white',
            borderRadius: scale(24),
            width: scale(100),
        },
    });
```