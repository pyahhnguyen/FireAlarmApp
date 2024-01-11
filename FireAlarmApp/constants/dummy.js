
// export const alertHistory = [
//     {
//         id: 1,
//         device_name: 'smokeDectector',
//         alert_identify:  "Detector #1",
//         description:   "Smoke Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",
//     },

//     {
//         id: 2,
//         device_name: 'heatDectector',
//         alert_identify:  "Detector #2",
//         description:   "Heat Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",
//     },
//     {
//         id: 3,
//         device_name: 'gasDectector',
//         alert_identify:  "Detector #3",
//         description:   "Gas Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",
//     },
//     {
//         id: 4,
//         device_name: 'smokeDectector',
//         alert_identify:  "Detector #4",
//         description:   "Smoke Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",
//     },
//     {
//         id: 5,
//         device_name: 'smokeDectector',
//         alert_identify:  "Detector #5",
//         description:   "Gas Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",
//     },
//     {
//         id: 6,
//         device_name: 'smokeDectector',
//         alert_identify:  "Detector #6",
//         description:   "Heat Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",
//     },
//     {
//         id: 7,
//         device_name: 'smokeDectector',
//         alert_identify:  "Detector #7",
//         description:   "Flame Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",
//     },
//     {
//         id: 8,
//         device_name: 'smokeDectector',
//         alert_identify:  "Detector #8",
//         description:   "Smoke Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",

//     },
//     {
//         id: 9,
//         device_name: 'smokeDectector',
//         alert_identify:  "Detector #9",
//         description:   "Smoke Detected",
//         date: "2023-11-12, 14:20pm",
//         status: "Alarm",
//     },
// ];

const chartOptions = [
    {
        id: 1,
        label: "1 hr"
    },
    {
        id: 2,
        label: "3 Days"
    },
    {
        id: 3,
        label: "1 Week"
    },
    {
        id: 4,
        label: "1 Month"
    },
    {
        id: 5,
        label: "3 Months"
    }
]




export const alertHistory = [
    
            {
            "deviveId": 1,
            "deviceType": "smoke",
            "deviceName": {
                "name": "Smoke Sensor",
                "ModelNo": "SW-GS529N",
                "Code": "SW-13"
                        },
            "deviceDescription": "Smoke Detected",
            "deviceData": 2,
            "location": "Living Room",
            "createdAt": "2023-11-12T14:20:00.000Z",  
            "status": "Alarm"
            },


            {
            "deviveId": 2,
            "deviceType": "heat",
            "deviceName": {
                "name": "Heat Sensor ",
                "ModelNo": "HW-GS153N",
                "Code": "HW-11"
            },
            "deviceDescription": "Heat Detected",
            "deviceData": 3,
            "location": "Kitchen",
            "createdAt": "2023-11-12T14:21:00.000Z",
            "status": "Alarm"
            },

            
            {
            "deviveId": 3,
            "deviceType": "gas",
            "deviceName": {
                "name": "Gas Sensor",
                "ModelNo": "GW-GS529N",
                "Code": "GW-15"
            },
            "deviceDescription": "Gas Detected",
            "deviceData": 1,
            "location": "Bed Room",
            "createdAt": "2023-11-12T14:22:00.000Z",
            "status": "Alarm"
            },

            {
            "deviveId": 4,
            "deviceType": "flame",
            "deviceName": {
                "name": "Flame Sensor",
                "ModelNo": "FW-GS529N",
                "Code": "FW-16"
            },
            "deviceDescription": "Flame Detected",
            "deviceData": 4,
            "location": "Bath Room",
            "createdAt": "2023-11-12T14:23:00.000Z",
            "status": "Alarm"
            },
            {
            
                "deviveId": 5,
                "deviceType": "smoke",
                "deviceName": {
                "name": "Smoke Sensor",
                "ModelNo": "SW-GS529N",
                "Code": "SW-13"
                },
                "deviceDescription": "Smoke Detected",
                "deviceData": 2,
                "location": "Living Room",
                "createdAt": "2023-11-12T14:20:00.000Z",  
                "status": "Alarm"
            },
            {
                "deviveId": 6,
                "deviceType": "heat",
                "deviceName": {
                "name": "Heat Sensor ",
                "ModelNo": "HW-GS153N",
                "Code": "HW-11"
                },
                "deviceDescription": "Heat Detected",
                "deviceData": 3,
                "location": "Kitchen",
                "createdAt": "2023-11-12T14:21:00.000Z",
                "status": "Alarm"
            },
            {
                "deviveId": 7,
                "deviceType": "gas",
                "deviceName": {
                "name": "Gas Sensor",
                "ModelNo": "GW-GS529N",
                "Code": "GW-15"
                },
                "deviceDescription": "Gas Detected",
                "deviceData": 1,
                "location": "Bed Room",
                "createdAt": "2023-11-12T14:22:00.000Z",
                "status": "Alarm"
            },
            {
                "deviveId": 8,
                "deviceType": "flame",
                "deviceName": {
                "name": "Flame Sensor",
                "ModelNo": "FW-GS529N",
                "Code": "FW-16"
                },
                "deviceDescription": "Flame Detected",
                "deviceData": 4,
                "location": "Bath Room",
                "createdAt": "2023-11-12T14:23:00.000Z",
                "status": "Alarm"
            },
        
      
   
]
const dummyData = {alertHistory, chartOptions};

export default dummyData;
