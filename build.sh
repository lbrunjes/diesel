#!/bin/bash
echo "building diesel from files.txt"
echo "// Diesel built at "$(date +%c) > diesel.js


cat files.txt| while read line; do
	cat $line >> diesel.js
	echo "added $line"
done
echo "";
echo "Finished: "$(date +%c)