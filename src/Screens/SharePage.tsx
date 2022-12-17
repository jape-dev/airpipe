import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Canvas } from "../Components/Canvas";
import "./Screen.css";
import "../App.css";

export interface SharePageState {
  completion: string;
}

export const SharePage = () => {
  const location = useLocation();
  const state = location.state as SharePageState;
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} sx={{ p: 5 }}>
        <Canvas code={state.completion} />
      </Grid>
      <p>Insert watermark here</p>
    </Grid>
  );
};
