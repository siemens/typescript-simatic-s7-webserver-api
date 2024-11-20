# S71500 Web API Client

## Description
The S71500 Web API Client is a TypeScript library designed to interact with the SIMATIC S7 web server. It provides a set of functions to access various features and data from the server.

## Features

### Basic Functions
- **Login**: Allows users to log in to the system.
- **Get Permissions**: Retrieves permissions for the logged-in user.
- **Browse**: Enables browsing through available resources.
- **Version**: Retrieves the version information of the API.
- **Ping**: Checks the availability of the API.
- **Get Certificate URL**: Retrieves the URL for obtaining certificates.
- **Logout**: Logs out the current user.
- **Get Quantity Structures**: Retrieves quantity structures.
- **Change Password**: Allows users to change their passwords.
- **Get Password Policy**: Retrieves the password policy settings.
- **Get Authentication Mode**: Retrieves the authentication mode settings.

*For more detailed information, please refer to the [documentation](/docs/modules/api.md).*

### Setting Web Server Defaults
- **Set Default Page**: Sets the default page for the web server.
- **Read Default Page**: Retrieves the default page settings.

*For more detailed information, please refer to the documentation.*

### Ticket Mechanism
- **Browse Tickets**: Allows browsing through available tickets.
- **Close Ticket**: Closes a specific ticket.

*For more detailed information, please refer to the  [documentation](/docs/modules/ticket.md).*

### Reading and Writing Process Data
- **Read**: Reads process data.
- **Write**: Writes process data.
- **Download Profiling Data**: Downloads profiling data.
- **Browse**: Browses through available PLC programs.

*For more detailed information, please refer to the  [documentation](/docs/modules/plcprogram.md).*

### Reading and Changing Operating Mode
- **Read Operating Mode**: Reads the operating mode.
- **Request Change Operating Mode**: Requests a change in the operating mode.
- **Read Mode Selector State**: Reads the mode selector state.

*For more detailed information, please refer to the  [documentation](/docs/modules/plc.md).*

### Performing Time Settings
- **Read System Time**: Reads the system time.
- **Set System Time**: Sets the system time.
- **Read Time Settings**: Reads time settings.
- **Set Time Settings**: Sets time settings.

*For more detailed information, please refer to the [documentation](/docs/modules/plc.md).*

### Reading Diagnostics and Service Data
- **Browse Alarms**: Browses through available alarms.
- **Acknowledge Alarms**: Acknowledges alarms.
- **Browse Syslog**: Browses through syslog entries.
- **Browse Diagnostic Buffer**: Browses through diagnostic buffer entries.
- **Download Service Data**: Downloads service data.
- **Read Project Languages**: Reads project languages.

*For more detailed information, please refer to the [documentation](/docs/modules/syslog.md).*

### Backing up and Restoring Configuration
- **Create Backup**: Creates a backup of the configuration.
- **Restore Backup**: Restores a backup of the configuration.

*For more detailed information, please refer to the [documentation](/docs/modules/plc.md).*

### Accessing SIMATIC Memory Card Contents
- **Browse Files**: Browses through available files.
- **Download Files**: Downloads files.
- **Create File**: Creates a new file.
- **Rename File**: Renames a file.
- **Delete File**: Deletes a file.
- **Create Directory**: Creates a new directory.
- **Delete Directory**: Deletes a directory.
- **Download and Clear Data Logs**: Downloads and clears data logs.

*For more detailed information, please refer to the [documentation](/docs/modules/files.md).*

### Reading Information from SIMATIC Safety
- **Read Runtime Groups**: Reads runtime groups.
- **Read Parameters**: Reads parameters.

*For more detailed information, please refer to the [documentation](/docs/modules/failsafe.md).*

### Web Application Management
- **Create Web App**: Creates a new web application.
- **Delete Web App**: Deletes a web application.
- **Rename Web App**: Renames a web application.
- **Browse Web App**: Browses through available web applications.
- **Set Web App State**: Sets the state of a web application.
- **Set Default Page for Web App**: Sets the default page for a web application.
- **Set Not Found Page for Web App**: Sets the not found page for a web application.
- **Set Not Authorized Page for Web App**: Sets the not authorized page for a web application.
- **Browse Web App Resources**: Browses through available resources for a web application.
- **Create Web App Resource**: Creates a new resource for a web application.
- **Delete Web App Resource**: Deletes a resource for a web application.
- **Rename Web App Resource**: Renames a resource for a web application.
- **Download Web App Resource**: Downloads a resource for a web application.
- **Set Resource Visibility for Web App**: Sets the visibility of a resource for a web application.
- **Set Resource ETag for Web App**: Sets the ETag of a resource for a web application.
- **Set Resource Media Type for Web App**: Sets the media type of a resource for a web application.
- **Set Resource Modification Time for Web App**: Sets the modification time of a resource for a web application.

*For more detailed information, please refer to the [documentation](/docs/modules/webApp.md).*

## Usage
To use the S71500 Web API Client, you first need to install the package via npm:

```bash
npm install @siemens/simatic-s7-webserver-api

```

**WARNING - DEPENDENCIES**
Note on ESLint Version Compatibility
When running npm install, you may encounter warnings related to ESLint and its dependencies. This is due to certain devDependencies, such as eslint-config-semistandard and eslint-config-standard, not fully supporting ESLint 9.0.0 yet. These warnings are expected and will persist until the necessary updates are made for compatibility.

To ensure stability, this project is currently using ESLint version 8.57.1 and related configurations. Once support for ESLint 9.0.0 is available across all dependencies, the project will be updated accordingly.

Feel free to follow the progress of updates from these packages to keep track of when ESLint 9.0.0 becomes fully compatible with these configurations.

## Example

In this example, it is shown how to interact with the server using the library. Here, we will do a login with an user previously created in the TIA Portal project with administrative access. 

After a succesfull login, the server will return a token that allows the user to call another methods. In the next lines, a search into the Web Applications is done:

```typescript
import * as client from "@siemens/simatic-s7-webserver-api";
import * as fs from "fs";

const config = new client.request.RequestConfig();
config.address = "192.168.0.1"; //IP address of the PLC
config.protocol = "https"; // Communication protocol
config.verifyTls = true; // Verify TLS Server Certificate.
config.plcCertificate = fs.readFileSync("path/to/certificate.crt"); //Update with your path to the plc certificate.

async function example() {
  const login = await new client.api.ApiLogin(
    config,
    "Admin",
    "12345678Aa",
    false
  ).execute();

  if (login) {
    const token = login.result;
    const searchApps = await new client.webapp.WebAppBrowse(config).execute();

    if (searchApps && searchApps.result) {
      console.log("Max Applications:", searchApps.result.max_applications);
      console.log("Applications:");
      for (const resource of searchApps.result.applications) {
        console.log(resource);
      }
    }
  }
}
```

**WARNING - SECURITY DISCLAIMER**

If you do not have downloaded the PLC certificate or you don't have access to it, you can disable the verifyTls configuration setting it to 'false'. This will allow you to communicate with the server without verification. Remember that this do not follow the security best practices.

After a succesfull communication, the server will return an object compound of various terms: 

- **kind**: an string available to read and that identifies the response when you have multiple requests.

- **id**: the id number of the response, it matches the same id as the request.

- **error**: when an error happens during the communication it will return a message and a code that identifies the error. Check the official WebServer documentation to see the error codes.

- **result**: it depends on the method, this attribute of the object can have different structure. The methods can return a boolean, a string (that is the case of the ApiLogin), an array or another object (that is the case of the WebAppBrowse).

Here it is shown what returns the example in the console:

```
Max Applications: 4
Applications:
Application {name: 'ViewOfThings', state: 'enabled', type: 'vot'}
```

## Bulk requests

To increase the performance of an application you can use a bulk request that with a single header it can perform multiple single requests with different purposes. The goal here is to reduce the communication load of the PLC. In the example provided there are 40 access to read values stored in a DB called DataBuffer with a single bulk request:

```typescript
const paramsArray = [];

// Prepare each parameter set for value and timestamp
for (let i = 0; i < 20; i++) {
  const valueVar = `"DataBuffer".data[${i}].value`;
  const timestampVar = `"DataBuffer".data[${i}].timeStamp`;

  paramsArray.push({ var: valueVar, mode: "simple" });
  paramsArray.push({ var: timestampVar, mode: "simple" });
}

try {
  const responses = await new PlcProgramRead(config, authToken, "").bulkExecute(
    paramsArray
  );
  if (responses) {
    this.dataStructArray = this.parseResponse(responses);
  }
} catch (error) {
  console.error("Error reading data from PLC:", error);
}
```

## License

The S71500 Web API Client is licensed under the MIT License, which means that you are free to get and use it for commercial and non-commercial purposes as long as you fulfill its conditions.

See the [LICENSE.md](LICENSE.md) file for more details.
