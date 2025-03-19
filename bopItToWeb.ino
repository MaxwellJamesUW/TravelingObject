#include <Keyboard.h>

/*
  File: bopItToWeb.ino
  Author: Max Coppock
*/

const int bKey = 112;
const int fKey = 102;
const int sKey = 115;
int lastReadingS = 0;
//int dialLow = true;

void setup() {
  //start serial monitoring, crucial step
  //Serial.begin(9600);
  pinMode(8, OUTPUT);
  pinMode(2, INPUT);
  digitalWrite(8, HIGH);
  Keyboard.begin();
  
  lastReadingS = analogRead(A4);
}

void loop() {
  //x direction read from the joystick
  int readingX = analogRead(A0);
  //y read from the joystick
  int readingY = analogRead(A2);

  int readingS = analogRead(A4);

  int readingB = digitalRead(2);

  //use serial.print to send data to the web page in [x,y] format
  
  /*
  Serial.print("[");
  Serial.print(readingX);
  Serial.print(",");
  Serial.print(readingY);
  //last one has a '\n' to signal the end of a line for serial.readLine()
  //                                            on the web end
  Serial.print(",");
  Serial.print(readingS);
  Serial.print(",");
  Serial.print(readingB);
  Serial.println("]");
  */

  //sending about 10 updates every second
  if (readingB) {
    Keyboard.press(bKey);

    //These delays make sure keys aren't double-pressed accidentally
    delay(300);
    Keyboard.release(bKey);
    delay(500);
  } else {
    Keyboard.release(bKey);
  }

  //flick
  if (readingX > 600 || readingX < 300 || readingY > 800 || readingY < 200) {
    Keyboard.press(fKey);
    delay(300);
    Keyboard.release(fKey);
    delay(500);
  } else {
    Keyboard.release(fKey);
  }

  //Spin the dial -
  // Demo day: potentiometer is sometimes losing power, from some kind of internal
  //    physical connection that's bad. Jiggling the thing or applying pressure
  //    with tape helps. If reading ==0, do NOT press key, because this is most
  //    likely a loss of power from this bad connection.
  if ((abs(readingS - lastReadingS) > 500) && readingS != 0){
    
    Keyboard.press(sKey);
    delay(100);
    lastReadingS = readingS;
    Keyboard.release(sKey);
    delay(500);
    lastReadingS = readingS;
  } else {
    Keyboard.release(sKey);
  }
  
  delay(100);
  

  //if the serial line isn't busy
  /*
  if (Serial.available()) {
    //read in serial communication, save it as an int to inByte
    int inByte = Serial.read();
    //send it back as binary data to check
 	  Serial.write(inByte);
    //constrain the key command in case its ascii value is outside the range
    //   of analogWrite()
    inByte = constrain(inByte, 0, 255); 

    //user hit the spacebar
    //   32 is ascii value for Space
    if(inByte == 32){
      //turn LED off
      analogWrite(6, 0);
    //user hit another key
    }else {
      //hit b key:  98 = 'b' in ASCII
      if(inByte == 98){
        //turn LED fully on
        analogWrite(6, 255);

      //not space or b key
      } else {
        //set LED brightness with the ASCII value of the key pressed
        analogWrite(6, inByte);
      }
    }
  }
  */
}

