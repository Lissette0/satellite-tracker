import React from 'react'
import { useThree } from "@react-three/fiber"

//https://codesandbox.io/s/react-three-fiber-hud-water-fxaa-forked-4bjrc?file=/src/index.js
export default function Text({ name, scale }) {
    const textCanvas = React.useMemo(() => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const width = 250
        const height = 40
        canvas.style.position = 'absolute'
        canvas.style.top = 'calc(50% - 20px)'
        canvas.style.width = width + '250px'
        canvas.style.height = height + '40px'
        canvas.width = width * 20
        canvas.height = height * 20
        context.scale(20, 20)
        context.fillStyle = '#202035'
        context.fillRect(0, 0, width, height)
        const fontSize = 32
        context.font = `bold ${fontSize}px Arial, sans-serif`
        context.fillStyle = 'black'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        const x = width / 2
        const y = height / 2
        context.fillText(name, x, y)
        return canvas
    }, [name])

    const { viewport } = useThree()
    const width = 250 / viewport.factor
    const height = 40 / viewport.factor

    return (
        <mesh scale={scale}>
            <sprite scale={[width, height, 1]} position={[0, 40 / viewport.factor, 0]}>
                <spriteMaterial attach="material">
                    <canvasTexture attach="map" image={textCanvas} />
                </spriteMaterial>
            </sprite>
        </mesh>
    )
}