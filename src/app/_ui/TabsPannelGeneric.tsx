import { Box, Tab, Tabs } from "@mui/material";
import React, { ReactNode } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <h1>{children}</h1>
        </Box>
      )}
    </div>
  );
}

function Props(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabsType {
  label: string;
  Component: ()=> JSX.Element;
}

function TabsPannelGeneric({ TabsPannel }: { TabsPannel: TabsType[] }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#527A01",
            },
          }}
        >
          {TabsPannel?.map(({ label }: any, index: number) => (
            <Tab
              className="!bg-white !text-color-primary-8"
              style={{
                backgroundColor: "red",
              }}
              label={<h1 className="!bg-white !text-color1-500">{label}</h1>}
              {...Props(index)}
            />
          ))}
        </Tabs>
      </Box>
      {TabsPannel?.map(({ Component }: any, index: number) => (
        <CustomTabPanel value={value} index={index}>
          <Component />
        </CustomTabPanel>
      ))}
    </>
  );
}

export default TabsPannelGeneric;
