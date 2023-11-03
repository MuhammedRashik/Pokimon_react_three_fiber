import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, Text, useTexture } from "@react-three/drei";
import * as THREE from 'three'
import { Ninja } from "./Ninja";
import { Ghost } from "./Ghost_Skull";
import { Wizard } from "./Wizard";
import { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
export const Experience = () => {

  const [active,setActive]=useState(null)


  return (
    <>
    <ambientLight intensity={0.5}/>
    <Environment preset="sunset"/>
      <OrbitControls />
    <MonsterStage texture={'/textures/Radiant_Painting_equirectangular-jpg_water_world_1781255653_9269204.jpg'}name="WIZARD" color="#74a157" active={active} setActive={setActive} >
   
     <Wizard scale={0.6} position-y={-1}/>
    </MonsterStage>



    <MonsterStage texture={'/textures/Realism_equirectangular-jpg_water_world_1316249493_9269226.jpg'} position-x={-2.5} rotation-y={Math.PI  / 8} name="NINJA" color="#050505" active={active} setActive={setActive}>
    <Ninja scale={0.6} position-y={-1}/>
    </MonsterStage>



    <MonsterStage texture={'/textures/Sky_Dome_equirectangular-jpg_my_wolrd_2013716406_9269184.jpg'} position-x={2.5} rotation-y={-Math.PI  / 8} name="GHOST" color="#17071b" active={active} setActive={setActive}>
    <Ghost  scale={0.6} position-y={-1}/>
    </MonsterStage>

     
    </>
  );
};



const MonsterStage =({children,texture,name,color,active,setActive,...props})=>{
  const map=useTexture(texture)

  const portalMaterial=useRef();

  useFrame(()=>{

  })


  return ( <group{...props}>

    <Text font={'fonts/Caprasimo/Caprasimo-Regular.ttf'} fontSize={0.3} position={[0,-1.3,0.051]} anchorY={"bottom"}>
    {name}
    <meshBasicMaterial color={color} toneMapped={false}/>
    </Text>
    <RoundedBox args={[2,3,0.1]} onDoubleClick={()=> setActive(active === name ? null : name )}>
      
    <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
    <ambientLight intensity={0.5}/>
    <Environment preset="sunset"/>
   {children}
  <mesh>
   <sphereGeometry args={[5,64,64]} />
    <meshStandardMaterial map={map} side={THREE.BackSide} />
  </mesh>
    </MeshPortalMaterial>

    </RoundedBox>

    </group>)
}