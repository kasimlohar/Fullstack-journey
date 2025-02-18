# WeatherWise 🌦️

WeatherWise is a simple yet powerful weather application built with React that provides real-time weather information for cities worldwide. It utilizes the OpenWeatherMap API to fetch and display weather data in a clean and user-friendly interface.

![image](https://github.com/user-attachments/assets/cfd7b55b-7a24-429b-b82b-5fd00e93908e)

 <!-- Add a screenshot if available -->

## Features ✨

- **Real-time Weather Data**: Get up-to-date weather information for any city.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Detailed Weather Information**:
  - Current temperature
  - Feels-like temperature
  - Humidity levels
  - Minimum and maximum temperatures
  - Weather conditions description
- **Dynamic Backgrounds**: Visual representations based on current weather conditions.
- **Error Handling**: User-friendly error messages for invalid city names or API issues.
- **Accessibility**: Built with accessibility in mind, following best practices.

## Technologies Used 🛠️

- **Frontend**: React.js
- **UI Library**: Material-UI (MUI)
- **API**: OpenWeatherMap API
- **Styling**: CSS
- **Build Tool**: Vite

## Installation 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weatherwise.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weatherwise
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and visit `http://localhost:5173`

## Usage 📖

1. Enter a city name in the search box
2. Press "Get Weather" or hit Enter
3. View the current weather information for your selected city

## Project Structure 📂

```
weatherwise/
├── public/
├── src/
│   ├── components/
│   │   ├── InfoBox.jsx
│   │   ├── SearchBox.jsx
│   │   └── WeatherApp.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── assets/
│   └── styles/
│       ├── App.css
│       ├── InfoBox.css
│       └── SearchBox.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## API Reference 🌐

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You'll need to:

1. Create an account at [OpenWeatherMap](https://openweathermap.org/)
2. Generate an API key
3. Add it to your `.env` file as `VITE_OPENWEATHER_API_KEY`

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- OpenWeatherMap for their free weather API
- Material-UI for their excellent React components
- Vite for the fast development environment

## Screenshots 📷

<!-- Add screenshots here if available -->

## Live Demo 🌍

Check out the live demo: [WeatherWise Live](https://your-deployed-app-url.com)

---

Made with ❤️ by Kasim  | [GitHub Profile](https://github.com/kasim-lohar2)
