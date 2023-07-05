#!/bin/sh

echo "Downloading Trackasia Style Spec"
cd style-spec/

FILENAME=v8.json

if [ -e "./${FILENAME}" ]; then
  echo "Removing old style spec ${FILENAME}"
  rm "./${FILENAME}"
fi

echo "Fetching new style spec ${FILENAME}"
curl -sS https://raw.githubusercontent.com/track-asia/trackasia-gl-js/master/src/style-spec/reference/${FILENAME} -o ${FILENAME}
cd ..
