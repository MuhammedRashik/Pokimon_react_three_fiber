import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, RoundedBox, Text, useTexture,useCursor } from "@react-three/drei";
import * as THREE from 'three'
import { Ninja } from "./Ninja";
import { Ghost } from "./Ghost_Skull";
import { Wizard } from "./Wizard";
import { useEffect, useRef, useState } from "react";
import { useFrame,useThree } from "@react-three/fiber";
import { easing } from "maath";
export const Experience = () => {

  const [active,setActive]=useState(null)
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
 const controlsRef=useRef()
  const scene=useThree((state)=>state.scene)
  useEffect(()=>{
    if(active){
      const targetPosition= new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition)
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
        

      )
    }else{
      controlsRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
        true


      )
    }

  },[active])

  return (
    <>
    <ambientLight intensity={0.5}/>
    <Environment preset="sunset"/>
    <CameraControls ref={controlsRef} maxPolarAngle={Math.PI /2} minPolarAngle={Math.PI/6} />
    <MonsterStage texture={'/textures/Radiant_Painting_equirectangular-jpg_water_world_1781255653_9269204.jpg'}name="WIZARD" color="#74a157" active={active} setActive={setActive} hovered={hovered} setHovered={setHovered} >
   
     <Wizard scale={0.6} position-y={-1} hovered={hovered === "WIZARD"} />
     </MonsterStage>



    <MonsterStage texture={'/textures/Realism_equirectangular-jpg_water_world_1316249493_9269226.jpg'} position-x={-2.5} rotation-y={Math.PI  / 8} name="NINJA" color="#050505" active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
    <Ninja scale={0.6} position-y={-1} hovered={hovered==="NINJA"}/>
    </MonsterStage>



    <MonsterStage texture={'/textures/Sky_Dome_equirectangular-jpg_my_wolrd_2013716406_9269184.jpg'} position-x={2.5} rotation-y={-Math.PI  / 8} name="GHOST" color="#17071b" active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
    <Ghost  scale={0.6} position-y={-1} hovered={hovered==="GHOST"}/>
    </MonsterStage>

     
    </>
  );
};



const MonsterStage =({children,texture,name,color,active,setActive,hovered,setHovered,...props})=>{
  const map=useTexture(texture)

  const portalMaterial=useRef();



  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });


  return ( <group{...props}>

    <Text font={'fonts/Caprasimo/Caprasimo-Regular.ttf'} fontSize={0.3} position={[0,-1.3,0.051]} anchorY={"bottom"}>
    {name}
    <meshBasicMaterial color={color} toneMapped={false}/>
    </Text>
    <RoundedBox args={[2,3,0.1]} onDoubleClick={()=> setActive(active === name ? null : name )} name={name} onPointerEnter={()=>setHovered(name) } onPointerLeave={() => setHovered(null)}>
      
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