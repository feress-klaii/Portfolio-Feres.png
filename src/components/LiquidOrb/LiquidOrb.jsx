import { useEffect, useRef } from "react";
import "./LiquidOrb.css";

// Same raymarched liquid-glass blob as the reference, reduced to:
// no dat.gui, no preset switcher, locked to the exact settings given
// (see SETTINGS below) instead of the shader's own defaults. The
// background uniform is dropped entirely — the fragment shader now
// outputs real alpha (opaque on the orb surface, fading to fully
// transparent away from the glow) so the actual page background
// shows through instead of a hardcoded fill color. Drag with the
// mouse to rotate it; it keeps drifting on its own otherwise.

const SETTINGS = {
  radius: 0.40,
  deform: 0.52,
  frequency: 1.75,
  morphSpeed: 2.0,
  rotSpeed: 0.40,
  specular: 2.75,
  shininess: 247,
  glowStrength: 0.80,
  colorBlue: "#4099FF",
  colorMagenta: "#E633BF",
  glowA: "#33B5FF",
  glowB: "#E24DD0",
  liquidSpeed: 1.46,
  liquidScale: 2.25,
  liquidBright: 1.10,
  filament: 1.40,
  core: 0.30,
};

const VERT = `#version 300 es
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){ v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2  u_res;
uniform float u_radius;
uniform float u_deform;
uniform float u_freq;
uniform float u_morphSpeed;
uniform float u_rotSpeed;
uniform float u_specular;
uniform float u_shininess;
uniform float u_glowStrength;
uniform vec3  u_colBlue;
uniform vec3  u_colMag;
uniform vec3  u_glowA;
uniform vec3  u_glowB;
uniform float u_liquidSpeed;
uniform float u_liquidScale;
uniform float u_liquidBright;
uniform float u_filament;
uniform float u_core;
uniform float u_dragYaw;
uniform float u_dragPitch;

mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

float blobField(vec3 p){
  float t = u_time * u_morphSpeed;
  float f = u_freq;
  float d = 0.0;
  d += sin(p.x * 2.6 * f + t * 1.00);
  d += sin(p.y * 2.9 * f - t * 0.80 + 1.3);
  d += sin(p.z * 3.2 * f + t * 1.20 + 2.7);
  d += sin((p.x + p.z) * 2.2 * f - t * 0.90 + 4.1);
  d += sin((p.y - p.x) * 2.4 * f + t * 0.70 + 0.6);
  return d * 0.2;
}

float mapBlob(vec3 p){
  float t = u_time * u_rotSpeed;
  p.xy *= rot(t * 0.7 + u_dragYaw);
  p.yz *= rot(t * 0.5 + u_dragPitch);
  float r = u_radius + u_deform * blobField(p);
  return length(p) - r;
}

vec3 calcNormal(vec3 p){
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    mapBlob(p + e.xyy) - mapBlob(p - e.xyy),
    mapBlob(p + e.yxy) - mapBlob(p - e.yxy),
    mapBlob(p + e.yyx) - mapBlob(p - e.yyx)));
}

float hash13(vec3 p3){ p3 = fract(p3 * 0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
float vnoise3(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i + vec3(0,0,0)), hash13(i + vec3(1,0,0)), f.x),
                 mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x),
                 mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm3(vec3 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 3; i++){ v += a * vnoise3(p); p *= 2.03; a *= 0.5; } return v; }

float liquid(vec3 p){
  float t = u_time * u_liquidSpeed;
  p *= u_liquidScale;
  p.xy *= rot(t * 0.15);
  p.yz *= rot(t * 0.10);
  vec3 w = vec3(fbm3(p + t * 0.2), fbm3(p + vec3(4.3, 1.2, -t * 0.15)), fbm3(p.zxy + vec3(7.7, 2.3, t * 0.10)));
  return fbm3(p + 1.8 * w);
}

void main(){
  vec2 p = v_uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;

  vec3 ro = vec3(0.0, 0.0, 3.0);
  vec3 rd = normalize(vec3(p, -1.8));

  float t = 0.0;
  bool hit = false;
  vec3 pos = ro;
  float minD = 1e3;
  for (int i = 0; i < 160; i++) {
    pos = ro + rd * t;
    float d = mapBlob(pos);
    minD = min(minD, d);
    if (d < 0.001) { hit = true; break; }
    t += d * 0.40;
    if (t > 6.0) break;
  }

  vec3 E = vec3(0.0);

  if (hit) {
    vec3 n = calcNormal(pos);
    vec3 v = -rd;
    float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);

    vec3 rp = pos + rd * 0.04;
    float trans = 1.0;
    vec3 inner = vec3(0.0);
    for (int k = 0; k < 10; k++) {
      float raw = liquid(rp);
      float dens = smoothstep(0.30, 0.70, raw);
      float fil = pow(1.0 - abs(2.0 * raw - 1.0), 5.0);
      vec3 c = mix(u_colMag, u_colBlue, 0.5 + 0.5 * sin(raw * 6.0 + u_time * 0.3 + rp.y * 2.5));
      vec3 emit = c * dens * 0.55 + c * fil * u_filament + vec3(1.0) * pow(fil, 3.0) * u_filament * 0.4;
      emit += u_colBlue * smoothstep(0.5, 0.0, length(rp)) * u_core;
      inner += trans * emit * 0.17;
      trans *= 0.84;
      rp += rd * 0.11;
      if (length(rp) > 1.0) break;
    }
    E += inner * (1.0 - fres * 0.6) * u_liquidBright;

    vec3 rim = mix(u_colMag, u_colBlue, 0.5 + 0.5 * (n.x * 0.7 + n.y * 0.45));
    E += rim * fres * 1.3;
    vec3 l1 = normalize(vec3(0.6, 0.85, 0.6));
    vec3 l2 = normalize(vec3(-0.7, 0.25, 0.55));
    vec3 h1 = normalize(l1 + v);
    vec3 h2 = normalize(l2 + v);
    E += vec3(1.0) * pow(max(dot(n, h1), 0.0), u_shininess) * 1.3 * u_specular;
    E += vec3(0.8, 0.9, 1.0) * pow(max(dot(n, h2), 0.0), u_shininess * 0.45) * 0.6 * u_specular;

    fragColor = vec4(clamp(E, 0.0, 1.0), 1.0);
  } else {
    float g = exp(-minD * 5.5);
    float ang = atan(rd.y, rd.x);
    vec3 gc = mix(u_glowA, u_glowB, 0.5 + 0.5 * sin(ang * 3.0 + u_time * 0.5));
    E += (gc * g * 1.4 + vec3(0.6, 0.8, 1.0) * pow(g, 3.0) * 0.7) * u_glowStrength;
    float alpha = clamp(max(E.r, max(E.g, E.b)), 0.0, 1.0);
    fragColor = vec4(clamp(E, 0.0, 1.0), alpha);
  }
}`;

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(sh) || "shader compile failed");
  }
  return sh;
}

function LiquidOrb() {
  const canvasRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mount = mountRef.current;
    if (!canvas || !mount) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "link failed");
    }
    gl.useProgram(program);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    ["u_time", "u_res", "u_radius", "u_deform", "u_freq", "u_morphSpeed", "u_rotSpeed",
      "u_specular", "u_shininess", "u_glowStrength", "u_colBlue", "u_colMag", "u_glowA",
      "u_glowB", "u_liquidSpeed", "u_liquidScale", "u_liquidBright", "u_filament", "u_core",
      "u_dragYaw", "u_dragPitch"].forEach((name) => { U[name] = gl.getUniformLocation(program, name); });

    // drag-to-rotate: target updates instantly on pointer drag, the
    // value fed to the shader eases toward it — same lerp language
    // as the rest of the site's motion.
    const drag = { targetYaw: 0, targetPitch: 0, yaw: 0, pitch: 0, active: false, lastX: 0, lastY: 0 };

    function onPointerDown(e) {
      drag.active = true;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      if (!drag.active) return;
      const dx = e.clientX - drag.lastX;
      const dy = e.clientY - drag.lastY;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      drag.targetYaw += dx * 0.008;
      drag.targetPitch += dy * 0.008;
    }
    function onPointerUp(e) {
      drag.active = false;
      canvas.releasePointerCapture(e.pointerId);
    }
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const colBlue = hexToRgb(SETTINGS.colorBlue);
    const colMag = hexToRgb(SETTINGS.colorMagenta);
    const glowA = hexToRgb(SETTINGS.glowA);
    const glowB = hexToRgb(SETTINGS.glowB);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(mount.clientWidth * dpr));
      const h = Math.max(1, Math.floor(mount.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frameId;
    function frame(now) {
      resize();
      const time = now * 0.001;

      drag.yaw += (drag.targetYaw - drag.yaw) * 0.12;
      drag.pitch += (drag.targetPitch - drag.pitch) * 0.12;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(U.u_time, time);
      gl.uniform2f(U.u_res, canvas.width, canvas.height);
      gl.uniform1f(U.u_radius, SETTINGS.radius);
      gl.uniform1f(U.u_deform, SETTINGS.deform);
      gl.uniform1f(U.u_freq, SETTINGS.frequency);
      gl.uniform1f(U.u_morphSpeed, SETTINGS.morphSpeed);
      gl.uniform1f(U.u_rotSpeed, SETTINGS.rotSpeed);
      gl.uniform1f(U.u_specular, SETTINGS.specular);
      gl.uniform1f(U.u_shininess, SETTINGS.shininess);
      gl.uniform1f(U.u_glowStrength, SETTINGS.glowStrength);
      gl.uniform3fv(U.u_colBlue, colBlue);
      gl.uniform3fv(U.u_colMag, colMag);
      gl.uniform3fv(U.u_glowA, glowA);
      gl.uniform3fv(U.u_glowB, glowB);
      gl.uniform1f(U.u_liquidSpeed, SETTINGS.liquidSpeed);
      gl.uniform1f(U.u_liquidScale, SETTINGS.liquidScale);
      gl.uniform1f(U.u_liquidBright, SETTINGS.liquidBright);
      gl.uniform1f(U.u_filament, SETTINGS.filament);
      gl.uniform1f(U.u_core, SETTINGS.core);
      gl.uniform1f(U.u_dragYaw, drag.yaw);
      gl.uniform1f(U.u_dragPitch, drag.pitch);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
      gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <div className="liquid-orb" ref={mountRef}>
      <canvas className="liquid-orb-canvas" ref={canvasRef}></canvas>
    </div>
  );
}

export default LiquidOrb;
