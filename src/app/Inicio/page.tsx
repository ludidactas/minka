import Image from "next/image";
import LogoAnimado from "../custom/logo-animado";
import { ExpandingCircleMenu } from "@/components/expanding-circle-menu";
import { circleItems } from "./circle-items";

export default function Inicio() {
    return (
        <div className="flex items-center min-h-screen bg-[#F2E8D5]">
            <div className="flex flex-col gap-4 p-20">
                <Image className="self-center" width={480} height={480} src={"/img/Lema2.png"} alt={""} />
                <LogoAnimado className="self-center w-75"/>
            </div>

            <ExpandingCircleMenu items={circleItems} />
        </div>
    )
}