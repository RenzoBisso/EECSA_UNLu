const ExifParser = require("exif-parser");
const base64 = require("base64-js");

function imagen(req) {
  const buffer = req.file.buffer;
  // analiza los datos binarios en el buffer
  const parser = ExifParser.create(buffer);
  // extrae los metadatos de la imagen
  const metadata = parser.parse();
  return [buffer, metadata];
}

function bufferToBase64(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const base64String = base64.fromByteArray(uint8Array);
  return base64String;
}

function devolverImagen(result) {
  const imagenesBase64 = result.map((row) => {
    const [buffer, metadata] = imagen({ file: { buffer: row.imagen } });
    const base64String = bufferToBase64(buffer);
    return base64String;
  });

  return imagenesBase64;
}

module.exports = {
  imagen,
  devolverImagen,
};
