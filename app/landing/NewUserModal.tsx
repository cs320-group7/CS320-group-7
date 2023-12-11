import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Container } from "@mui/material";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const NewUserModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        className="element"
        color="primary"
        variant="outlined"
        onClick={handleOpen}
      >
        SIGN UP
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Container maxWidth="sm" className="App">
            <Typography variant="h4" component="div" gutterBottom>
              User Registration
            </Typography>
            <form>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Register
              </Button>
            </form>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};
