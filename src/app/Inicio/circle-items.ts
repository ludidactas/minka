import fs from "fs";
import path from "path";
import type { CircleMenuItem } from "@/components/expanding-circle-menu";

const contentDir = path.join(process.cwd(), "src/app/Inicio/content");

function readContent(fileName: string): string {
  return fs.readFileSync(path.join(contentDir, fileName), "utf8").trim();
}

export const circleItems: CircleMenuItem[] = [
  {
    id: "que-es-minka",
    image: "/img/1.jpg",
    label: "¿Qué es Minka?",
    color: "#7A1381",
    position: "top-[21%] left-1/2",
    circleClassName: "border-4 border-amber-200",
    content: readContent("que-es-minka.mdx"),
  },
  {
    id: "marco-teorico",
    image: "/img/2.jpg",
    label: "Marco teórico",
    color: "#02588E",
    position: "top-1/2 left-[21%]",
    content: readContent("marco-teorico.mdx"),
  },
  {
    id: "inscribe-tu-propuesta",
    image: "/img/3.jpg",
    label: "Inscribe tu propuesta",
    color: "#EE7B2A",
    position: "top-1/2 left-[79%]",
    textSize: "text-2xl",
    content: readContent("inscribe-tu-propuesta.mdx"),
  },
  {
    id: "registros",
    image: "/img/4.png",
    label: "Registros",
    color: "#57BCA8",
    position: "top-[79%] left-1/2",
    content: readContent("registros.mdx"),
  },
];
