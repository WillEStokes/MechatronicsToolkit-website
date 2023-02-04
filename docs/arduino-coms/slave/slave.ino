#include "Wire.h"
#define SLAVE_ADDRESS 0x48

const int LED_PIN = LED_BUILTIN; //define LED pin
uint8_t _msgHeaderLength = 3;
uint8_t _error = 0;

// type definitions
typedef void (*messageHandlerFunc)(const void*);

typedef struct {
    uint8_t packetLength;
    uint8_t fid;
    uint8_t error;
} __attribute__((__packed__)) MessageHeader;

typedef struct {
    uint8_t fid;
    messageHandlerFunc replyFunc;
} __attribute__((__packed__)) ComMessage;

typedef struct {
    MessageHeader header;
    uint8_t ledState;
} __attribute__((__packed__)) LedControl;

// enums
enum FID_LIST {
    FID_LED_ON = 0,
    FID_LED_OFF = 1,
    FID_LED_CONTROL = 2,
};

// functions
void ledOn(const MessageHeader* data);
void ledOff(const MessageHeader* data);
void ledControl(const LedControl* data);

// function id's and reply function references
const ComMessage comMessages[] = {
    {FID_LED_ON, (messageHandlerFunc)&ledOn},
    {FID_LED_OFF, (messageHandlerFunc)&ledOff},
    {FID_LED_CONTROL, (messageHandlerFunc)&ledControl},
};

void setup() {
    Serial.begin(9600);
//    Serial.begin(SLAVE_ADDRESS);
//    Serial.onReceive(receiveEvent);

    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, LOW);
}

// loop continuously
void loop() {
    static char data[32];
    static MessageHeader* header;
    static byte dataLength = 0;
    
    if (Serial.available() > 0) {
        if (Serial.readBytes(data, _msgHeaderLength) == _msgHeaderLength) {
            header = (MessageHeader*)data;
    
            dataLength = Serial.readBytes(data + _msgHeaderLength, header->packetLength - _msgHeaderLength);
            
            const ComMessage* comMessage = &comMessages[header->fid];
            
            if (comMessage != NULL && comMessage->replyFunc != NULL && dataLength == header->packetLength - _msgHeaderLength) {
                (*comMessage->replyFunc)((void*)data);
            }
        }
    }
}

// receive and process commands from the master
//void receiveEvent(int numBytes) {
//    static char data[32];
//    static MessageHeader* header;
//    static byte dataLength = 0;
//
//    Serial.readBytes(data, numBytes);
//
//    header = (MessageHeader*)data;
//    dataLength = numBytes - _msgHeaderLength;
//
//    const ComMessage* comMessage = &comMessages[header->fid];
//    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
//
//    if (comMessage->replyFunc != NULL && dataLength == header->packetLength - _msgHeaderLength) {
//        (*comMessage->replyFunc)((void*)data);
//    }
//}

// switch LED on (no data)
void ledOn(const MessageHeader* data) {
    digitalWrite(LED_PIN, HIGH);
}

// switch LED off (no data)
void ledOff(const MessageHeader* data) {
    digitalWrite(LED_PIN, LOW);
}

// control the LED pin based on the data received
void ledControl(const LedControl* data) {
    digitalWrite(LED_PIN, data->ledState);
}
