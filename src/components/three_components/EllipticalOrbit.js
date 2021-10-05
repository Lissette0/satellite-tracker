import React from 'react'
import * as THREE from "three"
import { Tube } from '@react-three/drei'

export default function EllipticalOrbit({ position, radius }) {
    const path = React.useMemo(() => {
        class ellipseCurve extends THREE.Curve {
            constructor(scale = 1) {
                super()
                this.scale = scale
            }
            getPoint(t) {
                //center_x, center_y, x_radius, y_radius, aStartAngle, aEndAngle, aClockwise, aRotation
                const curve = new THREE.EllipseCurve(0, 0, 2.5, 2.5, 0, 2 * Math.PI, false, 0)
                const p = curve.getPoint(t)
                return new THREE.Vector3(p.x, p.y, 0).multiplyScalar(this.scale)
            }
        }
        return new ellipseCurve()
    }, [])
    return (
        //path, tubular_segments, radius, radial_segments, closed
        <Tube args={[path, 64, radius, 8, false]} position={position}>
            <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
        </Tube>
    )
}