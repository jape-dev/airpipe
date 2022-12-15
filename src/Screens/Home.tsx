import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { DefaultService } from "../vizoApi";
import { Canvas } from "../Components/Canvas";
import "./Screen.css";
import "../App.css";

export const Home = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [completion, setCompletion] = useState<string>("");

  const handleSubmit = () => {
    DefaultService.codexCodexGet(prompt, completion)
      .then((res) => {
        setCompletion(res.completion);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={8} sx={{ m: 5 }}>
          <Canvas code={completion} />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <input
                className="userInput"
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                placeholder="Provide instructions..."
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                className="required"
                sx={{ mt: "3vh", height: "8vh" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" sx={{ height: "100vh" }} />
      </Grid>
    </div>
  );
};
