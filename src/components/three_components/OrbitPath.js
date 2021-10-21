import React from 'react'
import * as THREE from "three"
import { Tube } from '@react-three/drei'
import { getPoints } from './Helpers'

export function OrbitPath({ position, radius, minutes }) {
    const path = React.useMemo(() => {
        class catCurve extends THREE.Curve {
            constructor(scale = 1) {
                super()
                this.scale = scale
            }

            getPoint(t) {
                let points = getPoints(minutes)
                points = points.map((point) => (new THREE.Vector3(point[0], point[1], point[2])))
                const curve = new THREE.CatmullRomCurve3(points)
                const p = curve.getPoint(t)
                return new THREE.Vector3(p.x, p.y, p.z).multiplyScalar(this.scale)
            }
        }
        return new catCurve()
    }, [minutes])
    return (
        //path, tubular_segments, radius, radial_segments, closed
        <Tube args={[path, 256, radius, 8, false]} position={position}>
            <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
        </Tube>
    )
}