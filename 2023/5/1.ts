type SeedRange = {
  start: number;
  end: number;
  difference: number;
};

type Mappings = {
  seeds: number[];
  seedToSoilMap: SeedRange[];
  soilToFertilizerMap: SeedRange[];
  fertilizerToWaterMap: SeedRange[];
  waterToLightMap: SeedRange[];
  lightToTemperatureMap: SeedRange[];
  temperatureToHumidityMap: SeedRange[];
  humidityToLocationMap: SeedRange[];
};

function calculateMinimumSeedLocation(
  mappings: Mappings,
): number {
    return mappings.seeds.reduce((carry, seed) => {
        const soil = calculateSeedLocation(seed, mappings.seedToSoilMap);
        const fertilizer = calculateSeedLocation(soil, mappings.soilToFertilizerMap);
        const water = calculateSeedLocation(fertilizer, mappings.fertilizerToWaterMap);
        const light = calculateSeedLocation(water, mappings.waterToLightMap);
        const temperature = calculateSeedLocation(light, mappings.lightToTemperatureMap);
        const humidity = calculateSeedLocation(temperature, mappings.temperatureToHumidityMap);
        const location = calculateSeedLocation(humidity, mappings.humidityToLocationMap);

        return Math.min(location, carry);
    }, Infinity);
}

function calculateSeedLocation(seed: number, mappings: SeedRange[]): number {
    for(let i=0 ; i<mappings.length ; i++) {
        if (seed >= mappings[i].start && seed <= mappings[i].end) {
            return seed + mappings[i].difference;
        }
    }

    return seed;
}

function parseInputs(file: string): Mappings {
  const fs = require("fs");

  const seedMappingFile = fs.readFileSync(file, "utf-8");

  const seedMapping = seedMappingFile.split(/\r?\n/);

  const mappings: Mappings = {
    seeds: seedMapping[0].split(":")[1].split(" ").slice(1).map(Number),
    seedToSoilMap: [],
    soilToFertilizerMap: [],
    fertilizerToWaterMap: [],
    waterToLightMap: [],
    lightToTemperatureMap: [],
    temperatureToHumidityMap: [],
    humidityToLocationMap: [],
  };

  for (let i = 0; i < seedMapping.length; i++) {
    if (seedMapping[i].length === 0) {
      continue;
    }

    const seedMappingSections = seedMapping[i].split(" ");
    switch (seedMappingSections[0]) {
      case "seed-to-soil":
        i = parseMapping(seedMapping, i + 1, mappings.seedToSoilMap);
        break;
      case "soil-to-fertilizer":
        i = parseMapping(seedMapping, i + 1, mappings.soilToFertilizerMap);
        break;
      case "fertilizer-to-water":
        i = parseMapping(seedMapping, i + 1, mappings.fertilizerToWaterMap);
        break;
      case "water-to-light":
        i = parseMapping(seedMapping, i + 1, mappings.waterToLightMap);
        break;
      case "light-to-temperature":
        i = parseMapping(seedMapping, i + 1, mappings.lightToTemperatureMap);
        break;
      case "temperature-to-humidity":
        i = parseMapping(seedMapping, i + 1, mappings.temperatureToHumidityMap);
        break;
      case "humidity-to-location":
        i = parseMapping(seedMapping, i + 1, mappings.humidityToLocationMap);
        break;
    }
  }

  return mappings;
}

function parseMapping(
  seedMapping: string,
  index: number,
  farmMap: SeedRange[]
): number {
  while (seedMapping[index].length !== 0) {
    const seedRange = seedMapping[index].split(" ");

    const destination = Number(seedRange[0]);
    const source = Number(seedRange[1]);
    const length = Number(seedRange[2]);

    const range: SeedRange = {
      start: source,
      end: source + length - 1,
      difference: destination - source,
    };

    farmMap.push(range);
    index++;
  }

  return index;
}
console.log(calculateMinimumSeedLocation(parseInputs("input.txt")));
