"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AsciiEffect } from "three-stdlib";
import type { Group } from "three";
import { cn } from "@/lib/cn";

export type AsciiSimulationProps = {
  modelPath?: string;
  className?: string;
  asciiChars?: string;
  invert?: boolean;
  fontSize?: string;
  lineHeight?: string;
  modelScale?: number;
  rotationSpeed?: number;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
};

function AsciiLayer({
  asciiChars,
  invert,
  fontSize,
  lineHeight,
  backgroundColor,
  textColor,
  fontFamily,
}: Required<
  Pick<
    AsciiSimulationProps,
    | "asciiChars"
    | "invert"
    | "fontSize"
    | "lineHeight"
    | "backgroundColor"
    | "textColor"
    | "fontFamily"
  >
>) {
  const { gl, scene, camera, size } = useThree();
  const effect = useMemo(() => {
    const next = new AsciiEffect(gl, asciiChars, {
      invert,
      resolution: 0.16,
    });
    const el = next.domElement;
    el.style.position = "absolute";
    el.style.inset = "0";
    el.style.top = "0";
    el.style.left = "0";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.pointerEvents = "none";
    el.style.userSelect = "none";
    el.style.margin = "0";
    el.style.overflow = "hidden";
    return next;
  }, [asciiChars, invert, gl]);

  useLayoutEffect(() => {
    const el = effect.domElement;
    el.style.color = textColor;
    el.style.backgroundColor = backgroundColor;
    el.style.fontSize = fontSize;
    el.style.lineHeight = lineHeight;
    el.style.fontFamily = fontFamily;
    el.style.letterSpacing = "0.02em";
  }, [effect, textColor, backgroundColor, fontSize, lineHeight, fontFamily]);

  useEffect(() => {
    const parent = gl.domElement.parentElement;
    if (!parent) return;
    gl.domElement.style.opacity = "0";
    parent.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = "1";
      if (effect.domElement.parentElement === parent) {
        parent.removeChild(effect.domElement);
      }
    };
  }, [effect, gl]);

  useEffect(() => {
    if (size.width < 2 || size.height < 2) return;
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  useFrame(() => {
    if (size.width < 2 || size.height < 2) return;
    effect.render(scene, camera);
  }, 1);

  return null;
}

function Rotator({
  speed,
  children,
}: {
  speed: number;
  children: ReactNode;
}) {
  const ref = useRef<Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += speed;
    ref.current.rotation.x += speed * 0.22;
  });
  return <group ref={ref}>{children}</group>;
}

function GltfModel({ path, scale }: { path: string; scale: number }) {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} scale={scale} />;
}

function PlanetModel({ scale }: { scale: number }) {
  return (
    <group scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshStandardMaterial color="#f4f1e8" flatShading />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.36, 1]} />
        <meshBasicMaterial color="#5db075" wireframe />
      </mesh>
      <mesh rotation={[1.15, 0.18, 0.08]}>
        <torusGeometry args={[2.02, 0.04, 8, 64]} />
        <meshBasicMaterial color="#c6e26a" />
      </mesh>
    </group>
  );
}

function Scene({
  modelPath,
  modelScale,
  rotationSpeed,
  enableZoom,
  enablePan,
  enableRotate,
  asciiChars,
  invert,
  fontSize,
  lineHeight,
  backgroundColor,
  textColor,
  fontFamily,
}: Required<Omit<AsciiSimulationProps, "className" | "modelPath">> & {
  modelPath?: string;
}) {
  const interactive = enableZoom || enablePan || enableRotate;

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3.2, 4.2, 5]} intensity={1.5} />
      <directionalLight position={[-3.5, -1.4, -2.4]} intensity={0.35} />
      <Rotator speed={rotationSpeed}>
        <Suspense fallback={<PlanetModel scale={modelScale} />}>
          {modelPath ? (
            <GltfModel path={modelPath} scale={modelScale} />
          ) : (
            <PlanetModel scale={modelScale} />
          )}
        </Suspense>
      </Rotator>
      {interactive ? (
        <OrbitControls
          enableZoom={enableZoom}
          enablePan={enablePan}
          enableRotate={enableRotate}
          enableDamping
        />
      ) : null}
      <AsciiLayer
        asciiChars={asciiChars}
        invert={invert}
        fontSize={fontSize}
        lineHeight={lineHeight}
        backgroundColor={backgroundColor}
        textColor={textColor}
        fontFamily={fontFamily}
      />
    </>
  );
}

export function AsciiSimulation({
  modelPath,
  className,
  asciiChars = " .:-+*=%@#",
  invert = false,
  fontSize = "6px",
  lineHeight = "6px",
  modelScale = 1,
  rotationSpeed = 0.002,
  backgroundColor = "#0e1a12",
  textColor = "#c6e26a",
  fontFamily = "var(--font-geist-mono), ui-monospace, monospace",
  enableZoom = false,
  enablePan = false,
  enableRotate = false,
}: AsciiSimulationProps) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "160px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      {visible ? (
        <Canvas
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
          camera={{ position: [0, 0.15, 5.1], fov: 42 }}
          frameloop="always"
          style={{ width: "100%", height: "100%" }}
        >
          <Scene
            modelPath={modelPath}
            modelScale={modelScale}
            rotationSpeed={rotationSpeed}
            enableZoom={enableZoom}
            enablePan={enablePan}
            enableRotate={enableRotate}
            asciiChars={asciiChars}
            invert={invert}
            fontSize={fontSize}
            lineHeight={lineHeight}
            backgroundColor={backgroundColor}
            textColor={textColor}
            fontFamily={fontFamily}
          />
        </Canvas>
      ) : null}
    </div>
  );
}

/** Themed Skiper 14 preset — lime ASCII on Hazel ink. */
export function Skiper14(props: AsciiSimulationProps) {
  return (
    <AsciiSimulation
      invert={false}
      backgroundColor="#0e1a12"
      textColor="#c6e26a"
      fontFamily="var(--font-geist-mono), ui-monospace, monospace"
      {...props}
    />
  );
}

export default AsciiSimulation;
