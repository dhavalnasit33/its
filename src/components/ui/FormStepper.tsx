// components/ui/FormStepper.tsx

'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

// Styled components (no changes needed here)
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
        backgroundImage: 'linear-gradient(136deg, #FFCF85 0%, #D68029 50%, #dbb23fff 100%)',
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
        backgroundImage: 'linear-gradient(136deg, #FFCF85 0%, #D68029 50%, #dbb23fff 100%)',
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{ ownerState: { completed?: boolean; active?: boolean } }>(({ theme, ownerState }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage: 'linear-gradient(136deg, #FFCF85 0%, #D68029 50%, #dbb23fff 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage: 'linear-gradient(136deg, #FFCF85 0%, #D68029 50%, #dbb23fff 100%)',
    }),
}));

// Props for the main component
interface FormStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  steps: string[]; // <-- Pass steps as a prop
  icons: { [key: string]: React.ReactElement }; // <-- Pass icons as a prop
    readonly?: boolean; 
}

export default function FormStepper({ currentStep, onStepClick, steps, icons }: FormStepperProps) {
    // The StepIcon component is now defined inside so it can access the 'icons' prop
    function ColorlibStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;
        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }
    
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={currentStep - 1} connector={<ColorlibConnector />}>
                {steps.map((label, index) => (
                    <Step key={label} onClick={() => onStepClick?.(index + 1)} style={{ cursor: 'pointer' }}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}