# ParentTV SCORM Listener

Use the ParentTV SCORM Listener to receive SCORM 2004 API messages from an embedded SCORM package.
The listener can be included from `https://cdn.jsdelivr.net/gh/ParentTV/scorm-listener/index.js`
## Usage
To enable SCORM API communication, embed links must be appended with `?scorm=true`. 
Embed links with this parameter, but no listener initialised will not load. To initalise
the listener, create a new listener like this:
```html
const api = new ScormListener(embedIFrameID, cmiData)
```
Where:
* `embedIFrameID` is the ID selector for the iFrame holding the embed
* `cmiData` is a serialised JSON object holding any pre-loaded learner data. It is not required.  
For more information on SCORM CMI data, please refer to [the SCORM runtime reference](https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/). 
## Example Usage
```html

<html>
<head>
    <script src="https://cdn.jsdelivr.net/gh/ParentTV/scorm-listener/index.js"></script>
    <script>
        const api = new ScormListener("scorm");
        api.on("SetValue", (data) => {
            /* data = {
                    method: "SetValue",
                    param: a cmi path, e.g. "cmi.location,
                    value: the value being set, e.g. "1/1,
                    cmi: the current state of the scorm data model, including the value
                         which has just been set.
                }

                Set a given value in your system's copy of the cmi data.
            */
        })
        api.on("Commit", (data) => {
            /* data = {
                    method: "Commit",
                    cmi: the current state of the scorm data model.
               }

               Confirms that the current state is correct.
             */
        });
        api.on("Terminate", (data) => {
            /* data = {
                    method: "Terminate"
                }
                This is the exit signal from the package. You may remove the iframe,
                or redirect somewhere now.
             */
            window.location.href = "https://somewhere.else.com"
        });
    </script>
    ...
</head>
<body>
...
<iframe src="https://dam.parenttv.com/embed/<licenseKey>/<assetID>" id="scorm"/>
...
</body>
</html>

```