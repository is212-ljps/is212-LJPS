#!/bin/bash
search_dir=./src/intTest/__tests__
for entry in "$search_dir"/*
do
  npm run resetDatabase
  npx jest $entry --forceExit

done
