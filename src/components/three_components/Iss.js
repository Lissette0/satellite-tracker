import React, { useRef } from 'react'
import iss from "./iss.glb"
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'


export default function ISS({ z, ellipseArgs, rate, scale }) {
    const ISSref = useRef()
    const data = useGLTF(iss)
    const ellipseCurvePoints = new THREE.EllipseCurve(...ellipseArgs)
    useFrame(({ clock }) => {
        let frame = clock.elapsedTime % rate
        let point = ellipseCurvePoints.getPointAt((frame / rate))
        ISSref.current.position.x = point.x
        ISSref.current.position.y = point.y
        ISSref.current.position.z = z
        ISSref.current.rotation.y = ISSref.current.rotation.x += 0.01
    })
    return (
        data ?
            <>
                <mesh ref={ISSref} scale={scale} >
                    <primitive object={data.scene} />
                </mesh>
            </> :
            <></>
    )
}