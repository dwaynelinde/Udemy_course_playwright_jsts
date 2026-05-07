// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */


const config = ({

testDir: './tests', 


  // This timeout is for every step of the test. Default is 30 secs. 
  timeout: 30 * 1000, 

  // This timeout is for assertion validation. Default is 30 secs. 
  expect: { 
    timeout: 5000
  }, 

  reporter: 'html', 

  use: {
    
    // 'webkit' = Safari
    browserName: 'webkit',
    headless: false

  },
});

// Exporting, so that this config is vavilable across off of my files. 
module.exports = config
