"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GeometriesList, MaterialsList, SoundEffectsList } from "./assets";

export function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="park" />
          {/* OPTIONS: apartment, city, dawn, forest, lobby, night, park, studio, sunset, warehouse */}
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  return GeometriesList.map(({ position, rate, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      soundEffects={SoundEffectsList}
      materials={MaterialsList}
      rate={rate}
    />
  ));
}

function Geometry({ rate, position, geometry, materials, soundEffects }) {
  const ref = useRef();
  const [visible, setVisible] = useState(true);
  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  const playRandomSound = () => {
    const randomIndex = Math.floor(
      gsap.utils.random(0, soundEffects.length - 1)
    );
    const selectedSound = soundEffects[randomIndex];
    selectedSound.play();
  };

  function handleClick(e) {
    const mesh = e.object;
    playRandomSound();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(-2, 2)}`,
      y: `+=${gsap.utils.random(-2, 2)}`,
      z: `+=${gsap.utils.random(-2, 2)}`,
      yoyo: true,
      duration: 1.3,
      ease: "elastic.out(1, 0.3)",
    });

    mesh.material = getRandomMaterial();
  }

  const handleHover = () => {
    document.body.style.cursor = "pointer";
  };
  const handleHoverOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(ref.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1,0.3)",
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={ref}>
      <Float
        speed={5 * rate}
        rotationIntensity={6 * rate}
        floatIntensity={5 * rate}
      >
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handleHover}
          onPointerOut={handleHoverOut}
          material={startingMaterial}
          visible={visible}
        ></mesh>
      </Float>
    </group>
  );
}
