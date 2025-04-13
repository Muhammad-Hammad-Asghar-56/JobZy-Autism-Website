const generateRandomCoordinates = () => {
    return {
        longitude: (Math.random() * 360 - 180).toFixed(6), // Range: -180 to 180
        latitude: (Math.random() * 180 - 90).toFixed(6),   // Range: -90 to 90
    };
};
const generateRandomHealth = () => {
    return (Math.random() * 100).toFixed(); // Random health between 0 - 100%
};
const binLocationData = [
    {
        "bin_id": "bin_001",
        "locationSrc": "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d11819.989538560885!2d-3.177271328683389!3d51.479328005183326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCardiff%20garbage%20box!5e0!3m2!1sen!2s!4v1741611877622!5m2!1sen!2s",
        "health": generateRandomHealth(),
        "address": "Cardiff, CF10 3QN, UK",
        "bin_img": "../src/assets/images/bin/bin1.jpg",
        "next_Waste_Estimated_Time": "30:00:00",
        ...generateRandomCoordinates(),

    },
    {
        "bin_id": "bin_002",
        "locationSrc": "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d11821.101591588094!2d-3.164563555738359!3d51.47503688400598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCardiff%20garbage%20box!5e0!3m2!1sen!2s!4v1741611830852!5m2!1sen!2s",
        "health": generateRandomHealth(),
        "address": "Adamsdown, Cardiff, UK",
        "next_Waste_Estimated_Time": "30:00:00",
        "bin_img": "../src/assets/images/bin/bin2.jpg",
        ...generateRandomCoordinates()
    },
    {
        "bin_id": "bin_003",
        "health": generateRandomHealth(),
        "locationSrc": "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d4970.406400466779!2d-3.184866843954051!3d51.472784358367065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCardiff%20garbage%20box!5e0!3m2!1sen!2s!4v1741611957265!5m2!1sen!2s",
        "address": "26-2 Coedcae St, Cardiff CF11 7AA, UK",
        "next_Waste_Estimated_Time": "30:00:00",
        "bin_img": "../src/assets/images/bin/bin3.jpg",
        ...generateRandomCoordinates()
    },
    {
        "bin_id": "bin_004",
        "health": generateRandomHealth(),
        "locationSrc": "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d11819.64357432384!2d-3.1871211285966035!3d51.48066293832666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCardiff%20garbage%20box!5e0!3m2!1sen!2s!4v1741611915301!5m2!1sen!2s",
        "address": "Cowbridge Rd E, Cardiff CF11 9AG, UK",
        "next_Waste_Estimated_Time": "30:00:00",
        "bin_img": "../src/assets/images/bin/bin4.jpg",
        ...generateRandomCoordinates()
    },
    {
        "bin_id": "bin_005",
        "health": generateRandomHealth(),
        "locationSrc": "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2955.0804320688694!2d-3.192235138353346!3d51.478046198934855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCardiff%20garbage%20box!5e0!3m2!1sen!2s!4v1741612021307!5m2!1sen!2s",
        "address": "Riverside, Cardiff CF11 6LE, UK",
        "next_Waste_Estimated_Time": "30:00:00",
        "bin_img": "../src/assets/images/bin/bin5.png",
        ...generateRandomCoordinates()
    }
];

export default binLocationData;
