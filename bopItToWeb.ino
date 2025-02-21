#include <Keyboard.h>

/*
  File: bopItToWeb.ino
  Author: Max Coppock
*/

const int bKey = 66;
const int fKey = 70;

void setup() {
  //start serial monitoring, crucial step
  //Serial.begin(9600);
  pinMode(8, OUTPUT);
  pinMode(4, INPUT);
  digitalWrite(8, HIGH);
  Keyboard.begin();
  
}

void loop() {
  //x direction read from the joystick
  int readingX = analogRead(A0);
  //y read from the joystick
  int readingY = analogRead(A2);

  int readingS = analogRead(A4);

  int readingB = digitalRead(4);

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
  //sending about 10 joystick updates every second
  if (readingB) {
    Keyboard.press(bKey);
  } else {
    Keyboard.release(bKey);
  }

  if (readingX > 900 || readingX < 100 || readingY > 900 || readingY < 100) {
    Keyboard.press(fKey);
  } else {
    Keyboard.release(fKey);
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

