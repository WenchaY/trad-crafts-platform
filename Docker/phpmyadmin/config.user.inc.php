<?php

/* Server settings */
for ($i = 1; isset($hosts[$i - 1]); $i++) {
    // Disable root access from phpMyAdmin
    $cfg['Servers'][$i]['AllowRoot'] = false;
}
