import React from 'react'
import { useThree } from "@react-three/fiber"

//https://codesandbox.io/s/react-three-fiber-hud-water-fxaa-forked-4bjrc?file=/src/index.js

function printText(context, font, name, x, y) {
    context.font = font
    context.fillStyle = 'white'
    context.textBaseline = 'middle'
    context.fillText(name, x, y)
}

export default function Tag({ name, position }) {
    const textCanvas = React.useMemo(() => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const width = 125 * 20
        const height = 40 * 20

        canvas.width = width
        canvas.height = height
        context.scale(20, 20)

        context.fillStyle = "rgba(20, 20, 35, 0.75)"
        context.fillRect(0, 0, width, height)

        const fontSize = 10
        const font = ` ${fontSize}px Arial, sans-serif`
        printText(context, font, name, 5, 10)
        printText(context, font, "Country: Multinational ", 5, 20)
        printText(context, font, "Purpose: Scientific ", 5, 30)
        return canvas
    }, [name])

    const { viewport } = useThree()
    const width = 125 / viewport.factor
    const height = 40 / viewport.factor

    return (
        <mesh position={position} scale={[width, height, 1]} >
            <sprite >
                <spriteMaterial attach="material" >
                    <canvasTexture attach="map" image={textCanvas} />
                </spriteMaterial>
            </sprite>
        </mesh>
    )
}