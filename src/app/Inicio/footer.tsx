import Image from "next/image"
import { Icon } from '@iconify/react';

export default function Footer(){

    return(
        <div className="flex justify-between items-center text-white bg-[#7A1381] p-10">
            <Image width={400} height={400} alt="" src="/img/LogoLema.png"/>
            <div className="">
                <div className="flex gap-2 items-center">
                <Icon icon={"material-symbols:mail-outline"}/>
                <p>minka.recreacion.cordoba@gmail.com</p>
                </div>
                <div className="flex gap-2 items-center">
                <Icon icon={"mdi:instagram"}/>
                <p>@minka.recreacion</p>
                <p>@fororecreacioncordoba</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2 items-center">
                    <Icon icon={"boxicons:location"}/>
                    <p>Facultad de Educación y Salud “Dr. Domingo Cabred”</p>
                </div>
                <iframe
                    title="Ubicación en el mapa"
                    src="https://maps.google.com/maps?q=Facultad%20de%20Educaci%C3%B3n%20y%20Salud%20Dr.%20Domingo%20Cabred%2C%20C%C3%B3rdoba&output=embed"
                    width="300"
                    height="150"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                />
            </div>
        </div>
    )
}