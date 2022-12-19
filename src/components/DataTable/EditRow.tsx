import { Center, Grid, Paper, Title } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconCurrencyDollar } from "@tabler/icons";
import { CellContext } from "@tanstack/react-table";
import Joi from "joi";
import { ListSearch, Mail, Percentage, TextRecognition, Writing } from "tabler-icons-react";
import { MyModal } from "../../HOC/Modal";
import { Only } from "../data-table/Only";
import { Form } from "../form";
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
    time_request_days: 0,

    funding_otp: 0,
    funding_sportsCanada: 0,
    funding_nso: 0,
    funding_other: 0,
    funding_total: 0,

    percent_aloc_senior: 0, // 0 - 100
    percent_next_gen: 0,
    percentage:0,
  };
  const percentage= initialValues.percent_aloc_senior+initialValues.percent_next_gen;
//   const whitelist = {
//   firstObject: initialValues.percent_aloc_senior,
//   secondObject: initialValues.percent_next_gen,
// };
// const objects = Object.keys(whitelist);

  const schema = Joi.object<User>({
    
    id: Joi.any(),
    program_description: Joi.string().required(),
    sport_discipline_id: Joi.string().required(),
    comments: Joi.string().required(),

    first_name: Joi.string(), // drop down
    last_name: Joi.string(), // drop down
    name: Joi.string(), // full name
    email: Joi.string().email({ tlds: { allow: false } }), //  automatically
    position: Joi.string(),

    psri_service: Joi.string(),
    time_request: Joi.string(),
    time_request_days: Joi.number(),

    funding_otp: Joi.number().required(),
    funding_sportsCanada: Joi.number().required(),
    funding_nso: Joi.number().required(),
    funding_other: Joi.number().required(),
    funding_total: Joi.number().required(),

    percent_aloc_senior: Joi.number().min(0).max(100).message('You can enter between 0 and 100'),
    percent_next_gen: Joi.number().min(0).max(100).message('You can enter between 0 and 100'),
    // percentage:Joi.number().limit(100,"utf8").required(),
 
  })
  const personSchema= Joi.object<person>({
    id:Joi.any(),
    first_name: Joi.string(), // full name
        last_name: Joi.string(), // full name

    email: Joi.string().email({ tlds: { allow: false } }), //  automatically
    position: Joi.string(),
  })
  type person ={
    id:string | number,
    first_name:string,
    last_name:string,
    email:string,
    position:string,
  }
  let initialPersonValues = {
    id: Date.now(),
   first_name:"",
    last_name:"",
    email: "", //  automatically
    position: "",
  };
 //   body: Joi.object().keys({
  //   percent_aloc_senior: Joi.string().required(),
  //   percent_next_gen: Joi.string().required()
  //   percentage: Joi.string().limit(30, 'utf8').required()
  // })
    // objects:Joi.number(),
 const [personState,setPersonState]=useToggle([false,true]);
 const handlePerson=()=>{
  setPersonState();
 }
 function handlePersonInfoSubmit(formValues: person) {
    alert("submitted");
    setPersonState();
  }
// temp data
const mydata=["ahmad","ali","zohaib","Training(2026)","Training(2024)"];
      // const { form } = useFormContext();  
  function handleFormSubmit(formValues: User) {
    if (action === "new") {
      table?.options.meta?.addRow(formValues);
    } else if (action === "edit") {
      table?.options.meta?.editRow(formValues);
    }
    onClose!();
  }
  const person_required=true;
     let totalValue:number=0;
    //  handle input function
     const handleInput=(value:number|string)=>{ 
      //totalValue+=Number(value);
      //  console.log(typeof(value));
       console.log(value);
     }
    console.log("totalVALUE", totalValue);
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
          <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormSelectInput name={"program_description"} label="Program Description" description="Select program description" data={mydata} icon={<ListSearch  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormSelectInput name={"sport_discipline_id"} label="Sports Desciplin" description="Select sports desciplin" data={mydata} icon={<ListSearch  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={12} md={12} lg={12}><Form.FormTextarea name={"comments"} label="Comments"  minRows={2} maxRows={3} description="write some comments" placeholder="write some comments" icon={<Writing  size={18}/>} /></Grid.Col>
       </Grid>
       </fieldset>
       <Only when={person_required===true}>
        {/*  User info /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 px-2">Person Information</legend>
           <Grid>
       <Grid.Col xs={12} sm={9} md={9} lg={9}><Form.FormSelectInput name={"first_name"} label="Person Name"  description="Select Person Name" data={mydata} icon={<ListSearch  size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={2} md={2} lg={2} offset={1}> <Form.FormCheck
       className="mt-12"
          name={"person"}
          label="Add new person"
          color="yellow"
          onChange={handlePerson}
       /></Grid.Col>
       {/* <Grid.Col xs={12} sm={4} md={4} lg={4}> <Form.FormSelectBox
          name={"last_name"}
          label="Last Name"
          data={mydata}
          icon={<ListSearch  size={18}/>} 
       /></Grid.Col> */}
       {/* person data */}
       <Only when={personState}>
        <Form
        initialValues={initialPersonValues!}
        onFormSubmit={handlePersonInfoSubmit}
        schema={personSchema}
        className="w-full px-2"
      >
        <Grid>
       <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormField name={"first_name"} onChange={(e)=>handleInput(e)} label="First Name"  description="First Name"  type="text" icon={<TextRecognition  size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormField name={"last_name"} label="Last Name" description="Last Name"  type="text" icon={<TextRecognition  size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={5} md={5} lg={5}> <Form.FormField
          name={"email"}
          label="Email"
          description="Person Email"
          type="text"
          icon={<Mail  size={18}/>} 
        /></Grid.Col>
       <Grid.Col xs={12} sm={5} md={5} lg={5}> <Form.FormField name={"position"} label="Position" description="Person Position"  type="text" icon={<TextRecognition  size={18}/>} /></Grid.Col>
      <Grid.Col xs={12} sm={2} md={2} lg={2}><Form.FormButton className="mt-11 w-[100%]" label="Add" color="orange" type="submit" /></Grid.Col>
      </Grid>
      </Form>
      </Only>
      </Grid>
       </fieldset>
      </Only>
      {/*Time block ////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 text-sm px-2">Time</legend>
           <Grid>
          <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"psri_service"} label="Psri Service" description="Add Psri Service" type="text" icon={<TextRecognition  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"time_request"} label="Time Request" type="text" description="Add time request" icon={<TextRecognition  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField name={"time_request_days"} label="Time Request Days" description="Add time request days" type="number" icon={<IconCurrencyDollar  size={18}/>} /></Grid.Col>
       </Grid>
       </fieldset>


      {/* nso ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 px-2">Funding Information</legend>
           <Grid >
      <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField 
        name={"funding_otp"} 
        label="OTP Sources" 
        type="Number"   
        description="Add OTP sources"
        onChange={handleInput}  
        icon={<IconCurrencyDollar  
        size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={4} md={4} lg={4}> <Form.FormField
          name={"funding_sportsCanada"}
          label="Sports Canada"
          type="Number"
          description="Add sports canda"
          onChange={handleInput}
          icon={<IconCurrencyDollar  size={18}/>}
        /></Grid.Col>
       <Grid.Col xs={12} sm={4} md={4} lg={4}><Form.FormField 
       name={"funding_nso"} 
       label="NSO" 
       type="Number" 
       description="Add NSO"
       onChange={handleInput}
       icon={<IconCurrencyDollar  size={18}/>} /></Grid.Col>
       <Grid.Col xs={12} sm={6} md={6} lg={6}> <Form.FormField
          name={"funding_other"}
          label="Other Sources"
          type="number"
          description="Add other source"
          icon={<IconCurrencyDollar  size={18}/>}
        /></Grid.Col>
       <Grid.Col xs={12} sm={6} md={6} lg={6}> <Form.FormField 
       name={"funding_total"} 
       label="Grand Total" 
       type="Number" 
       description="Total of all"
      //  value={totalValue}
       disabled icon={<IconCurrencyDollar  size={18}/>}/></Grid.Col>
        </Grid>
       </fieldset>
       <fieldset className="w-full my-2 rounded border-solid	border-gray-300 p-6">
          <legend className="text-gray-500 text-sm px-2">Percentage</legend>
           <Grid>
          <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormField name={"percent_aloc_senior"} label="Percent Aloc Senior" description="Add percent aloc senior" type="number" icon={<Percentage  size={18}/>} /></Grid.Col>
          <Grid.Col xs={12} sm={6} md={6} lg={6}><Form.FormField name={"percent_next_gen"}  label="Percent Next Gen" description="Add percent next gen" type="number" icon={<Percentage  size={18}/>  } /></Grid.Col>
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

