import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fashion from './Fashion';
import Beauty from './Beauty';
import Jewellery from './Jewellery';

export default function ShowCart({ onBack }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabData = [
    { label: 'Fashion', content: <Fashion /> },
    { label: 'Jewellery', content: <Jewellery /> },
    { label: 'Beauty', content: <Beauty /> },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        m: 0,
        p: 2,
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
      }}
    >
      {onBack && (
        <IconButton onClick={onBack} aria-label="Back to menu">
          <ArrowBackIcon />
        </IconButton>
      )}
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="standard"
        aria-label="Shopping categories"
        sx={{
          width: 'fit-content',
          minWidth: 320,
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTabs-flexContainer': {
            justifyContent: 'flex-start',
          },
          '& .MuiTab-root': {
            minHeight: 48,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
          },
          '& .Mui-selected': {
            fontWeight: 700,
          },
        }}
      >
        {tabData.map((item, index) => (
          <Tab
            key={item.label}
            id={`shopping-tab-${index}`}
            aria-controls={`shopping-tabpanel-${index}`}
            label={item.label}
          />
        ))}
      </Tabs>
      <Box
        role="tabpanel"
        id={`shopping-tabpanel-${activeTab}`}
        aria-labelledby={`shopping-tab-${activeTab}`}
        sx={{ p: 2, minHeight: 100 }}
      >
        {tabData[activeTab].content}
      </Box>
    </Box>
  );
    }
