// 3d earth model component
import React from 'react'
import {Canvas} from '@react-three/fiber'


export default function Earth() 
{
    return (
        <Canvas>
            <directionalLight color = {"white"} intensity = {1.5} position = {[0,10,0]}/>
            <mesh position = {[0,0,0]}>
                <sphereBufferGeometry attach = "geometry" args ={[2,32,16]}  />
                <ambientLight intensity={0.5} />
                <meshStandardMaterial
                    transparent
                    attach = "material" 
                    color = 'red'
                    roughness = {0.1}
                    metalness = {0.5}
                />
            </mesh>
        </Canvas>
    )
}
