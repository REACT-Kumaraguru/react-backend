import { useEffect, useRef } from 'react';

const VS = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FS = `
precision highp float;
uniform float uTime;
uniform vec2  uResolution;
uniform vec3  uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2  uMouse;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u  = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  float a = rand(ip);
  float b = rand(ip + vec2(1.0, 0.0));
  float c = rand(ip + vec2(0.0, 1.0));
  float d = rand(ip + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float amp = uAmplitude * (1.0 + (uMouse.y - 0.5) * 0.2);
  vec3 color = vec3(0.0);
  int N = 40;
  for (int i = 0; i < 40; i++) {
    float fi = float(i) / float(N);
    float baseY = fi + uDistance * 0.1;
    float n1 = noise(vec2(uv.x * 2.5 + uTime, fi * 3.7));
    float n2 = noise(vec2(uv.x * 3.5 - uTime * 0.7, fi * 5.1));
    float lineY = baseY + (n1 * 0.6 + n2 * 0.4) * amp * 0.18;
    float dist = abs(uv.y - lineY);
    float lineW = 7.0 / uResolution.y;
    float blurW = 10.0 / uResolution.y;
    float alpha = smoothstep(lineW + blurW, lineW, dist);
    color += uColor * alpha * 0.38;
  }
  gl_FragColor = vec4(color, min(length(color), 0.85));
}
`;

function createShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export const WaveBackground = ({ color = [0.72, 0.72, 0.78], opacity = 1 }) => {
  const canvasRef = useRef(null);
  const mouse = useRef([0.5, 0.5]);
  const targetMouse = useRef([0.5, 0.5]);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VS);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FS);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes  = gl.getUniformLocation(prog, 'uResolution');
    const uCol  = gl.getUniformLocation(prog, 'uColor');
    const uAmp  = gl.getUniformLocation(prog, 'uAmplitude');
    const uDist = gl.getUniformLocation(prog, 'uDistance');
    const uMse  = gl.getUniformLocation(prog, 'uMouse');

    gl.uniform3fv(uCol, color);
    gl.uniform1f(uAmp, 2.1);
    gl.uniform1f(uDist, 0.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      targetMouse.current = [
        (e.clientX - r.left) / r.width,
        1.0 - (e.clientY - r.top) / r.height,
      ];
    };
    const onLeave = () => { targetMouse.current = [0.5, 0.5]; };
    canvas.parentElement.addEventListener('mousemove', onMove);
    canvas.parentElement.addEventListener('mouseleave', onLeave);

    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const t = (ts - start) * 0.001;

      mouse.current[0] += (targetMouse.current[0] - mouse.current[0]) * 0.05;
      mouse.current[1] += (targetMouse.current[1] - mouse.current[1]) * 0.05;

      gl.uniform1f(uTime, t);
      gl.uniform2f(uMse, mouse.current[0], mouse.current[1]);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.parentElement?.removeEventListener('mousemove', onMove);
      canvas.parentElement?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity,
      }}
      aria-hidden="true"
    />
  );
};
