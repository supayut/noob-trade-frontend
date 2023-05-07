#!/usr/bin/env bash
stat -f '{"stock": { %Sm' -t '"lastModified": "%Y-%m-%d %H:%M"},' ./public/json/stock.json
stat -f '"warrants":{ %Sm' -t '"lastModified": "%Y-%m-%d %H:%M"}}' ./public/json/warrants.json
