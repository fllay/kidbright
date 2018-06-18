#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "Arduino.h"
#include "Wire.h"
#include "kidbright32.h"
#include "ports.h"
#include "button12.h"
#include "ldr.h"
#include "sound.h"
#include "ht16k33.h"
#include "lm73.h"
#include "mcp7940n.h"

extern PORTS ports;
extern BUTTON12 button12;
extern LDR ldr;
extern SOUND sound;
extern HT16K33 ht16k33;
extern LM73 lm73_0;
extern LM73 lm73_1;
extern MCP7940N mcp7940n;


void user_app(void) {
  // setup
  ht16k33.show((uint8_t *)"\x0\x0\x0\x0\x0\xc0\x0\x0\x0\x0\x0\x0\x0\x1\x1\x1");
  
  // create tasks
}
