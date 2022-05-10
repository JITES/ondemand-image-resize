# CloudCorp Image Resize - On Demand

## About the API
A service that exposes an API implementing an on-demand resize transformation.
## Flow chart
![Alt text](image-resizer.png "Image Resize")

## Installation

To make the application run, we have to install the dependencies by running the following script. 

- Run ``` docker-compose up ```

### Test
- Run ``` npm test ``` to execute test
### Execute a sample request
If developer is using VSCODE with REST client plugin, we can use REST/resize.http file to make sample request.

### Assumptions
- User will make a GET call to http://api.domain.com/resize?url=valid-cdn-link&height=100&width=100
- User will pass valid image url along with height and width
- User will call api to render image in html img tag

### About project
- Express, Sharp
- Express-validator
### Feedback
Please feel free to share feedback jitesh.srivastava@gmail.com
