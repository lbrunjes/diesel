#!/bin/bash
VERSION="0.7"
echo "building diesel from files.txt"
echo "// Diesel built at "$(date +%c) > diesel-$VERSION.js


cat files.txt| while read line; do
	cat $line >> diesel-$VERSION.js
	echo "added $line"
done
echo "";

echo "//diesel tests built at "$(date +%c) > tests-$VERSION.js
for test in `ls tests/*.js`; do
	cat $test >> tests-$VERSION.js
	echo "added test $test"
done

echo "Finished: "$(date +%c)


cp diesel-$VERSION.js ~/web-local/diesel.js
cp tests-$VERSION.js ~/web-local/tests.js
