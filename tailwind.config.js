import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

export default {
  darkMode: 'class',
  content: {
    extract
  },
  theme: {
    screens,
    fontSize
  },
  // Plugins
  plugins: [
    fluid
  ]
}