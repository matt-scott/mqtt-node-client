const mqtt = require('mqtt');

const host = ('localhost');
// Default unencrypted MQTT port. Mosquitto connects to this automatically when run.
const port = ('1883');
const clientId = (`nodejs_mqtt${Math.random().toString(16).slice(3)}`);

const connectUrl = (`mqtt://${host}:${port}`);

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
//   username: 'emqx',
//   password: 'public',
  reconnectPeriod: 1000,
});

const topic = ('/nodejs/mqtt');

// Subscribe to topic variable on connection with MQTT URL
client.on('connect', () => {
  console.log('Connected');

  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
    // Publish a test message to verify subscription is working
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error);
      }
    });
  });
});

// Publish any messages received from the topic to the console
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString());
});