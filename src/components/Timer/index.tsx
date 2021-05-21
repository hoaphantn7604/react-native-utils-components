import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { CTimer } from './type';

const defaulProps = {
  style: {},
  textStyle: {},
  onTimes: (seconds: number) => { },
  onEnd: (seconds: number) => { }
};

let interval: any = null;
let hours = 0;
let minute = 0;
let seconds = 0;
let currentSeconds = 0;

const TimerComponent: CTimer = (props) => {
  const [key, setKey] = useState(Math.random());

  const timer = () => {
    interval = setInterval(() => {
      currentSeconds = currentSeconds + 1;
      if (seconds < 60) {
        seconds = seconds + 1;
      } else {
        seconds = 0;
        minute = minute + 1;
      }
      if (minute === 60) {
        minute = 0;
        hours = hours + 1;
      }
      props.onTimes(currentSeconds);
      setKey(Math.random());
    }, 1000);

  };

  useEffect(() => {
    if (props.start) {
      currentSeconds = 0;
      if (interval) {
        clearInterval(interval);
      }
      hours = 0;
      minute = 0;
      seconds = 0;
      timer();
    } else {
      if (currentSeconds > 0) {
        props.onEnd(currentSeconds);
        currentSeconds = 0;
      }
      clearInterval(interval);
    }
  }, [props.start]);

  return (
    <View style={props.style} key={key}>
      <Text style={[styles.text, props.textStyle]}>{`${hours}:${minute.toString().length === 1 ? '0' : ''}${minute}:${seconds.toString().length === 1 ? '0' : ''
        }${seconds}`}</Text>
    </View>
  );
};

TimerComponent.defaultProps = defaulProps;

export default TimerComponent;