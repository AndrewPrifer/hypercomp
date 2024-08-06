import {
  // blur,
  displace,
  env,
  filter,
  flood,
  merge,
  morph,
  css as css,
  turbulence,
  toEffects,
  image,
  fractalNoise,
  toFilter,
} from "../lib/main";
import { useControls } from "leva";

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
      .in(env.source.dilate({ r: radius + width }))
      .out(env.source.dilate({ r: radius }))
      .displace(fractalNoise({ freq, octaves }), {
        scale,
      })
  );
  // .componentTransfer({
  //   r: { type: "linear", slope, intercept },
  //   g: { type: "linear", slope: 1.5, intercept: 0.1 },
  //   b: { type: "linear", slope: 1.5, intercept: 0.1 },
  // })

  const withEdges = merge([
    env.source,
    // sobel
    env.source.convolve({
      // x direction
      kernel: [1, 0, -1, 2, 0, -2, 1, 0, -1],
    }),
    env.source.convolve({
      // y direction
      kernel: [1, 2, 1, 0, 0, 0, -1, -2, -1],
    }),
  ])
    .dilate({ r: 2 })
    .shadow({ color: "blue" });

  const withLight = flood("black").screen(
    env.sourceAlpha.blur({ r: 1 }).specularLight({
      strength: 4,
      shininess: 20,
      color: "#20b2aa",
      light: { type: "point", x: lightX, y: lightY, z: lightZ },
    })
  );

  const withSpotLight = flood("black").screen(
    env.sourceAlpha.blur({ r: 1 }).specularLight({
      strength: 5,
      shininess: 20,
      light: {
        type: "spot",
        x: lightX,
        y: lightY,
        z: lightZ,
        pointsAtX: 100,
        pointsAtY: 50,
        pointsAtZ: 0,
        specularExponent: 10,
        limitingConeAngle: 30,
      },
    })
  );

  return (
    <div
      style={{
        filter: css(filter(withLight)),
      }}
    >
      <div
        style={{
          fontSize: "100px",
          fontWeight: 900,
          color: "rgb(32, 178, 170)",
        }}
      >
        hello world
      </div>
    </div>
  );
}
