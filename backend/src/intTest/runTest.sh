#!/bin/bash
search_dir=./src/intTest/__tests__
if [ -z ${stagingHost+x} ]; 
then 
  export $(grep -v '^#' .env.local | xargs)
fi;

for entry in "$search_dir"/*
do
  mysql -h $stagingHost -u$stagingUsername -p$stagingPassword ljps_db_test < ./src/intTest/datadump.sql
  npx jest $entry --forceExit
done
