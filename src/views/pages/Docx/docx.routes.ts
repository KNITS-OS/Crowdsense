import { DocxExamplePage } from ".";
import { IRoute } from "types/types";

export const docxMenu: IRoute[] = [
  {
    collapse: true,
    name: "Docx & Slate",
    icon: "ni ni-chart-pie-35 text-primary",
    state: "docxCollapse",
    views: [
      {
        path: "/docx",
        name: "Docx",
        miniName: "DO",
        component: DocxExamplePage,
        layout: "/admin",
      },
    ],
  },
];
