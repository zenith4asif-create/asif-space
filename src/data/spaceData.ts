export interface Destination {
  id: string;
  name: string;
  slug: string;
  htmlFile: string;
  images: {
    png: string;
    webp: string;
  };
  description: string;
  distance: string;
  travel: string;
  gravity?: string;
  temperature?: string;
  orbitalPeriod?: string;
  funFact?: string;
}

export interface CrewMember {
  id: string;
  name: string;
  slug: string;
  htmlFile: string;
  images: {
    png: string;
    webp: string;
  };
  role: string;
  bio: string;
  nationality?: string;
  missions?: string[];
  launchYear?: string;
}

export interface Technology {
  id: string;
  step: number;
  name: string;
  slug: string;
  htmlFile: string;
  images: {
    portrait: string;
    landscape: string;
  };
  description: string;
  specs?: {
    height?: string;
    diameter?: string;
    mass?: string;
    payloadToLEO?: string;
    stages?: string;
  };
}

export interface SpaceData {
  destinations: Destination[];
  crew: CrewMember[];
  technology: Technology[];
}

export const spaceData: SpaceData = {
  destinations: [
    {
      id: "moon",
      name: "Moon",
      slug: "moon",
      htmlFile: "destination-moon.html",
      images: {
        png: "/assets/destination/image-moon.png",
        webp: "/assets/destination/image-moon.webp",
      },
      description:
        "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
      distance: "384,400 km",
      travel: "3 days",
      gravity: "0.166 g",
      temperature: "-130°C to +120°C",
      orbitalPeriod: "27.3 Earth days",
      funFact: "Apollo 11 astronaut footprints will stay intact for millions of years due to lack of atmosphere."
    },
    {
      id: "mars",
      name: "Mars",
      slug: "mars",
      htmlFile: "destination-mars.html",
      images: {
        png: "/assets/destination/image-mars.png",
        webp: "/assets/destination/image-mars.webp",
      },
      description:
        "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
      distance: "225 mil. km",
      travel: "9 months",
      gravity: "0.38 g",
      temperature: "-63°C avg",
      orbitalPeriod: "687 Earth days",
      funFact: "Sunsets on Mars appear distinctly blue because dust particles scatter red light away."
    },
    {
      id: "europa",
      name: "Europa",
      slug: "europa",
      htmlFile: "destination-europa.html",
      images: {
        png: "/assets/destination/image-europa.png",
        webp: "/assets/destination/image-europa.webp",
      },
      description:
        "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
      distance: "628 mil. km",
      travel: "3 years",
      gravity: "0.134 g",
      temperature: "-170°C avg",
      orbitalPeriod: "3.5 Earth days",
      funFact: "Europa harbors a global subsurface liquid ocean with twice the volume of Earth's oceans combined."
    },
    {
      id: "titan",
      name: "Titan",
      slug: "titan",
      htmlFile: "destination-titan.html",
      images: {
        png: "/assets/destination/image-titan.png",
        webp: "/assets/destination/image-titan.webp",
      },
      description:
        "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
      distance: "1.6 bil. km",
      travel: "7 years",
      gravity: "0.14 g",
      temperature: "-179°C",
      orbitalPeriod: "15.9 Earth days",
      funFact: "Atmospheric density is 50% greater than Earth's, allowing human flight with simple strap-on wings."
    },
  ],
  crew: [
    {
      id: "douglas-hurley",
      name: "Douglas Hurley",
      slug: "commander",
      htmlFile: "crew-commander.html",
      images: {
        png: "/assets/crew/image-douglas-hurley.png",
        webp: "/assets/crew/image-douglas-hurley.webp",
      },
      role: "Commander",
      bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
      nationality: "United States",
      missions: ["STS-127", "STS-135", "Crew Dragon Demo-2"],
      launchYear: "2020",
    },
    {
      id: "mark-shuttleworth",
      name: "Mark Shuttleworth",
      slug: "specialist",
      htmlFile: "crew-specialist.html",
      images: {
        png: "/assets/crew/image-mark-shuttleworth.png",
        webp: "/assets/crew/image-mark-shuttleworth.webp",
      },
      role: "Mission Specialist",
      bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
      nationality: "South Africa / UK",
      missions: ["Soyuz TM-34", "ISS Expedition 4/5 Visit"],
      launchYear: "2002",
    },
    {
      id: "victor-glover",
      name: "Victor Glover",
      slug: "pilot",
      htmlFile: "crew-pilot.html",
      images: {
        png: "/assets/crew/image-victor-glover.png",
        webp: "/assets/crew/image-victor-glover.webp",
      },
      role: "Pilot",
      bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18. He was a crew member of Expedition 64, and served as a station systems flight engineer.",
      nationality: "United States",
      missions: ["SpaceX Crew-1", "Expedition 64/65", "Artemis II (Assigned)"],
      launchYear: "2020",
    },
    {
      id: "anousheh-ansari",
      name: "Anousheh Ansari",
      slug: "engineer",
      htmlFile: "crew-engineer.html",
      images: {
        png: "/assets/crew/image-anousheh-ansari.png",
        webp: "/assets/crew/image-anousheh-ansari.webp",
      },
      role: "Flight Engineer",
      bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
      nationality: "United States / Iran",
      missions: ["Soyuz TMA-9", "ISS Expedition 14"],
      launchYear: "2006",
    },
  ],
  technology: [
    {
      id: "launch-vehicle",
      step: 1,
      name: "Launch vehicle",
      slug: "vehicle",
      htmlFile: "technology-vehicle.html",
      images: {
        portrait: "/assets/technology/image-launch-vehicle-portrait.jpg",
        landscape: "/assets/technology/image-launch-vehicle-landscape.jpg",
      },
      description:
        "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
      specs: {
        height: "150 m",
        diameter: "9.0 m",
        mass: "5,000,000 kg",
        payloadToLEO: "150,000 kg",
        stages: "2 Stages (Reusable)",
      },
    },
    {
      id: "spaceport",
      step: 2,
      name: "Spaceport",
      slug: "spaceport",
      htmlFile: "technology-spaceport.html",
      images: {
        portrait: "/assets/technology/image-spaceport-portrait.jpg",
        landscape: "/assets/technology/image-spaceport-landscape.jpg",
      },
      description:
        "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
      specs: {
        height: "Launch Pad 39A",
        diameter: "Cape Canaveral, Florida",
        mass: "Latitude 28.5° N",
        payloadToLEO: "Dual Heavy Mounts",
        stages: "Autonomous Drone Recovery",
      },
    },
    {
      id: "space-capsule",
      step: 3,
      name: "Space capsule",
      slug: "capsule",
      htmlFile: "technology-capsule.html",
      images: {
        portrait: "/assets/technology/image-space-capsule-portrait.jpg",
        landscape: "/assets/technology/image-space-capsule-landscape.jpg",
      },
      description:
        "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
      specs: {
        height: "8.1 m",
        diameter: "4.0 m",
        mass: "12,500 kg pressurized",
        payloadToLEO: "Up to 7 Crew Passengers",
        stages: "PICA-X Thermal Shield",
      },
    },
  ],
};
