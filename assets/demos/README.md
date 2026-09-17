# demos

Drop a short looping demo per project here. The filename is shown right on
the tile until you add the file, so you always know what's missing.

  qube.mp4 / qube.gif
  3d-engine.mp4
  dont-mess-with-the-don.mp4
  ...

Rules: 16:9, no audio, under ~3MB. `.mp4`/`.webm` plays on hover,
`.gif`/`.jpg`/`.png` zooms on hover. Optional poster:

  { src: "assets/demos/qube.mp4", poster: "assets/demos/qube-poster.jpg" }

Then set it in `projects.js`:

  demo: { src: "assets/demos/qube.mp4" }
