import { Button, Input } from "@mantine/core";
import { DataTableColumn, DataTable as MTable } from "mantine-datatable";
import React, { ChangeEvent, useState } from "react";

import { RenderIf } from "./RenderIf";

export type DataTableProps = {};

type User = {
  id: number;
  name: string;
  party: string;
  bornIn: number;
  isEditting: boolean;
};

type TableData<T extends { isEditting: boolean }> = {
  data: Array<T>;
  setData: React.Dispatch<React.SetStateAction<Array<T>>>;
};

const getColumns = ({ data, setData }: TableData<User>) => {
  const columns: Array<DataTableColumn<User>> = [
    {
      accessor: "id",
      title: "#",
      textAlignment: "right",
    },
    {
      accessor: "name",
      render: ({ isEditting, name, id }) => (
        <RenderIf isTrue={isEditting} Else={name}>
          <Input
            id={id.toString()}
            type={"text"}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const index = data.findIndex((row) => row.id === id);
              if (index !== -1) {
                const stateData = [...data];
                stateData[index].name = e.currentTarget.value;
                setData(stateData);
              }
            }}
            // onBlur={() => {
            //   const index = data.findIndex((row) => row.id === id);
            //   if (index !== -1) {
            //     const stateData = [...data];
            //     stateData[index].isEditting = false;
            //     setData(stateData);
            //   }
            // }}
          />
        </RenderIf>
      ),
    },
    {
      accessor: "party",

      render: ({ isEditting, party, id }) => (
        <RenderIf isTrue={isEditting} Else={party}>
          <Input
            id={id.toString()}
            type={"text"}
            value={party}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const index = data.findIndex((row) => row.id === id);
              if (index !== -1) {
                const stateData = [...data];
                stateData[index].party = e.currentTarget.value;
                setData(stateData);
              }
            }}
            // onBlur={() => {
            //   // const index = data.findIndex((row) => row.id === id);
            //   // if (index !== -1) {
            //   //   const stateData = [...data];
            //   //   stateData[index].isEditting = false;
            //   //   setData(stateData);
            //   // }
            // }}
          />
        </RenderIf>
      ),
    },
    { accessor: "bornIn" },
    {
      accessor: "controls",
      render: ({ id }) => {
        return (
          <div>
            <Button
              onClick={() => {
                setData(data.filter((row) => row.id !== id));
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                const index = data.findIndex((row) => row.id === id);
                if (index !== -1) {
                  const stateData = [...data];
                  stateData[index].isEditting = true;
                  setData(stateData);
                }
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];
  return columns;
};

export function DataTable() {
  const sampleData = [
    {
      id: 1,
      name: "Joe Biden",
      bornIn: 1942,
      party: "Democratic",
      isEditting: false,
    },
    {
      id: 2,
      name: "Zahid Hussain",
      bornIn: 1942,
      party: "Democratic",
      isEditting: false,
    },
    {
      id: 3,
      name: "Ayesha Zahid",
      bornIn: 1942,
      party: "Democratic",
      isEditting: false,
    },
    {
      id: 4,
      name: "Hello World",
      bornIn: 1942,
      party: "Democratic",
      isEditting: false,
    },
    {
      id: 5,
      name: "Emaan Zahid",
      bornIn: 1942,
      party: "Democratic",
      isEditting: false,
    },
  ];

  const [data, setData] = useState(sampleData);

  return (
    <MTable
      withBorder
      withColumnBorders
      striped
      highlightOnHover
      records={data}
      columns={getColumns({ data, setData })}
    />
  );
}
