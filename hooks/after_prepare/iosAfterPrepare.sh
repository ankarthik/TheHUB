#!/bin/bash
PLIST=platforms/ios/*/*-Info.plist
 
# Bypass ATS for test servers
cat << EOF |
Add :NSAppTransportSecurity:NSExceptionDomains:force.com:NSExceptionRequiresForwardSecrecy bool false
Add :NSAppTransportSecurity:NSExceptionDomains:salesforce.com:NSExceptionRequiresForwardSecrecy bool false
EOF
while read line
do
/usr/libexec/PlistBuddy -c "$line" $PLIST
done
 
true