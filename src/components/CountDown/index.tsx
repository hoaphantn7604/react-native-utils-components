import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Countdown } from './type';

const defaulProps = {
  style: {},
  textStyle: {},
  onTimes: (seconds: number) => { },
  onEnd: () => { }
};

let interval: any = null;
let hours = 0;
let minute = 0;
let seconds = 0;
let currentSeconds = 0;

const CountdownComponent: Countdown = (props) => {
  const [key, setKey] = useState(Math.random());

  const timer = () => {
    interval = setInterval(() => {
      if (currentSeconds > 0) {
        currentSeconds = currentSeconds - 1;
        hours = ~~(currentSeconds / 3600);
        minute = ~~((currentSeconds % 3600) / 60);
        seconds = ~~currentSeconds % 60;
        setKey(Math.random());
        props.onTimes(currentSeconds);
      }
      if (currentSeconds == 0) {
        props.onEnd();
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    if (props.seconds) {
      currentSeconds = props.seconds;
      hours = ~~(currentSeconds / 3600);
      minute = ~~((currentSeconds % 3600) / 60);
      seconds = ~~currentSeconds % 60;
      setKey(Math.random());
    }
  }, [])

  useEffect(() => {
    if (props.start) {
      if (interval) {
        clearInterval(interval);
      }

      timer();
    } else {
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

CountdownComponent.defaultProps = defaulProps;

export default CountdownComponent;