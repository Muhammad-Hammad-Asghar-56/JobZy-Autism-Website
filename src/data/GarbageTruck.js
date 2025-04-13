const truck = [
    {
        "bin_location": "Downtown - Main St.",
        "fill_level": 30,
        "estimated_time_until_collection": "01:00:00",
        "Truck_Id": "Truck #12",
        "scheduled_collection": "Today, 3:00 PM"
    },
    {
        "bin_location": "City Park - Sector 3",
        "fill_level": 45,
        "estimated_time_until_collection": "00:20:00",
        "Truck_Id": "Truck #8",
        "scheduled_collection": "Today, 10:00 PM"
    },
    {
        "bin_location": "Residential Block A",
        "fill_level": 92,
        "estimated_time_until_collection": "03:00:00",
        "Truck_Id": "Truck #5",
        "scheduled_collection": "Today, 1:00 PM"
    },
    {
        "bin_location": "Industrial Area 2",
        "fill_level": 45,
        "estimated_time_until_collection": "24:00:00",
        "Truck_Id": "Truck #9",
        "scheduled_collection": "Tomorrow, 10:00 AM"
    },
    {
        "bin_location": "Market District",
        "fill_level": 78,
        "estimated_time_until_collection": "07:00:00",
        "Truck_Id": "Truck #14",
        "scheduled_collection": "Today, 5:30 PM"
    },
    {
        "bin_location": "University Campus",
        "fill_level": 20,
        "estimated_time_until_collection": "36:00:00",
        "Truck_Id": "Truck #7",
        "scheduled_collection": "Tomorrow, 11:00 PM"
    },
    {
        "bin_location": "Hospital - Zone B",
        "fill_level": 30,
        "estimated_time_until_collection": "02:00:00",
        "Truck_Id": "Truck #3",
        "scheduled_collection": "Today, 12:00 PM"
    },
    {
        "bin_location": "Suburban - Sector 4",
        "fill_level": 50,
        "estimated_time_until_collection": "20:00:00",
        "Truck_Id": "Truck #11",
        "scheduled_collection": "Tomorrow, 5:00 AM"
    },
    {
        "bin_location": "Airport Terminal 1",
        "fill_level": 88,
        "estimated_time_until_collection": "04:00:00",
        "Truck_Id": "Truck #2",
        "scheduled_collection": "Today, 2:00 PM"
    },
    {
        "bin_location": "Railway Station",
        "fill_level": 10,
        "estimated_time_until_collection": "08:00:00",
        "Truck_Id": "Truck #6",
        "scheduled_collection": "Today, 6:00 PM"
    },
    {
        "bin_location": "Harbor Dock 3",
        "fill_level": 55,
        "estimated_time_until_collection": "16:00:00",
        "Truck_Id": "Truck #13",
        "scheduled_collection": "Tomorrow, 2:00 AM"
    },
    {
        "bin_location": "Tech Park - Tower 1",
        "fill_level": 40,
        "estimated_time_until_collection": "30:00:00",
        "Truck_Id": "Truck #4",
        "scheduled_collection": "Tomorrow, 7:00 PM"
    },
    {
        "bin_location": "Stadium Parking",
        "fill_level": 96,
        "estimated_time_until_collection": "01:00:00 ",
        "Truck_Id": "Truck #1",
        "scheduled_collection": "Today, 11:00 AM"
    },
    {
        "bin_location": "Mall - South Gate",
        "fill_level": 82,
        "estimated_time_until_collection": "06:00:00",
        "Truck_Id": "Truck #15",
        "scheduled_collection": "Today, 4:00 PM"
    },
    {
        "bin_location": "Hotel District - Block C",
        "fill_level": 67,
        "estimated_time_until_collection": "10:00:00",
        "Truck_Id": "Truck #10",
        "scheduled_collection": "Today, 9:00 PM"
    },
    {
        "bin_location": "Zoo Entrance",
        "fill_level": 58,
        "estimated_time_until_collection": "18:00:00",
        "Truck_Id": "Truck #9",
        "scheduled_collection": "Tomorrow, 12:00 AM"
    },
    {
        "bin_location": "Convention Center",
        "fill_level": 79,
        "estimated_time_until_collection": "07:00:00",
        "Truck_Id": "Truck #5",
        "scheduled_collection": "Today, 5:00 PM"
    },
    {
        "bin_location": "Library Avenue",
        "fill_level": 35,
        "estimated_time_until_collection": "34:00:00",
        "Truck_Id": "Truck #8",
        "scheduled_collection": "Tomorrow, 10:00 PM"
    },
    {
        "bin_location": "Residential Block B",
        "fill_level": 91,
        "estimated_time_until_collection": "03:00:00",
        "Truck_Id": "Truck #6",
        "scheduled_collection": "Today, 1:30 PM"
    },
    {
        "bin_location": "Business District - Tower 3",
        "fill_level": 47,
        "estimated_time_until_collection": "25:00:00",
        "Truck_Id": "Truck #12",
        "scheduled_collection": "Tomorrow, 9:00 AM"
    },
    {
        "bin_location": "Food Street",
        "fill_level": 99,
        "estimated_time_until_collection": "00:30:00 ",
        "Truck_Id": "Truck #14",
        "scheduled_collection": "Today, 10:30 AM"
    },
    {
        "bin_location": "High School",
        "fill_level": 63,
        "estimated_time_until_collection": "12:00:00",
        "Truck_Id": "Truck #3",
        "scheduled_collection": "Today, 10:00 PM"
    },
    {
        "bin_location": "Parking Lot - Block D",
        "fill_level": 76,
        "estimated_time_until_collection": "08:00:00",
        "Truck_Id": "Truck #7",
        "scheduled_collection": "Today, 6:00 PM"
    },
    {
        "bin_location": "Metro Station",
        "fill_level": 81,
        "estimated_time_until_collection": "06:00:00",
        "Truck_Id": "Truck #11",
        "scheduled_collection": "Today, 4:30 PM"
    },
    {
        "bin_location": "Beachfront Promenade",
        "fill_level": 90,
        "estimated_time_until_collection": "03:00:00",
        "Truck_Id": "Truck #4",
        "scheduled_collection": "Today, 12:30 PM"
    },
    {
        "bin_location": "University Campus - Dorms",
        "fill_level": 72,
        "estimated_time_until_collection": "08:00:00",
        "Truck_Id": "Truck #9",
        "scheduled_collection": "Today, 6:30 PM"
    },
    {
        "bin_location": "Suburban - Sector 5",
        "fill_level": 44,
        "estimated_time_until_collection": "26:00:00",
        "Truck_Id": "Truck #13",
        "scheduled_collection": "Tomorrow, 11:00 AM"
    },
    {
        "bin_location": "City Square",
        "fill_level": 97,
        "estimated_time_until_collection": "00:45:00",
        "Truck_Id": "Truck #10",
        "scheduled_collection": "Today, 11:15 AM"
    },
    {
        "bin_location": "Warehouse District",
        "fill_level": 57,
        "estimated_time_until_collection": "18:00:00",
        "Truck_Id": "Truck #15",
        "scheduled_collection": "Tomorrow, 1:00 AM"
    }
];
export default truck;