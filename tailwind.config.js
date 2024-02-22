/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {body: ['HBO Max', 'sans-serif'], main: ['Roboto', 'sans-serif'], got: ['Game of Thrones'],
    ram: ['Kricky']} ,
      backgroundColor: ['active'],
      colors: {
        'transparent-gray': 'rgba(112, 128, 144, 0.5)', 
        'transparent-gray-scroll': 'rgba(0, 0, 0, 0.95)', 
      },
    }
  },
  plugins: [ require('flowbite/plugin') ],
}