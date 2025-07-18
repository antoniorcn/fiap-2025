#include <DHT.h>
#include <LiquidCrystal_I2C.h>

#define SENSOR_PIN 5
#define LCD_SDA 21
#define LCD_SCL 22

DHT dht11(SENSOR_PIN, DHT11);

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(115200);
  Serial.println("Leitor de Temperatura e Umidade");
  dht11.begin();
  lcd.init();
  lcd.backlight();
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(1000); // this speeds up the simulation

  float humi  = dht11.readHumidity();
  float tempC = dht11.readTemperature();

  Serial.print("Temperatura: ");
  Serial.print(tempC);
  Serial.print("    Umidade: ");
  Serial.println(humi);

  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(tempC);
  lcd.setCursor(0, 1);
  lcd.print("Umid: ");
  lcd.print(humi);



}
