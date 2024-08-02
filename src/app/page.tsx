"use client"
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { BoxGeometry, Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Model() {
  const gltf = useLoader(GLTFLoader, "/scene.gltf");

  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.scale.set(0.007, 0.007, 0.007);
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.traverse((object: Object3D) => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = 20;
        }
      });
    }
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}

export default function Home() {
  return (
    <div className="h-[100vh] w-[100vw]">
    <Canvas>
        <OrbitControls/>
        <Environment preset={"city"}/>
      <mesh>
        <Model/>
      </mesh>
    </Canvas>
    </div>
  );
}
