const fs = require('fs');

for (let i = 22001; i <= 23128; i++) {
  const filename = `${i}.json`;

  // Baca data dari file i.json
  const data = JSON.parse(fs.readFileSync(filename));

  // Dapatkan daftar alamat
  const addresses = data.addresses;

  // Iterasi melalui setiap alamat
  addresses.forEach((address) => {
    const newFilename = `${address}.json`;

    // Copy konten dari i.json ke file baru
    fs.copyFileSync(filename, newFilename);
  });
}
