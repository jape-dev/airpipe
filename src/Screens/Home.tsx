import { useState, useEffect } from "react";
import { RouterPath } from "../App";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { DefaultService } from "../vizoApi";
import { Canvas } from "../Components/Canvas";
import { CustomModal } from "../Components/CustomModal";
import { useNavigate } from "react-router-dom";
import "./Screen.css";
import "../App.css";
import { SharePageState } from "./SharePage";
import ReactDOMServer from "react-dom/server";

export const Home = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [completion, setCompletion] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [canvasHTML, setCanvasHTML] = useState<string>("");
  const navigate = useNavigate();

  const handleEmbedClick = () => {
    const canvas_html = ReactDOMServer.renderToString(
      <Canvas code={completion} />
    );
    setCanvasHTML(canvas_html);
    console.log(canvasHTML);
    setModal(true);
  };

  const handleURLClick = () => {
    console.log("redirct to another url with randomly generated id");
    const nextState: SharePageState = {
      completion: completion,
    };
    navigate(RouterPath.SHARE, { state: nextState });
  };

  const handleSubmit = () => {
    DefaultService.codexCodexGet(prompt, completion)
      .then((res) => {
        setCompletion(res.completion);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   console.log("re rendering canvas string");
  //   console.log(completion);
  //   const canvas_html = ReactDOMServer.renderToString(
  //     <Canvas code={completion} />
  //   );
  //   setCanvasHTML(canvas_html);
  //   console.log(canvasHTML);
  // }, [completion]);

  return (
    <div className="App">
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={8} sx={{ p: 5 }}>
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
        <Grid item xs={4} sx={{ p: 5 }}>
          <Button
            className="required"
            sx={{ mt: "3vh", height: "8vh" }}
            onClick={handleEmbedClick}
          >
            SHARE AS EMBED
          </Button>
          <Button
            className="required"
            sx={{ mt: "3vh", height: "8vh" }}
            onClick={handleURLClick}
          >
            SHARE AS URL
          </Button>
          <CustomModal parentshow={modal} setParentShow={setModal}>
            <>
              {canvasHTML}

              <Button className="multOpt" onClick={() => setModal(false)}>
                &#10006; Close
              </Button>
            </>
          </CustomModal>
        </Grid>
      </Grid>
    </div>
  );
};
