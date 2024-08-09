import {
  env,
  flood,
  merge,
  fractalNoise,
  spotlight,
  pointLight,
} from "hypercomp";
import { useControls } from "leva";
import { range } from "remeda";
import { useFilter } from "hypercomp/react";

export default function App() {
  const {
    freq,
    octaves,
    scale,
    width,
    radius,
    slope,
    intercept,
    lightX,
    lightY,
    lightZ,
  } = useControls({
    freq: { value: 0.01, min: 0, max: 1 },
    octaves: { value: 1, min: 0, max: 10, step: 1 },
    scale: { value: 17, min: 0, max: 100 },
    width: { value: 4, min: 0, max: 100 },
    radius: { value: 10, min: 0, max: 100 },
    slope: { value: 1.5, min: 0, max: 10 },
    intercept: { value: 0.1, min: 0, max: 1 },
    lightX: { value: -100, min: -100, max: 1000 },
    lightY: { value: -100, min: -100, max: 500 },
    lightZ: { value: 200, min: 0, max: 1000 },
  });

  const effects = env.source.merge(
    flood("#30597E", { opacity: 1 })
      .in(env.source.dilate(radius + width))
      .out(env.source.dilate(radius))
      .displace(fractalNoise(freq, { octaves }), scale)
  );
  // .componentTransfer({
  //   r: { type: "linear", slope, intercept },
  //   g: { type: "linear", slope: 1.5, intercept: 0.1 },
  //   b: { type: "linear", slope: 1.5, intercept: 0.1 },
  // })

  const withEdges = env.source
    .over(
      merge([
        // sobel
        env.source.convolve(
          // x direction
          [1, 0, -1, 2, 0, -2, 1, 0, -1]
        ),
        env.source.convolve(
          // y direction
          [1, 2, 1, 0, 0, 0, -1, -2, -1]
        ),
        // env.source.convolve(
        //   // x direction
        //   [-1, 0, 1, -2, 0, 2, -1, 0, 1]
        // ),
        // env.source.convolve(
        //   // y direction
        //   [-1, -2, -1, 0, 0, 0, 1, 2, 1]
        // ),
      ]).hueRotate(90)
    )
    .dilate(2)
    .shadow(2);

  const withLight = flood("black").screen(
    env.sourceAlpha
      .blur(1)
      .specular(pointLight({ x: lightX, y: lightY, z: lightZ }), {
        strength: 0.8,
        shininess: 20,
        color: "#20b2aa",
      })
  );

  const withSpotLight = flood("black").screen(
    env.sourceAlpha.blur(1).specular(
      spotlight({
        x: lightX,
        y: lightY,
        z: lightZ,
        pointsAtX: 100,
        pointsAtY: 50,
        pointsAtZ: 0,
        falloff: 10,
        angle: 30,
      }),
      {
        strength: 5,
        shininess: 20,
      }
    )
  );

  const funky = merge([
    ...range(0, 10)
      .map((v, i) =>
        flood("rgb(231, 34, 34)")
          .in(env.source)
          .offset({ dx: i * 5, dy: i * 5 })
          .hueRotate(i * 30)
      )
      .toReversed(),
    env.source,
  ]);

  return (
    <div
      style={{
        filter: useFilter(funky),
      }}
    >
      <div
        style={{
          fontSize: "100px",
          fontWeight: 900,
          color: "blue",
        }}
      >
        hello world
      </div>
    </div>
  );
}
