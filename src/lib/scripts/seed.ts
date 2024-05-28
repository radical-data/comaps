import { writeFileSync } from 'fs';

// Configuration
const NUM_MAPS = 5;
const NUM_SUBMISSIONS_PER_MAP = 100;
const RANDOM_WORD_API = 'https://random-word-api.herokuapp.com/word';
const PICSUM_BASE_URL = 'https://picsum.photos';

// Utility functions
const getRandomWords = async (num: number): Promise<string[]> => {
    const response = await fetch(`${RANDOM_WORD_API}?number=${num}`);
    const words = await response.json();
    return words;
};

const getRandomHash = (length = 6): string => {
    return Math.random().toString(36).substring(2, 2 + length);
};

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Generate maps data
const generateMaps = async (numMaps: number): Promise<Map[]> => {
    const maps: Map[] = [];
    for (let i = 0; i < numMaps; i++) {
        const name = `${await getRandomWords(3)}`;
        const domain = getRandomHash();
        const description = `This is a map about ${await getRandomWords(5)}`;
        maps.push({ id: generateUUID(), name, domain, description, style: '' });
    }
    return maps;
};

// Generate data submissions for each map
const generateDataSubmissions = async (mapId: string, numSubmissions: number): Promise<DataSubmission[]> => {
    const words = await getRandomWords(numSubmissions * 2); // Get enough words for text and other content
    const submissions: DataSubmission[] = [];
    for (let i = 0; i < numSubmissions; i++) {
        const dataType = ['text', 'photo', 'counter', 'audio'][getRandomInt(0, 3)];
        let dataContent: string;
        switch (dataType) {
            case 'text':
                dataContent = words[i];
                break;
            case 'photo':
                dataContent = `${PICSUM_BASE_URL}/${getRandomInt(100, 500)}/${getRandomInt(100, 500)}`;
                break;
            case 'counter':
                dataContent = `Counter value ${i}`;
                break;
            case 'audio':
                dataContent = words[i]; // Placeholder for audio content
                break;
            default:
                dataContent = '';
        }
        const latitude = (Math.random() * 180 - 90).toFixed(6); // Random latitude
        const longitude = (Math.random() * 360 - 180).toFixed(6); // Random longitude
        const location = `SRID=4326;POINT(${longitude} ${latitude})`; // PostGIS format for POINT
        const timestamp = new Date(Date.now() - getRandomInt(0, 10000000000)).toISOString(); // Random past date
        submissions.push({ id: generateUUID(), map_id: mapId, data_type: dataType, data_content: dataContent, location, timestamp, created_at: new Date().toISOString() });
    }
    return submissions;
};

// Generate SQL script
const generateSQL = async () => {
    const maps = await generateMaps(NUM_MAPS);
    let sql = '';

    // Insert maps
    maps.forEach((map) => {
        sql += `INSERT INTO maps (id, name, domain, description, style, created_at, last_modified) VALUES ('${map.id}', '${map.name}', '${map.domain}', '${map.description}', '${map.style}', '${new Date().toISOString()}', '${new Date().toISOString()}');\n`;
    });

    // Insert data submissions
    for (let i = 0; i < maps.length; i++) {
        const submissions = await generateDataSubmissions(maps[i].id, NUM_SUBMISSIONS_PER_MAP);
        submissions.forEach(sub => {
            sql += `INSERT INTO data_submissions (id, map_id, data_type, data_content, location, timestamp, created_at, submitted_by) VALUES ('${sub.id}', '${sub.map_id}', '${sub.data_type}', '${sub.data_content}', '${sub.location}', '${sub.timestamp}', '${sub.created_at}', 'anonymous');\n`;
        });
    }

    writeFileSync('supabase/seed.sql', sql);
};

// Type Definitions
interface Map {
    id: string;
    name: string;
    domain: string;
    description: string;
    style: string;
}

interface DataSubmission {
    id: string;
    map_id: string;
    data_type: string;
    data_content: string;
    location: string;
    timestamp: string;
    created_at: string;
}

// Execute the script
generateSQL()
    .then(() => {
        console.log('Seed data generated successfully.');
    })
    .catch(err => {
        console.error('Error generating seed data:', err);
    });
