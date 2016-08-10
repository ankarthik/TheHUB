# thehubapp
TheHUBApp


#Tool Requied to install
JDK & JRE 7 <br/>
Ant <br/>
Android <br/>
Node <br/>
cordova -->  npm install cordova -g<br/>
forcedroid --> npm install forcedroid -g<br/>
eclipse <br/>

#Environment Variables to set
JAVA_HOME <br/>
ANT_HOME <br/>
ANDROID_HOME <br/>
Set Path for Node <br/>
#Run Project
 Import project into eclipse 
-Set the dependencies of all projects as follows <br/>
 a. Cordova Lib - No Dependency <br/>
 b. Salesforce SDK Dependent on Cordova Lib. Add project dependencies by right click on project & click on properties, select - Java_Build & projects tab, use add button.<br/>
 c. SmartSync depends upon Cordova Lib & Salesforce SDK <br/>
 d. SmartStore depends upon Cordova Lib & Salesforce SDK <br/>
 e. Build all projects. There will be error in your application. Please add salesforcesdk.jar, smartsync.jar, smartstore.jar in android private dependencies. <br/>
 f. Build again. Now all projects will get compiled properly. <br/>
--  Add AVD (Android Virtual Device) <br/>
--  Run project by right click on project & Run As -> Androidapp <br/>
