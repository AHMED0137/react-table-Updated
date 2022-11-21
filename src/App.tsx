import { Button, MantineProvider, Paper } from "@mantine/core";
import { IconGrowth } from "@tabler/icons";
import { useState } from "react";
import "./App.css";
import { AItem, MainAccordian } from "./components/acordian/acordian";
import { Table, User } from "./components/DataTable/DataTable2";
import { TableOfContentsFloating } from "./components/DataTable/MenuList";

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
      programId: "Traning 2024",
      label:"Traning 2024",
      link: "",
      order: 1,
      tableData:[{
       id: 1,
      description: "Training(2024)",
      notes: "This is required for training camps 2024",
      otp: "40000",
      sportsCanada: "23000",
      nso: "45000",
      otherSources: "60000",
      total: "100000",
    },{
       id: 2,
      description: "Training(2026)",
      notes: "This is required for training camps 2024",
      otp: "40000",
      sportsCanada: "23000",
      nso: "45000",
      otherSources: "60000",
      total: "100000",
    }
  ]
    }, {
      programId: "Traning 2028",
      label:"Traning 2028",
      link: "",
      order: 1,
      tableData:[{
       id: 1,
      description: "Training(2028)",
      notes: "This is required for training camps 2024",
      otp: "40000",
      sportsCanada: "23000",
      nso: "45000",
      otherSources: "60000",
      total: "100000",
    },{
       id: 2,
      description: "Training(2028)",
      notes: "This is required for training camps 2024",
      otp: "40000",
      sportsCanada: "23000",
      nso: "45000",
      otherSources: "60000",
      total: "100000",
    }
  ]
    }
  ],
},
]
function App() { 
  const [activeBlock, setActiveBlock] = useState<Array<string>>([]);
    const [selectedProgram, setSelectedProgram] = useState<string>(" ");

// function to get program
const getProgram=(program:string)=>{
// console.log("app file"+program);
setSelectedProgram(program)
}

  function getAItems(): Array<AItem>{
    const getitem=FormData.map((item) => {
    const rowData:Array<User> =item.program.map((value)=>{
      const [myData]= value.tableData.map((data)=>{return {...data}})
      return myData;
    }) 
    return {
     id:item.id,
     title:item.programSubTitle,
     label:item.prgramTitle,
      active:item.active,
      Icon:item.Icon,
      message:item.message,
      panel: (
        <div className="flex flex-col bg-white xl:flex-row">
          <div className="p-4 pt-20">
            <TableOfContentsFloating links={item.program}  onProgramChange={getProgram}/>
          </div>
          <div className="flex-1">
            <Table tableData={rowData}/>
          </div>
        </div>)
      }
    }
    )
    return getitem;
  }
  

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <header>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submitted");
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