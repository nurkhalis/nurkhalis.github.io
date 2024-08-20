const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const url = 'mongodb://localhost:27017';
const dbName = 'baseblock';

async function connectToMongoDB() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const collection = db.collection('completeInfoTesting');

  return { client, collection };
}

async function main() {
  const { client, collection } = await connectToMongoDB();

  try {
    const docs = await collection.find({}).toArray();

    docs.forEach(doc => {
      const address = doc.address.toLowerCase();
      const filename = `${address}.json`;

      if (fs.existsSync(filename)) {
        const fileData = JSON.parse(fs.readFileSync(filename));
        fileData.completeInfo = doc;

        fs.writeFileSync(filename, JSON.stringify(fileData, null, 2));
        console.log(`Data untuk alamat ${address} telah ditambahkan ke ${filename}`);
      } else {
        console.warn(`Tidak ada file .json untuk alamat ${address}, data dilewatkan.`);
      }
    });
  } catch (error) {
    console.error('Error saat mengambil data dari koleksi:', error);
  } finally {
    client.close();
  }
}

main();
