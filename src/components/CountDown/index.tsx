import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Props } from './type';

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

const CountdownComponent = React.forwardRef((props: Props, ref) => {
  const { onEnd, onTimes } = props;
  const [key, setKey] = useState(Math.random());

  useImperativeHandle(ref, () => {
    return { start, pause, resume, stop };
  });

  useEffect(() => { 
    return stop();
  }, [])

  const timer = () => {
    interval = setInterval(() => {
      if (currentSeconds > 0) {
        currentSeconds = currentSeconds - 1;
        hours = ~~(currentSeconds / 3600);
        minute = ~~((currentSeconds % 3600) / 60);
        seconds = ~~currentSeconds % 60;

        if (onTimes) {
          onTimes(currentSeconds);
        }

      }
      if (currentSeconds < 0) {
        if (onEnd) {
          onEnd();
        }
        clear();
      }
      setKey(Math.random());
    }, 1000);
  };

  useEffect(() => {
    initTime();
  }, [])
  const initTime = () => {
    if (props.seconds) {
      currentSeconds = props.seconds;
      hours = ~~(currentSeconds / 3600);
      minute = ~~((currentSeconds % 3600) / 60);
      seconds = ~~currentSeconds % 60;
      setKey(Math.random());
    }
  }

  const start = () => {
    initTime();

    if (!interval) {
      timer();
    }
  }

  const pause = () => {
    if (interval) {
      clear();
    }
  }

  const resume = () => {
    if (!interval) {
      timer();
    }
  }

  const stop = () => {
    initTime();
    clear();
    if(onEnd){
      onEnd();
    }
  }

  const clear = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  return (
    <View style={props.style} key={key}>
      <Text style={[styles.text, props.textStyle]}>{`${hours}:${minute.toString().length === 1 ? '0' : ''}${minute}:${seconds.toString().length === 1 ? '0' : ''
        }${seconds}`}</Text>
    </View>
  );
});

CountdownComponent.defaultProps = defaulProps;

export default CountdownComponent;
