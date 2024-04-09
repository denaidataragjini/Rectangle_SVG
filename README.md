#  SVG Rectangle Drawing Webpage
This project allows users to draw and resize SVG rectangles on a webpage, displaying the perimeter of 
the rectangle and updating the dimensions in a JSON file using Angular (frontend) and C# (backend).

## Requirements
- Node.js, Angular CLI and npm should be installed to run the Angular frontend.
- .NET Core SDK and Runtime (version 8) should be installed to run the C# backend.

## Installation
1. Clone the repository:
2. Frontend Setup (Angular):
    - cd --frontend directory--
    - **npm install**
3. Backend Setup (C#):
    - cd --backend directory--
    - dotnet restore
    - dotnet run
    - Configure Startup Projects as Multiple to run back and front in the same time.
    - Run directly from Visual Studio

## Usage
1. Access the application in a web browser at http://localhost:4200.
2. The initial dimensions of the SVG figure will be loaded from RectangleSVGData.json automatically.
3. Click and drag to resize the rectangle on the webpage (instructions are written in the webpage).
4. The perimeter of the rectangle will be displayed next to the figure.
5. After resizing, click button Reset SVG Data and the updated dimensions will be saved back to RectangleSVGData.json via the API.
   
## Folder Structure
- rectangle_svg.client/: Contains the Angular frontend code.
    - src/app/components/: Contains components for pop up confirmation dialog and toast.
    - src/app/environments/: Contain the environment adding the app url.
    - src/app/interfaces/: Contains the models of representing data.
    - src/app/services/: Contains the services to make APIs.
    - src/app/views/: Contains the views represented in the webpage like landing page and rectangle draw.
    
- Rectangle_SVG.Server/: Contains the C# backend code for handling JSON file updates.
    - BLL/: Contains business logic (Interfaces and Services).
    - Controllers/: Contains the controllers to handle apis.
    - Data/: Contain the json file with the initial dimensions.
    - DTO/: Contains the models of representing data.
    - Extensions/: Contains startup extension for injecting services and also adding cors.

## API Endpoints
- GET /api/RectangleSVG: Retrieves the initial dimensions from RectangleSVGData.json.
- PUT /api/RectangleSVG: Updates the dimensions in RectangleSVGData.json with new values.


## Technologies Used
- Angular
- TypeScript
- ASP.NET Core (C#)
- HTML/CSS
- SVG
