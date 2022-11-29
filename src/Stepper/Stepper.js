import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { steps } from "./Steps";
import { displayFact } from "./Helpers";

export default function StepperComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [subStepCounter, setSubStepCounter] = useState([]);
  const [randomFact, setRandomFact] = useState({});
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSubStepCounter([]);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSubStepCounter([]);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSubStepCounter([]);
    setRandomFact({});
  };
  const checkHandler = (checked, index) => {
    const subStepIndex = subStepCounter.findIndex((e) => e.subStep === index);
    if (subStepIndex < 0) {
      return setSubStepCounter((pre) => [
        ...pre,
        { subStep: index, checked: true },
      ]);
    }
    return setSubStepCounter((pre) => {
      const newSupStepCounter = [...pre];
      newSupStepCounter[subStepIndex].checked = checked;
      return newSupStepCounter;
    });
  };

  const getDisplayFact = useCallback(async () => {
    if (activeStep === steps.length) {
      const data = await displayFact();
      setRandomFact(data);
    }
  }, [activeStep]);

  useEffect(() => {
    getDisplayFact();
  }, [getDisplayFact]);


  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.subSteps.map((e, i) => (
                <div key={`${i}${e}`}>
                  <input
                    type="checkbox"
                    onChange={(e) => checkHandler(e.target.checked, i)}
                  />
                  {e}
                </div>
              ))}

              {subStepCounter.filter((e) => e.checked).length ===
              step.subSteps.length ? (
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              ) : null}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <div>
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
          <h3>Random Fact: </h3>
          <strong>{randomFact?.text}</strong>
        </div>
      )}
    </Box>
  );
}
