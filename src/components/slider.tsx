import * as React from 'react';
import { styled, alpha, Box } from '@mui/system';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';

export default function LabeledValuesSlider(props: any) {
    const rangeSelector = (newValue:any) => { 
    props.setValue(newValue.target.value); 
  }; 
  return (
    <Box sx={{ width: 250 }}>
      <Slider defaultValue={40}  min={10} max={100} value={props.value} onChange={rangeSelector}   color="secondary"    slots={{ valueLabel: SliderValueLabel  }} />
    </Box>
  );
}

interface SliderValueLabelProps {
  children: React.ReactElement;
}

function SliderValueLabel({ children }: SliderValueLabelProps) {
  return (
    <span className="label">
      <div className="value">{children}</div>
    </span>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  300: '#66B2FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B3',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? grey[600] : grey[600]};
  height: 6px;
  width: 100%;
  padding: 16px 10;
  padding-top: 50px;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} {
    pointer-events: none;
    cursor: default;
    color: ${theme.palette.mode === 'light' ? grey[200] : grey[600]};
    opacity: 0.4;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${theme.palette.mode === 'light' ? grey[700] : grey[100]};
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 6px ${alpha(
        theme.palette.mode === 'light' ? grey[200] : blue[300],
        0.3,
      )};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(
        theme.palette.mode === 'light' ? grey[200] : blue[400],
        0.5,
      )};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(
        theme.palette.mode === 'light' ? grey[400] : blue[400],
        0.5,
      )};
      outline: none;
      transform: scale(1.2);
    }
  }

    & .label {
      font-family: IBM Plex Sans;
      font-weight: 600;
      font-size: 13px;
      background: unset;
      background-color: ${theme.palette.mode === 'light' ? grey[600] : blue[900]};
      width: 25px;
      height: 25px;
      padding: 0px;
      visibility: hidden;
      color: #fff;
      border-radius: 50% 50% 50% 0;
      position: absolute;
      transform: translate(0%, -140%) rotate(-45deg) scale(0);
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :hover .label {
      visibility: visible;
      transform: translate(0%, -140%) rotate(-45deg) scale(1);
    }

    :hover .value {
      transform: rotate(45deg);
      text-align: center;
    }
  }
`,
);
