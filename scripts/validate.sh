#!/bin/bash

STATUS_CODE=$(curl --silent --head www.alanzheng.com | grep HTTP/1.1 | awk {'print $2'})

if [ "$STATUS_CODE" -eq 200 ]; then
  exit 0
else
  exit 1
fi
