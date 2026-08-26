const sharp = require("sharp");
const path = require("path");
const os = require("os");

sharp(path.join(__dirname, "public", "logo.svg"))
  .resize(512, 512)
  .png()
  .toFile(path.join(os.tmpdir(), "logo-check.png"))
  .then((info) => console.log("Rendered:", info.path || "ok", info.width + "x" + info.height))
  .catch((err) => { console.error(err.message); process.exit(1); });