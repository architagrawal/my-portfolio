"use client";

import { useEffect, useState } from "react";
import { PLAQUES, SCENE_IDS, type SceneId } from "./paint-scenes";

/* The gallery plaque in the home hero's corner: the painting's title and the photographer
   whose photo it was painted from. The scene is only known in the browser (<html data-scene>), so it renders empty on
   the server and fills in on mount. Fades in once Backdrop marks <html data-painted>. */
export function Plaque() {
  const [scene, setScene] = useState<SceneId | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = document.documentElement.dataset.scene as SceneId | undefined;
    if (id && SCENE_IDS.includes(id)) setScene(id);
    const check = () => setShown("painted" in document.documentElement.dataset);
    check();
    window.addEventListener("painted", check);
    return () => window.removeEventListener("painted", check);
  }, []);

  if (!scene) return null;
  const { title, photo } = PLAQUES[scene];
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10">
      <div className={`mx-auto flex w-full max-w-6xl justify-end px-6 transition-opacity duration-700 md:px-12 ${shown ? "opacity-100" : "opacity-0"}`}>
        <p className="plaque max-w-[22rem] text-right">
          <span className="block font-semibold text-foreground">{title}</span>
          <span className="block text-foreground/70">Based on a photo by {photo}</span>
        </p>
      </div>
    </div>
  );
}
