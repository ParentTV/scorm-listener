# ParentTV Scorm Listener

Use scorm-listener.js to receive SCORM API messages from an embedded SCORM package.

```html

<html>
<head>
    <script src="scorm-listener.js"></script>
    <script>
        const api = new ScormListener("scorm", "");
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