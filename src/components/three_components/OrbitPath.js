import React from 'react'
import { Tube } from '@react-three/drei'
import * as THREE from "three"
import { getPoints } from './Helpers'

export function OrbitPath({ position, radius, tle }) {
    const path = React.useMemo(() => {
        class catCurve extends THREE.Curve {
            getPoint(t) {
                const points = getPoints(95, tle)
                const curve = new THREE.CatmullRomCurve3(points)
                const p = curve.getPoint(t)
                return new THREE.Vector3(p.x, p.y, p.z)
            }
        }
        return new catCurve()
    }, [tle])

    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return (
        //path, tubular_segments, radius, radial_segments, closed

        <Tube args={[path, 256, radius, 8, false]} position={position}>
            <meshPhongMaterial attach="material" color={randomColor} wireframe />
        </Tube>

    )
}