import { Button, TextareaAutosize } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Extractor() {
  const [state, setstate] = useState("");

  useEffect(() => {}, [state]);

  const extractornator = () => {
    const ampPatt = /&/g;
    const ltPatt = /</g;
    const gtPatt = />/g;

    let data = state;
    data = data.replaceAll(ampPatt, "&amp;");
    data = data.replaceAll(ltPatt, "&lt;");
    data = data.replaceAll(gtPatt, "&gt;");
    setstate(data);

    console.log(data);
  };
  return (
    <div>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="empty textarea"
        placeholder="Empty"
        value={state}
        rowsMin={10}
        rowsMax={10}
        onChange={(e) => {
          setstate(e.target.value);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          extractornator();
        }}
      >
        Extractinator
      </Button>
    </div>
  );
}
