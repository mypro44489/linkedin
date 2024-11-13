import { useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import { Box } from "../../components/Box/Box";
import classes from "./Profile.module.scss";
export function Profile() {
  const [step, setStep] = useState(0);
  return (
    <div className={classes.root}>
      <Box>
        <h1>Only one last step</h1>
        <p>Tell us a bit about yourself so we can personalize your experience.</p>
        {step === 0 && (
          <div className={classes.inputs}>
            <Input label="First Name" name="firstName" placeholder="Jhon"></Input>
            <Input label="Last Name" name="lastName" placeholder="Doe"></Input>
          </div>
        )}
        {step === 1 && (
          <div className={classes.inputs}>
            <Input label="Latest company" name="company" placeholder="Docker Inc"></Input>
            <Input label="Latest position" name="position" placeholder="Software Engineer"></Input>
          </div>
        )}
        {step == 2 && (
          <Input label="Location" name="location" placeholder="San Francisco, CA"></Input>
        )}
        <div className={classes.buttons}>
          {step > 0 && (
            <Button outline onClick={() => setStep((prev) => prev - 1)}>
              Back
            </Button>
          )}
          {step < 2 && <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>}
          {step === 2 && <Button onClick={() => console.log("Submit")}>Submit</Button>}
        </div>
      </Box>
    </div>
  );
}
