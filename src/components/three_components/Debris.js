import React from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import debris from "./debris.glb";


export default function Debris() {

    const [model, setModel] = React.useState(null);

    React.useEffect(() => {
        new GLTFLoader().load(debris, setModel);
    }, []);
    console.log(model)

    return model ? (
        <>
            <mesh scale={[0.001, 0.001, 0.001]} position={[-10, 0, 0]}>
                <primitive object={model.scene} />
            </mesh>
        </>
    ) : (
        <></>
    );
}