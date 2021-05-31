## Countdown
#### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/component/countdown.png)

#### Props
| Props              | Params               | isRequire | default          |
| ------------------ | -------------------- | --------- | ---------------- |
| start              | ref.start()          | Yes       |                  |
| pause              | ref.pause()          | Yes       |                  |
| resume             | ref.resume()         | Yes       |                  |
| stop               | ref.stop()           | Yes       |                  |
| seconds            | Number               | Yes       |                  |
| style              | ViewStyle            | No        |                  |
| textStyle          | TextStyle            | No        |                  |
| onTimes            | (seconds) => void    | No        |                  |
| onEnd              | (seconds) => void    | No        |                  |

#### Example
```js
    import { CButton } from 'components';
    import React, { useRef, useEffect } from 'react';
    import { StyleSheet, View } from 'react-native';
    import { Countdown } from 'react-native-utils-components';
    import { useScale } from 'react-native-utils-toolkit';

    const { scale } = useScale;

    export interface Props {
        name: string;
    }

    const CountdownScreen: React.FC<Props> = _props => {
        const countdownRef: any = useRef(null);

        return (
            <View style={styles.container}>
                <Countdown
                    ref={countdownRef}
                    style={styles.timer}
                    textStyle={styles.timerText}
                    seconds={5}
                    onTimes={e => {}}
                    onEnd={() => {
                    }}
                />
                <CButton
                    style={styles.button}
                    title={'Start'}
                    onPress={() => {
                        countdownRef.current.start();
                    }}
                />
                <CButton
                    style={styles.button}
                    title={'Pause'}
                    onPress={() => {
                        countdownRef.current.pause();
                    }}
                />
                <CButton
                    style={styles.button}
                    title={'Resume'}
                    onPress={() => {
                        countdownRef.current.resume();
                    }}
                />
                <CButton
                    style={styles.button}
                    title={'Stop'}
                    onPress={() => {
                        countdownRef.current.stop();
                    }}
                />
            </View>
        );
    };

    export default CountdownScreen;

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
            height: scale(50),
        },
    });
```