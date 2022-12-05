import { Button, MantineProvider, Paper } from "@mantine/core";
import { IconGrowth } from "@tabler/icons";
import { useState } from "react";
import "./App.css";
import { AItem, MainAccordian } from "./components/acordian/acordian";
import { ProgramAcordian, ProgramItem } from "./components/acordian/ProgramAcordian";
import { Table } from "./components/DataTable/DataTable2";

// designed data
const FormData=[
{
  id :"1",
  prgramTitle: "Performance",
  programSubTitle: "Performance Sciences Research and Innovation Funding to NSO",
  Icon: <IconGrowth color="orange" />,
  message: "Total: $60,000",
  active: true,
  program:[
    {
      id :"1",
      prgramTitle: "Traning 2024",
      label:"Traning 2024",
      link: "...",
      order: 1,
      active: true,
      tableData:[{
       id: 1,
      program_description: "Training(2026)",
      sport_discipline_id:"ahmad",
      comments: "This is required for training camps 2026",
 
      first_name: "Ahmad", // drop down
      last_name: "Iftikhar",// drop down
      name: "Ahmad Iftikhar",// full name
      email: "ahmadiftikhar@gmail.com", //  automatically
      position: "SE", // automatically

      psri_service: "tech",
      time_request: "foundry",
      time_request_days: "2022",

      funding_otp: "40000",
      funding_sportsCanada: "23000",
      funding_nso: "45000",
      funding_other: "60000",
      funding_total: "100000",
      
      percent_aloc_senior: 100, // 0 - 100
      percent_next_gen: 100,
    },{
       id: 2,
      program_description: "Training(2024)",
      sport_discipline_id:"ahmad",
      comments: "This is required for training camps 2024",

      first_name: "Ahmad", // drop down
      last_name: "Iftikhar",// drop down
      name: "Ahmad Iftikhar",// full name
      email: "ahmadiftikhar@gmail.com", //  automatically
      position: "SE", // automatically

      psri_service: "tech",
      time_request: "foundry",
      time_request_days: "2022",

      funding_otp: "40000",
      funding_sportsCanada: "23000",
      funding_nso: "45000",
      funding_other: "60000",
      funding_total: "100000",
      
      percent_aloc_senior: 100, // 0 - 100
      percent_next_gen: 100,
    }
  ]
    }
  ],
}
]
function App() { 
  const [activeBlock, setActiveBlock] = useState<Array<string>>([]);

  // Function that returns inner accordian table Data
  function getTable (): Array<ProgramItem>{
    const [getFormAcordianData]=FormData?.map((item)=>{
    const FormAcordian=item?.program?.map((value)=>{
      const TableData=value?.tableData?.map((data)=>data)
        return {
          id:value?.id,
          label:value?.prgramTitle,
          active:value?.active,
          message:value?.link,
          panel:(
              <div className="flex-1">
              <Table tableData={TableData}/>
              </div>
          )}
      })
      return FormAcordian;
    })
    return getFormAcordianData;
  }

  // Function that returns Main accordian with inner accordian
  function getAItems(): Array<AItem>{
    const getitem=FormData.map((item) => {
      const label=item?.programSubTitle?.split(' ')?.at(0) || " ";
      // console.log(label);
    return {
     id:item.id,
     title:item.programSubTitle,
     label:label,
      active:item.active,
      Icon:item.Icon,
      message:item.message,
      panel: (
       <ProgramAcordian
       data={getTable()}
       value={activeBlock}
       onChange={setActiveBlock}
       />
      )}})
    return getitem;
  }
  

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <header>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex items-start justify-center p-10">
            <Paper shadow={"lg"} withBorder className="w-full">
              <Button
                className="m-4 align-middle"
                type="submit"
                color={"orange"}
                onClick={() => {
                  if (activeBlock.length > 0) {
                    setActiveBlock([]);
                  } else setActiveBlock(FormData.map((item) => item.prgramTitle));
                }}
              >
                Expand All
              </Button>
              <MainAccordian
                data={getAItems()}
                value={activeBlock}
                onChange={setActiveBlock}
              />
            </Paper>
          </div>
        </form>
      </header>
    </MantineProvider>
  );
}

export default App;
