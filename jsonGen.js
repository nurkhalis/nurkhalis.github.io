const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const url = 'mongodb://localhost:27017';
const dbName = 'baseblock';

async function connectAndGenerateJson() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('arrayWhitelist10tes');

    const cursor = collection.find({});

    await cursor.forEach(async (data) => {
      const batch = data.batch;

      // Tambahkan kondisi untuk memeriksa apakah batch berada dalam rentang 0 hingga 99
      if (batch >= 22001 && batch <= 23128) {
        const jsonContent = {
          addresses: data.arrayAddress,
          airdropBalances: data.arrayAirdropBalance,
          hashes: data.arrayGabunganClaimBalancesHash,
          parentHashes: data.arrayParentHash,
          hashesIndex: data.batchIndex,
          parentHashIndex: data.parentHashIndex,
          ancestorHashIndex: data.ancestorBatch
        };

        const fileName = `${batch}.json`;

        fs.writeFile(fileName, JSON.stringify(jsonContent, null, 2), (err) => {
          if (err) throw err;
          console.log(`${fileName} created successfully`);
        });
      }
    });

    client.close();
  } catch (err) {
    console.error('Error:', err);
  }
}

connectAndGenerateJson();
