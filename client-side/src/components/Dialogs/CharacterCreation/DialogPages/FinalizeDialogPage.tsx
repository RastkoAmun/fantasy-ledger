import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { PageNavigation } from "@/utils/types";
import { Box, Button } from "@mui/material";
import React from "react";

type FinazlieDialogPageType = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  handleSubmit: () => void;
};

const FinalizeDialogPage = ({
  value,
  tabNumber,
  handleSubmit
}: FinazlieDialogPageType) => {
  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Box>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </CustomTabPanel>
  );
};

export default FinalizeDialogPage;
