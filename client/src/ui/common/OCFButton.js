import posed from 'react-pose';

export const OCFButton = posed.button({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.8 }
});
