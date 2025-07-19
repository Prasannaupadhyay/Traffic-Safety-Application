# Urban Traffic Management System

## Overview
The Urban Traffic Management System is a web-based application designed to monitor traffic conditions, highlight high-risk zones, and provide emergency service contacts. It includes user authentication with distinct roles (user and admin) and utilizes localStorage for persistent data storage. The application features a Leaflet-based interactive map for visualizing high-risk zones and supports dynamic updates for traffic information and high-risk zones.

## Features
- **User Authentication**: Supports login for 'user' and 'admin' roles with credentials stored in localStorage.
- **Interactive Map**: Displays high-risk zones using Leaflet with OpenStreetMap tiles, centered on Kathmandu (27.7172, 85.3240).
- **Traffic Updates**: View and manage real-time traffic updates (admin only for management).
- **High-Risk Zones**: Add, update, and remove high-risk zones with coordinates and descriptions (admin only for management).
- **Emergency Services**: Provides quick access to emergency contact numbers.
- **Responsive Navigation**: Sections (Dashboard, Traffic Updates, High-Risk Zones, Emergency) are toggled via navigation links.
- **Admin Controls**: Admins can add, update, or remove traffic updates and high-risk zones, with changes reflected dynamically.

## Technologies Used
- **HTML/CSS/JavaScript**: Core web technologies for structure, styling, and interactivity.
- **Leaflet.js**: For rendering interactive maps with OpenStreetMap tiles.
- **Font Awesome**: For icons used in the UI.
- **localStorage**: For persistent storage of user roles, traffic updates, and high-risk zones.
- **Bootstrap**: For responsive styling (assumed from class names like `card`, though not explicitly included in provided code).

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/urban-traffic-management.git
   cd urban-traffic-management
   ```
2. **Serve the Application**:
   - Use a local web server (e.g., `live-server` for VS Code, or Python's `http.server`):
     ```bash
     python -m http.server 8000
     ```
   - Alternatively, open `index.html` directly in a browser (note: some features may be restricted due to CORS).
3. **Access the Application**:
   - Navigate to `http://localhost:8000/login.html` in your browser.
   - Login credentials:
     - **User**: username: `user`, password: `pass`
     - **Admin**: username: `admin`, password: `pass`

## Usage
- **Login**: Enter credentials on the login page to access the main dashboard.
- **Navigation**: Use the top navigation bar to switch between Dashboard, Traffic Updates, High-Risk Zones, and Emergency sections.
- **Admin Features**:
  - In the Admin Controls section (visible only to admin users), add or update high-risk zones with coordinates (format: `lat, lng`) and descriptions.
  - Add or remove traffic updates.
  - Clear all data via the "Clear Local Storage" button (irreversible).
- **Map Interaction**: View high-risk zones as markers on the map with popups showing descriptions.
- **Emergency Services**: Access emergency contact numbers directly from the Emergency section.

## File Structure
- `index.html`: Main application page with navigation and sections for Dashboard, Traffic Updates, High-Risk Zones, Emergency, and Admin Controls.
- `login.html`: Login page for user authentication.
- `script.js`: JavaScript file handling authentication, map initialization, data management, and UI interactions.
- `styles.css` (assumed): Stylesheet for layout and design (not provided but referenced implicitly).

## Notes
- The application uses localStorage for data persistence, which is suitable for small-scale use but not for production environments requiring scalability or security.
- The map is centered on Kathmandu by default. Adjust the coordinates in `script.js` (`initializeMap`) for other regions.
- Ensure an internet connection for loading Leaflet tiles and Font Awesome icons.
- No backend is implemented; all data is stored client-side in localStorage.

## Future Improvements
- Integrate a backend (e.g., Node.js, Express) for secure data storage and user management.
- Add real-time traffic data via APIs (e.g., Google Maps Traffic API).
- Implement input validation for coordinates using a map-based picker.
- Enhance security for authentication (e.g., hashing passwords, session management).
- Add unit tests for JavaScript functions using a framework like Jest.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License.