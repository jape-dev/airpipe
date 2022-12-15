import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function OutlinedButtons() {
  return (
    <div>
      <TextField variant="outlined" sx={{ m: 1, height: "5vh" }} />
      <label htmlFor="outlined-button-file">
        <Button
          variant="outlined"
          component="span"
          sx={{ m: 1, height: "5vh" }}
        >
          Upload
        </Button>
      </label>
    </div>
  );
}
