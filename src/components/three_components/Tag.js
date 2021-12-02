import React from 'react'
import { useThree } from "@react-three/fiber"

//https://codesandbox.io/s/react-three-fiber-hud-water-fxaa-forked-4bjrc?file=/src/index.js

function printText(context, font, name, x, y) {
    context.font = font
    context.fillStyle = 'white'
    context.textBaseline = 'middle'
    context.fillText(name, x, y)
}

function satellite_status_emoji(status) {
    switch (status) {
        case "Operational":
            return "🟢"
        case "Partially Operational":
            return "🟡"
        default:
            return "🔴"
    }
}

function shortenText(text) {
    if (text.length >= 15)
        return text.substring(0, 12) + "..."
    return text
}

export default function Tag({ text: { name, country, status }, position, tag_scale_factor }) {
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
        const font = `bold ${fontSize}px Arial, sans-serif`
        printText(context, font, `${shortenText(name)}  ${satellite_status_emoji(status)}`, 5, 10)
        printText(context, `bold ${fontSize}px Arial, sans-serif`, `Country: ${shortenText(country)}`, 5, 22)

        return canvas
    }, [name, country, status])

    const { viewport } = useThree()
    const width = 125 / viewport.factor
    const height = 40 / viewport.factor


    return (
        <mesh position={position} scale={[width * tag_scale_factor, height * tag_scale_factor, 1]}>
            <sprite>
                <spriteMaterial attach="material" depthTest={false} sizeAttenuation={false} >
                    <canvasTexture attach="map" image={textCanvas} />
                </spriteMaterial>
            </sprite>
        </mesh>
    )
}