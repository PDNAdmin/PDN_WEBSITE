"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Koto / OFF+BRAND media hover: a WebGL layer over the image ripples and RGB-splits toward the pointer,
 * scaled by pointer speed, then settles. `ogl` (~25 KB) is imported on the first hover only, and only on
 * fine-pointer, non-low-tier devices without reduced motion. The plain image underneath is the content.
 */
export function MediaDistort({ children, className = "" }: { children: ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (
      !el ||
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.tier === "low"
    ) {
      return;
    }
    let teardown: (() => void) | null = null;
    let starting = false;

    const start = async () => {
      if (teardown || starting) return;
      const img = el.querySelector("img");
      if (!img?.complete || !img.naturalWidth) return;
      starting = true;
      const { Renderer, Program, Mesh, Triangle, Texture, Vec2 } = await import("ogl");
      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.5), alpha: true });
      const gl = renderer.gl;
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.setAttribute("aria-hidden", "true");
      Object.assign(canvas.style, { position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" });
      el.appendChild(canvas);

      const texture = new Texture(gl, { generateMipmaps: false });
      texture.image = img;
      const mouse = new Vec2(0.5, 0.5);
      const program = new Program(gl, {
        vertex: `attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = vec4(position, 0., 1.); }`,
        fragment: `precision highp float; uniform sampler2D tMap; uniform vec2 uMouse; uniform float uStrength;
          uniform vec2 uCover; varying vec2 vUv;
          void main(){
            vec2 uv = (vUv - .5) * uCover + .5;
            vec2 d = uv - uMouse; float dist = length(d);
            float wave = sin(dist * 28. - uStrength * 6.) * exp(-dist * 7.) * uStrength;
            vec2 off = normalize(d + 1e-5) * wave * .035;
            float r = texture2D(tMap, uv + off * 1.6).r;
            float g = texture2D(tMap, uv + off).g;
            float b = texture2D(tMap, uv + off * .4).b;
            gl_FragColor = vec4(r, g, b, 1.);
          }`,
        uniforms: { tMap: { value: texture }, uMouse: { value: mouse }, uStrength: { value: 0 }, uCover: { value: new Vec2(1, 1) } },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        const r = el.getBoundingClientRect();
        renderer.setSize(r.width, r.height);
        // emulate object-fit: cover
        const ir = img.naturalWidth / img.naturalHeight;
        const br = r.width / r.height;
        program.uniforms.uCover!.value.set(br > ir ? 1 : br / ir, br > ir ? ir / br : 1);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let strength = 0,
        target = 0,
        last = { x: 0, y: 0 },
        raf = 0,
        alive = true;
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        mouse.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
        const v = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        last = { x: e.clientX, y: e.clientY };
        target = Math.min(1, target + v * 0.02);
      };
      const loop = () => {
        if (!alive) return;
        target *= 0.94;
        strength += (target - strength) * 0.12;
        program.uniforms.uStrength!.value = strength;
        renderer.render({ scene: mesh });
        canvas.style.opacity = strength > 0.002 ? "1" : "0";
        raf = requestAnimationFrame(loop);
      };
      el.addEventListener("pointermove", onMove);
      raf = requestAnimationFrame(loop);
      teardown = () => {
        alive = false;
        cancelAnimationFrame(raf);
        el.removeEventListener("pointermove", onMove);
        ro.disconnect();
        canvas.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
      starting = false;
    };

    el.addEventListener("pointerenter", start);
    return () => {
      el.removeEventListener("pointerenter", start);
      teardown?.();
    };
  }, []);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
