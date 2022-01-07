import {
  createBasicElementPlugins,
  createBasicMarkPlugins,
  createEditorPlugins,
  createHistoryPlugin,
  createLinkPlugin,
  createReactPlugin,
  Plate,
  serializeHTMLFromNodes,
} from "@udecode/plate";
import { saveAs } from "file-saver";
import { asBlob } from "html-docx-js-typescript";
import { useState } from "react";
import { Button } from "reactstrap";

// let components = createPlateComponents({
//   // customize your components by plugin key
// });

// const options = createPlateOptions({
//   // customize your options by plugin key
// });

const plugins = [
  createReactPlugin(),
  createHistoryPlugin(),
  createLinkPlugin(),
  ...createBasicElementPlugins(),
  ...createBasicMarkPlugins(),
];

export const DocxExamplePage = () => {
  const [editorValue, setEditorValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const editor = createEditorPlugins();
  const [htmlValue, setHtmlValue] = useState(
    serializeHTMLFromNodes(editor, { plugins, nodes: editorValue }),
  );

  const handleChange = (newValue: any) => {
    setEditorValue(newValue);
    const htmlState =
      newValue &&
      serializeHTMLFromNodes(editor, { plugins, nodes: newValue });
    setHtmlValue(htmlState);
  };

  // const valueFromHtml = deserializeHTMLToDocumentFragment(editor, {
  //   plugins: plugins,
  //   element: htmlValue,
  // });

  const generateWordFile = async () => {
    const blob = await asBlob(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
    ${htmlValue}
    </body>
    </html>`);

    saveAs(blob as Blob, "file.docx"); // save as docx file
  };

  return (
    <div>
      <Plate
        id="text editor"
        plugins={plugins}
        // components={components}
        // options={options}
        editableProps={{
          placeholder: "Enter some rich text…",
          spellCheck: false,
        }}
        onChange={handleChange}
        initialValue={editorValue}
      />
      <Button onClick={generateWordFile} color="primary">
        Save
      </Button>
    </div>
  );
};
