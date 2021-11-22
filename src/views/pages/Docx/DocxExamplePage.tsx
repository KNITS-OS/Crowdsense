import { AnyObject, Plate, TNode } from "@udecode/plate-core";
import { Document, HeadingLevel, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { Button } from "reactstrap";
import { useState } from "react";

const DocxExamplePage = () => {
  const [values, setValues] = useState<TNode<AnyObject>[]>([]);

  const paragraphs = values.map((value, index) => {
    return new Paragraph({
      text: value.children.text,
      heading: HeadingLevel.TITLE,
    });
  });
  console.log(values);

  const document = new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });
  const generateWordFile = async () => {
    // const doc = new Packer().createDoc(
    const blob = await Packer.toBlob(document);
    saveAs(blob, "new.docx");
  };

  return (
    <div>
      <Plate
        id="playground"
        editableProps={{ placeholder: "Type..." }}
        onChange={e => setValues(e)}
      ></Plate>
      <Button onClick={generateWordFile}>Generate</Button>
    </div>
  );
};
export default DocxExamplePage;
