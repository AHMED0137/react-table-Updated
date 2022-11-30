import { Center, Paper, Title, createStyles } from "@mantine/core";

import { Action } from "./ActionIcons";
import { CellContext } from "@tanstack/react-table";
import { Form } from "../form";
import Joi from "joi";
import { MyModal } from "../../HOC/Modal";
import { User } from "./DataTable2";

interface RowFormProps extends CellContext<User, unknown> {
  action: Action;
  onClose: () => void;
}

const RowForm = ({ table, row, action, onClose }: Partial<RowFormProps>) => {
  let initialValues = row?.original || {
    id: Date.now(),
    nso: "",
    notes: "",
    description: "",
    otherSources: "",
    otp: "",
    sportsCanada: "",
    total: "",
  };

  const schema = Joi.object<User>({
    id: Joi.any(),
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
    if (action === "new") {
      table?.options.meta?.addRow(formValues);
    } else if (action === "edit") {
      table?.options.meta?.editRow(formValues);
    }
    onClose!();
  }

  return (
    <Paper className={classes.paper}>
      <Center>
        <Title order={3}>{action}</Title>
      </Center>

      <Form
        className={classes.form}
        initialValues={initialValues!}
        onFormSubmit={handleFormSubmit}
        schema={schema}
      >
        <Form.FormField name={"description"} label="Description" type="text" />
        <Form.FormField name={"notes"} label="Notes" type="text" />
        <Form.FormField name={"otp"} label="OTP Sources" type="number" />
        <Form.FormField
          name={"sportsCanada"}
          label="Sports Canada"
          type="number"
        />
        <Form.FormField name={"nso"} label="NSO" type="text" />
        <Form.FormField
          name={"otherSources"}
          label="Other Sources"
          type="number"
        />
        <Form.FormField name={"total"} label="Grand Total" type="number" />
        <Form.FormButton
          label="Done"
          className="mt-2"
          color="orange"
          type="submit"
        />
      </Form>
    </Paper>
  );
};

RowForm.displayName = "RowForm";

export const RowFormWithDrawer = MyModal(RowForm);

const useStyles = createStyles((theme) => ({
  paper: {
    width: theme.breakpoints.sm / 2,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.lg,
  },
  formField: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
}));
