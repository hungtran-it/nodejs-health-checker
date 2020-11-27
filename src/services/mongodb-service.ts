import { MongoClient } from 'mongodb';
import { Defaults, HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkMongoDb(config: IntegrationConfig): Promise<HTTPChecker> {
  return new Promise((resolve, _) => {
    const mongoUri = config.uri || '';
    const options = {
      connectTimeoutMS: config.timeout || Defaults.MongoDbTimeout,
    }

    // Use connect method to connect to the server
    MongoClient.connect(mongoUri, options, (err: any, client: any) => {
      if (err) {
        return resolve({
          status: false,
          error: err,
        });
      }

      // console.debug("Connected successfully to server");
      client.close();

      resolve({
        status: true,
        error: undefined,
      });
    });

    /*
        const options = {
          useNewUrlParser: true,
          autoIndex: false, // Don't build indexes
          poolSize: 10, // Maintain up to 10 socket connections
          // If not connected, return err,ors immediately rather than waiting for reconnect
          bufferMaxEntries: 0,
          connectTimeoutMS: config.timeout || Defaults.MongoDbTimeout, // Give up initial connection after 10 seconds
          socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
          useUnifiedTopology: true,
        };

        if (mongoose.connection.readyState === 1) {
          return resolve({
            status: true,
            error: undefined,
          });
        }

        mongoose.connect(mongoUri, options);

        // Exit application on error
        mongoose.connection.on('error', (err: any) => {
          resolve({
            status: false,
            error: err,
          });
        });

        // when the connection is connected
        mongoose.connection.on('connected', () => {
          resolve({
            status: true,
            error: undefined,
          });
        });
    */
  });
}
