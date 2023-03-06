
import {login} from './login/login.js';
import {dashboard} from './dashboard/dashboard.js';
import { futurewatch } from './futurewatch/futurewatch.js';
import { driver } from './driver/driver.js';

new login();
new driver();
new dashboard();
new futurewatch();
console.log("MS42FW 1.2");
