import { Center, Paper, Title, createStyles } from "@mantine/core";

import { CellContext } from "@tanstack/react-table";
import { Form } from "../form";
import Joi from "joi";
import { User } from "./DataTable2";
import { withDrawer } from "../../HOC/withDrawer";

const RowForm = ({ table, row }: CellContext<User, unknown>) => {
  const initialValues = row.original;

  const schema = Joi.object<User>({
    id: Joi.number(),
    nso: Joi.string().required(),
    notes: Joi.string().required(),
    description: Joi.string().required(),
    otherSources: Joi.string().required(),
    otp: Joi.string().required(),
    sportsCanada: Joi.string().required(),
    total: Joi.string().required(),
  });

  const { classes } = useStyles();

  function handleFormSubmit(formValues: User) {
    console.log(formValues);
  }

  return (
    <Paper className={classes.paper}>
      <Center>
        <Title order={3}>Edit Row</Title>
      </Center>

      <Form
        className={classes.form}
        initialValues={initialValues}
        onFormSubmit={handleFormSubmit}
        schema={schema}
      >
        <Form.FormField name={"nso"} label="NSO" type="text" />
        <Form.FormField name={"description"} label="Notes" type="text" />
        <Form.FormField name={"otp"} label="OTP Sources" type="number" />
        <Form.FormField
          name={"sportsCanada"}
          label="Sports Canada"
          type="number"
        />
        <Form.FormField
          name={"otherSources"}
          label="Other Sources"
          type="number"
        />
        <Form.FormField name={"total"} label="Grand Total" type="number" />
        <Form.FormButton label="Login" type="submit" />
      </Form>
    </Paper>
  );
};

RowForm.displayName = "RowForm";

export const RowFormWithDrawer = withDrawer(RowForm);

const useStyles = createStyles((theme) => ({
  paper: {
    width: theme.breakpoints.sm / 2,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.xl,
  },
  formField: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
}));
