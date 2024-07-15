/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

var inAppBrowserRef;
var _url = "https://madgamingdev.com"; // <== Side A H5
var _target = "_blank";
var _options = "location=yes, hidden=yes, beforeload=yes";

document.addEventListener('deviceready', OneSignalInit, false);

function onDeviceReady() {    
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');    
}

function LoadStopCallBack() 
{
    if(inAppBrowserRef != undefined)
    {
        inAppBrowserRef.show();
    }
}

function LoadErrorCallBack()
{
    console.log('Cordova Page Load Error');
    // Load a NotFound Page, Maintenence Page;
    // cordova.InAppBrowser.open("errorpage.html", _target, _options);
}

//OneSignal SDK Initialize
function OneSignalInit()
{

    window.open = cordova.InAppBrowser.open;

    inAppBrowserRef = cordova.InAppBrowser.open(_url, _target, _options);
    inAppBrowserRef.addEventListener('loadstop', LoadStopCallBack, false);
    inAppBrowserRef.addEventListener('loaderror', LoadErrorCallBack, false);

    //window.plugins.OneSignal.setLogLevel(6,0); // Debugging and Log Errors

    window.plugins.OneSignal.setAppId("b18491af-3ea2-4ef9-9174-e1a191751025");
    window.plugins.OneSignal.setNotificationOpenedHandler(function(jsonData)
    {
        console.log('Notification Call Back: ', JSON.stringify(jsonData));
        // Parse the Data and evaluate In-APp Notification / Post Notification
        
    });

    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted)
    {
        console.log('User Accepted Post Notification: ' + accepted);
    });
}