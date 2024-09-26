import type { FunctionalComponent } from "preact";
import CheckIcon from "../../assets/check.svg";
import styles from "./styles.css";

interface StepperProps {
  activeStep: number;
  steps: number[];
}

const Stepper: FunctionalComponent<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="stepper-container">
      <style>{styles.toString()}</style>
      {steps.map((step, index) => {
        const isActive = step === activeStep || step < activeStep;
        const isChecked = step < activeStep;
        return (
          <>
            <div className={`step-circle ${isActive ? "active" : ""}`}>
              {isChecked ? <CheckIcon fontSize="inherit" /> : step}
            </div>
            {index !== steps.length - 1 && <div className={`step-divider ${isChecked ? "active" : ""}`} />}
          </>
        );
      })}
    </div>
  );
};

export default Stepper;
