// AddUserModal.tsx
import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface UserModalProps {
  open: boolean;
  handleClose: () => void;
}

interface FormData {
  name: string;
  address: string;
  pinCode: string;
  church: string;
  years: string;
  gender: string;
}

const UserModal: React.FC<UserModalProps> = ({ open, handleClose }) => {
  const { handleSubmit, control, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Name" variant="outlined" />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Address" variant="outlined" />
              )}
            />
            <Controller
              name="pinCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Pin Code" variant="outlined" />
              )}
            />
            <Controller
              name="church"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl variant="outlined">
                  <InputLabel>Church</InputLabel>
                  <Select {...field} label="Church">
                    <MenuItem value="church1">Church 1</MenuItem>
                    <MenuItem value="church2">Church 2</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="years"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl variant="outlined">
                  <InputLabel>Years</InputLabel>
                  <Select {...field} label="Years">
                    <MenuItem value="1">1 Year</MenuItem>
                    <MenuItem value="2">2 Years</MenuItem>
                    <MenuItem value="3">3 Years</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="gender"
              control={control}
              defaultValue="male"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              )}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;
