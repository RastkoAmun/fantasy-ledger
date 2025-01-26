import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Box id={`ch-dialog-tabpanel-${index}`}>
      {value === index && (
        <Box height={300} p={3}>
          {children}
        </Box>
      )}
    </Box>
  );
}

export default CustomTabPanel;
