import React, { useState } from "react";
import { Box, Dialog, Tabs, Tab } from "@mui/material";
import CoreDialogPage from "./DialogPages/CoreDialogPage";

const tabLabels = {
  main: {
    core: "Core",
    class: "Class & Race",
    scores: "Ability Scores",
    features: "Features",
  },
  finish: "Finish",
};

const CharacterCreationDialog = () => {
  const [value, setValue] = useState(0);

  const pagesNavigation = {
    goNext: () => setValue(value + 1),
    goBack: () => setValue(value - 1),
  };

  return (
    <>
      <Dialog open={true} maxWidth={false}>
        <Box borderBottom={1}>
          <Tabs
            value={value}
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {Object.entries(tabLabels.main).map(([key, value], index) => (
              <Tab
                key={key}
                label={value}
                onClick={() => setValue(index)}
                sx={{
                  width: 155,
                  borderRight: 1,
                  "&.Mui-selected": {
                    backgroundColor: "teal",
                    color: "white",
                  },
                }}
              />
            ))}
            <Tab
              label={tabLabels.finish}
              onClick={() => setValue(4)}
              color="green"
              sx={{
                width: 180,
                "&.Mui-selected": {
                  backgroundColor: "teal",
                  color: "white",
                },
              }}
            />
          </Tabs>
        </Box>
        <CoreDialogPage value={value} pageNavigation={pagesNavigation} />
      </Dialog>
    </>
  );
};

export default CharacterCreationDialog;
