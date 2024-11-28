import PropTypes from 'prop-types';

import {
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import Iconify from 'src/components/iconify';

export default function ActivityTableToolbar({ filterName, onFilterName }) {
  return (
    <Toolbar
      sx={{
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder="Search activities..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 14, height: 14 }}
            />
          </InputAdornment>
        }
        sx={{
          height: 30, // Adjusts the height of the search box
          fontSize: 14, // Adjusts font size within the input
          width: 180, // Adjusts the width of the search box
          padding: 0, // Reduces padding inside the input for a tighter appearance
        }}
      />

      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}



ActivityTableToolbar.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
};
