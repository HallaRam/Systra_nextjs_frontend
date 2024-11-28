import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Stack,
  Popover,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import SaveModal from 'src/components/save-modal';


export default function WbsTableRow({ row, selected, handleClick, onView, onEdit, onDelete, onSave,  templateName, templates }) {
  const [open, setOpen] = useState(null);
  const [saveModalOpen, setSaveModalOpen] = useState(false);


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSave = (templateData) => {
    onSave(row.wbsId, templateData);
    setSaveModalOpen(false);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox" sx={{ pl: 3 }}>
      <Checkbox disableRipple checked={selected} onChange={(event) => handleClick(event, row.wbsId)} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none" align="left" sx={{ pl: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {row.name}
          </Typography>
        </TableCell>

        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{templateName}</TableCell>

        <TableCell align="center">{row.activities.length}</TableCell>

        <TableCell align="center">
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton onClick={onView}>
              <Iconify icon="eva:external-link-fill" />
            </IconButton>
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 200 },
        }}
      >
        <MenuItem onClick={() => { onEdit(); handleCloseMenu(); }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => { setSaveModalOpen(true); handleCloseMenu(); }}>
          <Iconify icon="eva:save-fill" sx={{ mr: 2 }} />
          Make Template 
        </MenuItem>
        <MenuItem onClick={() => { onDelete(); handleCloseMenu(); }} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <SaveModal
        open={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSave}
        templates={templates}
      />
    </>
  );
}

WbsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  templateName: PropTypes.string,
  templates: PropTypes.array.isRequired,
};