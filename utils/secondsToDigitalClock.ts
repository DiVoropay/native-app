export default function secondsToDigitalClock (time: number) {
    const timer = {
      h: Math.floor(time / (60 * 60)),
      m: Math.floor((time % (60*60)) / 60) < 10 ? '0' + Math.floor((time % (60*60)) / 60) : Math.floor((time % (60*60)) / 60),
      s: (time % 60) < 10 ? '0' + time % 60 : time % 60
    };

    return `${timer.h}:${timer.m}:${timer.s}`;
  }