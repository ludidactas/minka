import Footer from "./Inicio/footer";
import Inicio from "./Inicio/page";
import { WaveDivider } from "./custom/wave-divider";

export default function Home() {
  return (<>
   <div className="relative overflow-hidden">
     <WaveDivider color="#7A1381" edge="top" />
     <Inicio/>
     <WaveDivider color="#7A1381" edge="bottom" />
   </div>
   <Footer/>
   </>
  );
}
