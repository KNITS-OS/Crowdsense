import { saveAs } from "file-saver";
import { Document, HeadingLevel, Packer, Paragraph } from "docx";
import { Button } from "reactstrap";

const DocxExamplePage = () => {
  const document = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Hello World!",
            heading: HeadingLevel.TITLE,
          }),
        ],
      },
    ],
  });

  const generateWordFile = async () => {
    // const doc = new Packer().createDoc(
    const blob = await Packer.toBlob(document);
    saveAs(blob, "example.docx");
  };

  return (
    <div>
      <p>DocxExamplePage</p>
      <Button onClick={generateWordFile}>Generate</Button>
    </div>
  );
};
export default DocxExamplePage;
