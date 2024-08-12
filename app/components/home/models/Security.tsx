"use client";
import {
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
  OrthographicCamera
} from "@react-three/drei";
import { Canvas, RootState, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const SecurityWoman = () => {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/vennesa.glb");
  const { actions, names } = useAnimations(animations, group);
  const [scale, setScale] = useState([420.0, 420.0, 420.0]);
  const [positionx, setPositionX] = useState(50);
  const [positiony, setPositionY] = useState(20);
  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth >= 700) {
        setScale([200.0, 200.0, 200.0]);
        setPositionX(260);
        setPositionY(-180);
      } else if (window.innerWidth >= 400) {
        setScale([50.0, 50.0, 50.0]);
        setPositionX(260);
        setPositionY(300);
      } else {
        setScale([50.0, 50.0, 50.0]);
        setPositionX(260);
        setPositionY(300);
      }
    };

    window.addEventListener("resize", updateScale);
    updateScale();
    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);
  useEffect(() => {
    if (actions && names.length > 0) {
      const action = actions[names[0]];
      action.clampWhenFinished = true;
      action.play();
    }
  }, [actions, names]);

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={scale}
        position-y={positiony}
        position-x={10}
        rotation-x={6.5}
        rotation-y={3}
      />
    </group>
  );
};

const Security = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  return (
    <div className="h-96">
      <Canvas camera={{ position: [0, 1, 31] }} shadows dpr={[2, 2]}>
        <ambientLight intensity={1.3} />
        <directionalLight
          intensity={2}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
        />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.1, 0]}
          receiveShadow
        >
          <meshPhongMaterial
            attach="material"
            color="#f44fdc"
            side={THREE.DoubleSide}
          />
        </mesh>
        <OrthographicCamera makeDefault zoom={1} position={[100, 200, -700]} />
        <OrbitControls minZoom={1} maxZoom={5} enabled={!isDragging} />
        <SecurityWoman setIsDragging={setIsDragging} floorPlane={floorPlane} />
      </Canvas>
    </div>
  );
};

export default Security;
