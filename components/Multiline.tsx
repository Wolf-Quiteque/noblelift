import { Fragment } from "react";

// Renders text that contains "\n" as separate lines joined with <br/>,
// reproducing the original markup's manual <br/> line breaks.
export default function Multiline({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
