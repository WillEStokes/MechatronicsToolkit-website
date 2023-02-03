#define SLAVE_ADDRESS 0x48

const int LED_PIN = 13; //define LED pin
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
void ledOn(const MessageHeader* data);
void ledControl(const MessageHeader* data);

// function id's and reply function references
const ComMessage comMessages[] = {
    {FID_LED_ON, (messageHandlerFunc)&ledOn},
    {FID_LED_OFF, (messageHandlerFunc)&ledOn},
    {FID_LED_CONTROL, (messageHandlerFunc)&ledControl},
};

void setup() {
    Wire.begin(SLAVE_ADDRESS);
    Wire.onReceive(receiveEvent);
    digitalWrite(LED_PIN, LOW);
}

// loop continuously
void loop()
{
}

// receive and process commands from the master
void receiveEvent(int numBytes) {
    static char data[32];
    static MessageHeader* header;
    static byte dataLength = 0;

    Wire.readBytes(data, numBytes);

    header = (MessageHeader*)data;
    dataLength = numBytes - _msgHeaderLength;

    const ComMessage* comMessage = &comMessages[header->fid];

    if (comMessage->replyFunc != NULL && dataLength == header->packetLength - _msgHeaderLength) {
        (*comMessage->replyFunc)((void*)data);
    }
}

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
