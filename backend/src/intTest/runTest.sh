#!/bin/bash
search_dir=./src/intTest/__tests__
export $(grep -v '^#' .env.local | xargs)

for entry in "$search_dir"/*
do
  mysql -h $stagingHost -u$stagingUsername -p$stagingPassword ljps_db_test < ./src/intTest/datadump.sql
  npx jest $entry --forceExit
done
