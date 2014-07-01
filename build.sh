#!/bin/bash
echo "building diesel from files.txt"
echo "// Diesel built at "$(date +%c) > diesel.js


cat files.txt| while read line; do
	cat $line >> diesel.js
	echo "added $line"
done
echo "";

echo "//diesel tests built at "$(date +%c) > tests.js
for test in `ls tests`; do
	cat 'tests/'$test >> tests.js
	echo "added test $test"
done

echo "Finished: "$(date +%c)