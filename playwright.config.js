// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect : {
    timeout: 5 *1000,
          },
  reporter: 'html',
  use: {
  
       browserName : 'chromium',
       //headless : true, //we can se it here to avoid give "--headed" in command
       screenshot : 'off',
       trace : 'off',//only failed test cases are traced.
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
       },

 
});

module.exports = config;
