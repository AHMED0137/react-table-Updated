import { Center, Grid, Paper, Title } from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons";
import { CellContext } from "@tanstack/react-table";
import Joi from "joi";
import { ListSearch, Mail, Percentage, TextRecognition, Writing } from "tabler-icons-react";
import { MyModal } from "../../HOC/Modal";
import { Only } from "../data-table/Only";
import { Form, useFormContext } from "../form";
import { Action } from "./ActionIcons";
import { User } from "./DataTable2";

interface RowFormProps extends CellContext<User, unknown> {
  action: Action;
  onClose: () => void;
}

const RowForm = ({ table, row, action, onClose}: Partial<RowFormProps>) => {
  let initialValues = row?.original || {
    id: Date.now(),
    program_description: "",
    sport_discipline_id:"",
    comments: "",

    first_name: "", // drop down
    last_name: "", // drop down
    name: "", // full name
    email: "", //  automatically
    position: "",

    psri_service: "",
    time_request: "",
    time_request_days: "",

    funding_otp: "",
    funding_sportsCanada: "",
    funding_nso: "",
    funding_other: "",
    funding_total: "",

    percent_aloc_senior: 0, // 0 - 100
    percent_next_gen: 0,
  };

  const schema = Joi.object<User>({
    id: Joi.any(),
    program_description: Joi.string().required(),
    sport_discipline_id: Joi.string().required(),
    comments: Joi.string().required(),

    first_name: Joi.string(), // drop down
    last_name: Joi.string(), // drop down
    name: Joi.string(), // full name
    email: Joi.string(), //  automatically
    position: Joi.string(),

    psri_service: Joi.string(),
    time_request: Joi.string(),
    time_request_days: Joi.string(),

    funding_otp: Joi.string().required(),
    funding_sportsCanada: Joi.string().required(),
    funding_nso: Joi.string().required(),
    funding_other: Joi.string().required(),
    funding_total: Joi.string().required(),

    percent_aloc_senior: Joi.number().min(0).max(100).message('You can enter between 0 and 100'),
    percent_next_gen: Joi.number().min(0).max(100).message('You can enter between 0 and 100'),

  });



// temp data
const mydata=["ahmad","ali","zohaib","Training(2026)","Training(2024)"];
// let fullname:string | " ";
      const { form } = useFormContext();  

  function handleFormSubmit(formValues: User) {
      // if(formValues.first_name && formValues.last_name)
      //   {
      //     fullname= formValues.first_name + formValues.last_name;
      //     console.log(fullname);
      //   }
    if (action === "new") {
      table?.options.meta?.addRow(formValues);
    } else if (action === "edit") {
      table?.options.meta?.editRow(formValues);
    }
    onClose!();
  }
  const person_required=true;
  console.log("initialValues",initialValues);
      // const handle=()=>{
      // if(formValues.first_name && formValues.last_name)
      //   {
      //     fullname= formValues.first_name + formValues.last_name;
      //     console.log(name)
      //   }
      // }

  return (
    <Paper className="px-10">
      <Center>
        <Title order={3} color="orange">{action?.toLocaleUpperCase()} ROW</Title>
      </Center>

      <Form
        initialValues={initialValues!}
        onFormSubmit={handleFormSubmit}
        schema={schema}
        // onChange={handle}
      >
      <Grid>
          {/* 1st section */}
        <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 text-sm px-2">Sports Data</legend>
           <Grid>
          <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormSelectBox name={"program_description"} label="Description" data={mydata} icon={<ListSearch  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormSelectBox name={"sport_discipline_id"} label="Desciplin Id" data={mydata} icon={<ListSearch  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={12} md={12} lg={12}><Form.FormTextarea name={"comments"} label="Comments"  minRows={2} maxRows={3} placeholder="write some comments" icon={<Writing  size={18}/>} /></Grid.Col>
       </Grid>
       </fieldset>
       <Only when={person_required===true}>
        {/*  User info /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 px-2">Person Information</legend>
           <Grid>
       <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormSelectBox name={"first_name"} label="First Name" data={mydata} icon={<ListSearch  size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={4} md={4} lg={4}> <Form.FormSelectBox
          name={"last_name"}
          label="Last Name"
          data={mydata}
          icon={<ListSearch  size={18}/>} 
       /></Grid.Col>
       <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"name"} label="Name"  type="text" icon={<TextRecognition  size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={6} md={6} lg={6}> <Form.FormField
          name={"email"}
          label="Email"
          type="text"
          icon={<Mail  size={18}/>} 
        /></Grid.Col>
       <Grid.Col xs={12} sm={6} md={6} lg={6}> <Form.FormField name={"position"} label="Position" type="text" icon={<TextRecognition  size={18}/>} /></Grid.Col>
      </Grid>
       </fieldset>
      </Only>
      {/*Time block ////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 text-sm px-2">Time</legend>
           <Grid>
          <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"psri_service"} label="Psri Service" type="text" icon={<TextRecognition  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"time_request"} label="Time Request" type="text" icon={<TextRecognition  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"time_request_days"} label="Time Request Days" type="number" icon={<IconCurrencyDollar  size={18}/>} /></Grid.Col>
       </Grid>
       </fieldset>


      {/* nso ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 px-2">Funding Information</legend>
           <Grid >
      <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"funding_otp"} label="OTP Sources" type="text"  icon={<IconCurrencyDollar  size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={4} md={4} lg={4}> <Form.FormField
          name={"funding_sportsCanada"}
          label="Sports Canada"
          type="number"
          icon={<IconCurrencyDollar  size={18}/>}
        /></Grid.Col>
       <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"funding_nso"} label="NSO" type="number" icon={<IconCurrencyDollar  size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={6} md={6} lg={6}> <Form.FormField
          name={"funding_other"}
          label="Other Sources"
          type="number"
          icon={<IconCurrencyDollar  size={18}/>}
        /></Grid.Col>
       <Grid.Col xs={12} sm={6} md={6} lg={6}> <Form.FormField name={"funding_total"} label="Grand Total" type="number" icon={<IconCurrencyDollar  size={18}/>}/></Grid.Col>
        </Grid>
       </fieldset>
       <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 text-sm px-2">Percentage</legend>
           <Grid>
          <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormField name={"percent_aloc_senior"} label="Percent Aloc Senior" type="number" icon={<Percentage  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormField name={"percent_next_gen"}  label="Percent Next Gen" type="number" icon={<Percentage  size={18}/>  } /></Grid.Col>
       </Grid>
       </fieldset>
       {/* form button ////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <Form.FormButton
          label="Done"
           className="ml-[80%] w-[20%] m-[1%]"
          color="orange"
          type="submit"
        />
      </Grid>
      </Form>
    </Paper>
  );
};

RowForm.displayName = "RowForm";

export const RowFormWithDrawer = MyModal(RowForm);

