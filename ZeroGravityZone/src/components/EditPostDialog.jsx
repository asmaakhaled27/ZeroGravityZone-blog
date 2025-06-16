import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditPostDialog = ({ open, onClose, postData, onChange, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => onChange({ ...postData, title: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={postData.content}
          onChange={(e) => onChange({ ...postData, content: e.target.value })}
        />
        <TextField
                    margin="normal"
                    fullWidth
                    label="Image URL (Optional)"
                    value={postData.image}
                    onChange={(e) => onChange({ ...postData, image: e.target.value })}
                    sx={{ mb: 2 }}
                  />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
