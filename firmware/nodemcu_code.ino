#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "secrets.h"

const char* ssid     = SECRET_WIFI_NAME;
const char* password = SECRET_WIFI_PASSWORD;
const char* serverUrl = SECRET_SERVER_URL;

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected! IP: " + WiFi.localIP().toString());
}

void loop() {
  int sensorValue = analogRead(A0);
  String status;
  if (sensorValue < 300)      status = "SAFE";
  else if (sensorValue < 700) status = "WARNING";
  else                        status = "DANGER";

  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    String payload = "{\"ppm\":" + String(sensorValue)
                   + ",\"status\":\"" + status + "\"}";
    int httpCode = http.POST(payload);
    Serial.println("Sent: " + payload + " | HTTP: " + httpCode);
    http.end();
  }
  delay(5000);
}
