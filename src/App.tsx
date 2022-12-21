import { Button, MantineProvider, Paper } from "@mantine/core";
import { IconGrowth } from "@tabler/icons";
import { useState } from "react";
import "./App.css";
import { AItem, MainAccordian } from "./components/acordian/acordian";
import { ProgramAcordian, ProgramItem } from "./components/acordian/ProgramAcordian";
import { Table } from "./components/DataTable/DataTable2";
import { NumberFormet } from "./components/DataTable/NumberFormet";
import { SummeryTable } from "./components/SummeryTable/Datatable";

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
      time_request_days: 2022,

      funding_otp: 40000,
      funding_sportsCanada: 23000,
      funding_nso: 45000,
      funding_other: 60000,
      funding_total: 300000,
      
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
      time_request_days: 2022,

      funding_otp: 40000,
      funding_sportsCanada: 23000,
      funding_nso: 45000,
      funding_other: 60000,
      funding_total: 100000,
      
      percent_aloc_senior: 100, // 0 - 100
      percent_next_gen: 100,
    }
  ]
    }
  ],
},{
  id :"2",
  prgramTitle: "NTP",
  programSubTitle: "National Team Program",
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
      time_request_days: 2022,

      funding_otp: 40000,
      funding_sportsCanada: 23000,
      funding_nso: 45000,
      funding_other: 60000,
      funding_total: 300000,
      
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
      time_request_days: 2022,

      funding_otp: 40000,
      funding_sportsCanada: 23000,
      funding_nso: 45000,
      funding_other: 60000,
      funding_total: 100000,
      
      percent_aloc_senior: 100, // 0 - 100
      percent_next_gen: 100,
    }
  ]
    }
  ],
}
]
// main data
const mainData=[
  {
    id :"1",
    sport_discipline_id: "671256",
    program: "PSRI",
    funding_otp: 30000,
    funding_sportsCanada: 23000,
    funding_nso: 45000,
    funding_other: 80000,
    funding_total: 100000,
  },
  {
    id :"2",
    sport_discipline_id: "234512",
    program: "NTP",
    funding_otp: 40000,
    funding_sportsCanada: 23000,
    funding_nso: 45000,
    funding_other: 60000,
    funding_total: 900000,
  },
  
]


function App() { 
  const [activeBlock, setActiveBlock] = useState<Array<string>>([]);
  const [activeSubBlock, setActiveSubBlock] = useState<Array<string>>([]);
  // Function that returns inner accordian table Data
  function getTable (): Array<ProgramItem>{
    const [getFormAcordianData]=FormData?.map((item)=>{
    const FormAcordian=item?.program?.map((value)=>{
      const TableData=value?.tableData?.map((data)=>data)
      // calculating total sum
      let sum=0;
      const total=TableData.map((item)=>sum+=Number(item.funding_total))
        return {
          id:value?.id,
          label:value?.prgramTitle,
          active:value?.active,
          message:NumberFormet(sum),
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
      // const label=item?.programSubTitle?.split(' ')?.at(0) || " ";
      // console.log(label);
    return {
     id:item.id,
     title:item.programSubTitle,
     label:item.programSubTitle,
      active:item.active,
      Icon:item.Icon,
      message:item.message,
      panel: (
       <ProgramAcordian
       data={getTable()}
       value={activeSubBlock}
       onChange={setActiveSubBlock}
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
                  } else {setActiveBlock(FormData.map((item) => { 
                    setActiveSubBlock(item.program.map((value)=> value.prgramTitle))
                    return item.programSubTitle} )) };
                }}
              >
                Expand All
              </Button>
              <SummeryTable tableData={mainData}/>
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
