import Image from "next/image";

export default function Inicio() {
    return (
        <div className="flex items-center min-h-screen bg-[#EE7B2A]">
            <div className="flex flex-col gap-4 p-20">
                <Image className="self-center" width={600} height={600} src={"/img/Lema.png"} alt={""} />
                <Image className="self-center" width={300} height={300} src={"/img/Logo.png"} alt={""} />
            </div>
        </div>
    )
}