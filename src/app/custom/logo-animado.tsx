"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

/* ------------------------------------------------------------------
 * Logo animado de Tálamo Lab
 *
 * PIVOTES: no se usa `transform-origin` / `transform-box` (poco fiable
 * en SVG y roto por los matrix() anidados del archivo original). En su
 * lugar cada grupo animado va envuelto en translate(cx cy) → <motion.g>
 * → translate(-cx -cy), de modo que el centro real cae en (0,0) local.
 *
 * ATRIBUTO transform: ningún <motion.g> lleva `transform`, porque
 * Framer escribe `style.transform` y en SVG el CSS pisa al atributo.
 * ------------------------------------------------------------------ */

const PALETTE = {
  rojo: "rgb(234,72,49)",
  violeta: "rgb(122,19,129)",
  azul: "rgb(2,88,142)",
  amarillo: "rgb(251,196,2)",
  verde: "rgb(20,175,79)",
  aqua: "rgb(87,188,168)",
  naranja: "rgb(238,123,42)",
  blanco: "#ffffff",
  vino: "rgb(139,3,3)",
} as const;

type ColorName = keyof typeof PALETTE;

type Shape = {
  /** matrix() original del SVG, ya aplanada (sin grupos intermedios) */
  transform: string;
  fill: ColorName;
};

type PathShape = Shape & { d: string };
type CircleShape = Shape;

/** Centros reales, calculados desde el bounding box de cada grupo */
const ICON_CENTER = { x: 1672, y: 1884 } as const;
const RING_CENTER = { x: 1671, y: 1872 } as const;

const ICON_PATHS: PathShape[] = [
  { transform: "matrix(1.03738,0,0,1.03591,-62.7494,-67.2926)", fill: "rojo", d: "M1524.55,1872.44L1492.82,1826.54L1524.55,1726.63C1575.66,1713.94 1626.64,1694.77 1678.59,1726.63L1677.88,1873.93L1524.55,1872.44Z" },
  { transform: "matrix(1.03756,0,0,1,-63.0135,0)", fill: "violeta", d: "M1677.13,2029.04C1621.72,2057.78 1573.69,2039.93 1524.55,2029.04C1510.75,1979.21 1490.59,1930.49 1524.55,1872.44L1677.88,1873.93L1677.13,2029.04Z" },
  { transform: "matrix(1.03955,0,0,1.00907,-72.3567,-18.4808)", fill: "azul", d: "M1829.36,1875.4L1829.36,2029.04C1777.28,2034.93 1724.12,2045.58 1677.13,2029.04L1677.88,1873.93L1829.36,1875.4Z" },
  { transform: "matrix(1.04469,0,0,1.03556,-81.7504,-66.6805)", fill: "amarillo", d: "M1678.59,1726.63C1725.03,1671.92 1777.64,1705.63 1829.36,1726.63L1829.36,1875.4L1677.88,1873.93L1678.59,1726.63Z" },

  // Los cuatro siguientes venían anidados dentro de un grupo con
  // matrix(1,0,0,1,1074.83,-33.3795); acá ya está compuesta.
  { transform: "matrix(0.893556,0,0,0.893556,438.269,35.5078)", fill: "amarillo", d: "M1400.49,1890.28C1416.52,1848.74 1456.84,1819.24 1504.01,1819.24C1565.22,1819.24 1614.92,1868.93 1614.92,1930.15C1614.92,1976.56 1586.34,2016.36 1545.84,2032.88L1545.84,1982.47L1495.23,1982.47L1495.23,1939.35L1453.29,1939.35L1453.29,1890.28L1400.49,1890.28Z" },
  { transform: "matrix(0.893556,0,0,0.893556,216.12,260.0025)", fill: "violeta", d: "M1607.53,1970.01C1592.11,2014.31 1551.86,2042.06 1504.01,2041.06C1438.61,2039.69 1386.9,1996.3 1393.1,1930.15C1397.43,1883.93 1421.67,1843.94 1462.17,1827.41L1462.17,1877.82L1512.68,1877.82L1512.68,1918.37L1554.73,1918.37L1554.73,1970.01L1607.53,1970.01Z" },
  { transform: "matrix(0.893556,0,0,0.893556,438.269,260.0025)", fill: "azul", d: "M1545.84,1827.41C1586.34,1843.94 1613.97,1883.74 1614.92,1930.15C1616.2,1992.91 1566.56,2042.67 1504.01,2041.06C1456.86,2039.84 1416.52,2011.55 1400.49,1970.01L1453.29,1970.01L1453.29,1918.37L1495.23,1918.37L1495.23,1877.82L1545.84,1877.82L1545.84,1827.41Z" },
  { transform: "matrix(0.893556,0,0,0.893556,216.12,35.5078)", fill: "rojo", d: "M1466.57,2033.42C1426.06,2016.89 1393.1,1976.56 1393.1,1930.15C1393.1,1868.93 1442.79,1819.24 1504.01,1819.24C1551.17,1819.24 1591.5,1848.74 1607.53,1890.28L1554.73,1890.28L1554.73,1939.35L1512.68,1939.35L1512.68,1982.47L1462.17,1982.47L1466.57,2033.42Z" },

  // Aspas exteriores (mantis) — todas comparten la misma matriz
  { transform: "matrix(0.907969,0,0,0.907969,248.648,54.2834)", fill: "vino", d: "M1761.06,1793.42C1764.13,1796.1 1767.09,1799.01 1769.92,1802.18C1767.03,1799.2 1764.08,1796.28 1761.06,1793.42Z" },
  { transform: "matrix(0.907969,0,0,0.907969,248.648,54.2834)", fill: "vino", d: "M1362.63,1802.96C1364.6,1800.8 1366.67,1798.72 1368.83,1796.73C1366.73,1798.78 1364.66,1800.86 1362.63,1802.96Z" },
  { transform: "matrix(0.907969,0,0,0.907969,248.648,54.2834)", fill: "blanco", d: "M1350.1,2189.34C1337.05,2174.19 1325.33,2157.3 1315.23,2138.71C1251.8,2021.91 1280.47,1888.08 1362.63,1802.96C1323.24,1846.32 1320.71,1922.06 1383.46,1971.31C1393.72,1979.36 1401.28,1992.33 1399.36,2005.7C1396.89,2022.86 1390.9,2024.73 1368.13,2046.29C1340.57,2072.39 1315.06,2137.39 1350.1,2189.34Z" },
  { transform: "matrix(0.907969,0,0,0.907969,248.648,54.2834)", fill: "verde", d: "M1769.92,1802.18C1858.7,1893.77 1884.93,2042.07 1803.73,2162.28C1792.72,2178.59 1780.46,2193.29 1767.2,2206.38C1803.05,2170.58 1810.99,2108.82 1778.55,2064.89C1762.36,2042.97 1748.36,2034.09 1746.48,2032.71C1725.24,2017.04 1728.59,1986.83 1745.72,1973.13C1748.1,1971.24 1826.33,1920.1 1789.6,1834.89C1784.83,1823.82 1777.56,1810.74 1769.92,1802.18Z" },
  { transform: "matrix(0.907969,0,0,0.907969,248.648,54.2834)", fill: "naranja", d: "M1368.83,1796.73C1419.02,1747.8 1487.63,1716.51 1566.65,1716.51C1644.34,1716.51 1711.44,1746.47 1761.06,1793.42C1713.61,1752.16 1638.95,1768.39 1611.17,1800.86C1604.24,1808.96 1598.72,1818.22 1591.62,1826.18C1582.75,1836.1 1568.82,1836.56 1566.65,1836.35C1531.34,1833.05 1529.76,1786.98 1475.66,1773.39C1433.44,1762.79 1394.54,1773.13 1368.83,1796.73Z" },
  { transform: "matrix(0.907969,0,0,0.907969,248.648,54.2834)", fill: "aqua", d: "M1766.12,2207.44C1658.59,2312.47 1486.22,2313.14 1376.83,2216.43C1424.96,2249.61 1494.6,2236.55 1519.65,2207.57C1530.39,2195.15 1548.18,2164.45 1566.65,2165.31C1592.94,2166.53 1603.39,2217.24 1657.26,2231.28C1700.24,2242.48 1740.65,2232.04 1766.12,2207.44Z" },
  { transform: "matrix(0.907969,0,0,0.907969,248.648,54.2834)", fill: "vino", d: "M1376.83,2216.43C1366.78,2209.51 1357.67,2200.57 1350.1,2189.34C1358.49,2199.09 1367.43,2208.12 1376.83,2216.43Z" },
];

/**
 * Silueta central: en el SVG original NO es una forma pintada, es un
 * hueco recortado en las piezas de color (se ve el fondo detrás). Acá
 * se usa como <mask> (pintada en negro sobre un rect blanco) en vez de
 * dibujarla en blanco encima, para reproducir el recorte real.
 */
const ICON_CROSS_MASK: PathShape = {
  transform: "matrix(0.982941,0,0,0.979074,130.375,-88.109)",
  fill: "blanco",
  d: "M1415.61,2069.35L1415.61,1935.56L1461.53,1935.56L1461.53,1896.21L1499.75,1896.21L1499.75,1851.42L1633.54,1851.42L1633.54,1896.21L1671.67,1896.21L1671.67,1935.56L1717.68,1935.56L1717.68,2069.35L1671.67,2069.35L1671.67,2106.35L1633.54,2106.35L1633.54,2153.49L1499.75,2153.49L1499.75,2106.35L1461.53,2106.35L1461.53,2069.35L1415.61,2069.35Z",
};

/** Bounding box (en coordenadas crudas del ícono) que cubre holgadamente
 *  todas las piezas + aspas, para que la máscara nunca recorte de más. */
const ICON_MASK_BOUNDS = { x: 1150, y: 1500, width: 850, height: 900 } as const;

/** Los 8 círculos externos, en el orden original (8 → 1) */
const RING_CIRCLES: CircleShape[] = [
  { transform: "matrix(1.07323,0,0,1.07173,1703.57,-193.493)", fill: "verde" },
  { transform: "matrix(1.07323,0,0,1.07173,1363.92,144.064)", fill: "aqua" },
  { transform: "matrix(1.07323,0,0,1.07173,1363.92,-531.205)", fill: "naranja" },
  { transform: "matrix(1.07323,0,0,1.07173,1025.7,-193.493)", fill: "blanco" },
  { transform: "matrix(0.675296,0,0,0.674357,1256.24,359.399)", fill: "rojo" },
  { transform: "matrix(0.675296,0,0,0.674357,1701.31,359.399)", fill: "amarillo" },
  { transform: "matrix(0.675296,0,0,0.674357,1698.31,788.722)", fill: "azul" },
  { transform: "matrix(0.675296,0,0,0.674357,1262.24,795.722)", fill: "violeta" },
];

export interface TalamoLogoAnimadoProps {
  /** Clases Tailwind. Reemplaza el tamaño por defecto, no lo acumula. */
  className?: string;
  /** Duración del giro completo del anillo, en segundos */
  spinDuration?: number;
  /** Duración del rebote del ícono central, en segundos */
  bounceDuration?: number;
  /** Intensidad del rebote: 1 = normal, 0.5 = sutil, 2 = exagerado */
  bounceIntensity?: number;
  /** Texto accesible; si se omite el SVG queda como decorativo */
  label?: string;
}

export default function LogoAnimado({
  className = "h-40 w-40",
  spinDuration = 4,
  bounceDuration = 0.75,
  bounceIntensity = 1,
  label,
}: TalamoLogoAnimadoProps) {
  const maskId = useId();
  const [hovered, setHovered] = useState<boolean>(false);
  // Cada hover suma una vuelta: el giro siempre avanza hacia adelante y
  // aterriza exactamente en la posición original. Con rotate 360 ↔ 0 el
  // anillo desharía el giro al salir el mouse.
  const [turns, setTurns] = useState<number>(0);
  const reduceMotion = useReducedMotion();

  const handleEnter = (): void => {
    if (reduceMotion) return;
    setHovered(true);
    setTurns((t) => t + 1);
  };

  const k = bounceIntensity;
  const bounceKeyframes: number[] = [
    1,
    1 + 0.11 * k,
    1 - 0.05 * k,
    1 + 0.05 * k,
    1,
  ];

  return (
    <svg
      viewBox="0 0 803 798"
      xmlns="http://www.w3.org/2000/svg"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      className={`cursor-pointer overflow-visible select-none ${className}`}
    >
      {/* Superficie de hover: sin esto el evento solo se dispara sobre
          las formas pintadas y se corta al pasar entre los círculos. */}
      <rect x={0} y={0} width={803} height={798} className="fill-transparent" />

      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={ICON_MASK_BOUNDS.x}
          y={ICON_MASK_BOUNDS.y}
          width={ICON_MASK_BOUNDS.width}
          height={ICON_MASK_BOUNDS.height}
        >
          <rect
            x={ICON_MASK_BOUNDS.x}
            y={ICON_MASK_BOUNDS.y}
            width={ICON_MASK_BOUNDS.width}
            height={ICON_MASK_BOUNDS.height}
            fill="white"
          />
          <g transform={ICON_CROSS_MASK.transform}>
            <path d={ICON_CROSS_MASK.d} fill="black" />
          </g>
        </mask>
      </defs>

      <g transform="matrix(1,0,0,1,-6426.55,-4886.92)">
        <g transform="matrix(2.05176,0,0,1.86742,-3936.48,3327.65)">
          <g transform="matrix(0.487386,0,0,0.535498,4431.83,45.978)">

            {/* ---------- ÍCONO CENTRAL: rebote en hover ---------- */}
            <g transform={`translate(${ICON_CENTER.x} ${ICON_CENTER.y})`}>
              <motion.g
                animate={hovered ? { scale: bounceKeyframes } : { scale: 1 }}
                transition={{
                  duration: bounceDuration,
                  times: [0, 0.28, 0.52, 0.76, 1],
                  ease: "easeInOut",
                }}
              >
                <g transform={`translate(${-ICON_CENTER.x} ${-ICON_CENTER.y})`} mask={`url(#${maskId})`}>
                  {ICON_PATHS.map((shape, i) => (
                    <g key={`p-${i}`} transform={shape.transform}>
                      <path d={shape.d} fill={PALETTE[shape.fill]} />
                    </g>
                  ))}
                </g>
              </motion.g>
            </g>

            {/* ------ CÍRCULOS EXTERNOS: vuelta completa en hover ------ */}
            <g transform={`translate(${RING_CENTER.x} ${RING_CENTER.y})`}>
              <motion.g
                animate={{ rotate: turns * 360 }}
                transition={{ duration: spinDuration, ease: [0.65, 0, 0.35, 1] }}
              >
                <g transform={`translate(${-RING_CENTER.x} ${-RING_CENTER.y})`}>
                  {RING_CIRCLES.map((circle, i) => (
                    <g key={`c-${i}`} transform={circle.transform}>
                      <ellipse
                        cx={285.472}
                        cy={1927.66}
                        rx={56.938}
                        ry={56.28}
                        fill={PALETTE[circle.fill]}
                      />
                    </g>
                  ))}
                </g>
              </motion.g>
            </g>

          </g>
        </g>
      </g>
    </svg>
  );
}