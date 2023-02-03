void invokeFid() {
    static MessageHeader message;
    message.packetLength = 3;
    message.fid = 1;
    message.error = 0;
    
    Wire.beginTransmission(SLAVE_ADDRESS);
    Wire.write((char*) &message, 3);
    Wire.endTransmission();

    return;
}

void controlLedOn() {
    Wire.beginTransmission(K64F_ADDRESS);
    Wire.write((char*) 1, 1);
    Wire.endTransmission();

    return;
}

void controlLedOff() {
    Wire.beginTransmission(K64F_ADDRESS);
    Wire.write((char*) 1, 1);
    Wire.endTransmission();

    return;
}
