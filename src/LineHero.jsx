import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { easing } from 'maath'
// import { useControls } from 'leva'
import { Perf } from "r3f-perf";


extend({ MeshLineGeometry, MeshLineMaterial })

export default function LineHero() {
  const { dash, count, radius }= ({
    dash: Math.round(((Math.random() * 0.7) + 0.4) * 10) / 10, 
    count: 30,
    radius: 50,
  })
  return (

    <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
      {/* <color attach="background" args={['#242424']} /> */}
      <Lines dash={dash} count={count} radius={radius} colors={[[10, 0.5, 2], [1, 2, 10], "#ff8c00", "#008080", "#800080", "#008000", "#ffa500"
]} />
      <Perf position="bottom-left" />

      <Rig />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0} radius={0.1} />
      </EffectComposer>
    </Canvas>
  )
}
//base spiral line

// function Lines({ dash, count, colors, radius = 50 }) {
//   const lines = useMemo(() => {
//     const Z_INCREMENT = 0.08
//     const ANGLE_INCREMENT = 0.025
//     const RADIUS_INCREMENT = 0.05

//     return Array.from({ length: count }, (_, index) => {
//       const points = []
//       let z = 0
//       let radiusStart = Math.random() > 0.8 ? 0.9 : 0.3
//       let angle = Math.random() * Math.PI * 2

//       while (z < radius) {
//         const x = Math.cos(angle) * radiusStart
//         const y = Math.sin(angle) * radiusStart

//         points.push(x, y, z)

//         z += Z_INCREMENT
//         angle += ANGLE_INCREMENT
//         radiusStart += RADIUS_INCREMENT
//       }

//       return {
//         color: colors[parseInt(colors.length * Math.random())],
//         width: Math.max(radius / 500, (radius / 250) * Math.random()),
//         speed: Math.max(0.1, 1 * Math.random()),
//         curve: points
//       }
//     })
//   }, [colors, count, radius])

//   return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />)
// }

// Zigzag Lines Pattern --- kinda good spiral but not special

// function Lines({ dash, count, colors, radius = 50 }) {
//   const lines = useMemo(() => {
//     const Z_INCREMENT = 0.08;
//     const ANGLE_INCREMENT = 0.1; // Increase the angle increment for more prominent zigzag
//     const RADIUS_INCREMENT = 0.15; // Increase the radius increment for a larger zigzag pattern

//     return Array.from({ length: count }, (_, index) => {
//       const points = [];
//       let z = 0;
//       let radiusStart = Math.random() > 0.8 ? 0.9 : 0.3;
//       let angle = Math.random() * Math.PI * 2;

//       while (z < radius) {
//         const x = Math.cos(angle) * radiusStart;
//         const y = Math.sin(angle) * radiusStart;

//         points.push(x, y, z);

//         z += Z_INCREMENT;
//         angle += ANGLE_INCREMENT;
//         radiusStart += RADIUS_INCREMENT;
//       }

//       return {
//         color: colors[parseInt(colors.length * Math.random())],
//         width: Math.max(radius / 500, (radius / 250) * Math.random()),
//         speed: Math.max(0.1, 1 * Math.random()),
//         curve: points,
//       };
//     });
//   }, [colors, count, radius]);

//   return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />);
// }


// Lissajous Curve Pattern  ------ unique but not good
// function Lines({ dash, count, colors, radius = 25 }) {
//   const lines = useMemo(() => {
//     const Z_INCREMENT = 0.08;
//     const ANGLE_INCREMENT_X = 0.1;
//     const ANGLE_INCREMENT_Y = 0.15;
//     const RADIUS_INCREMENT_X = 0.1;
//     const RADIUS_INCREMENT_Y = 0.1;

//     return Array.from({ length: count }, (_, index) => {
//       const points = [];
//       let z = 0;
//       let radiusStartX = Math.random() > 0.5 ? 0.9 : 0.3;
//       let radiusStartY = Math.random() > 0.5 ? 0.9 : 0.3;
//       let angleX = Math.random() * Math.PI * 2;
//       let angleY = Math.random() * Math.PI * 2;

//       while (z < radius) {
//         const x = Math.cos(angleX) * radiusStartX;
//         const y = Math.sin(angleY) * radiusStartY;

//         points.push(x, y, z);

//         z += Z_INCREMENT;
//         angleX += ANGLE_INCREMENT_X;
//         angleY += ANGLE_INCREMENT_Y;
//         radiusStartX += RADIUS_INCREMENT_X;
//         radiusStartY += RADIUS_INCREMENT_Y;
//       }

//       return {
//         color: colors[parseInt(colors.length * Math.random())],
//         width: Math.max(radius / 500, (radius / 250) * Math.random()),
//         speed: Math.max(0.1, 1 * Math.random()),
//         curve: points,
//       };
//     });
//   }, [colors, count, radius]);

//   return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />);
// }

// // Galactic Patterns ------- 2nd best
// // This pattern aims to simulate galactic or nebula-like appearances by adjusting the radius and angle increments randomly.

// function Lines({ dash, count, colors, radius = 50 }) {
//   const lines = useMemo(() => {
//     const Z_INCREMENT = 0.08;

//     return Array.from({ length: count }, (_, index) => {
//       const points = [];
//       let z = 0;
//       let radiusStart = Math.random() > 0.5 ? 0.9 : 0.3;
//       let angle = Math.random() * Math.PI * 2;

//       while (z < radius) {
//         const x = Math.cos(angle) * radiusStart;
//         const y = Math.sin(angle) * radiusStart;

//         points.push(x, y, z);

//         z += Z_INCREMENT;
//         radiusStart += Math.random() * 0.9; // Randomize radius increment for variation
//         angle += Math.random() * 0.05; // Randomize angle increment for variation
//       }

//       return {
//         color: colors[parseInt(colors.length * Math.random())],
//         width: Math.max(radius / 500, (radius / 250) * Math.random()),
//         speed: Math.max(0.1, 1 * Math.random()),
//         curve: points,
//       };
//     });
//   }, [colors, count, radius]);

//   return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />);
// }

// // Generative Art Pattern ----- the best
// // This pattern focuses on generating abstract generative art by applying sinusoidal variations to the radius and angle increments.

function Lines({ dash, count, colors, radius = 5 }) {
  const lines = useMemo(() => {
    const Z_INCREMENT = 0.08;

    return Array.from({ length: count }, (_, index) => {
      const points = [];
      let z = 0;
      let radiusStart = Math.random() > 0.5 ? 0.9 : 0.3;
      let angle = Math.random() * Math.PI * 2;

      while (z < radius) {
        const x = Math.cos(angle) * radiusStart;
        const y = Math.sin(angle) * radiusStart;

        points.push(x, y, z);

        z += Z_INCREMENT;
        //exp = erratic
        //tan = spherical erratic
        radiusStart += Math.exp(Math.random() * Math.PI) * 0.1; // Vary radius increment sinusoidally
        angle += Math.cos(Math.random() * Math.PI) * 0.2; // Vary angle increment cosinusoidally
      }

      return {
        color: colors[parseInt(colors.length * Math.random())],
        width: Math.max(radius / 500, (radius / 250) * Math.random()),
        speed: Math.max(0.1, 1 * Math.random()),
        curve: points,
      };
    });
  }, [colors, count, radius]);

  return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />);
}

// Celestial Spiral Pattern ---- not special
// This pattern creates a spiral effect resembling celestial bodies using sine and cosine functions.
// function Lines({ dash, count, colors, radius = 50 }) {
//   const lines = useMemo(() => {
//     const Z_INCREMENT = 0.08;
//     const SPIRAL_FACTOR = 0.005; // Adjust the factor for the spiral effect

//     return Array.from({ length: count }, (_, index) => {
//       const points = [];
//       let z = 0;
//       let angle = index * Math.PI * 2;
//       let radiusStart = Math.random() > 0.8 ? 0.9 : 0.3; // Adjust the starting radius

//       while (z < radius) {
//         const x = Math.sin(angle) * radiusStart;
//         const y = Math.cos(angle) * radiusStart;
//         const spiral = Math.sin(angle) * SPIRAL_FACTOR; // Apply a spiral factor

//         points.push(x + spiral, y + spiral, z);

//         z += Z_INCREMENT;
//         angle += 0.5; // Adjust the angle increment for variation
//         radiusStart += Math.random() * 0.9; // Increment radiusStart for controlled movement
//       }

//       return {
//         color: colors[parseInt(colors.length * Math.random())],
//         width: Math.max(radius / 500, (radius / 250) * Math.random()),
//         speed: Math.max(0.01, 0.05 * Math.random()), // Adjust speed for controlled movement
//         curve: points,
//       };
//     });
//   }, [colors, count, radius]);

//   return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />);
// }


function Fatline({ curve, width, color, speed, dash }) {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.material.dashOffset -= (delta * speed) / 20))

  return (
    <mesh ref={ref}>
      <meshLineGeometry points={curve} />
      <meshLineMaterial transparent lineWidth={width} color={color} depthWrite={false} dashArray={0.25} dashRatio={dash} toneMapped={false} />
    </mesh>
  )
}


function Rig({ radius = 20 }) {
  useFrame((state, dt) => {
    const multiplier = 0.2 // Adjust this value to control sensitivity

    // Reduce the impact of mouse movement directly
    const mouseX = -state.pointer.x * multiplier
    const mouseY = -state.pointer.y * multiplier

    easing.damp3(state.camera.position, [Math.sin(mouseX) * radius, Math.atan(mouseY) * radius, Math.cos(mouseX) * radius], 0.9, dt)

    state.camera.lookAt(0, 0, 0)
  })
}