import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { PageNavigation } from "@/utils/types";
import { Button, Stack, Typography } from "@mui/material";
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
  handleSubmit,
}: FinazlieDialogPageType) => {
  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack alignItems="center">
        <Typography variant="h5" textAlign="center" my={10}>
          Your Character is Ready!
        </Typography>
        <Button variant="contained" onClick={handleSubmit} sx={{ width: 150 }}>
          Submit
        </Button>
      </Stack>
    </CustomTabPanel>
  );
};

export default FinalizeDialogPage;
