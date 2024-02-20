// generateIconMapping.js
const fs = require('fs');
const path = require('path');

const iconsDirectory = path.join(__dirname, 'src/assets/icons/food');
const outputPath = path.join(__dirname, 'src/components/foodIcons.ts');

// Start the generated file content
let output = `import { FC } from "react";
import { SvgProps } from "react-native-svg";
`;

// Read the icons directory and filter out .svg files
const iconFiles = fs.readdirSync(iconsDirectory).filter(file => file.endsWith('.svg'));

// Generate the import statements and the mapping object entries
iconFiles.forEach(file => {
  const iconName = file.split('.')[0].replace(/ /g, ''); // Remove spaces for variable name
  const importName = iconName.charAt(0).toUpperCase() + iconName.slice(1); // Ensure PascalCase

  output += `import ${importName} from "../assets/icons/food/${file}";\n`;
});

output += `\nexport type IconMapping = { [key: string]: FC<SvgProps>; };\n\n`;

output += `export const foodIcons: IconMapping = {\n`;

iconFiles.forEach(file => {
  const iconName = file.split('.')[0].replace(/ /g, ''); // Remove spaces for variable name
  const importName = iconName.charAt(0).toUpperCase() + iconName.slice(1); // Ensure PascalCase

  output += `  "${iconName}": ${importName},\n`;
});

output += `};\n`;

// Write the file content to the output file
fs.writeFileSync(outputPath, output);

console.log(`Generated foodIcons.ts with ${iconFiles.length} icons`);
