### Scripts to setup and test the project
- **Install:** `npm install`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Prettify:** `npm run prettify`
- **Run jasmine tests:** `npm run test`
- **Start server:** `npm run start`

### Usage
The server runs on localhost:3000

#### Access the Web App
Open: [http://localhost:3000/](http://localhost:3000/)

#### Resize Images Endpoint
Endpoint URL: [http://localhost:3000/api/images](http://localhost:3000/api/images)

**Query Parameters:**
- **filename**: Name of the image file 
- **width**: Desired width in pixels (must be a positive number)
- **height**: Desired height in pixels (must be a positive number)

**Examples:**

1. **List available image names:**
   ```
   http://localhost:3000/api/images
   ```
   Displays a list of available image names.

2. **Display original image:**
   ```
   http://localhost:3000/api/images?filename=fjord
   ```
   Displays the original `fjord` image.

3. **Resize image:**
   ```
   http://localhost:3000/api/images?filename=fjord&width=200&height=200
   ```
   Resizes the `fjord` image to 200x200 pixels and stores the resulting image. Subsequent calls will serve the resized image from cache.

4. **Invalid width parameter:**
   ```
   http://localhost:3000/api/images?filename=fjord&width=-200&height=200
   ```
   Displays a hint indicating the invalid width parameter.

5. **Missing height parameter:**
   ```
   http://localhost:3000/api/images?filename=fjord&width=200
   ```
   Displays a tip indicating the missing height parameter.

### Notes
- Images are served from `assets/images/full`. Additional images can be placed in this directory, trying to add any file other than .jpg will result into an error and wont get uploaded.
- Resized images are stored in `assets/images/thumb`. Deleting images from this directory will cause them to be re-created on subsequent requests to the same endpoint.
- In the web app, The Filename box in the resize section is Case-sensitive, adding a space or a capital letter will result in an error.
